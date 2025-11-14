import {
    SealCheckIcon,
    SealQuestionIcon,
    SealWarningIcon,
} from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../styled-system/css'
import { Paragraph } from '../Typography'

interface ServiceItemProps {
    serviceName: string
    serviceDescription: string
    serviceIcon: React.ReactNode
    showDescription?: boolean
    available?: boolean | null
}

export function ServiceItem({
    serviceName,
    serviceDescription,
    serviceIcon,
    showDescription = true,
    available = null,
}: ServiceItemProps) {
    return (
        <div
            className={css({
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '.5rem',
                alignItems: 'center',
                width: '100%',
                opacity: available === false ? 0.5 : 1,
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    backgroundColor: 'neutral.100',
                    fontSize: '1.25rem',
                })}
            >
                {serviceIcon}
            </div>
            <div>
                <Paragraph bolder marginCompact>
                    {serviceName}
                </Paragraph>
                {showDescription && (
                    <Paragraph size="caption" subtle marginCompact>
                        {serviceDescription}
                    </Paragraph>
                )}
            </div>
            <div
                className={css({
                    flex: 1,
                    fontSize: '0.875rem',
                    fontWeight: 500,
                })}
            >
                {available !== null ? (
                    available ? (
                        <span
                            className={css({
                                color: 'greenHightlight',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                            })}
                        >
                            <SealCheckIcon weight="fill" size={16} /> Disponível
                        </span>
                    ) : (
                        <span
                            className={css({
                                color: '#e5383b',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                            })}
                        >
                            <SealWarningIcon weight="fill" size={16} />
                            Indisponível
                        </span>
                    )
                ) : (
                    <span
                        className={css({
                            color: 'neutral.400',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                        })}
                    >
                        <SealQuestionIcon weight="fill" size={16} />
                        Sem dados
                    </span>
                )}
            </div>
        </div>
    )
}
