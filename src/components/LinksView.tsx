import React from 'react';

interface LinksViewProps {
  onBack: () => void;
}

interface SystemLink {
  name: string;
  url: string;
}

const SYSTEM_LINKS: SystemLink[] = [
  { name: 'Service Now', url: 'https://autenticaint.vivo.com.br/LoginCorp/?bmctx=D3346598D37D25323F24C459B0AA627D72F11002ACA4C6E5F0DC260DDCE7E518&contextType=external&username=string&challenge_topaz=true&challenge_url=https%3A%2F%2Fautenticaint.vivo.com.br%2FLoginCorp%2F&password=secure_string&request_id=6648855506720115679&authn_try_count=0&locale=pt_BR&resource_url=https%253A%252F%252Fautenticaint.vivo.com.br%252Fms_oauth%252Foauth2%252Fui%252Fvivooauthservice%252Fshowconsent%253Fresponse_type%253Dcode%2526client_id%253D5059482f854448de9561e5891d4734fc%2526redirect_uri%253Dhttps%25253A%25252F%25252Fvivob2b.service-now.com%25252Fnavpage.do%2526scope%253DAPIManager.Default%252BServiceNowB2BIsis.Default%2526state%253DSNC338b99b09c18d94199e28c92e8109acd%2526oracle_client_name%253DServiceNowB2BIsis' },
  { name: 'Solar Intragov', url: 'https://www.vivointragov.tdata.com.br/Orion/Login.aspx?sessionTimeout=yes&ReturnUrl=%2FOrion%2Fnodes%2F' },
  { name: 'Solar Smart', url: 'https://vivosmart.tdata.com.br/Orion/Login.aspx?autologin=no&SuccessfulLogout=yes&AccountID=A0156426' },
  { name: 'Star', url: 'http://star.redecorp.br/Star/web/Login' },
  { name: 'Sigitm', url: 'http://sigitm.redecorp.br/SIGITMWeb/login.jsp' },
  { name: 'SGOE', url: 'https://sgoe-esteira.vivo.com.br/novo-sgoe-portal/autenticacao/entrar' },
  { name: 'NICE (escala)', url: 'https://vivowfm.redecorp.br/wfm/webstation/my-schedule' },
  { name: 'Integra', url: 'https://integraco.redecorp.br/IntegraCo/Paginas/index' },
  // Conexão Pessoas precisa do protocolo (adicionando https:// se não for fornecido)
  { name: 'Conexão Pessoas', url: 'https://conexaopessoas.vivo.com.br' }, 
];

const LinksView: React.FC<LinksViewProps> = ({ onBack }) => {
  const neonColor = 'text-neon-purple';
  const neonGlow = "shadow-card-glow hover:border-neon-purple transform hover:scale-[1.03] transition duration-200";
  const backButtonStyle = "bg-[#7E30E1] text-white py-2 px-6 rounded-lg font-semibold uppercase hover:bg-[#9B50E6] transition duration-200";

  const handleLinkClick = (url: string) => {
    // Redireciona para o link em uma nova aba
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col h-full p-4">
      
      {/* Botão Voltar */}
      <div className="flex justify-between items-center mb-10 border-b border-neon-purple/50 pb-4">
        <h2 className={`text-3xl font-bold ${neonColor}`}>
            Sistemas e Links Úteis
        </h2>
        <button onClick={onBack} className={backButtonStyle}>
          Voltar
        </button>
      </div>

      {/* Container Centralizado para os Botões de Links */}
      <div className="flex-grow flex items-start justify-center">
        {/* Grid para acomodar os botões */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
          
          {SYSTEM_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.url)}
              // Estilos de fundo escuro e glow
              className={`
                flex items-center justify-center p-6 rounded-xl cursor-pointer
                bg-card-bg border border-transparent text-center
                ${neonColor} text-neon-glow font-semibold uppercase tracking-wider
                ${neonGlow}
              `}
              style={{ 
                backgroundColor: '#1a0033',
                minHeight: '100px', // Altura mínima para melhor layout
                boxShadow: '0 0 10px rgba(187,134,252,0.4)'
              }}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinksView;