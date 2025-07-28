import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Simulateur = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection immédiate vers le simulateur complet
    navigate('/simulateur-complet', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0E] via-[#1a1a2e] to-[#16213e]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8E44FF] mx-auto mb-6"></div>
        <h2 className="text-white text-xl font-['Montserrat'] mb-2">Chargement du Simulateur IA</h2>
        <p className="text-white/60 font-['Montserrat']">Redirection en cours...</p>
      </div>
    </div>
  );
};

export default Simulateur;