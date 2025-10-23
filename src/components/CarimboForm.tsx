import React, { useState } from 'react';

// Definindo o tipo de carimbo com base no App.tsx
type CarimboType = 'ATC' | 'ESSE_FSP' | 'ESSE_CONTROLE' | 'MASSIVA' | 'REGIONAL_V2' | 'PARCEIROS' | 'TX';

interface CarimboFormProps {
  type: CarimboType;
  onBack: () => void;
}

// ----------------------------------------------------
// Componente Auxiliar 1: NeonInput
// ----------------------------------------------------
interface NeonInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const NeonInput: React.FC<NeonInputProps> = ({ label, ...props }) => (
  <div className="flex flex-col mb-4">
    <label className="text-neon-purple text-neon-glow mb-1 font-medium tracking-wide">
      {label}:
    </label>
    <input
      {...props}
      className={`
        bg-transparent border border-neon-purple text-white p-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-neon-purple
        transition duration-200 shadow-sm
      `}
      style={{ boxShadow: '0 0 5px rgba(187,134,252,0.3)', border: '1px solid rgba(187,134,252,0.5)' }}
    />
  </div>
);

// ----------------------------------------------------
// Componente Auxiliar 2: NeonTextArea
// ----------------------------------------------------
interface NeonTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

const NeonTextArea: React.FC<NeonTextAreaProps> = ({ label, ...props }) => (
  <div className="flex flex-col mb-4">
    <label className="text-neon-purple text-neon-glow mb-1 font-medium tracking-wide">
      {label}:
    </label>
    <textarea
      rows={4}
      {...props}
      className={`
        bg-transparent border border-neon-purple text-white p-2 rounded-md
        focus:outline-none focus:ring-2 focus:ring-neon-purple
        transition duration-200 shadow-sm resize-none
      `}
      style={{ boxShadow: '0 0 5px rgba(187,134,252,0.3)', border: '1px solid rgba(187,134,252,0.5)' }}
    />
  </div>
);
// ----------------------------------------------------

// Estilos de Ação (Mantidos)
const generateButtonStyle = "bg-[#7E30E1] text-white py-3 px-8 rounded-lg text-lg font-semibold uppercase tracking-wider transition duration-200 shadow-md hover:bg-[#9B50E6]";
const clearButtonStyle = "bg-orange-600 text-white py-3 px-8 rounded-lg text-lg font-semibold uppercase hover:bg-orange-700 transition duration-200";
const backButtonStyle = "bg-[#7E30E1] text-white py-2 px-6 rounded-lg font-semibold uppercase hover:bg-[#9B50E6] transition duration-200";

// Estado inicial MESTRE
const initialFormState = {
  // ATC
  sigitm: '', cliente: '', designador: '', produto: '', ostbs: '', ard: '', splitter: '', observacoes: '',
  // REGIONAL_V2
  velocidade: '', armario: '', diagnostico: '', log: '',
  // MASSIVA
  numeroTA: '', equipamentoAfetado: '',
  // ESSE CONTROLE
  fabCPE: '', ipWAN: '', ipLoopback: '', ipLAN: '', interfaceWAN: '', interfaceLAN: '', cpeInacessivel: false,
  // ESSE FSP
  acesso: '', operadora: '', designacaoLink: '', ipModemVSAT: '', ipAcelerador: '', ipCPE: '',
  // TX
  fabricante: '', enlaceAnalizado: '', enlaceFibraSeca: false, hostnameSWT: '', ipSWT: '', slotPortaUplink: '', slotPortaCliente: '', hostnameSW: '', ipSW: '', slotPortaSW: '', vlanGerencia: '',
  // Campos genéricos/Defeito (AGORA É ARRAY)
  defeitos: [] as string[], // Modificado para array para seleção múltipla
  logs: '',
};

const CarimboForm: React.FC<CarimboFormProps> = ({ type, onBack }) => {
  
  const [formState, setFormState] = useState(initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    // Lida com checkboxes/radios e inputs de texto
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormState({
      ...formState,
      [name]: newValue,
    });
  };
  
  // --- NOVA FUNÇÃO PARA GERENCIAR SELEÇÃO MÚLTIPLA DE DEFEITOS ---
  const handleDefeitoChange = (defeito: string) => {
    const isSelected = formState.defeitos.includes(defeito);
    setFormState(prev => ({
      ...prev,
      defeitos: isSelected
        ? prev.defeitos.filter(d => d !== defeito) // Remove se já estiver selecionado
        : [...prev.defeitos, defeito], // Adiciona se não estiver
    }));
  };
  // --------------------------------------------------------------

  const limparCampos = () => {
    setFormState(initialFormState);
  };

  const gerarCarimbo = async () => {
    let carimboText = "";
    
    // --- LÓGICA DE GERAÇÃO DO CARIMBO ---
    switch (type) {
      case 'ATC':
        // CORREÇÃO ATC: Incluindo TODOS os campos faltantes
        carimboText = `
################ COE - B2B ################
############ Transferência ATC #############
Nº SIGITM: ${formState.sigitm || 'N/A'}
CLIENTE: ${formState.cliente || 'N/A'}
DESIGNADOR: ${formState.designador || 'N/A'}
PRODUTO: ${formState.produto || 'N/A'}
OS/TBS: ${formState.ostbs || 'N/A'}
ARD: ${formState.ard || 'N/A'}
SPLITTER ATC: ${formState.splitter || 'N/A'}

OBSERVAÇÕES:
${formState.observacoes || 'Nenhuma observação.'}
        `.trim();
        break;
      case 'REGIONAL_V2':
        carimboText = `
################ COE - B2B ################
############ Transferência REGIONAL V2 #############
DESIGNADOR: ${formState.designador || 'N/A'}
PRODUTO: ${formState.produto || 'N/A'}
VELOCIDADE: ${formState.velocidade || 'N/A'}
ARMÁRIO: ${formState.armario || 'N/A'}

DIAGNÓSTICO:
${formState.diagnostico || 'N/A'}

LOG:
${formState.log || 'Nenhum log.'}
        `.trim();
        break;
      case 'MASSIVA':
        carimboText = `
################ COE - B2B ################
############ Transferência MASSIVA #############
NÚMERO DA TA: ${formState.numeroTA || 'N/A'}

DIAGNÓSTICO:
${formState.diagnostico || 'N/A'}

EQUIPAMENTO AFETADO:
${formState.equipamentoAfetado || 'N/A'}
        `.trim();
        break;
      case 'ESSE_CONTROLE':
        carimboText = `
################ COE - B2B ################
############ Transferência ESSE CONTROLE #############
DEFEITO: ${formState.defeitos.join(', ') || 'N/A'}
CPE INACESSÍVEL / CPE CLIENTE: ${formState.cpeInacessivel ? 'SIM' : 'NÃO'}
IP WAN: ${formState.ipWAN || 'N/A'}
IP LOOPBACK: ${formState.ipLoopback || 'N/A'}
IP LAN: ${formState.ipLAN || 'N/A'}
INTERFACE WAN: ${formState.interfaceWAN || 'N/A'}
INTERFACE LAN: ${formState.interfaceLAN || 'N/A'}
DIAGNÓSTICO:
${formState.diagnostico || 'N/A'}

LOGS:
${formState.logs || 'N/A'}
        `.trim();
        break;
      case 'ESSE_FSP':
        carimboText = `
################ COE - B2B ################
############ Transferência ESSE FSP #############
ACESSO: ${formState.acesso || 'N/A'}
OPERADORA: ${formState.operadora || 'N/A'}
DESIGNAÇÃO DO LINK: ${formState.designacaoLink || 'N/A'}
DEFEITO: ${formState.defeitos.join(', ') || 'N/A'}
IP MODEM VSAT: ${formState.ipModemVSAT || 'N/A'}
IP ACELERADOR: ${formState.ipAcelerador || 'N/A'}
IP CPE: ${formState.ipCPE || 'N/A'}
DIAGNÓSTICO:
${formState.diagnostico || 'N/A'}

LOG:
${formState.log || 'N/A'}
        `.trim();
        break;
      case 'TX':
        carimboText = `
################ COE - B2B ################
############ Transferência TX #############
DEFEITO: ${formState.defeitos.join(', ') || 'N/A'}
ENLACE ANALISADO: ${formState.enlaceAnalizado || 'N/A'}
ENLACE FIBRA SECA: ${formState.enlaceFibraSeca ? 'SIM' : 'NÃO'}
HOSTNAME SWT: ${formState.hostnameSWT || 'N/A'}
IP SWT: ${formState.ipSWT || 'N/A'}
SLOT/PORTA(UPLINK): ${formState.slotPortaUplink || 'N/A'}
SLOT/PORTA(CLIENTE): ${formState.slotPortaCliente || 'N/A'}
HOSTNAME SW: ${formState.hostnameSW || 'N/A'}
IP SW: ${formState.ipSW || 'N/A'}
SLOT/PORTA SW: ${formState.slotPortaSW || 'N/A'}
VLAN GERÊNCIA: ${formState.vlanGerencia || 'N/A'}


DIAGNÓSTICO:
${formState.diagnostico || 'N/A'}

LOGS:
${formState.logs || 'N/A'}
        `.trim();
        break;
      case 'PARCEIROS':
        // CORREÇÃO PARCEIROS: Incluindo todos os campos na formatação
        carimboText = `
################ COE - B2B ################
############ Transferência PARCEIROS #############
DEFEITO: ${formState.defeitos.join(', ') || 'N/A'}
HOSTNAME SWT: ${formState.hostnameSWT || 'N/A'}
IP SWT: ${formState.ipSWT || 'N/A'}
SLOT/PORTA(UPLINK): ${formState.slotPortaUplink || 'N/A'}
SLOT/PORTA(CLIENTE): ${formState.slotPortaCliente || 'N/A'}
HOSTNAME SW: ${formState.hostnameSW || 'N/A'}
IP SW: ${formState.ipSW || 'N/A'}
SLOT/PORTA SW: ${formState.slotPortaSW || 'N/A'}
VLAN GERÊNCIA: ${formState.vlanGerencia || 'N/A'}


DIAGNÓSTICO:
${formState.diagnostico || 'N/A'}

LOGS:
${formState.logs || 'N/A'}
        `.trim();
        break;
      default:
        carimboText = `Erro: Tipo de carimbo ${type} não implementado.`;
    }
    
    // --- CÓPIA PARA O CLIPBOARD ---
    try {
      await navigator.clipboard.writeText(carimboText);
      alert(`Carimbo ${type} gerado e copiado para a área de transferência!`);
    } catch (err) {
      alert('Erro ao copiar carimbo. Permissão negada ou falha na API.');
      console.error('Erro ao copiar: ', err);
    }
  };

  const actionButtons = (carimboType: string) => (
    <div className="flex justify-center space-x-6 mt-10">
      <button className={generateButtonStyle} onClick={gerarCarimbo}>
        Gerar Carimbo {carimboType}
      </button>
      <button className={clearButtonStyle} onClick={limparCampos}>
        Limpar
      </button>
    </div>
  );

  const renderFields = () => {
    const defeitosESSE = ['Interrompido', 'Quedas', 'Degradação']; // Defeitos conforme imagem (1).png
    
    // Componente customizado para o campo de defeito (seleção múltipla com estilo de lista)
    const DefeitoSelect = ({ defeitos }: { defeitos: string[] }) => (
        <div className="flex flex-col mb-4">
            <label className="text-neon-purple text-neon-glow mb-1 font-medium tracking-wide">
                Defeito:
            </label>
            <div 
                className="bg-transparent text-white p-2 rounded-md"
                style={{ 
                    boxShadow: '0 0 5px rgba(187,134,252,0.3)', 
                    border: '1px solid rgba(187,134,252,0.5)',
                    height: 'auto', // Altura automática
                    minHeight: '100px' // Altura mínima para o look de select
                }}
            >
                {defeitos.map(defeito => (
                    <div key={defeito} className="flex items-center text-sm">
                        <input 
                            type="checkbox" 
                            checked={formState.defeitos.includes(defeito)}
                            onChange={() => handleDefeitoChange(defeito)}
                            className="mr-2"
                        />
                        {defeito}
                    </div>
                ))}
            </div>
        </div>
    );

    switch (type) {
      case 'ATC':
        return (
          <div className="space-y-4">
            <NeonInput label="Nº SIGITM" name="sigitm" value={formState.sigitm} onChange={handleInputChange} type="text" />
            <NeonInput label="Cliente" name="cliente" value={formState.cliente} onChange={handleInputChange} type="text" />
            <NeonInput label="Designador" name="designador" value={formState.designador} onChange={handleInputChange} type="text" />
            <NeonInput label="Produto" name="produto" value={formState.produto} onChange={handleInputChange} type="text" />
            <NeonInput label="OS/TBS" name="ostbs" value={formState.ostbs} onChange={handleInputChange} type="text" />
            <NeonInput label="ARD" name="ard" value={formState.ard} onChange={handleInputChange} type="text" />
            <NeonInput label="Splitter ATC" name="splitter" value={formState.splitter} onChange={handleInputChange} type="text" />
            <NeonTextArea label="Observações" name="observacoes" value={formState.observacoes} onChange={handleInputChange} />
            {actionButtons('ATC')}
          </div>
        );
      case 'REGIONAL_V2':
        return (
          <div className="space-y-4">
            <NeonInput label="Designador" name="designador" value={formState.designador} onChange={handleInputChange} type="text" />
            <NeonInput label="Produto" name="produto" value={formState.produto} onChange={handleInputChange} type="text" />
            <NeonInput label="Velocidade" name="velocidade" value={formState.velocidade} onChange={handleInputChange} type="text" />
            <NeonInput label="Armário" name="armario" value={formState.armario} onChange={handleInputChange} type="text" />
            <NeonTextArea label="Diagnóstico" name="diagnostico" value={formState.diagnostico} onChange={handleInputChange} />
            <NeonTextArea label="Log" name="log" value={formState.log} onChange={handleInputChange} />
            {actionButtons('REGIONAL V2')}
          </div>
        );
      case 'MASSIVA':
        return (
          <div className="space-y-4">
            <NeonInput label="Número da TA" name="numeroTA" value={formState.numeroTA} onChange={handleInputChange} type="text" />
            <NeonTextArea label="Diagnóstico" name="diagnostico" value={formState.diagnostico} onChange={handleInputChange} />
            <NeonTextArea label="Equipamento Afetado" name="equipamentoAfetado" value={formState.equipamentoAfetado} onChange={handleInputChange} />
            {actionButtons('MASSIVA')}
          </div>
        );
      case 'ESSE_CONTROLE':
        return (
          <div className="space-y-4">
            <DefeitoSelect defeitos={['Interrompido', 'Lan Down', 'Degradação/Taxa de Erro', 'Quebra de senha']} />

            <NeonTextArea label="Diagnóstico" name="diagnostico" value={formState.diagnostico} onChange={handleInputChange} />
            <NeonTextArea label="Logs" name="logs" value={formState.logs} onChange={handleInputChange} />
            
            <label className="text-white flex items-center mb-4">
              <input 
                type="checkbox" 
                name="cpeInacessivel" 
                checked={formState.cpeInacessivel} 
                onChange={handleInputChange} 
                className="mr-2 bg-transparent border-neon-purple" /> CPE Inacessível / CPE Cliente
            </label>
            
            <NeonInput label="IP WAN" name="ipWAN" value={formState.ipWAN} onChange={handleInputChange} type="text" />
            <NeonInput label="IP Loopback" name="ipLoopback" value={formState.ipLoopback} onChange={handleInputChange} type="text" />
            <NeonInput label="IP LAN" name="ipLAN" value={formState.ipLAN} onChange={handleInputChange} type="text" />
            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Interface WAN" name="interfaceWAN" value={formState.interfaceWAN} onChange={handleInputChange} type="text" />
              <NeonInput label="Interface LAN" name="interfaceLAN" value={formState.interfaceLAN} onChange={handleInputChange} type="text" />
            </div>
            {actionButtons('ESSE CONTROLE')}
          </div>
        );
      case 'ESSE_FSP':
        return (
          <div className="space-y-4">
            <div className="text-white flex items-center space-x-4 mb-4">
              <label>Acesso:</label>
              <input type="radio" name="acesso" value="TIWS" checked={formState.acesso === 'TIWS'} onChange={handleInputChange} className="mr-2" /> TIWS
              <input type="radio" name="acesso" value="Outras" checked={formState.acesso === 'Outras'} onChange={handleInputChange} className="mr-2" /> Demais Operadoras
            </div>
            <NeonInput label="Operadora" name="operadora" value={formState.operadora} onChange={handleInputChange} type="text" />
            <NeonInput label="Designação do Link" name="designacaoLink" value={formState.designacaoLink} onChange={handleInputChange} type="text" />
            
            <DefeitoSelect defeitos={defeitosESSE} /> {/* USANDO O COMPONENTE DE DEFEITO */}
            
            <NeonInput label="IP Modem VSAT" name="ipModemVSAT" value={formState.ipModemVSAT} onChange={handleInputChange} type="text" />
            <NeonInput label="IP Acelerador" name="ipAcelerador" value={formState.ipAcelerador} onChange={handleInputChange} type="text" />
            <NeonInput label="IP CPE" name="ipCPE" value={formState.ipCPE} onChange={handleInputChange} type="text" />
            <NeonTextArea label="Diagnóstico" name="diagnostico" value={formState.diagnostico} onChange={handleInputChange} />
            <NeonTextArea label="Log" name="log" value={formState.log} onChange={handleInputChange} />
            {actionButtons('ESSE FSP')}
          </div>
        );
      case 'TX':
        return (
          <div className="space-y-4">
            <DefeitoSelect defeitos={['Interrompido', 'Lan Down', 'Degradação/Taxa de Erro', 'Quebra de senha']} />
             <div className="text-white mb-4">
                Enlace de Transporte Analisado?
                <input type="checkbox" name="enlaceFibraSeca" checked={formState.enlaceFibraSeca} onChange={handleInputChange} className="mr-2 ml-4" /> Enlace é Atendido via Fibra Seca
                <input type="radio" name="enlaceAnalizado" value="Sim" checked={formState.enlaceAnalizado === 'Sim'} onChange={handleInputChange} className="ml-4 mr-2" /> Sim
                <input type="radio" name="enlaceAnalizado" value="Não" checked={formState.enlaceAnalizado === 'Não'} onChange={handleInputChange} className="mr-2" /> Não
            </div>
            
            <NeonTextArea label="Diagnóstico" name="diagnostico" value={formState.diagnostico} onChange={handleInputChange} />
            <NeonTextArea label="Logs" name="logs" value={formState.logs} onChange={handleInputChange} />

            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Hostname SWT" name="hostnameSWT" value={formState.hostnameSWT} onChange={handleInputChange} type="text" />
              <NeonInput label="IP SWT" name="ipSWT" value={formState.ipSWT} onChange={handleInputChange} type="text" />
            </div>
             <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Slot/Porta(Uplink)" name="slotPortaUplink" value={formState.slotPortaUplink} onChange={handleInputChange} type="text" />
              <NeonInput label="Slot/Porta(Cliente)" name="slotPortaCliente" value={formState.slotPortaCliente} onChange={handleInputChange} type="text" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Hostname SW" name="hostnameSW" value={formState.hostnameSW} onChange={handleInputChange} type="text" />
              <NeonInput label="IP SW" name="ipSW" value={formState.ipSW} onChange={handleInputChange} type="text" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Slot/Porta SW" name="slotPortaSW" value={formState.slotPortaSW} onChange={handleInputChange} type="text" />
              <NeonInput label="Vlan Gerência" name="vlanGerencia" value={formState.vlanGerencia} onChange={handleInputChange} type="text" />
            </div>
            {actionButtons('TX')}
          </div>
        );
      case 'PARCEIROS':
        return (
          <div className="space-y-4">
            <DefeitoSelect defeitos={defeitosESSE} /> {/* USANDO O COMPONENTE DE DEFEITO */}
            
            <NeonTextArea label="Diagnóstico" name="diagnostico" value={formState.diagnostico} onChange={handleInputChange} />
            <NeonTextArea label="Logs" name="logs" value={formState.logs} onChange={handleInputChange} />

            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Hostname SWT" name="hostnameSWT" value={formState.hostnameSWT} onChange={handleInputChange} type="text" />
              <NeonInput label="IP SWT" name="ipSWT" value={formState.ipSWT} onChange={handleInputChange} type="text" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Slot/Porta(Uplink)" name="slotPortaUplink" value={formState.slotPortaUplink} onChange={handleInputChange} type="text" />
              <NeonInput label="Slot/Porta(Cliente)" name="slotPortaCliente" value={formState.slotPortaCliente} onChange={handleInputChange} type="text" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Hostname SW" name="hostnameSW" value={formState.hostnameSW} onChange={handleInputChange} type="text" />
              <NeonInput label="IP SW" name="ipSW" value={formState.ipSW} onChange={handleInputChange} type="text" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <NeonInput label="Slot/Porta SW" name="slotPortaSW" value={formState.slotPortaSW} onChange={handleInputChange} type="text" />
              <NeonInput label="Vlan Gerência" name="vlanGerencia" value={formState.vlanGerencia} onChange={handleInputChange} type="text" />
            </div>
            {actionButtons('PARCEIROS')}
          </div>
        );
      default:
        return <div className="text-white text-center mt-20">Selecione um Carimbo para continuar.</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Botão Voltar */}
      <div className="flex justify-end mb-8">
        <button onClick={onBack} className={backButtonStyle}>
          Voltar
        </button>
      </div>
      
      {renderFields()}
    </div>
  );
};

export default CarimboForm;
