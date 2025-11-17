import { css } from '../../../../../styled-system/css'
import {
    ArrowUpRightIcon,
    PencilSimpleIcon,
    QuestionIcon,
    SpeedometerIcon,
    WarningCircleIcon,
} from '@phosphor-icons/react/dist/ssr'

import { Link } from '@/components/Link'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Paragraph } from '@/components/Typography'

import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

export function DetailsAsideView({
    establishment,
}: {
    establishment: EstablishmentResponse | undefined
}) {
    if (!establishment) return null

    return (
        <aside>
            <Paragraph subtle bolder size="caption">
                Informações do Estabelecimento
            </Paragraph>
            <DetailItem title="Telefone" value={establishment?.phone} />
            <DetailItem
                title="Endereço"
                value={establishment?.address?.address}
            />
            <DetailItem
                title="Bairro/Distrito"
                value={`${establishment?.address?.district}`}
            />
            <Link
                variant="asChild"
                href={`/cidade/${establishment?.address?.city?.toLowerCase()}`}
            >
                <DetailItem
                    title="Cidade"
                    value={`${establishment?.address?.city} - ${establishment?.address?.state}`}
                />
            </Link>
            <DetailItem title="Tipo" value={establishment?.type} />
            <DetailItem title="CNES" value={establishment?.cnes.toString()} />
            <Divider margin="compact" />

            <Paragraph size="caption" subtle>
                Fontes dos dados do estabelecimento:{' '}
                <Link
                    size="sm"
                    variant="textSubtle"
                    href="https://cnes2.datasus.gov.br/Index.asp?home=1"
                    target="_blank"
                >
                    DATASUS
                </Link>
            </Paragraph>
            <Divider margin="compact" />
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                })}
            >
                <Button variant="textSubtle">
                    <PencilSimpleIcon /> Sugerir edição
                </Button>
                <Button variant="textSubtle">
                    <WarningCircleIcon /> Relatar erro
                </Button>
                <Button variant="textSubtle">
                    <QuestionIcon /> Ajuda
                </Button>
                <Button variant="textSubtle">
                    <SpeedometerIcon /> Métricas <ArrowUpRightIcon size={12} />
                </Button>
            </div>
        </aside>
    )
}

export const DetailItem = ({
    title,
    value,
}: {
    title: string
    value: string | undefined
}) => {
    return (
        <div className={detailItemContainer}>
            <Paragraph subtle size="caption">
                {title}
            </Paragraph>
            <Paragraph size="caption" style={{ textAlign: 'right' }}>
                <b>{value}</b>
            </Paragraph>
        </div>
    )
}

const detailItemContainer = css({
    display: 'flex',
    justifyContent: 'space-between',
})
