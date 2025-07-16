import React, { useEffect, useState } from 'react';

import './App.css'

function App() {

    const [ useSafeMode, setUseSafeMode ] = useState(false);

    useEffect(() => {
        import('@/utils/errorHandler').then(({ errorHandler }) => {
            errorHandler;
        })

        const lastError = localStorage.getItem('iluma_last_error');
        if (lastError) {
            console.warn("🔄 Previous error detected, enabling safe mode temporarily");
            setUseSafeMode(true);

            setTimeout(() => {
                setUseSafeMode(false);
                localStorage.removeItem('iluma_last_error');
            }, 30000);
        }

        const handleWebGLFallback = () => {
            console.warn('WebGL fallback triggered globally');
            setUseSafeMode(true);
        }

        window.addEventListener('webgl-fallback-required', handleWebGLFallback);
    
        return () => {
            window.removeEventListener('webgl-fallback-required', handleWebGLFallback);
        }
    }, []);

    return (
        <>
        <h1>Iluma Marketing</h1>
        </>
    )
}

export default App;
