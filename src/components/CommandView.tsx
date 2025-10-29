import React from 'react';

interface CommandViewProps {
  commandType: string; // O tipo de comandos a ser renderizado (ex: 'BACKBONE' ou 'TUNEL' ou 'GPON' ou 'SEARCH_ALL')
  searchTerm: string; // O termo digitado originalmente (ex: 'HL3', 'OLT', ou 'CISCO')
  onClose: () => void;
}

// ----------------------------------------------------
// DADOS FIXOS: TIPOS E ESTRUTURAS
// ----------------------------------------------------
interface CommandItem {
  command: string;
  description: string;
  commandOnly: string; 
}

interface VendorCommands {
  [key: string]: CommandItem[];
}

// ----------------------------------------------------
// DADOS FIXOS: Comandos do BACKBONE 
// ----------------------------------------------------
const BACKBONE_COMMANDS: VendorCommands = {
  CISCO: [
    { command: "show int desc | include ID VANTIVE / Designador V2", description: "Localizar Interface pelo ID VANTIVE (CISCO / CISCO XR)", commandOnly: "show int desc | include " },
    { command: "show ipv4 vrf all interface brief | include IP WAN", description: "Localizar Interface pelo IP (CISCO)", commandOnly: "show ipv4 vrf all interface brief | include " },
    { command: "show interface | include IP WAN", description: "Localizar Interface pelo IP (CISCO)", commandOnly: "show interface | include " },
    { command: "show running-config interface INTERFACE", description: "Abrir a interface do cliente (CISCO/CISCO XR)", commandOnly: "show running-config interface" },
    { command: "ping IP WAN +1 size 500 repeat 500", description: "Ping IP Dedicado (CISCO/CISCO XR)", commandOnly: "ping  size 500 repeat 500" },
    { command: "ping vrf NOME DA VRF IP WAN +1", description: "Ping VPN (CISCO/CISCO XR)", commandOnly: "ping vrf " },
    { command: "ping vrf NOME DA VRF IP WAN +1 size 500 repeat 500", description: "Ping VPN Estendido (CISCO/CISCO XR) - Quando o ping comum responder OK", commandOnly: "ping vrf  size 500 repeat 500" },
    { command: "show l2vpn xcon | include VLAN DE REDE", description: "Verificar o proximo equipamento (Quando for RSD)", commandOnly: "show l2vpn xcon | include " },
    { command: "show ip route IP WAN", description: "Verificar Rota do circuito (Quando a interface não estiver em UP no RA)", commandOnly: "show ip route " },
    { command: "show ip route VRF NOME DA VRF IP WAN", description: "Verificar Rota do circuito VRF (Quando a interface não estiver em UP no RA)", commandOnly: "show ip route " },
  ],
  HUAWEI: [
    { command: "display interface desc | include ID VANTIVE / Designador V2", description: "Localizar Interface pelo ID VANTIVE / Designador", commandOnly: "display interface desc | include " },
    { command: "display ip interface brief | include IP WAN", description: "Localizar Interface pelo IP", commandOnly: "display ip interface brief | include " },
    { command: "display current interface INTERFACE", description: "Descrição", commandOnly: "display current interface" },
    { command: "ping IP WAN +1", description: "Ping IP Dedicado", commandOnly: "ping " },
    { command: "ping -m 1 -q c-500 -s 500 IP WAN +1", description: "Ping IP Dedicado Estendido - Quando o ping comum responder OK", commandOnly: "ping -m 1 -q c-500 -s 500 " },
    { command: "display current interface INTERFACE SEM VLANS", description: "Verificar o proximo equipamento", commandOnly: "display current interface " },
    { command: "display ip routing IP WAN", description: "Verificar Rota do circuito (Quando a interface não estiver em UP no RA)", commandOnly: "display ip routing " },
  ],
  ALCATEL: [
    { command: "admin display-config | match ID VANTIVE / Designador V2 context all", description: "Localizar Interface pelo ID VANTIVE / Designador", commandOnly: "admin display-config | match context all" },
    { command: "ping IP WAN +1", description: "Ping IP Dedicado", commandOnly: "ping IP WAN +1" },
    { command: "ping IP WAN +1 size 500 count 500 rapid", description: "Ping IP Dedicado Estendido - Quando o ping comum responder OK", commandOnly: "ping size 500 count 500 rapid" },
    { command: "show port INTERFACE SEM VLANS", description: "Verificar o proximo equipamento (EX: 1/2/3)", commandOnly: "show port " },
    { command: "show lag INTERFACE SEM VLANS description", description: "Verificar o proximo equipamento (EX: lag-43)", commandOnly: "show lag description" },
  ],
  'JUNIPER / JUNOS': [
    { command: "show interfaces terse | match IP WAN", description: "Localizar Interface pelo IP", commandOnly: "show interfaces terse | match " },
    { command: "show interfaces descriptions | match ID VANTIVE", description: "Localizar Interface pelo Vantive", commandOnly: "show interfaces descriptions | match " },
    { command: "show configuration | display set | match IP CPE", description: "Localizar a VRF (Caso seja VPN no Star)", commandOnly: "show configuration | display set | match " },
    { command: "show configuration interfaces INTERFACE", description: "Abrir interface do cliente", commandOnly: "show configuration interfaces " },
    { command: "ping IP WAN +1 rapid", description: "Ping IP Dedicado", commandOnly: "ping rapid" },
    { command: "ping IP WAN +1 count 500 size 500 rapid", description: "Ping IP Dedicado Estendido - Quando o ping comum responder OK", commandOnly: "ping count 500 size 500 rapid" },
    { command: "ping routing-instance Nome da VRF IP WAN +1 rapid", description: "Ping VPN", commandOnly: "ping routing-instance rapid" },
    { command: "ping routing-instance Nome da VRF IP WAN +1 count 500 size 500 rapid", description: "Ping VPN Estendido - Quando o ping comum responder OK", commandOnly: "ping routing-instance count 500 size 500 rapid" },
    { command: "show configuration interfaces INTERFACE SEM VLANS", description: "Verificar o proximo equipamento", commandOnly: "show configuration interfaces " },
  ],
};

