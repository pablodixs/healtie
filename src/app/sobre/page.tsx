import { Heading, Paragraph, Subheading } from '@/components/Typography'
import { css } from '../../../styled-system/css'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import {
    ArrowRightIcon,
    CompassIcon,
    MagnifyingGlassIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react/dist/ssr'
import Image from 'next/image'

export default function Page() {
    return (
        <div
            className={css({
                maxW: '1000px',
                marginX: 'auto',
                paddingX: { md: 0, base: '1rem' },
            })}
        >
            <section>
                <Paragraph centered subtle bolder size="subheadline">
                    Sobre o Healtie
                </Paragraph>
                <Heading centered>
                    Decisões mais seguras para cuidar da sua saúde
                </Heading>
                <Paragraph centered size="subheadline">
                    O Healtie é a plataforma que conecta você a informações
                    atualizadas sobre unidades de saúde, <br /> unindo dados
                    oficiais à experiência real de quem usa o sistema.
                </Paragraph>
            </section>
            <Divider />
            <Subheading>
                Menos incerteza, <br /> mais cuidado
            </Subheading>
            <Paragraph>
                Em momentos de busca por atendimento, a última coisa que você
                precisa é lidar com informações desencontradas ou dar de cara
                com portas fechadas.
            </Paragraph>
            <Paragraph>
                O Healtie nasceu para preencher essa lacuna. Nós transformamos
                dados complexos sobre estabelecimentos de saúde em informações
                simples e acionáveis. Nosso objetivo é dar a você o poder de
                escolher onde e quando buscar ajuda, com base na localização, no
                status de funcionamento e na avaliação de outros pacientes.
            </Paragraph>
            <h2
                className={css({
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    mt: '1rem',
                    fontWeight: '500',
                    letterSpacing: '-0.02em',
                    lineHeight: '130%',
                    py: '2rem',
                })}
            >
                Nossa missão é reunir dados de saúde e torná-los acessíveis para
                ajudar você a encontrar estabelecimentos de saúde de forma
                rápida e segura.
            </h2>
            <Divider />
            <Subheading>Como o Healtie funciona</Subheading>
            <section
                className={css({
                    display: {
                        md: 'grid',
                        base: 'block',
                    },
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem',
                })}
            >
                <div>
                    <Paragraph bolder size="subheadline">
                        Busca simplificada
                    </Paragraph>
                    <Paragraph>
                        Chega de navegar por listas confusas. Encontre
                        hospitais, UPAs e postos de saúde de forma rápida,
                        filtrando pelo que você precisa no momento.
                    </Paragraph>
                </div>
                <div>
                    <Paragraph bolder size="subheadline">
                        Status em tempo real
                    </Paragraph>
                    <Paragraph>
                        Acompanhe a situação operacional das unidades. Verifique
                        se o local está aberto e pronto para atender antes mesmo
                        de sair de casa.
                    </Paragraph>
                </div>
                <div>
                    <Paragraph bolder size="subheadline">
                        Comunidade ativa
                    </Paragraph>
                    <Paragraph>
                        A transparência é nossa prioridade. Através dos
                        feedbacks dos usuários, criamos um ambiente de confiança
                        onde a experiência de um ajuda a decisão de todos.
                    </Paragraph>
                </div>
            </section>
            <Link variant="text" href={'/'}>
                Saiba mais sobre como o Healtie funciona{' '}
                <ArrowRightIcon weight="bold" />
            </Link>
            <Divider />
            <Subheading>
                Dados que geram <br /> confiança
            </Subheading>
            <Paragraph>
                Acreditamos que o acesso à informação de saúde é um direito. Por
                isso, agregamos dados de bases públicas e os mantemos vivos
                através da colaboração da nossa comunidade. O Healtie não é
                apenas um mapa; é uma ferramenta de cidadania que promove a
                transparência em todo o ecossistema de saúde.
            </Paragraph>
            <Link variant="text" href={'/'}>
                Saiba mais sobre como obtemos os dados{' '}
                <ArrowRightIcon weight="bold" />
            </Link>
            <Divider />
            <Subheading centered>Começe agora mesmo</Subheading>
            <section
                className={css({
                    display: 'flex',
                    gap: '3rem',
                    justifyContent: 'center',
                    paddingY: '1rem',
                })}
            >
                <Link variant="text" href={'/buscar'}>
                    <MagnifyingGlassIcon weight="bold" />
                    Buscar unidades de saúde
                </Link>
                <Link variant="text" href={'/buscar'}>
                    <MapTrifoldIcon weight="bold" />
                    Mapa
                </Link>
                <Link variant="text" href={'/buscar'}>
                    <CompassIcon weight="bold" />
                    Onde Ir
                </Link>
            </section>
            <Image
                src={'/pictures/mascots.svg'}
                alt="Mascotes"
                width={200}
                height={100}
            />
        </div>
    )
}
