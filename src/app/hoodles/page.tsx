import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import { Heading, Paragraph, Subheading } from '@/components/Typography'
import Image from 'next/image'
import { css } from '../../../styled-system/css'

const hoodles = [
    {
        title: 'Primeiro Hoodle',
        description:
            'O primeiro doodle do Healtie, celebrando a missão de promover a saúde.',
        imageSrc: '/images/doodles/doodle.png',
    },
    {
        title: 'Novembro Azul 2025',
        description:
            'Conscientização sobre a saúde masculina e prevenção do câncer de próstata.',
        imageSrc: '/images/doodles/2025_november.png',
    },
    {
        title: 'Boas Festas 2025',
        description:
            'Celebrando as festas de fim de ano com saúde e alegria para todos.',
        imageSrc: '/images/doodles/2026-new-year.png',
    },
]

export default function HoodlesPage() {
    return (
        <>
            <header>
                <Heading centered>Hoodles</Heading>
                <Paragraph size="subheadline" centered>
                    Explore os doodles do Healtie feitos para concientizar e
                    celebrar datas importantes da saúde
                </Paragraph>
                <Divider />
                <Subheading>2025</Subheading>
                <section
                    className={css({
                        display: { md: 'grid', base: 'block' },
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '1rem',
                    })}
                >
                    {hoodles.map((hoodle) => (
                        <div key={hoodle.title}>
                            <Image
                                src={hoodle.imageSrc}
                                alt={hoodle.title}
                                width={300}
                                height={100}
                                className={css({ marginY: '1rem' })}
                            />
                            <Paragraph size="subheadline" bolder>
                                {hoodle.title}
                            </Paragraph>
                            <Paragraph size="caption" subtle>
                                {hoodle.description}
                            </Paragraph>
                        </div>
                    ))}
                </section>
                <Divider />
                <Paragraph size="caption">
                    Estamos buscando artistas para colaborar com a criação dos
                    Hoodles. Nos envie um{' '}
                    <Link
                        size="sm"
                        variant="text"
                        href={'mailto::pabllosoarez@gmail.com'}
                    >
                        e-mail
                    </Link>{' '}
                    se você tiver interesse.
                </Paragraph>
            </header>
        </>
    )
}
