import React from 'react';

// O type CarimboType deve ser importado ou definido aqui (assumindo a definição do App.tsx)
type CarimboType = 'ATC' | 'ESSE_FSP' | 'ESSE_CONTROLE' | 'MASSIVA' | 'REGIONAL_V2' | 'PARCEIROS' | 'TX' | null;

interface CarimbadorMenuProps {
  // onSelectCarimbo agora é responsável por definir o CarimboType e mudar a view para 'carimboForm' no App.tsx
  onSelectCarimbo: (type: CarimboType) => void; 
  onBack: () => void;
}

const CarimbadorMenu: React.FC<CarimbadorMenuProps> = ({ onSelectCarimbo, onBack }) => {
  
  // Lista de botões filtrada para as 7 opções solicitadas
  const carimbos = [
    { label: 'ATC', key: 'ATC' },
    { label: 'ESSE FSP', key: 'ESSE_FSP' },
    { label: 'ESSE Controle', key: 'ESSE_CONTROLE' }, 
    { label: 'Massiva', key: 'MASSIVA' },
    { label: 'Parceiros', key: 'PARCEIROS' },
    { label: 'Regional V2', key: 'REGIONAL_V2' },
    { label: 'TX', key: 'TX' },
  ];

  const handleCardClick = (key: string) => {
    // Apenas chama a função do App.tsx, que se encarrega de ir para a tela do formulário.
    onSelectCarimbo(key as CarimboType); 
  };
  
  // Estilos de Cor e Brilho Neon (Baseado no ActionCard)
  const neonColor = 'text-neon-purple';
  const neonGlow = "shadow-card-glow hover:border-neon-purple transform hover:scale-[1.03] transition duration-200";
  
  // Estilo do botão Voltar (sem glow)
  const backButtonStyle = "bg-[#7E30E1] text-white py-2 px-6 rounded-lg font-semibold uppercase hover:bg-[#9B50E6] transition duration-200";

  return (
   
    <div className="flex flex-col h-full p-4">
      {/* Botão Voltar (No canto superior direito) */}
      <div className="flex justify-end mb-16">
        <button onClick={onBack} className={backButtonStyle}>
          Voltar
        </button>
      </div>

      {/* Container Centralizado para os Botões */}
      <div className="flex-grow flex items-start justify-center">
        {/* Grid 2x2 para acomodar 7 botões de forma organizada */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
          
          {carimbos.map((carimbo) => (
            <button
              key={carimbo.key}
              onClick={() => handleCardClick(carimbo.key)}
              // Aplicando as classes de fundo escuro e glow
              className={`
                flex items-center justify-center p-6 rounded-xl cursor-pointer
                bg-card-bg border border-transparent 
                ${neonColor} text-neon-glow font-semibold uppercase tracking-wider
                ${neonGlow}
              `}
              style={{ backgroundColor: '#1a0033' }}
            >
              {carimbo.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarimbadorMenu;
