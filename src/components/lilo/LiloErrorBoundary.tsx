import React, { Component, ReactNode } from 'react';
import EmergencyFallback from '@/components/emergency/EmergencyFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('🚨 CRITICAL ERROR DETECTED:', error.message);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 FULL ERROR BOUNDARY:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
    
    // Save error to localStorage for debugging
    localStorage.setItem('iluma_last_error', JSON.stringify({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    }));
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    localStorage.removeItem('iluma_last_error');
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <EmergencyFallback 
          error={this.state.error?.message || 'Erreur inconnue'}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;