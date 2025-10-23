// src/components/Header.tsx

import React, { useState } from 'react';
import CommandView from './CommandView'; 

// Adição das novas categorias de comandos
const COMMAND_CATEGORIES = [
  'BACKBONE', 'TUNEL', 'HL3', 'SWC', 'GWC', 
  'HL4', 'SWD', 'SWS', 'GWS', 'HL5', 
  'GPON', 'OLT', 'SWA', 'SWT', 'DSLAM', 'CPE'
];

// NOVOS: Lista de Fabricantes para pesquisa ampla
const VENDOR_CATEGORIES = [
  'ALCATEL', 'CISCO', 'HUAWEI', 'JUNIPER', 'JUNOS', 'DMOS', 
  'DATACOM', 'CORIANT', 'FORTINET', 'KEYMILE', 'TELLABS'
];

const Header: React.FC = () => {
  const neonColor = 'text-[#BB86FC]';
  const [searchTerm, setSearchTerm] = useState('');
  const [showCommandModal, setShowCommandModal] = useState(false);

  // A função que lida com a mudança no input de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setSearchTerm(value);

    // 1. Verifica se é uma Categoria de Comando
    const isCommandCategory = COMMAND_CATEGORIES.includes(value);
    
    // 2. Verifica se é um Fabricante (ou parte dele)
    const isVendorSearch = VENDOR_CATEGORIES.some(vendor => vendor.includes(value)) && value.length >= 3;
    
    // 3. Define se o modal deve abrir
    if (isCommandCategory || isVendorSearch) {
        setShowCommandModal(true);
    } else {
        setShowCommandModal(false);
    }
  };

  // Função para fechar o modal/dropdown
  const closeModal = () => {
    setShowCommandModal(false);
    setSearchTerm(''); 
  };
  
  // Define o tipo de comando a ser exibido no CommandView
  // Mapeamento: Categoria Específica -> Categoria | Fabricante ou Busca Ampla -> 'SEARCH_ALL'
  const displayCommandType = (() => {
    const term = searchTerm;
    if (term === 'BACKBONE') return 'BACKBONE';
    if (['HL3', 'SWC', 'GWC', 'HL4', 'SWD', 'SWS', 'GWS', 'HL5', 'TUNEL'].includes(term)) return 'TUNEL';
    if (['GPON', 'OLT'].includes(term)) return 'GPON'; 
    if (COMMAND_CATEGORIES.includes(term)) return term; // SWA, SWT, DSLAM, CPE
    
    // Se não for uma categoria de comando, mas o modal estiver aberto (ou seja, pesquisa por Fabricante)
    if (showCommandModal) {
      return 'SEARCH_ALL';
    }
    
    return term;
  })();


  return (
    <header 
      className={`p-6 bg-gray-900 rounded-3xl mb-12 relative`} 
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
            placeholder="Pesquise por Comando ou Fabricante (Ex: ALCATEL)"
            value={searchTerm}
            onChange={handleSearchChange}
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
      
      {/* Modal/Dropdown de Comandos */}
      {showCommandModal && (
        <div className="absolute left-0 right-0 mt-4 z-50">
          <CommandView 
            commandType={displayCommandType} // Passa o tipo de renderização ('SEARCH_ALL' ou Categoria)
            searchTerm={searchTerm} // Passa o termo original para filtro e título
            onClose={closeModal}
          />
        </div>
      )}
    </header>
  );
};

export default Header;