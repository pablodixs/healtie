import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
} from '@phosphor-icons/react/ssr'

import { Establishment } from '@/interfaces/Establishment'

import { markerContainer } from './maker.styles'

interface MapMarkerProps {
    longitude?: number
    latitude?: number
    establishmentProps?: Establishment
    establishmentType?:
        | 'Hospital Geral'
        | 'Unidade Básica de Saúde'
        | 'Unidade de Pronto Atendimento'
    delay?: boolean
    expanded?: boolean
    mapZoom?: number
}

export function MapMarkerDecoration({ establishmentType }: MapMarkerProps) {
    return (
        <div
            style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <div
                className={markerContainer({
                    type: establishmentType as
                        | 'Hospital Geral'
                        | 'Unidade Básica de Saúde'
                        | 'Unidade de Pronto Atendimento',
                })}
            >
                {establishmentType === 'Hospital Geral' && (
                    <HospitalIcon weight="fill" />
                )}
                {establishmentType === 'Unidade Básica de Saúde' && (
                    <FirstAidIcon weight="fill" />
                )}
                {establishmentType === 'Unidade de Pronto Atendimento' && (
                    <AmbulanceIcon weight="fill" />
                )}
            </div>
        </div>
    )
}
