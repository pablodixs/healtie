'use client'

import axios from 'axios'
import { FormEvent, useState } from 'react'
import {
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'

import { css } from '../../../../styled-system/css'

import { Heading } from '@/components/Typography'
import { Label } from '@/components/Form/Label'
import { Input } from '@/components/Form/Input'
import { Button } from '@/components/Button'
import { Select } from '@/components/Form/Select'
import { Spinner } from '@/components/spinner'
import { Banner } from '@/components/Banner'

interface apiResponse {
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
}

export default function Page() {
    const [cnesNumber, setCnesNumber] = useState<number | null>(null)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [response, setResponse] = useState<apiResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()

        setIsFetching(true)

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
                setResponse(response?.data)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }

    return (
        <main>
            <Heading>Consultar estabelecimento no DataSUS</Heading>
            <div
                className={css({
                    marginTop: '2rem',
                    display: 'grid',
                    gridTemplateColumns: '400px 1fr',
                    gap: '2rem',
                })}
            >
                <section>
                    <form
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
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
                                placeholder="Insira o número do CNES"
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
                        {error && <Banner title={error} />}
                        {response && (
                            <>
                                <Banner
                                    variant="success"
                                    icon={<CheckCircleIcon weight="fill" />}
                                    title="Estabelecimento encontrado com sucesso"
                                />
                                <Label>Nome do estabelecimento</Label>
                                <Input
                                    value={response.name}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>Razão social</Label>
                                <Input
                                    value={response.full_name}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>Gestão</Label>
                                <Input
                                    value={response.management}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>Tipo de estabelecimento</Label>
                                <Input
                                    value={response.establishment_type}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>Endereço</Label>
                                <Input
                                    value={response.address.address}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>Bairro/distrito</Label>
                                <Input
                                    value={response.address.district}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>Município</Label>
                                <Input
                                    value={response.address.city}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                                <Label>UF</Label>
                                <Input
                                    value={response.address.state}
                                    disabled
                                    readOnly
                                    fullWidth
                                />
                            </>
                        )}
                    </section>
                )}
            </div>
        </main>
    )
}
