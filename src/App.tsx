import React, { useState } from 'react';
import Header from './components/Header';
import ActionCard from './components/ActionCard';
import CarimbadorMenu from './components/CarimbadorMenu';
import CarimboForm from './components/CarimboForm';
import TramitacaoView from './components/TramitacaoView.tsx';
import LinksView from './components/LinksView'; // Importar o novo componente

// Definindo os estados possíveis da aplicação (Adicionado 'links')
type AppView = 'home' | 'carimbadorMenu' | 'carimboForm' | 'tramitacao' | 'links'; 
type CarimboType = 'ATC' | 'ESSE_FSP' | 'ESSE_CONTROLE' | 'MASSIVA' | 'REGIONAL_V2' | 'PARCEIROS' | 'TX' | null;

function App() {
  const neonColor = 'text-[#BB86FC]'; 
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentCarimbo, setCurrentCarimbo] = useState<CarimboType>(null);

  // Nova função para a view de Links
  const handleLinksClick = () => {
    setCurrentView('links');
  };
  
  // Função para a view de Tramitação
  const handleTramitacaoClick = () => {
    setCurrentView('tramitacao');
  };
  
  // Função para a view de Carimbador
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
    } else if (currentView === 'carimbadorMenu' || currentView === 'tramitacao' || currentView === 'links') { // Inclui 'links'
      setCurrentView('home');
    } else {
      setCurrentView('home');
    }
  };

  const renderContent = () => {
    
    // ------------------------------------
    // 1. HOME VIEW
    // ------------------------------------
    if (currentView === 'home') {
      return (
        <>
          <Header />
          <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Botão Tramitação */}
            <div onClick={handleTramitacaoClick}>
                <ActionCard title="Tramitação" iconPath="/images/Tramitacao.png" />
            </div>
            
            {/* Botão Links (NOVO) */}
            <div onClick={handleLinksClick}>
              <ActionCard title="Links" iconPath="/images/Links.png" />
            </div>
            
            {/* Botão Carimbador */}
            <div onClick={handleCarimbadorClick}>
              <ActionCard title="Carimbador" iconPath="/images/Carimbo.png" />
            </div>
          </main>
          
          <footer className="mt-8 text-center">
            <p 
              className={`text-sm tracking-widest uppercase ${neonColor} opacity-70`}
              style={{ textShadow: '0 0 2px rgba(187,134,252,0.4)' }}
            >
              DataCore — Central de Procedimentos e Comandos
            </p>
          </footer>
        </>
      );
    } 
    
    // ------------------------------------
    // 2. TRAMITACAO VIEW
    // ------------------------------------
    if (currentView === 'tramitacao') {
        return <TramitacaoView onBack={handleBack} />;
    }

    // ------------------------------------
    // 3. LINKS VIEW (NOVO)
    // ------------------------------------
    if (currentView === 'links') {
        return <LinksView onBack={handleBack} />;
    }

    // ------------------------------------
    // 4. CARIMBADOR MENU VIEW
    // ------------------------------------
    if (currentView === 'carimbadorMenu') {
      return (
        <CarimbadorMenu 
          onSelectCarimbo={handleSelectCarimbo}
          onBack={handleBack} 
        />
      );
    }

    // ------------------------------------
    // 5. CARIMBO FORM VIEW
    // ------------------------------------
    if (currentView === 'carimboForm' && currentCarimbo) {
      return (
        <CarimboForm 
          type={currentCarimbo} 
          onBack={handleBack} 
        />
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
          boxShadow: '0 0 30px rgba(187,134,252,0.1)'
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default App;