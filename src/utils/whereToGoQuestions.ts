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
            {
                label: 'Nenhum destes',
                description: '',
                value: 'next',
                imageUrl: '/pictures/questions/next.png',
            },
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
                imageUrl: '/pictures/questions/febre.png',
            },
            {
                label: 'Vômitos sem parar',
                description: '',
                value: 'upa',
                imageUrl: '/pictures/questions/vomitos.png',
            },
            {
                label: 'Dor forte que não melhora',
                description: '',
                value: 'upa',
                imageUrl: '/pictures/questions/dor.png',
            },
            {
                label: 'Nenhum destes',
                description: '',
                value: 'next',
                imageUrl: '/pictures/questions/next.png',
            },
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
                imageUrl: '/pictures/questions/consulta_rotina.png',
            },
            {
                label: 'Vacina ou exame de rotina',
                description: '',
                value: 'ubs',
                imageUrl: '/pictures/questions/vacinas.png',
            },
            {
                label: 'Sintomas leves como resfriado',
                description: '',
                value: 'ubs',
                imageUrl: '/pictures/questions/resfriado.png',
            },
            {
                label: 'Nenhum destes',
                description: '',
                value: 'next',
                imageUrl: '/pictures/questions/next.png',
            },
        ],
    },
]
