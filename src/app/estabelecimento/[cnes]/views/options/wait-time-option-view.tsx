'use client'

import axios from 'axios'
import { useState } from 'react'
import { motion } from 'motion/react'
import {
    ClockCountdownIcon,
    EraserIcon,
    MinusIcon,
    PlusIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react'
import { css } from '../../../../../../styled-system/css'

import { Button } from '@/components/Button'
import { Banner } from '@/components/Banner'
import { Tooltip } from '@/components/Tooltip'
import { Paragraph, Subheading } from '@/components/Typography'

import { API_URL } from '@/lib/apiConfig'
import { SuccessView } from './success-view'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'
import { Label } from '@/components/Form/Label'

export function WaitTimeOptionView({
    establishment,
}: {
    establishment: EstablishmentResponse
}) {
    const [time, setTime] = useState<number>(0)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = () => {
        setIsLoading(true)
        axios
            .post(`${API_URL}/establishment/${establishment.cnes}/indicators`, {
                resolutionIndex: null,
                waitTime: time,
                occupation: null,
            })
            .catch((error) => {
                console.error(
                    'There was an error reporting the wait time:',
                    error
                )
                setError(error.response.data)
                setIsLoading(false)
            })
            .then(() => {
                setSuccess(true)
                setIsLoading(false)
            })
    }

    if (success) {
        return (
            <SuccessView>
                <div
                    className={css({
                        display: 'flex',
                        gap: '1ch',
                        alignItems: 'center',
                        mb: '.5rem',
                    })}
                >
                    <ClockCountdownIcon
                        weight="bold"
                        size={24}
                        className={css({ color: 'gray.400' })}
                    />
                    <Paragraph bolder marginCompact subtle>
                        Tempo de espera
                    </Paragraph>
                </div>
                <Label>Estabelecimento</Label>
                <Paragraph bolder marginCompact>
                    {establishment.name}
                </Paragraph>
                <Label>Tempo de espera reportado</Label>
                <Paragraph bolder marginCompact>
                    {time} minutos
                </Paragraph>
            </SuccessView>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '.5rem',
                    py: '1rem',
                })}
            >
                <div
                    className={css({
                        fontSize: '2.5rem',
                        color: 'primary',
                        padding: '.5rem',
                        borderRadius: '50%',
                        backgroundColor: 'gray.100',
                        width: 'fit-content',
                    })}
                >
                    <ClockCountdownIcon />
                </div>
                <Subheading centered size="sm">
                    Reportar tempo de espera
                </Subheading>
                <Paragraph centered subtle>
                    Informe o tempo médio de espera atual para ser atendido.
                </Paragraph>
            </div>
            <section className={css({ mb: '4rem' })}>
                <div
                    className={css({
                        color: 'primary',
                        display: 'flex',
                        gap: '2rem',
                        justifyContent: 'center',
                        alignItems: 'center',
                    })}
                >
                    <Tooltip content="Menos 5 minutos">
                        <Button
                            onClick={() => setTime(time - 5)}
                            disabled={time === 0}
                            variant="secondary"
                            iconButton
                        >
                            <MinusIcon weight="bold" />
                        </Button>
                    </Tooltip>
                    <div
                        className={css({
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        })}
                    >
                        <input
                            value={time}
                            onChange={(e) => setTime(Number(e.target.value))}
                            type="number"
                            className={css({
                                fontSize: '4.5rem',
                                lineHeight: 1,
                                fontWeight: 600,
                                textAlign: 'center',
                                width: '4ch',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                            })}
                        />
                        <Paragraph marginCompact bolder>
                            minutos
                        </Paragraph>
                    </div>
                    <Tooltip content="Mais 5 minutos">
                        <Button
                            onClick={() => setTime(time + 5)}
                            variant="secondary"
                            iconButton
                        >
                            <PlusIcon weight="bold" />
                        </Button>
                    </Tooltip>
                </div>
                <div>
                    <Paragraph centered subtle bolder size="subheadline">
                        {Math.floor(time / 60)} h {time % 60} min.
                    </Paragraph>
                </div>
                <div
                    className={css({
                        display: 'flex',
                        gap: '0.5rem',
                        my: '1.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                    })}
                >
                    <Button
                        onClick={() => setTime(time + 30)}
                        variant="bordered"
                    >
                        + 30 min.
                    </Button>
                    <Button
                        onClick={() => setTime(time + 60)}
                        variant="bordered"
                    >
                        + 1 hora
                    </Button>
                    <Button
                        disabled={time === 0}
                        onClick={() => setTime(0)}
                        variant="bordered"
                    >
                        <EraserIcon weight="bold" /> Limpar
                    </Button>
                </div>
                {time < 0 || time > 1440 ? (
                    <Banner
                        icon={<WarningCircleIcon />}
                        variant="error"
                        title="O tempo de espera deve estar entre 1 e 1440 minutos."
                    />
                ) : null}
            </section>
            <div>
                {error && (
                    <Banner
                        icon={<WarningCircleIcon />}
                        variant="error"
                        title={error}
                    />
                )}
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    disabled={
                        time === 0 || time > 1440 || time < 0 || isLoading
                    }
                >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </Button>
            </div>
        </motion.div>
    )
}
