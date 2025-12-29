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

interface FormData {
    stateCode: number
    cityCode: number
    establishmentTypeCode: number
}

interface ApiResponse {
    message: string
    total_records: number
}

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<ApiResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormData>({
        stateCode: 0,
        cityCode: 0,
        establishmentTypeCode: 0,
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        setError(null)
        setResponse(null)

        axios
            .post(
                `https://healtie-bh7zc.ondigitalocean.app/v1/datasus/get-all`,
                {
                    stateCode: formData.stateCode,
                    cityCode: formData.cityCode,
                    establishmentTypeCode: formData.establishmentTypeCode,
                }
            )
            .catch((error) => {
                setError(error.message)
            })
            .then((response) => {
                if (!response?.data) return
                setResponse(response.data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div>
            <Heading centered>Obter estabelecimentos por região</Heading>
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
                                    !formData.stateCode || !formData.cityCode
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
                        message={'Isso pode demorar um pouco.'}
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
