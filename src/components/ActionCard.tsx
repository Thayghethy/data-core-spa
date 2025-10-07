import React from 'react';

interface ActionCardProps {
  title: string;
  iconPath: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, iconPath }) => {
  // Cor e sombra customizadas para o efeito neon (usando classes arbitrárias do Tailwind)
  // Requer Tailwind v3.x ou superior.
  const neonShadow = 'shadow-[0_0_20px_rgba(187,134,252,0.6),0_0_40px_rgba(187,134,252,0.2)]';
  const neonColor = 'text-[#BB86FC]'; 

  return (
    <div
      // Estrutura do card com fundo escuro, cantos arredondados e efeito de brilho
      className={`
        flex flex-col items-center justify-center p-8 
        bg-gray-900 border border-transparent 
        rounded-2xl cursor-pointer transition-all duration-300
        hover:border-[#BB86FC] transform hover:scale-[1.02] 
        ${neonShadow}
      `}
      style={{ 
        backgroundColor: '#1a0033', // Roxo muito escuro para o fundo
        boxShadow: '0 0 20px rgba(187,134,252,0.6)', // Cor do glow
      }}
    >
      <img 
        src={iconPath} 
        alt={title} 
        className={`${neonColor} w-20 h-20 mb-4 filter drop-shadow-[0_0_10px_#BB86FC]`}
      />
      
      <h2 
        className={`text-2xl font-semibold uppercase tracking-wider ${neonColor}`}
        style={{ textShadow: '0 0 5px #BB86FC' }} // Efeito de brilho no texto
      >
        {title}
      </h2>
    </div>
  );
};

export default ActionCard;