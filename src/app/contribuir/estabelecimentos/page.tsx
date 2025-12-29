'use client'

import { BackButton } from '@/components/Button/BackButton'
import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { Input } from '@/components/Form/Input'
import { Label } from '@/components/Form/Label'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import { z } from 'zod'
import { Select } from '@/components/Form/Select'
import { Button } from '@/components/Button'

import states from '@/utils/states.json'
import cities from '@/utils/cities.json'
import { useState, ChangeEvent } from 'react'

const newEstablishmentFormSchema = z.object({
    cnes: z
        .number()
        .min(3, 'O CNES deve ter no mínimo 3 dígitos')
        .max(10, 'O CNES deve ter no máximo 10 dígitos')
        .positive('O CNES deve ser um número positivo'),
    name: z.string().min(3, 'O nome deve ter no mínimo 5 caracteres'),
    fullName: z
        .string()
        .min(5, 'O nome completo deve ter no mínimo 5 caracteres'),
    address: z.string().min(5, 'O endereço deve ter no mínimo 5 caracteres'),
    addressNumber: z.string().optional(),
    district: z.string().min(3, 'O bairro deve ter no mínimo 3 caracteres'),
    city: z.string().min(3, 'A cidade deve ter no mínimo 3 caracteres'),
    state: z.string(),
    establishmentType: z.string(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
})

export default function Page() {
    const [selectedState, setSelectedState] = useState('')
    const filteredCities = selectedState
        ? cities.estados.find((estado) => estado.sigla === selectedState)
              ?.cidades || []
        : []

    return (
        <main>
            <header>
                <BackButton />
                <Heading style={{ marginTop: '1rem' }}>
                    Adicionar um estabelecimento
                </Heading>
                <Paragraph size="subheadline">
                    Contribua com o Healtie adicionando um novo estabelecimento
                    de saúde em nossa base.
                </Paragraph>
                <Link
                    variant="text"
                    href={'/contribuir/estabelecimentos/editar'}
                >
                    Clique aqui para editar um estabelecimento existente{' '}
                    <ArrowRightIcon weight="bold" />
                </Link>
            </header>
            <Divider />
            <form className={formContainer}>
                <fieldset className={fieldsetStyles}>
                    <div>
                        <Label htmlFor="cnes">CNES</Label>
                        <Input
                            type="number"
                            id="cnes"
                            name="cnes"
                            placeholder="CNES do estabelecimento"
                            required
                        />
                    </div>
                    <div className={css({ flex: 1 })}>
                        <Label htmlFor="nome">Nome do Estabelecimento</Label>
                        <Input
                            fullWidth
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Nome do estabelecimento"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset className={fieldsetStyles}>
                    <div className={css({ flex: 1 })}>
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                            id="description"
                            name="description"
                            placeholder="Descrição do estabelecimento"
                            required
                            fullWidth
                        />
                    </div>
                </fieldset>
                <fieldset className={fieldsetStyles}>
                    <div className={css({ flex: 1 })}>
                        <Label htmlFor="fullName">Razão social</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            placeholder="Razão social do estabelecimento"
                            required
                            fullWidth
                        />
                    </div>
                    <div>
                        <Label htmlFor="establishmentType">
                            Tipo de Estabelecimento
                        </Label>
                        <Select
                            id="establishmentType"
                            name="establishmentType"
                            required
                        >
                            <option value="" disabled>
                                Selecione o tipo do estabelecimento...
                            </option>
                            <option value={1}>Unidade Básica de Saúde</option>
                            <option value={5}>Hospital Geral</option>
                            <option value={73}>
                                Unidade de Pronto Atendimento
                            </option>
                        </Select>
                    </div>
                </fieldset>
                <fieldset className={fieldsetStyles}>
                    <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            placeholder="Telefone do estabelecimento"
                            type="number"
                            required
                        />
                    </div>
                    <div className={css({ flex: 1 })}>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="E-mail do estabelecimento"
                            type="email"
                            required
                            fullWidth
                        />
                    </div>
                </fieldset>
                <fieldset className={fieldsetStyles}>
                    <div>
                        <Label htmlFor="address">UF</Label>
                        <Select
                            defaultValue={selectedState}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                                setSelectedState(e.target.value)
                            }
                        >
                            <option value="" disabled>
                                Selecione a UF...
                            </option>
                            {states.UF.map((state) => (
                                <option key={state.sigla} value={state.sigla}>
                                    {state.nome}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="city">Município</Label>
                        <Select id="city" disabled={selectedState === ''}>
                            <option value="" disabled selected>
                                Selecione o município...
                            </option>
                            {filteredCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className={css({ flex: 1 })}>
                        <Label htmlFor="address">Endereço</Label>
                        <Input
                            id="address"
                            name="address"
                            placeholder="Endereço do estabelecimento"
                            type="text"
                            required
                            fullWidth
                        />
                    </div>

                    <div>
                        <Label htmlFor="addressNumber">Número</Label>
                        <Input
                            id="addressNumber"
                            name="addressNumber"
                            placeholder="Número"
                            required
                        />
                    </div>
                </fieldset>
                <Button type="submit">Enviar</Button>
            </form>
        </main>
    )
}

const selectionGroup = css({
    '& button': {
        padding: '.5rem 0',
        marginRight: '2rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.5rem',
        fontSize: '0.875rem',
        color: '#737373ff',
        borderBottom: '1px solid transparent',
        cursor: 'pointer',

        _hover: {
            borderBottomColor: 'primary',
            color: 'primary',
        },

        '& [data-active="true"]': {
            borderBottomColor: 'primary',
            color: 'primary',
        },
    },

    '& hr': {
        borderColor: '#eee',
        mt: '-1px',
    },
})

const formContainer = css({})

const fieldsetStyles = css({
    display: 'flex',
    flexDir: { base: 'column', md: 'row' },
    gap: '1rem',
})
