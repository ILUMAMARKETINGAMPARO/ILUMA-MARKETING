import { useState, useCallback, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LiloMood, LiloModule } from '@/types/lilo';

interface VoiceRecognition {
  start: () => Promise<void>;
  stop: () => void;
  isListening: boolean;
  isSupported: boolean;
}

interface VoiceSynthesis {
  speak: (text: string, emotion?: LiloMood) => Promise<void>;
  isSpeaking: boolean;
  stop: () => void;
  isSupported: boolean;
}

interface UseLiloVoiceReturn {
  // Reconnaissance vocale
  recognition: VoiceRecognition;
  transcript: string;
  confidence: number;
  
  // Synthèse vocale
  synthesis: VoiceSynthesis;
  
  // État global
  isInitialized: boolean;
  error: string | null;
  
  // Contrôles avancés
  toggleContinuousListening: () => void;
  isContinuousMode: boolean;
  setLanguage: (lang: 'fr' | 'en') => void;
  currentLanguage: string;
}

export const useLiloVoice = (
  module: LiloModule = 'home',
  userId: string = 'anonymous'
): UseLiloVoiceReturn => {
  // États de base
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('fr');
  
  // États de reconnaissance vocale
  const [isListening, setIsListening] = useState(false);
  const [isContinuousMode, setIsContinuousMode] = useState(false);
  
  // États de synthèse vocale
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  // Références pour les APIs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // Vérification du support des APIs
  const isRecognitionSupported = typeof window !== 'undefined' && 
    ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const isSynthesisSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Initialisation
  useEffect(() => {
    const initializeVoice = async () => {
      try {
        if (isRecognitionSupported || isSynthesisSupported) {
          setIsInitialized(true);
          setError(null);
        } else {
          setError('Voice APIs not supported in this browser');
        }
      } catch (err) {
        setError('Failed to initialize voice APIs');
        console.error('Voice initialization error:', err);
      }
    };

    initializeVoice();
  }, [isRecognitionSupported, isSynthesisSupported]);

  // Fonction de reconnaissance vocale avancée avec streaming
  const startRecognition = useCallback(async () => {
    if (!isRecognitionSupported || isListening) return;

    try {
      setIsListening(true);
      setError(null);
      
      // Configuration du MediaRecorder pour un streaming optimisé
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudioBlob(audioBlob);
      };

      // Démarrer l'enregistrement avec chunks de 1 seconde pour le streaming
      mediaRecorder.start(1000);
      
      console.log('Voice recognition started with advanced streaming');

      // Auto-stop après 30 secondes si pas en mode continu
      if (!isContinuousMode) {
        setTimeout(() => {
          if (isListening) stopRecognition();
        }, 30000);
      }

    } catch (err) {
      setError('Failed to start voice recognition');
      setIsListening(false);
      console.error('Recognition start error:', err);
    }
  }, [isListening, isContinuousMode, isRecognitionSupported]);

  // Traitement de l'audio avec notre Edge Function
  const processAudioBlob = async (audioBlob: Blob) => {
    try {
      // Conversion en base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      // Appel à notre Edge Function pour la reconnaissance
      const { data, error } = await supabase.functions.invoke('lilo-speech-recognition', {
        body: {
          audio: base64Audio,
          language: currentLanguage,
          module,
          userId,
          continuous: isContinuousMode
        }
      });

      if (error) throw error;

      if (data.success) {
        setTranscript(data.text);
        setConfidence(data.confidence);
        console.log('Recognition result:', data.text, `(${data.confidence})`);
      } else {
        throw new Error(data.error || 'Recognition failed');
      }

    } catch (err) {
      setError('Failed to process audio');
      console.error('Audio processing error:', err);
    }
  };

  // Arrêt de la reconnaissance
  const stopRecognition = useCallback(() => {
    if (!isListening) return;

    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      setIsListening(false);
      console.log('Voice recognition stopped');

    } catch (err) {
      console.error('Error stopping recognition:', err);
    }
  }, [isListening]);

  // Synthèse vocale émotionnelle avancée
  const speak = useCallback(async (text: string, emotion: LiloMood = 'happy') => {
    if (!text || isSpeaking) return;

    try {
      setIsSpeaking(true);
      setError(null);

      // Arrêter tout audio en cours
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        currentAudioRef.current = null;
      }

      // Appel à notre Edge Function pour la synthèse vocale émotionnelle
      const { data, error } = await supabase.functions.invoke('lilo-voice-engine', {
        body: {
          text,
          emotion,
          language: currentLanguage,
          module,
          streaming: true
        }
      });

      if (error) throw error;

      if (data.success && data.audioData) {
        // Création et lecture de l'audio
        const audioBlob = new Blob([
          Uint8Array.from(atob(data.audioData), c => c.charCodeAt(0))
        ], { type: 'audio/mpeg' });

        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        currentAudioRef.current = audio;

        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          setError('Failed to play synthesized audio');
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
        };

        await audio.play();
        console.log(`Speaking with emotion ${emotion}:`, text);

      } else {
        throw new Error(data.error || 'Synthesis failed');
      }

    } catch (err) {
      setIsSpeaking(false);
      setError('Failed to synthesize speech');
      console.error('Speech synthesis error:', err);
    }
  }, [isSpeaking, currentLanguage, module]);

  // Arrêt de la synthèse
  const stopSynthesis = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  // Basculer le mode continu
  const toggleContinuousListening = useCallback(() => {
    setIsContinuousMode(prev => !prev);
    if (isListening) {
      stopRecognition();
    }
  }, [isListening, stopRecognition]);

  // Changer la langue
  const setLanguage = useCallback((lang: 'fr' | 'en') => {
    setCurrentLanguage(lang);
    if (isListening) {
      stopRecognition();
    }
  }, [isListening, stopRecognition]);

  // Nettoyage à la désinstallation
  useEffect(() => {
    return () => {
      stopRecognition();
      stopSynthesis();
    };
  }, [stopRecognition, stopSynthesis]);

  return {
    recognition: {
      start: startRecognition,
      stop: stopRecognition,
      isListening,
      isSupported: isRecognitionSupported
    },
    transcript,
    confidence,
    synthesis: {
      speak,
      isSpeaking,
      stop: stopSynthesis,
      isSupported: isSynthesisSupported
    },
    isInitialized,
    error,
    toggleContinuousListening,
    isContinuousMode,
    setLanguage,
    currentLanguage
  };
};

export default useLiloVoice;