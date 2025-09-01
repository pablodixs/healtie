export interface OptionQuestion {
    label: string
    description: string
    imageUrl?: string
    value: string
}

export interface Question {
    id: number
    question: string
    options: OptionQuestion[]
}

export const whereToGoQuestions: Question[] = [
    {
        id: 1,
        question: 'Você está com algum destes sintomas?',
        options: [
            {
                label: 'Falta de ar forte',
                description: 'Teste',
                value: 'hospital',
                imageUrl: '/pictures/questions/falta_de_ar.png',
            },
            {
                label: 'Dor no peito ou desmaio',
                description: '',
                value: 'hospital',
                imageUrl: '/pictures/questions/dor_no_peito.png',
            },
            {
                label: 'Sangramento que não para',
                description: '',
                value: 'hospital',
                imageUrl: '/pictures/questions/sangramento.png',
            },
            { label: 'Nenhum destes', description: '', value: 'next' },
        ],
    },
    {
        id: 2,
        question: 'Algum destes sintomas está acontecendo com você?',
        options: [
            {
                label: 'Febre alta que não baixa',
                description: '',
                value: 'upa',
            },
            { label: 'Vômitos sem parar', description: '', value: 'upa' },
            {
                label: 'Dor forte que não melhora',
                description: '',
                value: 'upa',
            },
            { label: 'Nenhum destes', description: '', value: 'next' },
        ],
    },
    {
        id: 3,
        question: 'Você precisa de algum desses serviços?',
        options: [
            {
                label: 'Consulta de rotina ou receita médica',
                description: '',
                value: 'ubs',
            },
            {
                label: 'Vacina ou exame de rotina',
                description: '',
                value: 'ubs',
            },
            {
                label: 'Sintomas leves como resfriado',
                description: '',
                value: 'ubs',
            },
            { label: 'Nenhum destes', description: '', value: 'next' },
        ],
    },
]
