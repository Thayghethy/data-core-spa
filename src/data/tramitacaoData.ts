export const tramitacaoData = [
    // PRAPS
    { Categoria: 'PRAPS', Falha: 'Porta Praps sem sincronismo', DSP: 'ESSE', FSP: 'ESSE', Destino: 'ESSE' },
    { Categoria: 'PRAPS', Falha: 'Quedas de sincronismo', DSP: 'ESSE', FSP: 'ESSE', Destino: 'ESSE' },
    { Categoria: 'PRAPS', Falha: 'Sem acesso ao modem Praps', DSP: 'ESSE', FSP: 'ESSE', Destino: 'ESSE' },
    { Categoria: 'PRAPS', Falha: 'Erros ou atenuação', DSP: 'Diagnostico', FSP: 'Diagnostico', Destino: 'Diagnostico' },
    { Categoria: 'PRAPS', Falha: 'Sem acesso ao DSLAM (com TA)', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Massiva' },
    { Categoria: 'PRAPS', Falha: 'Sem acesso ao DSLAM e sem TA valida para associação', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'PRAPS', Falha: 'Porta LAN down no modem', DSP: 'ESSE', FSP: 'ESSE', Destino: 'ESSE' },

    // CPE/ONU
    { Categoria: 'CPE/ONU', Falha: 'Porta/Sem sincronismo', DSP: 'ESSE', FSP: 'Regional V2', Destino: 'ESSE' },
    { Categoria: 'CPE/ONU', Falha: 'Quedas de sincronismo', DSP: 'Diagnostico', FSP: 'Diagnostico', Destino: 'Diagnostico' },
    { Categoria: 'CPE/ONU', Falha: 'Sem configuração', DSP: 'ESSE', FSP: 'N/DADOS', Destino: 'ESSE' },
    { Categoria: 'CPE/ONU', Falha: 'Erros ou atenuação', DSP: 'ESSE', FSP: 'ESSE', Destino: 'ESSE' },
    { Categoria: 'CPE/ONU', Falha: 'Porta/LAN/ONT down', DSP: 'ESSE', FSP: 'Regional V2', Destino: 'ESSE' },
    { Categoria: 'CPE/ONU', Falha: 'Sem mac do CPE', DSP: 'ESSE', FSP: 'Regional V2', Destino: 'ESSE' },
    { Categoria: 'CPE/ONU', Falha: 'Porta PON down (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'CPE/ONU', Falha: 'Porta PON down e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'CPE/ONU', Falha: 'Sem acesso ao OLT (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'CPE/ONU', Falha: 'Sem acesso ao OLT e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },

    // SWT
    { Categoria: 'SWT', Falha: 'Interface entre SW/A e SWT em down', DSP: 'TX', FSP: 'Regional V2', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SW/DSL(S), SWT e TRACECELL', DSP: 'TX', FSP: 'Regional/Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SW/DSL(S) e SWT em down', DSP: 'TX', FSP: 'Regional/Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SW/A e SW IP down, porem SWT TRACE', DSP: 'TX', FSP: 'Regional/Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SW/E e SWT em down', DSP: 'TX', FSP: 'Regional/Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SW/A e SW (sem down/txdb)', DSP: 'TX', FSP: 'Regional/Parceiros', Destino: 'TX' },
    { Categoria: 'SWT', Falha: 'Interface entre SW/A e SW (sem down/txdb)', DSP: 'TX', FSP: 'Regional/Parceiros', Destino: 'TX' }, // Duplicado na planilha, mantido para completude
    { Categoria: 'SWT', Falha: 'Interface entre SWT/CPE em down', DSP: 'ESSE', FSP: 'Regional/Integrador', Destino: 'ESSE' },
    { Categoria: 'SWT', Falha: 'Interface entre SWT/CPE cliente em down', DSP: 'ESSE', FSP: 'Regional/Parceiros', Destino: 'ESSE' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SW/DSL(S) (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SW/DSL(S) e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SW/A (com TA)', DSP: 'Massiva', FSP: 'Massiva', Destino: 'Massiva' },
    { Categoria: 'SWT', Falha: 'Sem acesso ao SW/A e sem TA válida', DSP: 'Massiva', FSP: 'Triagem Tens', Destino: 'Massiva' },

    // Milegate
    { Categoria: 'Milegate', Falha: 'Porta Deslam em LOSS', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
    { Categoria: 'Milegate', Falha: 'Sem acesso ao BDO', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
    { Categoria: 'Milegate', Falha: 'Sem configuração', DSP: 'Diagnostico', FSP: 'Diagnostico', Destino: 'Diagnostico' },
    { Categoria: 'Milegate', Falha: 'Sem acesso ao elemento (com TA)', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Massiva' },
    { Categoria: 'Milegate', Falha: 'Sem acesso ao elemento e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'Milegate', Falha: 'Placa em plugada (com TA)', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Massiva' },
    { Categoria: 'Milegate', Falha: 'Placa em plugada e sem TA válida', DSP: 'Pre_massiva', FSP: 'Pre_massiva', Destino: 'Pre_massiva' },
    { Categoria: 'Milegate', Falha: 'Porta Telcado em down', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
    { Categoria: 'Milegate', Falha: 'Porta LAN down', DSP: 'Regional V2', FSP: 'Regional V2', Destino: 'Regional V2' },
];