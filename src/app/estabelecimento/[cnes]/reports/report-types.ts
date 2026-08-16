import type { ComponentType } from 'react'
import {
    ClockCountdownIcon,
    PillIcon,
    ProhibitInsetIcon,
    StethoscopeIcon,
    UsersFourIcon,
} from '@phosphor-icons/react'

export type ReportType =
    | 'WAIT_TIME'
    | 'OCCUPANCY'
    | 'MEDICATION_SHORTAGE'
    | 'SERVICE_SHORTAGE'
    | 'NO_DOCTORS'

export type ReportOption = {
    type: ReportType
    label: string
    description: string
    imageUrl: string
    icon: ComponentType<{ size?: number; weight?: 'regular' | 'bold' }>
    kind: 'duration' | 'percentage' | 'occurrence'
    expiryLabel: string
}

export const REPORT_OPTIONS: ReportOption[] = [
    {
        type: 'WAIT_TIME',
        label: 'Tempo de espera',
        description: 'Quanto tempo você esperou para ser atendido?',
        imageUrl: '/images/il/wait-time.png',
        icon: ClockCountdownIcon,
        kind: 'duration',
        expiryLabel: 'Válido por até 4 horas',
    },
    {
        type: 'OCCUPANCY',
        label: 'Ocupação',
        description: 'Como estava o movimento nesta unidade?',
        imageUrl: '/images/il/occupancy.png',
        icon: UsersFourIcon,
        kind: 'percentage',
        expiryLabel: 'Válido por até 4 horas',
    },
    {
        type: 'MEDICATION_SHORTAGE',
        label: 'Falta de medicamentos',
        description: 'Informe se faltavam medicamentos na unidade.',
        imageUrl: '/images/il/medication-shortage.png',
        icon: PillIcon,
        kind: 'occurrence',
        expiryLabel: 'Válido por até 24 horas',
    },
    {
        type: 'SERVICE_SHORTAGE',
        label: 'Serviço indisponível',
        description: 'Informe se algum serviço não estava disponível.',
        imageUrl: '/images/il/wait-time.png',
        icon: ProhibitInsetIcon,
        kind: 'occurrence',
        expiryLabel: 'Válido por até 24 horas',
    },
    {
        type: 'NO_DOCTORS',
        label: 'Ausência de médicos',
        description: 'Informe se não havia médicos disponíveis.',
        imageUrl: '/images/il/wait-time.png',
        icon: StethoscopeIcon,
        kind: 'occurrence',
        expiryLabel: 'Válido por até 8 horas',
    },
]

