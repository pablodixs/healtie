import { Paragraph } from '@/components/Typography'
import { css } from '../../../../../../styled-system/css'
import { Link } from '@/components/Link'
import { ServiceItem } from '@/components/ServiceItem'
import {
    BabyCarriageIcon,
    BabyIcon,
    StethoscopeIcon,
    ToothIcon,
} from '@phosphor-icons/react/dist/ssr'
import { EstablishmentResponse } from '@/interfaces/EstablishmentAPIResponse'

interface ServicesTabProps {
    establishment: EstablishmentResponse | undefined
    setSelectedTab: (
        tab: 'overview' | 'indicators' | 'services' | 'comments'
    ) => void
}

export function ServicesTab({}: ServicesTabProps) {
    return (
        <>
            <div
                className={css({
                    display: 'flex',
                    flexDir: 'column',
                    gap: '1rem',
                    mt: '1rem',
                })}
            >
                <ServiceItem
                    serviceName="Consulta Médica"
                    serviceDescription="Consulta médica com um especialista."
                    serviceIcon={<StethoscopeIcon />}
                    showDescription={true}
                    available={true}
                />
                <ServiceItem
                    serviceName="Dentista"
                    serviceDescription="Consulta médica com um especialista."
                    serviceIcon={<ToothIcon />}
                    showDescription={true}
                    available={false}
                />
                <ServiceItem
                    serviceName="Pré-natal"
                    serviceDescription="Consulta médica com um especialista."
                    serviceIcon={<BabyCarriageIcon />}
                    showDescription={true}
                    available={null}
                />
                <ServiceItem
                    serviceName="Pediatria"
                    serviceDescription="Consulta médica com um especialista."
                    serviceIcon={<BabyIcon />}
                    showDescription={true}
                    available={null}
                />
            </div>
            <div>
                <Paragraph bolder size="caption">
                    Os Serviços dos Estabelecimentos
                </Paragraph>
                <Paragraph size="caption" subtle>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Sapiente consectetur esse nobis quo officiis veritatis.
                    Ipsum quae, excepturi omnis mollitia aut modi molestias
                    illum ipsa assumenda qui animi hic sequi.
                </Paragraph>
                <Link href={'#'} variant="text" size="sm">
                    Saiba mais
                </Link>
            </div>
        </>
    )
}
