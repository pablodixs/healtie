import axios from 'axios'

const api = axios.create({
    timeout: 10000,
})

export const fetcher = async (url: string) => {
    try {
        const response = await api.get(url)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.code === 'ECONNABORTED') {
                throw new Error(
                    'A busca está demorando muito. Tente novamente.'
                )
            }

            if (!error.response) {
                throw new Error('Sem conexão. Verifique sua internet.')
            }

            const status = error.response.status

            if (status === 404) {
                throw new Error('Nenhum estabelecimento encontrado')
            }

            if (status === 500) {
                throw new Error(
                    'Erro no servidor. Tente novamente em instantes.'
                )
            }

            throw new Error(
                error.response.data?.message ||
                    'Não foi possível carregar os dados'
            )
        }

        throw new Error('Erro inesperado. Tente novamente.')
    }
}
