import React from 'react';

const Header: React.FC = () => {
  const neonColor = 'text-[#BB86FC]';

  return (
    // Container principal do cabeçalho com cantos arredondados e brilho sutil
    <header 
      className={`p-6 bg-gray-900 rounded-3xl mb-12`} 
      style={{ backgroundColor: '#1a0033', boxShadow: '0 0 15px rgba(187,134,252,0.4)' }}
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        
        {/* Logo DataCore */}
        <div className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="DataCore Logo" 
            className={`w-16 h-auto mr-2 filter drop-shadow-[0_0_5px_#BB86FC]`} 
          />
          <h1 className={`text-3xl font-bold ${neonColor}`}>DataCore</h1>
        </div>

        {/* Campo de Pesquisa */}
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Digite seus comandos"
            className={`
              w-full py-2 px-4 bg-transparent border-b border-[#BB86FC] 
              focus:outline-none focus:border-opacity-100 transition duration-300 
              ${neonColor} placeholder-[#BB86FC] placeholder-opacity-60
            `}
            style={{ 
              textShadow: '0 0 2px #BB86FC', 
              borderBottom: '1px solid rgba(187,134,252,0.5)'
            }}
          />
          {/* Ícone de busca */}
          <svg className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-5 h-5 ${neonColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;