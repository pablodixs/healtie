'use client'

import { Divider } from '@/components/Divider'
import { Input } from '@/components/Form/Input'
import { Label } from '@/components/Form/Label'
import { Link } from '@/components/Link'
import { Heading } from '@/components/Typography'
import {
    ArrowLineDownIcon,
    ArrowUpRightIcon,
    CheckCircleIcon,
    InfoIcon,
    XCircleIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { Select } from '@/components/Form/Select'
import { Button } from '@/components/Button'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import { Banner } from '@/components/Banner'
import { Spinner } from '@/components/spinner'
import { useRouter } from 'next/navigation'

interface FormData {
    stateCode: number
    cityCode: number
    establishmentTypeCode: number
}

interface ApiResponse {
    message: string
    total_records: number
}
interface JobResponse {
    job_id: string
    status: 'queued' | 'running' | 'completed' | 'failed'
    total_records?: number
    error?: string
}

export default function Page() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<ApiResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [job, setJob] = useState<JobResponse | null>(null)
    const [formData, setFormData] = useState<FormData>({
        stateCode: 0,
        cityCode: 0,
        establishmentTypeCode: 0,
    })
    const logout = async () => {
        await fetch('/api/admin/session', { method: 'DELETE' })
        router.replace('/admin/login')
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        setError(null)
        setResponse(null)

        try {
            const accepted = await axios.post<JobResponse>(
                '/api/admin/datasus/import',
                {
                    stateCode: formData.stateCode,
                    cityCode: formData.cityCode,
                    establishmentTypeCode: formData.establishmentTypeCode,
                }
            )
            setJob(accepted.data)
            let current = accepted.data
            while (
                current.status === 'queued' ||
                current.status === 'running'
            ) {
                await new Promise((resolve) => setTimeout(resolve, 2000))
                const status = await axios.get<JobResponse>(
                    `/api/admin/datasus/jobs/${current.job_id}`
                )
                current = status.data
                setJob(current)
            }
            if (current.status === 'failed')
                throw new Error(current.error ?? 'A importação falhou.')
            setResponse({
                message: 'Estabelecimentos importados com sucesso.',
                total_records: current.total_records ?? 0,
            })
        } catch (requestError) {
            if (
                axios.isAxiosError(requestError) &&
                requestError.response?.status === 401
            )
                router.replace('/admin/login?next=/datasus/obter-regiao')
            else if (
                axios.isAxiosError(requestError) &&
                requestError.response?.status === 429
            )
                setError(
                    'Limite de importações atingido. Tente novamente mais tarde.'
                )
            else
                setError(
                    requestError instanceof Error
                        ? requestError.message
                        : 'Não foi possível importar os dados.'
                )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div
                className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                })}
            >
                <Heading centered>Obter estabelecimentos por região</Heading>
                <Button type="button" variant="secondary" onClick={logout}>
                    Sair
                </Button>
            </div>
            <Divider />
            <section>
                <Link
                    href={
                        'https://www.ibge.gov.br/explica/codigos-dos-municipios.php'
                    }
                    target="_blank"
                    variant="text"
                >
                    IBGE - Lista dos códigos dos municípios <ArrowUpRightIcon />
                </Link>
                <form onSubmit={handleSubmit} className={css({ mt: '1rem' })}>
                    <section
                        className={css({
                            display: 'flex',
                            gap: '2rem',
                            alignItems: 'center',
                        })}
                    >
                        <div>
                            <Label htmlFor="uf">UF</Label>
                            <Input
                                required
                                type="number"
                                placeholder="Código da UF"
                                id="uf"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        stateCode: Number(e.target.value),
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="municipio">Município</Label>
                            <Input
                                required
                                type="number"
                                placeholder="Código do Município"
                                id="municipio"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        cityCode: Number(e.target.value),
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="tipo-estabelecimento">
                                Tipo de estabelecimento
                            </Label>
                            <Select
                                required
                                defaultValue={formData.establishmentTypeCode}
                                id="tipo-estabelecimento"
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        establishmentTypeCode: Number(
                                            e.target.value
                                        ),
                                    })
                                }}
                            >
                                <option disabled value={0}>
                                    Selecione o tipo do estabelecimento
                                </option>
                                <option value={5}>Hospital Geral</option>
                                <option value={2}>
                                    Unidade Básica de Saúde
                                </option>
                                <option value={73}>
                                    Unidade de Pronto Atendimento
                                </option>
                            </Select>
                        </div>
                        <div className={css({ flex: 1, mb: '1rem' })}>
                            <Label>­­</Label>
                            <Button
                                type="submit"
                                disabled={
                                    !formData.stateCode ||
                                    !formData.cityCode ||
                                    isLoading
                                }
                            >
                                <ArrowLineDownIcon weight="bold" /> Obter
                                estabelecimentos
                            </Button>
                        </div>
                    </section>
                </form>
            </section>
            <section className={css({ mt: '2rem' })}>
                {isLoading && (
                    <Banner
                        icon={<Spinner color="subtle" />}
                        title={'Buscando estabelecimentos na API do DataSUS...'}
                        message={
                            job
                                ? `Status: ${job.status}`
                                : 'Isso pode demorar um pouco.'
                        }
                    />
                )}
                {error && (
                    <Banner
                        icon={<XCircleIcon />}
                        variant="error"
                        title="Ocorreu um erro ao buscar os dados"
                        message={error}
                    />
                )}
                {response &&
                    response.message ===
                        'Nenhum estabelecimento novo para salvar (todos já existem no sistema).' && (
                        <Banner
                            icon={<InfoIcon />}
                            variant="warning"
                            title="Todos os estabelecimentos já existem no Healtie"
                        />
                    )}
                {response &&
                    response.message ===
                        'Nenhum estabelecimento encontrado na API DataSUS.' && (
                        <Banner
                            icon={<InfoIcon />}
                            variant="warning"
                            title="Nenhum estabelecimento encontrado na API DataSUS"
                        />
                    )}
                {response &&
                    response.message ===
                        'Estabelecimentos importados com sucesso.' && (
                        <Banner
                            icon={<CheckCircleIcon />}
                            variant="success"
                            title={response.message}
                            message={`${response.total_records} estabelecimento(s) foram adicionados ao Healtie.`}
                        />
                    )}
                {response &&
                    response.message ===
                        "Nenhum estabelecimento após filtro 'SUS' e de-duplicação." && (
                        <Banner
                            icon={<InfoIcon />}
                            variant="warning"
                            title="Nenhum estabelecimento após os filtros"
                        />
                    )}
            </section>
        </div>
    )
}
