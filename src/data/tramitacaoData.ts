export const tramitacaoData = [
    // PRAPS
    { Categoria: 'PRAPS', Falha: 'Porta Praps sem sincronismo', DSP: 'ESSE', FSP: '-', Destino: 'ESSE' },
    { Categoria: 'PRAPS', Falha: 'Quedas de sincronismo', DSP: 'ESSE', FSP: '-', Destino: 'ESSE' },
    { Categoria: 'PRAPS', Falha: 'Sem acesso ao modem Praps', DSP: 'ESSE', FSP: '-', Destino: 'ESSE' },
    { Categoria: 'PRAPS', Falha: 'Erros ou atenuação', DSP: 'Diagnostico', FSP: '-', Destino: 'Diagnostico' },
    { Categoria: 'PRAPS', Falha: 'Sem acesso ao DSLAM (com TA)', DSP: 'Pre_massiva', FSP: '-', Destino: 'Massiva' },
    { Categoria: 'PRAPS', Falha: 'Sem acesso ao DSLAM e sem TA valida para associação', DSP: 'Pre_massiva', FSP: '-', Destino: 'Pre_massiva' },
    { Categoria: 'PRAPS', Falha: 'Porta LAN down no modem', DSP: 'ESSE', FSP: '-', Destino: '-' },

    // CPE/ONU
    { Categoria: 'GPON', Falha: 'Porta/Sem sincronismo', DSP: 'ESSE', FSP: 'Regional V2', Destino: 'ESSE' },
    { Categoria: 'GPON', Falha: 'Quedas de sincronismo', DSP: 'Diagnostico', FSP: 'Diagnostico', Destino: 'Diagnostico' },
    { Categoria: 'GPON', Falha: 'Sem configuração', DSP: 'ESSE', FSP: 'N/DADOS', Destino: 'ESSE' },
    { Categoria: 'GPON', Falha: 'Erros ou atenuação', DSP: 'ESSE', FSP: 'ESSE', Destino: 'ESSE' },
    { Categoria: 'GPON', Falha: 'Porta/LAN/ONT down', DSP: 'ESSE', FSP: 'Regional V2', Destino: 'ESSE' },
    { Categoria: 'GPON', Falha: 'Sem mac do CPE', DSP: 'ESSE', FSP: 'Regional V2', Destino: 'ESSE' },
    { Categoria: 'GPON', Falha: 'Porta PON down (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'GPON', Falha: 'Porta PON down e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'GPON', Falha: 'Sem acesso ao OLT (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'GPON', Falha: 'Sem acesso ao OLT e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },

    // SWT
    { Categoria: 'SWT', Falha: 'Interface entre SWA x SWT em down', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SWA x SWT em Up, porém SWT Inacessível', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SWD/SWS x SWT em down', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SWD/SWS x SWT em UP, porém SWT Inacessível', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SHE x SSE em down', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SWA x SHE em DOWN (radio)', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SWA x SHE em down (SDH - DWDM)', DSP: 'N2 TX', FSP: 'N2 TX', Destino: 'TX' }, // Duplicado na planilha, mantido para completude
    { Categoria: 'SWT', Falha: 'Interface entre SWT x CPE Vivo em down', DSP: 'ESSE', FSP: 'Regional Integrador', Destino: 'ESSE' },
    { Categoria: 'SWT', Falha: 'Interface entre SWTx CPE cliente em down', DSP: 'TX', FSP: 'Regionais Parceiros', Destino: 'ESSE' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SWD/SWS (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SWD/SWS e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SWA (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SWA e sem TA válida', DSP: 'Massiva', FSP: 'Triagem Tems', Destino: 'Massiva' },

    // Milegate
    { Categoria: 'Milegate', Falha: 'Porta Deslam em LOSS', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
    { Categoria: 'Milegate', Falha: 'Sem acesso ao EDD', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
    { Categoria: 'Milegate', Falha: 'Sem configuração', DSP: 'Diagnostico', FSP: 'Diagnostico', Destino: 'Diagnostico' },
    { Categoria: 'Milegate', Falha: 'Sem acesso ao elemento (com TA)', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Massiva' },
    { Categoria: 'Milegate', Falha: 'Sem acesso ao elemento e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'Milegate', Falha: 'Placa em plugged (com TA)', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Massiva' },
    { Categoria: 'Milegate', Falha: 'Placa em plugged e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'Milegate', Falha: 'Porta Tellabs em down', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
    { Categoria: 'Milegate', Falha: 'Lan EDD down', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
];
