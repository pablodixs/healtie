'use client'

import axios from 'axios'
import { FormEvent, useState } from 'react'
import {
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../../styled-system/css'

import { Heading, Paragraph } from '@/components/Typography'
import { Label } from '@/components/Form/Label'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Button'
import { Select } from '@/components/Form/Select'
import { Spinner } from '@/components/spinner'
import { Banner } from '@/components/Banner'
import { XCircleIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { Divider } from '@/components/Divider'

interface ApiResponse {
    address: {
        address: string
        district: string
        city: string
        state: string
    }
    cnes: number
    coordinates: {
        latitude: number
        longitude: number
    }
    email: string | null
    establishment_type: string
    full_name: string
    management: string
    name: string
    phone: string
    sus: boolean
    tax_number: string | null
    updated_at: string
    available_on_healtie: boolean
}

export default function Page() {
    const [cnesNumber, setCnesNumber] = useState<number | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [response, setResponse] = useState<ApiResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        setIsFetching(true)
        setError(null)
        setResponse(null)

        axios
            .get(
                `https://healtie-bh7zc.ondigitalocean.app/v1/datasus/establishment/${cnesNumber}`
            )
            .catch((error) => {
                setError(
                    error.response?.data?.message ||
                        'Erro ao buscar estabelecimento'
                )
            })
            .then((response) => {
                if (response === undefined) return
                setResponse(response.data)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }

    return (
        <main>
            <Heading centered>Consultar estabelecimento no DataSUS</Heading>
            <Paragraph centered size="subheadline">
                Acesse informações detalhadas sobre unidades de saúde integradas
                ao Sistema Único de Saúde. Informe o número do CNES abaixo para
                validar a regularidade no estabelecimento selecionado.
            </Paragraph>
            <Divider />
            <div
                className={css({
                    marginTop: '2rem',
                    display: { md: 'grid', base: 'block' },
                    gridTemplateColumns: '1fr 2fr',
                    gap: '2rem',
                })}
            >
                <section>
                    <form
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            mb: '1rem',
                        })}
                    >
                        <div>
                            <Label htmlFor="type">Tipo de busca</Label>
                            <Select
                                name="type"
                                id="type"
                                style={{ width: '100%' }}
                            >
                                <option value="cnes">Número do CNES</option>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="cnes">Número do CNES</Label>
                            <Input
                                required
                                aria-required="true"
                                type="number"
                                id="cnes"
                                placeholder="Ex: 6708714"
                                style={{ width: '100%' }}
                                onChange={(e) =>
                                    setCnesNumber(Number(e.target.value))
                                }
                            />
                        </div>
                        <Button
                            fullWidth
                            type="submit"
                            disabled={isFetching || cnesNumber === null}
                            onClick={handleSubmit}
                        >
                            {isFetching ? (
                                <>
                                    <Spinner size="sm" color="subtle" />{' '}
                                    Buscando...
                                </>
                            ) : (
                                <>
                                    <MagnifyingGlassIcon weight="bold" />{' '}
                                    Consultar
                                </>
                            )}
                        </Button>
                    </form>
                </section>
                {isFetching ? (
                    <section
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        })}
                    >
                        <Spinner color="subtle" size="lg" />
                    </section>
                ) : (
                    <section>
                        {error && (
                            <Banner
                                variant="error"
                                icon={<XCircleIcon weight="fill" />}
                                title={error}
                            />
                        )}
                        {response && (
                            <>
                                <Banner
                                    variant="success"
                                    icon={<CheckCircleIcon weight="fill" />}
                                    title="Estabelecimento encontrado com sucesso"
                                />
                                <div
                                    className={css({
                                        mt: '1rem',
                                        border: '1px solid',
                                        borderColor: 'gray.200',
                                        borderRadius: '8px',
                                    })}
                                >
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '2rem',
                                            padding: '.5rem 1rem',
                                            borderBottom: '1px solid',
                                            borderBottomColor: 'gray.200',
                                        })}
                                    >
                                        <div>
                                            <Label>CNES</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.cnes}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>Nome</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.name}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '2rem',
                                            padding: '.5rem 1rem',
                                            borderBottom: '1px solid',
                                            borderBottomColor: 'gray.200',
                                        })}
                                    >
                                        <div>
                                            <Label>Razão social</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.full_name}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>Tipo</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.establishment_type}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '2rem',
                                            padding: '.5rem 1rem',
                                            borderBottom: '1px solid',
                                            borderBottomColor: 'gray.200',
                                        })}
                                    >
                                        <div>
                                            <Label>Telefone</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.phone ||
                                                    'Não informado'}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>E-mail</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.email ||
                                                    'Não informado'}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <div
                                        className={css({
                                            padding: '.5rem 1rem',
                                            borderBottom: '1px solid',
                                            borderBottomColor: 'gray.200',
                                        })}
                                    >
                                        <Label>Endereço</Label>
                                        <Paragraph marginCompact bolder>
                                            {response.address.address}
                                        </Paragraph>
                                    </div>
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '2rem',
                                            padding: '.5rem 1rem',
                                            borderBottom: '1px solid',
                                            borderBottomColor: 'gray.200',
                                        })}
                                    >
                                        <div>
                                            <Label>Bairro</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.address.district}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>Cidade</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.address.city}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>UF</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.address.state}
                                            </Paragraph>
                                        </div>
                                    </div>
                                    <div
                                        className={css({
                                            display: 'flex',
                                            gap: '2rem',
                                            padding: '.5rem 1rem',
                                        })}
                                    >
                                        <div>
                                            <Label>Gestão</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.management}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>Faz atendimento SUS</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.sus ? (
                                                    <span
                                                        className={css({
                                                            display: 'flex',
                                                            gap: '.5ch',
                                                            alignItems:
                                                                'center',
                                                            color: 'green.500',
                                                        })}
                                                    >
                                                        <CheckCircleIcon
                                                            weight="fill"
                                                            size={18}
                                                        />{' '}
                                                        Sim
                                                    </span>
                                                ) : (
                                                    <span
                                                        className={css({
                                                            display: 'flex',
                                                            gap: '.5ch',
                                                            alignItems:
                                                                'center',
                                                            color: 'red.500',
                                                        })}
                                                    >
                                                        <XCircleIcon
                                                            weight="fill"
                                                            size={18}
                                                        />{' '}
                                                        Não
                                                    </span>
                                                )}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Label>Disponível no Healtie</Label>
                                            <Paragraph marginCompact bolder>
                                                {response.available_on_healtie ? (
                                                    <Link
                                                        href={`/estabelecimento/${response.cnes}`}
                                                        className={css({
                                                            display: 'flex',
                                                            gap: '.5ch',
                                                            alignItems:
                                                                'center',
                                                            color: 'green.500',
                                                        })}
                                                    >
                                                        <CheckCircleIcon
                                                            weight="fill"
                                                            size={18}
                                                        />{' '}
                                                        Sim
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className={css({
                                                            display: 'flex',
                                                            gap: '.5ch',
                                                            alignItems:
                                                                'center',
                                                            color: 'red.500',
                                                        })}
                                                    >
                                                        <XCircleIcon
                                                            weight="fill"
                                                            size={18}
                                                        />{' '}
                                                        Não
                                                    </span>
                                                )}
                                            </Paragraph>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                )}
            </div>
        </main>
    )
}
