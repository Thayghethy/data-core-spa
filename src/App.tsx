// src/App.tsx
import { useState } from 'react';
import Header from './components/Header';
import ActionCard from './components/ActionCard';
import CarimbadorMenu from './components/CarimbadorMenu.tsx';
import CarimboForm from './components/CarimboForm';

// Definindo os estados possíveis da aplicação
type AppView = 'home' | 'carimbadorMenu' | 'carimboForm';
type CarimboType =
  | 'ATC'
  | 'ESSE_FSP'
  | 'ESSE_CONTROLE'
  | 'MASSIVA'
  | 'REGIONAL_V2'
  | 'PARCEIROS'
  | 'TX'
  | null;

function App() {
  const neonColor = 'text-[#BB86FC]';
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentCarimbo, setCurrentCarimbo] = useState<CarimboType>(null);

  const handleCarimbadorClick = () => {
    setCurrentView('carimbadorMenu');
  };

  const handleSelectCarimbo = (type: CarimboType) => {
    setCurrentCarimbo(type);
    setCurrentView('carimboForm');
  };

  const handleBack = () => {
    if (currentView === 'carimboForm') {
      setCurrentCarimbo(null);
      setCurrentView('carimbadorMenu');
    } else {
      setCurrentView('home');
    }
  };

  const renderContent = () => {
    if (currentView === 'home') {
      return (
        <>
          <Header />
          <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ActionCard title="Tramitação" iconPath="/images/Tramitacao.png" />
            <ActionCard title="Links" iconPath="/images/Links.png" />
            <div onClick={handleCarimbadorClick}>
              <ActionCard title="Carimbador" iconPath="/images/Carimbo.png" />
            </div>
          </main>
        </>
      );
    }

    if (currentView === 'carimbadorMenu') {
      return (
        <CarimbadorMenu
          onSelectCarimbo={handleSelectCarimbo}
          onBack={handleBack}
        />
      );
    }

    if (currentView === 'carimboForm' && currentCarimbo) {
      return (
        <CarimboForm type={currentCarimbo} onBack={handleBack} />
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-black flex justify-center py-8 px-4">
      <div
        className="max-w-7xl w-full p-8 rounded-3xl border border-app-border"
        style={{
          backgroundColor: '#0f001c',
          boxShadow: '0 0 30px rgba(187,134,252,0.1)',
        }}
      >
        {renderContent()}

        {/* Footer só aparece na Home */}
        {currentView === 'home' && (
          <footer className="mt-8 text-center">
            <p
              className={`text-sm tracking-widest uppercase ${neonColor} opacity-70`}
              style={{ textShadow: '0 0 2px rgba(187,134,252,0.4)' }}
            >
              DataCore — Central de Procedimentos e Comandos
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;