// ----------------------------------------------------
// DADOS FIXOS: Comandos de TUNEL/HLx/SWx/GWC
// ----------------------------------------------------

// Comandos válidos para HL3, SWC, GWC
const HL3_COMMANDS: VendorCommands = {
    ALCATEL: [
        { command: "show service sap-using | match VLAN DE REDE", description: "Localizar o Service ID", commandOnly: "show service sap-using | match" },
        { command: "show service id SERVICE ID base", description: "Verificar o proximo equipamento", commandOnly: "show service id base" },
    ],
    HUAWEI: [
        { command: "display mpls l2vc | include VLAN DE REDE", description: "Localizar a interface", commandOnly: "display mpls l2vc | include" },
        { command: "display current interface INTERFACE", description: "Verificar o proximo equipamento", commandOnly: "display current interface" },
    ],
    CISCO: [
        { command: "show l2vpn xcon | include VLAN DE REDE", description: "Localizar a interface (Cisco XR)", commandOnly: "show l2vpn xcon | include" },
        { command: "show mpls l2transport vc | include VLAN DE REDE", description: "Localizar a interface (Cisco)", commandOnly: "show mpls l2transport vc | include" },
    ],
    CORIANT: [
        { command: "ENABLE", description: "Sempre utilizar esse comando ao iniciar a gerencia", commandOnly: "ENABLE" },
        { command: "sh ip int br | I VLAN DE REDE", description: "Localizar a interface", commandOnly: "sh ip int br | i" },
        { command: "show pwe3 circuit CIRCUITO", description: "Verificar Status do circuito / Proximo equipamento", commandOnly: "show pwe3 circuit" },
    ],
};

// Comandos válidos para HL4, SWD, SWS, GWS, HL5
const HL4_COMMANDS: VendorCommands = {
    ALCATEL: [
        { command: "show service sap-using | match VLAN DE REDE", description: "Localizar o Service ID", commandOnly: "show service sap-using | match" },
        { command: "show service id SERVICE ID base", description: "Verificar o proximo equipamento", commandOnly: "show service id base" },
        { command: "show LAG 10 description / detail", description: "Verificar o proximo equipamento com LAG", commandOnly: "show LAG 10 description / detail" },
        { command: "show port POSIÇÃO", description: "Verificar o proximo equipamento com Port", commandOnly: "show port" },
    ],
    HUAWEI: [
        { command: "display mpls l2vc | include VLAN DE REDE", description: "Localizar a interface", commandOnly: "display mpls l2vc | include" },
        { command: "display current interface INTERFACE SEM VLANS", description: "Verificar o proximo equipamento", commandOnly: "display current interface " },
    ],
    CISCO: [
        { command: "show l2vpn xcon | include VLAN DE REDE", description: "Localizar a interface (Cisco XR)", commandOnly: "show l2vpn xcon | include" },
        { command: "show mpls l2transport vc | include VLAN DE REDE", description: "Localizar a interface (Cisco)", commandOnly: "show mpls l2transport vc | include" },
        { command: "show running-config interface INTERFACE SEM VLANS", description: "Verificar o proximo equipamento", commandOnly: "show running-config interface " },
    ],
    CORIANT: [
        { command: "ENABLE", description: "Sempre utilizar esse comando ao iniciar a gerencia", commandOnly: "ENABLE" },
        { command: "sh ip int br | I VLAN DE REDE", description: "Localizar a interface", commandOnly: "sh ip int br | i" },
        { command: "show pwe3 circuit CIRCUITO", description: "Verificar Status do circuito / Proximo equipamento", commandOnly: "show pwe3 circuit" },
    ],
};

