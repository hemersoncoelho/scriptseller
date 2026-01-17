import { Template } from '@/lib/types';

export const TEMPLATES: Template[] = [
    {
        id: 'storytelling',
        name: 'Storytelling Imobiliário',
        displayName: 'Legenda para Instagram',
        displaySubtitle: 'Para descrever imóveis e gerar interesse',
        description: 'Crie narrativas envolventes para descrever imóveis.',
        iconName: 'BookOpen',
        schema: [
            { key: 'propertyType', label: 'Tipo de Imóvel', type: 'select', options: [{ label: 'Apartamento', value: 'apartment' }, { label: 'Casa', value: 'house' }, { label: 'Cobertura', value: 'penthouse' }, { label: 'Terreno', value: 'land' }] },
            { key: 'location', label: 'Localização/Bairro', type: 'text', placeholder: 'Ex: Leblon, Zona Sul', required: true },
            { key: 'highlight', label: 'Destaque Principal', type: 'text', placeholder: 'Ex: Vista mar, varanda gourmet', required: true },
            { key: 'targetAudience', label: 'Público-alvo', type: 'text', placeholder: 'Ex: Casais jovens, investidores' },
            { key: 'emotions', label: 'Sensações/Emoções', type: 'textarea', placeholder: 'Ex: Conforto, exclusividade, paz...', rows: 2 },
            { key: 'useEmojis', label: 'Usar Emojis?', type: 'boolean', defaultValue: true }
        ]
    },
    {
        id: 'sales-script',
        name: 'Script de Vendas',
        displayName: 'Mensagem para WhatsApp',
        displaySubtitle: 'Abordagem, follow-up e objeções prontas',
        description: 'Roteiros profissionais para WhatsApp ou ligação.',
        iconName: 'MessageSquare',
        schema: [
            { key: 'stage', label: 'Etapa do Funil', type: 'select', options: [{ label: 'Prospecção / 1º Contato', value: 'prospecting' }, { label: 'Follow-up', value: 'followup' }, { label: 'Fechamento', value: 'closing' }] },
            { key: 'channel', label: 'Canal', type: 'select', options: [{ label: 'WhatsApp (Texto)', value: 'whatsapp' }, { label: 'WhatsApp (Áudio)', value: 'whatsapp_audio' }, { label: 'Ligação', value: 'call' }] },
            { key: 'clientName', label: 'Nome do Cliente', type: 'text', placeholder: 'Opcional' },
            { key: 'propertyParams', label: 'Interesse do Cliente', type: 'text', placeholder: 'Ex: Apto 2 quartos até 500k' },
            { key: 'objections', label: 'Objeções Prováveis', type: 'tags', placeholder: 'Ex: Preço alto, Localização' }, // specialized handling needed or simple text
            { key: 'useEmojis', label: 'Usar Emojis?', type: 'boolean', defaultValue: true }
        ]
    },
    {
        id: 'video-script',
        name: 'Roteiro de Vídeo',
        displayName: 'Roteiro para Reels/Shorts',
        displaySubtitle: 'Estrutura passo a passo para vídeos curtos',
        description: 'Scripts engajadores para Reels, Stories ou YouTube.',
        iconName: 'Video',
        schema: [
            { key: 'format', label: 'Formato', type: 'select', options: [{ label: 'Reels/TikTok (30-60s)', value: 'reels' }, { label: 'Stories (15s)', value: 'stories' }, { label: 'YouTube Short', value: 'shorts' }, { label: 'Tour Completo', value: 'tour' }] },
            { key: 'style', label: 'Estilo', type: 'select', options: [{ label: 'POV (Ponto de vista)', value: 'pov' }, { label: 'Apresentador/Narração', value: 'host' }, { label: 'Cinematográfico', value: 'cinematic' }] },
            { key: 'hook', label: 'Gancho (Hook)', type: 'text', placeholder: 'Ex: O metro quadrado mais barato da região...' },
            { key: 'cta', label: 'Chamada para Ação (CTA)', type: 'text', placeholder: 'Ex: Agende sua visita, Link na bio' },
            { key: 'useEmojis', label: 'Usar Emojis?', type: 'boolean', defaultValue: true }
        ]
    },
    {
        id: 'sales-map',
        name: 'Mapa de Venda',
        displayName: 'Plano de Conversa (Vendas)',
        displaySubtitle: 'Estruture a estratégia para um cliente',
        description: 'Organize o perfil e os próximos passos da negociação.',
        iconName: 'Map',
        schema: [
            { key: 'clientProfile', label: 'Perfil do Cliente', type: 'textarea', placeholder: 'Descreva a situação, dores e desejos do cliente', rows: 3 },
            { key: 'currentStage', label: 'Estágio Atual', type: 'text', placeholder: 'Ex: Visitou o decorado' },
            { key: 'desiredNextStep', label: 'Próximo Passo Desejado', type: 'text', placeholder: 'Ex: Enviar proposta' },
            { key: 'obstacles', label: 'Obstáculos', type: 'textarea', placeholder: 'O que impede o fechamento?' },
            { key: 'useEmojis', label: 'Usar Emojis?', type: 'boolean', defaultValue: true }
        ]
    },
    {
        id: 'techniques',
        name: 'Técnicas e Tópicos',
        displayName: 'Gatilhos e Explicações',
        displaySubtitle: 'Explique conceitos e use gatilhos mentais',
        description: 'Simplifique temas complexos ou aplique persuasão.',
        iconName: 'Lightbulb',
        schema: [
            { key: 'topic', label: 'Tópico/Conceito', type: 'text', placeholder: 'Ex: Financiamento, Permuta, Gatilhos Mentais', required: true },
            { key: 'level', label: 'Nível de Profundidade', type: 'select', options: [{ label: 'Iniciante (Explicar básico)', value: 'beginner' }, { label: 'Especialista (Detalhes técnicos)', value: 'expert' }] },
            { key: 'focus', label: 'Foco da Explicação', type: 'select', options: [{ label: 'Simplificação', value: 'simplify' }, { label: 'Persuasão', value: 'persuasion' }, { label: 'Autoridade', value: 'authority' }] },
            { key: 'useEmojis', label: 'Usar Emojis?', type: 'boolean', defaultValue: true }
        ]
    }
];
