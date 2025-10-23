import React, { useState } from 'react';
import { tramitacaoData } from '../data/tramitacaoData'; // Importa os dados

interface TramitacaoViewProps {
  onBack: () => void;
}

const TramitacaoView: React.FC<TramitacaoViewProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const backButtonStyle = "bg-[#7E30E1] text-white py-2 px-6 rounded-lg font-semibold uppercase hover:bg-[#9B50E6] transition duration-200";
  const neonColor = 'text-neon-purple';
  const neonGlowText = 'text-neon-glow';

  // 1. Filtragem dos Dados
  const filteredData = tramitacaoData.filter(item =>
    item.Falha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Destino.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.Categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Estilos da Tabela
  const thStyle = `px-4 py-2 text-left uppercase text-sm font-bold ${neonColor} border-b border-neon-purple/50`;
  const tdStyle = `px-4 py-2 text-left text-white text-sm border-b border-neon-purple/20`;

  return (
    <div className="flex flex-col h-full p-4">
      
      {/* Botão Voltar */}
      <div className="flex justify-end mb-6">
        <button onClick={onBack} className={backButtonStyle}>
          Voltar
        </button>
      </div>

      {/* Título e Barra de Busca */}
      <h2 className={`text-3xl font-bold mb-6 ${neonColor} ${neonGlowText}`}>
        Central de Roteamento (PRAPS, CPE, SWT, Milegate)
      </h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por Falha, Categoria ou Destino..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`
            w-full py-3 px-4 bg-card-bg border border-neon-purple/50 
            text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-purple 
            transition duration-300
          `}
          style={{ boxShadow: '0 0 8px rgba(187,134,252,0.3)' }}
        />
      </div>

      {/* Tabela Dinâmica com Scroll */}
      <div className="flex-grow overflow-y-auto rounded-lg" style={{ maxHeight: '70vh' }}>
        <table className="min-w-full table-fixed">
          <thead>
            <tr className="bg-card-bg sticky top-0" style={{ backgroundColor: '#1a0033' }}>
              <th className={thStyle} style={{ width: '15%' }}>Categoria</th>
              <th className={thStyle} style={{ width: '35%' }}>Falha</th>
              <th className={thStyle} style={{ width: '12%' }}>DSP</th>
              <th className={thStyle} style={{ width: '12%' }}>FSP</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-neon-purple/10 transition duration-150">
                <td className={tdStyle}>{item.Categoria}</td>
                <td className={tdStyle}>{item.Falha}</td>
                <td className={`${tdStyle} text-yellow-300`}>{item.DSP}</td>
                <td className={`${tdStyle} text-green-300`}>{item.FSP}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="text-center py-10 text-white opacity-70">Nenhum resultado encontrado para "{searchTerm}".</div>
        )}
      </div>
    </div>
  );
};

export default TramitacaoView;