// ----------------------------------------------------
// DADOS FIXOS: Comandos de GPON / OLT
// ----------------------------------------------------
const GPON_COMMANDS: VendorCommands = {
    ALCATEL: [
        { command: "show vlan cross-connect stacked:VLANS DE REDE :USUARIO", description: "Localizar a posição pelas VLANS", commandOnly: "show vlan cross-connect stacked:" },
        { command: "show equipment ont operational-data POSIÇÃO GPON (Ex: 1/1/2/6/56)", description: "Verificar LOSS/ Dying GAST", commandOnly: "show equipment ont operational-data" },
        { command: "show interface port pon:POSIÇÃO GPON (Ex: 1/1/2/6)", description: "Verificar se porta pon está em down (Caso de Massiva)", commandOnly: "show interface port pon" },
        { command: "show vlan bridge-port-fdb POSIÇÃO GPON (Ex: 1/1/2/6/56/1/1)", description: "Verificar se porta apreende MAC", commandOnly: "show vlan bridge-port-fdb" },
        { command: "show equipment ont optics POSIÇÃO GPON detail", description: "Verificar atenuação", commandOnly: "show equipment ont optics detail" },
        { command: "show interface port uni:POSIÇÃO GPON (Ex: 1/1/2/6/56) detail", description: "Verificar última queda", commandOnly: "show interface port uni: detail" },
    ],
    HUAWEI: [
        { command: "ENABLE + CONFIG", description: "Sempre utilizar esses comandos ao iniciar a gerencia", commandOnly: "ENABLE + CONFIG" },
        { command: "display ont info by-password SLID V1", description: "Localizar posição pelo SLID", commandOnly: "display ont info by-password " },
        { command: "display ont info by-desc DESIGNADOR V2", description: "Localizar posição pelo DESIGNADOR v2", commandOnly: "display ont info by-desc " },
        { command: "display ont info POSIÇÃO GPON (Ex: 0 1 2 3)", description: "Verificar LOSS/ Dying Gasp", commandOnly: "display ont info" },
        { command: "interface gpon 0/SLOT", description: "Acessar para comandos específicos", commandOnly: "interface gpon " },
        { command: "display port state PORTA", description: "Verificar se porta Pon está Online / Verificar massiva", commandOnly: "display port state" },
        { command: "display ont optical-info PORTA + PORTA LOGICA", description: "Verificar atenuação", commandOnly: "display ont optical-info" },
        { command: "display ont register-info PORTA + PORTA LOGICA", description: "Verificar quedas", commandOnly: "display ont register-info" },
        { command: "display ont port state PORTA + PORTA LOGICA eth-port all", description: "Verificar conexão entre OLT e CPE", commandOnly: "display ont port state eth-port all" },
        { command: "display mac-address port 0/SLOT/PORTA ont PORTA LOGICA", description: "Verificar se porta apreende MAC", commandOnly: "display mac-address port  ont" },
        { command: "display service-port vlan 1866 inner-vlan 146", description: "Verificar service-port vlan 1866 inner-vlan 146", commandOnly: "display service-port vlan  inner-vlan " },
    ],
    'ALCATEL ANTIGA (Telnet)': [
        { command: "telnet OLT 1023", description: "Forma correta de acessar", commandOnly: "telnet OLT 1023" },
        { command: "Login:oper_co", description: "Login", commandOnly: "oper_co" },
        { command: "Senha: Co#0p3r", description: "Senha", commandOnly: "Co#0p3r" },
        { command: "RTRV-ONT::ONT-1-1-SLOT-PORTA-PORTA LOGICA::", description: "Verificar LOSS", commandOnly: "RTRV-ONT::ONT-1-1-SLOT-PORTA-PORTA LOGICA::" },
        { command: "rept-OPSTAT-OPTICS::SLOT-PORTA-PORTA LOGICA::", description: "Verificar Atenuação", commandOnly: "rept-OPSTAT-OPTICS::SLOT-PORTA-PORTA LOGICA::" },
    ],
};

// ----------------------------------------------------
// DADOS FIXOS: Comandos de SWA (Baseado em image_e36fcd.png)
// ----------------------------------------------------
const SWA_COMMANDS: VendorCommands = {
    DataCom: [
        { command: "show vlan-translate table source-vlan VLAN DE USUARIO", description: "Localizar a interface", commandOnly: "show vlan-translate table source-vlan" },
        { command: "show int status INTERFACE", description: "Verificar Status da interface", commandOnly: "show int status" },
        { command: "show log ram tail", description: "Verificar Quedas Recentes / Verificar logs do Equipamento", commandOnly: "show log ram tail" },
        { command: "show hardware-status transceivers (detail INTERFACE)", description: "Verificar Atenuação. OBS: só usar o Detail, quando comando comum não funcionar", commandOnly: "show hardware-status transceivers" },
    ],
    DmOS: [
        { command: "show running-config vlan-mapping | context-match VLAN DE USUARIO", description: "Localizar a interface", commandOnly: "show running-config vlan-mapping | context-match" },
        { command: "show int INTERFACE", description: "Verificar Status da interface", commandOnly: "show int" },
        { command: "show interface transceivers digital-d rx-power-thresholds | i INTERFACE", description: "Verificar Atenuação", commandOnly: "show interface transceivers digital-d rx-power-thresholds | i" },
    ],
    Coriant: [
        { command: "ENABLE", description: "Sempre utilizar esse comando ao iniciar a gerencia", commandOnly: "ENABLE" },
        { command: "sh ip int br | i VLAN DE USUARIO", description: "Localizar a interface", commandOnly: "sh ip int br | i" },
        { command: "show pwe3 circuit CIRCUITO", description: "Verificar Status do circuito", commandOnly: "show pwe3 circuit" },
        // Linha 169 (Corrigida com aspas simples)
        { command: 'show hw-inventory slot SLOT details | block "SFP connector PORTA" | include power', description: "Verificar Atenuação", commandOnly: 'show hw-inventory slot SLOT details | block "" | include power' },
        // Linha 170 (Corrigida com aspas simples)
        { command: "show run | block INTERFACE SEM VLAN | i desc", description: "Verificar proximo equipamento", commandOnly: "show run | block INTERFACE SEM VLAN | i desc" },
    ],
};

