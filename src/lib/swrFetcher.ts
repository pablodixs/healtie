import axios from 'axios'

const api = axios.create({})

export const fetcher = (url: string) => api.get(url).then((res) => res.data)
