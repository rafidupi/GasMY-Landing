'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from './Container';
import { Button } from './Button';

export function BetaDownload() {
  const [platform, setPlatform] = useState<'android' | 'ios' | null>(null);
  const [showAndroidWarning, setShowAndroidWarning] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTestFlightInfo, setShowTestFlightInfo] = useState(false);

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      setPlatform('android');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      setPlatform('ios');
    }

    // Check if Android warning was dismissed before
    const warningDismissed = localStorage.getItem('gasmy-android-warning-dismissed');
    if (!warningDismissed) {
      setShowAndroidWarning(true);
    }
  }, []);

  const handleAndroidDownload = () => {
    setIsDownloading(true);

    // Simulate download start
    setTimeout(() => {
      // Trigger APK download
      const link = document.createElement('a');
      link.href = '/gasmy-beta-v0.9.2.apk'; // You'll need to add this file to public/
      link.download = 'gasmy-beta-v0.9.2.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsDownloading(false);

      // Show toast notification (you can implement a toast component)
      console.log('✅ Descargando gasmy-beta.apk');
    }, 500);
  };

  const handleIOSDownload = () => {
    // Open TestFlight link
    window.open('https://testflight.apple.com/join/YOUR_TESTFLIGHT_CODE', '_blank');
  };

  const dismissAndroidWarning = () => {
    setShowAndroidWarning(false);
    localStorage.setItem('gasmy-android-warning-dismissed', 'true');
  };

  return (
    <section data-section="beta-download" className="relative py-20 md:py-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">
              Prueba gasmy ahora
            </h2>
            <p className="text-lg text-text-mid">
              Súbete a la beta y maneja con claridad desde hoy
            </p>
          </motion.div>

          {/* Two Column Layout: Cards Left, Phone Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-8">
            {/* Left Column: Stacked Cards */}
            <div className="space-y-6">
              {/* Android Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative group ${platform === 'android' ? 'ring-2 ring-primary/50' : ''}`}
              >
                <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl h-full flex flex-col">
                  {/* Recommended Badge */}
                  {platform === 'android' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-medium text-white shadow-lg">
                      Recomendado para ti
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#3DDC84]/10 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[#3DDC84]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-text-main mb-2 text-center">
                    Android
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-text-mid mb-6 text-center">
                    Descarga directa, instalación rápida
                  </p>

                  {/* Button */}
                  <div className="mt-auto">
                    <button
                      onClick={handleAndroidDownload}
                      disabled={isDownloading}
                      className="w-full bg-gradient-to-br from-[#2548df] to-[#6366f1] text-white font-medium py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Descargando...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Descargar Beta
                        </>
                      )}
                    </button>

                    {/* File info */}
                    <p className="text-xs text-text-mid/70 text-center mt-3">
                      .apk · 12 MB · Android 8+
                    </p>

                    {/* Warning message */}
                    {showAndroidWarning && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 relative"
                      >
                        <button
                          onClick={dismissAndroidWarning}
                          className="absolute top-2 right-2 text-text-mid/50 hover:text-text-mid"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <div className="flex gap-2 text-xs text-orange-600 dark:text-orange-400 pr-6">
                          <span>⚠️</span>
                          <p>
                            Activa &quot;Instalar apps desconocidas&quot; en Ajustes si es necesario
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* iPhone Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ y: -4 }}
                className={`relative group ${platform === 'ios' ? 'ring-2 ring-primary/50' : ''}`}
              >
                <div className="relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-xl h-full flex flex-col">
                  {/* Recommended Badge */}
                  {platform === 'ios' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary px-4 py-1 rounded-full text-xs font-medium text-white shadow-lg">
                      Recomendado para ti
                    </div>
                  )}

                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gray-500/10 flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-text-main mb-2 text-center">iPhone</h3>

                  {/* Description */}
                  <p className="text-sm text-text-mid mb-6 text-center">
                    Requiere TestFlight de Apple
                  </p>

                  {/* Button */}
                  <div className="mt-auto">
                    <button
                      onClick={handleIOSDownload}
                      className="w-full bg-transparent border-2 border-white/30 text-white font-medium py-3 px-6 rounded-2xl shadow-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white flex items-center justify-center gap-2"
                    >
                      Abrir en TestFlight
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </button>

                    {/* Helper text with info icon */}
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => setShowTestFlightInfo(!showTestFlightInfo)}
                        className="inline-flex items-center gap-1 text-xs text-text-mid/70 hover:text-text-mid transition-colors"
                      >
                        <svg
                          className="w-4 h-4 transition-transform"
                          style={{
                            transform: showTestFlightInfo ? 'rotate(15deg)' : 'rotate(0deg)',
                          }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>¿No tienes TestFlight?</span>
                      </button>

                      {/* Info dropdown */}
                      {showTestFlightInfo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 text-left text-xs text-white/90"
                        >
                          <p className="mb-2">
                            TestFlight es la app oficial de Apple para probar betas. Es gratis y
                            segura.
                          </p>
                          <a
                            href="https://apps.apple.com/app/testflight/id899247664"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-secondary underline inline-flex items-center gap-1"
                          >
                            Descargar TestFlight
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Phone Mockup (Hidden - ScrollingPhone handles it) */}
            <div className="hidden lg:block relative h-[800px]">
              <div className="sticky top-24">
                {/* Floating Element 1: Top-right - Check/Speed Icon */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -right-6 top-24 bg-white/5 backdrop-blur-lg p-3 rounded-xl shadow-lg border border-white/20"
                  style={{ opacity: 0.85 }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </motion.div>

                {/* Floating Element 2: Left-bottom - Location/Cost Icon */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute -left-6 bottom-32 bg-white/5 backdrop-blur-lg p-3 rounded-xl shadow-lg border border-white/20"
                  style={{ opacity: 0.85 }}
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Version badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-center text-sm text-text-mid/70"
          >
            versión beta 0.9.2
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