// ----------------------------------------------------
// DADOS FIXOS: Comandos de SWT (Baseado em image_e36f56.png)
// ----------------------------------------------------
const SWT_COMMANDS: VendorCommands = {
    Datacom: [
        { command: "show vlan id VLAN DE USUARIO", description: "Localizar a interface", commandOnly: "show vlan id" },
        { command: "show int status INTERFACE", description: "Verificar Status da interface", commandOnly: "show int status" },
        { command: "show hardware-status transceivers", description: "Verificar atenuação", commandOnly: "show hardware-status transceivers" },
        { command: "show int table utilization bandwidth", description: "Verificar a utilização da Interface", commandOnly: "show int table utilization bandwidth" },
        { command: "show log ram tail", description: "Verificar quedas Recentes / Verificar logs do Equipamento", commandOnly: "show log ram tail" },
        { command: "show mac-address-table vlan VLAN DE USUARIO", description: "Verificar se SWT apreende MAC das duas interfaces", commandOnly: "show mac-address-table vlan" },
    ],
    DmOS: [
        { command: "running-config vlan-mapping | context-match VLAN DE USUARIO", description: "Localizar a interface", commandOnly: "running-config vlan-mapping | context-match" },
        { command: "show vlan membership | include VLAN DE USUARIO", description: "Localizar a interface com Vlan de Rede", commandOnly: "show vlan membership | include" },
        { command: "show int INTERFACE", description: "Verificar Status da interface", commandOnly: "show int" },
        { command: "show interface utilization INTERFACE", description: "Verificar a utilização da Interface", commandOnly: "show interface utilization" },
        { command: "interface transceivers digital-d rx-power-thresholds | i INTERFACE", description: "Verificar atenuação", commandOnly: "interface transceivers digital-d rx-power-thresholds | i" },
    ],
};

