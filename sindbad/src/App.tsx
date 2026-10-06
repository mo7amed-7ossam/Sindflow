import React, { useState, useEffect } from 'react';
import { SindbadLogo } from './components/SindbadLogo';
import { LanguageToggle } from './components/LanguageToggle';
import { AuthModeSwitcher, AuthMode } from './components/AuthModeSwitcher';
import { BrandEditorial } from './components/BrandEditorial';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { translations, Language } from './locales/translations';

export default function App() {
  // Default to Arabic-first RTL as requested
  const [lang, setLang] = useState<Language>('ar');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isForgotView, setIsForgotView] = useState(false);

  const content = translations[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [isRtl, lang]);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen w-full bg-[#FFFFFF] text-[#172326] flex flex-col lg:grid lg:grid-cols-12 selection:bg-[#E7F5F7] selection:text-[#006D7C] ${
        isRtl ? 'font-arabic' : 'font-latin'
      }`}
    >
      {/* ZONE 1: INTEGRATED EDITORIAL BRAND CANVAS (In RTL, on the RIGHT) */}
      <section
        className={`hidden lg:flex lg:col-span-7 xl:col-span-7 bg-[#F4F7F7] relative ${
          isRtl ? 'lg:border-l border-[#E7ECEC]' : 'lg:border-r border-[#E7ECEC]'
        }`}
      >
        <BrandEditorial content={content} lang={lang} />
      </section>

      {/* ZONE 2: PRIMARY AUTHENTICATION SURFACE (In RTL, on the LEFT) */}
      <section
        className="w-full lg:col-span-5 xl:col-span-5 bg-[#FFFFFF] flex flex-col justify-between min-h-screen px-6 sm:px-12 lg:px-14 xl:px-16 py-8 sm:py-10 lg:py-12 z-10"
      >
        {/* Top Utility Row */}
        <header className="w-full flex items-center justify-between min-h-[36px]">
          {/* Internal Workspace Tag */}
          <div className="flex items-center gap-2 text-xs text-[#8A9799]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008DA1]" />
            <span className="font-medium text-[#647276]">
              {isRtl ? 'بوابة النظام الداخلي' : 'Internal System Gateway'}
            </span>
          </div>

          {/* Quiet Language Switcher */}
          <LanguageToggle currentLang={lang} onToggle={setLang} />
        </header>

        {/* Center: Dedicated Authentication Experience (No Card Container) */}
        <main className="w-full max-w-[380px] mx-auto my-auto py-6 sm:py-8">
          
          {/* Brand Identification */}
          <div className="mb-8">
            <SindbadLogo lang={lang} size="sm" />
          </div>

          {/* Integrated State Switcher (Baseline Tabs - No Pill Box) */}
          {!isForgotView && (
            <div className="mb-6">
              <AuthModeSwitcher
                currentMode={authMode}
                onChangeMode={(mode) => {
                  setAuthMode(mode);
                  setIsForgotView(false);
                }}
                loginLabel={content.modeTabs.login}
                registerLabel={content.modeTabs.register}
              />
            </div>
          )}

          {/* Authentication Form Routing */}
          <div className="transition-all duration-200">
            {isForgotView ? (
              <ForgotPasswordForm
                content={content}
                lang={lang}
                onBackToLogin={() => setIsForgotView(false)}
              />
            ) : authMode === 'login' ? (
              <LoginForm
                content={content}
                lang={lang}
                onForgotPassword={() => setIsForgotView(true)}
              />
            ) : (
              <RegisterForm
                content={content}
                lang={lang}
              />
            )}
          </div>
        </main>

        {/* Bottom Restrained Legal / Attribution Line */}
        <footer className="w-full pt-6 border-t border-[#E7ECEC]/70 flex items-center justify-between text-[11.5px] text-[#8A9799]">
          <span dangerouslySetInnerHTML={{ __html: content.legalNote }} />
          <span>{new Date().getFullYear()}</span>
        </footer>
      </section>
    </div>
  );
}