// ----------------------------------------------------
// DADOS FIXOS: Comandos de DSLAM (Baseado em image_e36c8a.png)
// ----------------------------------------------------
const DSLAM_COMMANDS: VendorCommands = {
    'PRAPS - Huawei': [
        { command: "Usuario Padrão - sigres", description: "Senha padrão - sergis1", commandOnly: "sigres" },
        { command: "ENABLE + CONFIG", description: "Sempre utilizar esses comandos ao iniciar a gerencia", commandOnly: "ENABLE + CONFIG" },
        { command: "display service-port all | include VLAN DE USUARIO", description: "Verificar Interfaces", commandOnly: "display service-port all | include" },
        { command: "display interface shdsl INTERFACE", description: "Abrir Interface", commandOnly: "display interface shdsl" },
        { command: "interface shl O/SLOT", description: "Acessar para comandos especificos", commandOnly: "interface shl " },
        { command: "display statistics performance PORTA current", description: "Verificar atenuação", commandOnly: "display statistics performance current" },
    ],
    'MODEM PRAPS - Huawei': [
        { command: "show interface ethernet 1", description: "Verificar Interfaces", commandOnly: "show interface ethernet 1" },
        { command: "show mac-address-table interface g.shdsl 1", description: "Verificar se apreende MAC", commandOnly: "show mac-address-table interface g.shdsl 1" },
    ],
    'MSAN - Alcatel': [
        { command: "show vlan cross-connect stacked:VLANS DE REDE :USUARIO", description: "Localizar a posição pelas VLANS", commandOnly: "show vlan cross-connect stacked:" },
        { command: "show interface port vlan-port::INTERFACE", description: "Abrir Interface", commandOnly: "show interface port vlan-port::" },
    ],
    'MSAN - Huawei': [
        { command: "display vlan VLAN DE REDE", description: "Localizar Interface", commandOnly: "display vlan" },
        { command: "interface shl INTERFACE", description: "Abrir Interface", commandOnly: "interface shl" },
        { command: "interface shl O/SLOT", description: "Acessar para comandos especificos", commandOnly: "interface shl " },
        { command: "display port state PORTA", description: "Verificar porta PON", commandOnly: "display port state" },
    ],
    'Keymile (DSLAM V2)': [
        { command: "get unit-SLOT/port-PORTA/main/labels", description: "Localizar Interface", commandOnly: "get unit-SLOT/port-PORTA/main/labels" },
        { command: "get unit-SLOT/port-PORTA/fm/alarmstatus", description: "Verificar Alarmes de LOSS", commandOnly: "get unit-SLOT/port-PORTA/fm/alarmstatus" },
        { command: "get /unit-SLOT/port-PORTA/status/DDMstatus", description: "Verificar atenuação", commandOnly: "get /unit-SLOT/port-PORTA/status/DDMstatus" },
        { command: "get /unit-SLOT/port-PORTA/status/MacForwardingList", description: "Verificar se apreende MAC", commandOnly: "get /unit-SLOT/port-PORTA/status/MacForwardingList" },
    ],
    'Tellabs (DSLAM V2)': [
        { command: "show vlan id VLAN DE USUARIO", description: "Localizar Interface", commandOnly: "show vlan id" },
        { command: "show interface INTERFACE", description: "Abrir Interface", commandOnly: "show interface" },
        { command: "show interface transceiver", description: "Verificar atenuação", commandOnly: "show interface transceiver" },
        { command: "show mac-add dynamic vlan VLAN DE USUARIO", description: "Verificar se apreende MAC", commandOnly: "show mac-add dynamic vlan" },
    ],
};

// ----------------------------------------------------
// DADOS FIXOS: Comandos de CPE (Baseado em image_e3069a.png)
// ----------------------------------------------------
const CPE_COMMANDS: VendorCommands = {
    Cisco: [
        { command: "sh ip int brief", description: "Verificar Interfaces", commandOnly: "sh ip int brief" },
        { command: "show interface desc", description: "Verificar a descrições das Interfaces", commandOnly: "show interface desc" },
        { command: "show arp", description: "Verificar Equipamentos conectados", commandOnly: "show arp" },
        { command: "show clock", description: "Verificar horario", commandOnly: "show clock" },
        { command: "show log", description: "Verificar quedas", commandOnly: "show log" },
    ],
    Huawei: [
        { command: "display ip int brief", description: "Verificar Interfaces", commandOnly: "display ip int brief" },
        { command: "display interface desc", description: "Verificar a descrições das Interfaces", commandOnly: "display interface desc" },
        { command: "display arp", description: "Verificar Equipamentos conectados", commandOnly: "display arp" },
        { command: "display clock", description: "Verificar horario", commandOnly: "display clock" },
        { command: "display log", description: "Verificar quedas", commandOnly: "display log" },
        { command: "ping -m 1 -q -a 10.128.30.1 -c 10 201.61.253.90", description: "ping", commandOnly: "ping -m 1 -q -a  -c " },
    ],
    Fortinet: [
        { command: "get system interface physical", description: "Verificar Interfaces", commandOnly: "get system interface physical" },
        { command: "get system arp", description: "Verificar Equipamentos conectados", commandOnly: "get system arp" },
        { command: "execute ping 8.8.8.8", description: "Teste de ping no Google (IP Dedicado)", commandOnly: "execute ping 8.8.8.8" },
    ],
    Datacom: [
        { command: "show interface", description: "Verificar Interfaces", commandOnly: "show interface" },
        { command: "show arp", description: "Verificar Equipamentos conectados", commandOnly: "show arp" },
        { command: "show sys clock", description: "Verificar horario", commandOnly: "show sys clock" },
    ],
};

// ----------------------------------------------------
// NOVO: OBJETO UNIFICADO PARA PESQUISA GERAL
// ----------------------------------------------------
const ALL_COMMANDS_DATA: { [key: string]: VendorCommands } = {
    BACKBONE: BACKBONE_COMMANDS,
    HL3_GROUP: HL3_COMMANDS,
    HL4_GROUP: HL4_COMMANDS,
    GPON: GPON_COMMANDS,
    SWA: SWA_COMMANDS,
    SWT: SWT_COMMANDS,
    DSLAM: DSLAM_COMMANDS,
    CPE: CPE_COMMANDS,
};


// ----------------------------------------------------
// LÓGICA DO COMPONENTE COMMAND VIEW
// ----------------------------------------------------
const CommandView: React.FC<CommandViewProps> = ({ commandType, searchTerm, onClose }) => {
  
  const neonColor = 'text-neon-purple';
  const bgColor = '#1a0033';

  // Copia o comando (apenas o texto limpo) para o clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.trim());
      alert(`Comando copiado: ${text}`); 
    } catch (err) {
      console.error('Erro ao copiar: ', err);
    }
  };

  const renderCommandGroup = (commands: VendorCommands) => (
    <div className="space-y-6">
      {Object.entries(commands).map(([vendor, items]) => (
        <div key={vendor} className="rounded-lg p-4" style={{ backgroundColor: '#2a004c' }}>
          <h3 className={`text-xl font-bold mb-4 border-b border-neon-purple/50 pb-2 ${neonColor}`}>
            {vendor}
          </h3>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-[#1f003e] p-3 rounded-md shadow-lg">
                {/* Comando + Descrição */}
                <div className="flex-grow text-left">
                  {/* Usa a propriedade 'command' (com dicas) para visualização */}
                  <code className="text-white text-sm font-mono whitespace-pre-wrap mr-4">{item.command}</code>
                  <p className="text-gray-400 text-xs mt-1 italic">{item.description}</p>
                </div>
                
                {/* Botão de Copiar */}
                <button
                  // Usa a propriedade 'commandOnly' (limpo) para copiar
                  onClick={() => copyToClipboard(item.commandOnly)}
                  className="ml-4 bg-[#7E30E1] text-white py-1 px-3 rounded-md text-xs font-semibold uppercase hover:bg-[#9B50E6] transition duration-200 flex-shrink-0"
                >
                  Copiar
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
  
  // NOVO: Função para pesquisa em todos os comandos
  const filterCommands = (term: string) => {
    const lowerCaseTerm = term.toLowerCase();
    const results: { [key: string]: VendorCommands } = {};
    
    // Itera sobre todos os grupos de comandos (BACKBONE, GPON, etc.)
    for (const [groupName, vendors] of Object.entries(ALL_COMMANDS_DATA)) {
      const filteredVendors: VendorCommands = {};

      // Itera sobre os fabricantes dentro de cada grupo (CISCO, ALCATEL, etc.)
      for (const [vendorName, commands] of Object.entries(vendors)) {
        
        // Verifica se o NOME DO FABRICANTE corresponde ao termo
        const vendorMatch = vendorName.toLowerCase().includes(lowerCaseTerm);
        
        // Filtra os comandos do fabricante por comando ou descrição
        const filteredCommands = commands.filter(item =>
          item.command.toLowerCase().includes(lowerCaseTerm) || 
          item.description.toLowerCase().includes(lowerCaseTerm)
        );

        // Se houver comandos filtrados OU se o nome do fabricante der match, inclui o fabricante no resultado
        if (filteredCommands.length > 0 || vendorMatch) {
          
          if(vendorMatch && filteredCommands.length === 0) {
              // Se for match de vendor, e não houver filtro por comando/desc, mostra todos os comandos do vendor.
              filteredVendors[vendorName] = commands;
          } else {
              // Se a busca for por comando/descrição, usa o subconjunto filtrado,
              // OU se houver match no vendor E no comando/desc, usa o subconjunto filtrado.
              filteredVendors[vendorName] = filteredCommands.length > 0 ? filteredCommands : commands;
          }
        }
      }

      if (Object.keys(filteredVendors).length > 0) {
        // Usa o nome do grupo formatado (Ex: HL3_GROUP -> HL3 / HL4)
        const displayGroupName = groupName.replace('_GROUP', '').toUpperCase();
        results[displayGroupName] = filteredVendors;
      }
    }
    return results;
  };

  const renderContent = () => {
    if (commandType === 'BACKBONE') {
      return renderCommandGroup(BACKBONE_COMMANDS);
    }

    if (commandType === 'TUNEL') {
        const isHL3Group = ['HL3', 'SWC', 'GWC'].includes(searchTerm);
        
        // Define o título específico para o grupo
        const titleGroup = isHL3Group ? 'HL3 / SWC / GWC' : 'HL4 / SWD / SWS / GWS / HL5';
        
        return (
            <div className="space-y-6">
                <h2 className={`text-2xl font-bold ${neonColor} border-b border-neon-purple/50 pb-2 mb-4`}>
                    Comandos de {titleGroup}
                </h2>
                {renderCommandGroup(isHL3Group ? HL3_COMMANDS : HL4_COMMANDS)}
            </div>
        );
    }
    
    if (commandType === 'GPON') {
        return renderCommandGroup(GPON_COMMANDS);
    }

    if (commandType === 'SWA') {
        return renderCommandGroup(SWA_COMMANDS);
    }

    if (commandType === 'SWT') {
        return renderCommandGroup(SWT_COMMANDS);
    }

    if (commandType === 'DSLAM') {
        return renderCommandGroup(DSLAM_COMMANDS);
    }

    if (commandType === 'CPE') {
        return renderCommandGroup(CPE_COMMANDS);
    }
    
    // NOVO: Renderização de Pesquisa Geral (Fabricante ou Palavra-chave)
    if (commandType === 'SEARCH_ALL') {
        const filteredResults = filterCommands(searchTerm);
        const hasResults = Object.keys(filteredResults).length > 0;
        
        if (!hasResults) {
            return (
                <div className="text-center py-10 text-white opacity-70">
                    Nenhum comando ou fabricante encontrado para "{searchTerm}".
                </div>
            );
        }
        
        return (
            <div className="space-y-8">
                <h2 className={`text-2xl font-bold ${neonColor} border-b border-neon-purple/50 pb-2`}>
                    Resultados para: "{searchTerm}"
                </h2>
                {Object.entries(filteredResults).map(([groupName, vendors]) => (
                    <div key={groupName}>
                        <h3 className={`text-xl font-bold text-gray-400 mb-4 pt-4`}>
                            {/* Nome do grupo que contém o resultado (Ex: BACKBONE, GPON) */}
                            {groupName}
                        </h3>
                        {renderCommandGroup(vendors)}
                    </div>
                ))}
            </div>
        );
    }


    // Mensagem padrão para comandos não mapeados
    return (
      <div className="text-center py-10 text-white opacity-70">
        Comandos para "{searchTerm}" ainda não implementados.
      </div>
    );
  };

  return (
    <div 
      className="max-w-7xl mx-auto rounded-xl p-6 shadow-2xl overflow-y-auto"
      style={{ backgroundColor: bgColor, maxHeight: '80vh', border: '1px solid rgba(187,134,252,0.6)' }}
    >
      <div className="flex justify-between items-center mb-6 border-b border-neon-purple/50 pb-4">
        <h2 className={`text-2xl font-bold ${neonColor}`}>
          Comandos de {searchTerm}
        </h2>
        <button 
          onClick={onClose} 
          className="text-white hover:text-red-400 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default CommandView;
