'use client'

import { Subheading } from '@/components/Typography/Subheading'
import { HeroSearchContainer } from './ui/HeroSeachContainer'

import { stack } from '../../styled-system/patterns'
import { FeatureHighlight } from './ui/FeatureHighlight'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Stack } from '@/components/Stacks'
import { Button } from '@/components/Button'
import {
    ArrowRightIcon,
    ArrowUpRightIcon,
    CheckCircleIcon,
    CompassIcon,
    MapTrifoldIcon,
} from '@phosphor-icons/react/dist/ssr'
import Lottie from 'lottie-react'

import locationAnimation from '@/assets/lotties/near_establishments_animation.json'
import { css } from '../../styled-system/css'
import { Heading } from '@/components/Typography/Heading'

export default function Home() {
    return (
        <div>
            <HeroSearchContainer />
            <FeatureHighlight />
            <section
                className={stack({
                    direction: { base: 'column-reverse', md: 'row' },
                    justify: 'space-between',
                    align: 'center',
                })}
            >
                <div
                    className={stack({
                        padding: { base: '4rem 1rem', md: '4rem 0' },
                    })}
                >
                    <Subheading>
                        Encontre a unidade de saúde mais próxima de você <br />{' '}
                        e saiba quais serviços estão disponíveis
                    </Subheading>
                    <Paragraph compact>
                        Localize a unidade mais próxima e veja, em tempo real*,
                        os serviços disponíveis para garantir um atendimento
                        mais rápido e eficiente.
                    </Paragraph>
                    <Stack direction="row">
                        <Button variant="subtle">
                            Ver unidades próximas <ArrowRightIcon />
                        </Button>
                        <Button variant="text">
                            Lista de estabelecimentos <ArrowUpRightIcon />
                        </Button>
                    </Stack>
                </div>
                <Lottie
                    animationData={locationAnimation}
                    style={{ width: '100%', height: 'auto', flex: 1 }}
                />
            </section>
            <section
                className={stack({
                    backgroundColor: 'background',
                    padding: { base: '4rem 1rem', md: '4rem' },
                    borderRadius: { base: '0', md: 'lg' },
                    marginRight: { base: '0', md: '1rem' },
                })}
            >
                <Subheading>Como o Healtie te ajuda?</Subheading>
                <Paragraph compact>
                    O Healtie conecta você às unidades de saúde mais próximas,
                    facilitando o acesso a informações sobre serviços e
                    atendimentos disponíveis.
                </Paragraph>
                <div
                    className={stack({
                        direction: { base: 'column', md: 'row' },
                        align: 'stretch',
                        gap: '2rem',
                    })}
                >
                    <Card icon={CompassIcon} title="Você sabe onde ir">
                        Com o Onde Ir? você encontra a unidade de saúde mais
                        indicada pro seu caso, otimizando seu tempo e evitando a
                        lotação desnecessária dos estabelecimentos de saúde.
                    </Card>
                    <Card
                        icon={MapTrifoldIcon}
                        title="Você encontra a unidade de saúde mais próxima de você"
                    >
                        Utilizando sua localização e preferências, o Healtie
                        encontra a unidade de saúde mais próxima de você,
                        garantindo um atendimento mais rápido e eficiente.
                    </Card>
                    <Card
                        icon={CheckCircleIcon}
                        title="Você sabe a situação da unidade de saúde"
                    >
                        O Healtie fornece informações em tempo real sobre a
                        situação das unidades de saúde, incluindo horários de
                        funcionamento, capacidade de atendimento e serviços
                        disponíveis.
                    </Card>
                </div>
            </section>
            <section
                className={stack({
                    padding: { base: '4rem 1rem', md: '4rem' },
                    align: 'center',
                })}
            >
                <svg
                    width="57"
                    height="72"
                    viewBox="0 0 57 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M56.1504 22.6553C54.2001 33.2934 41.2421 47.6928 33.1244 54.8437C32.4294 55.4559 31.4494 55.6036 30.6088 55.2148C22.8316 51.6183 10.4408 43.497 2.99003 32.3208C-4.70648 20.776 2.57808 -4.2934 23.4263 10.3708C24.4395 11.0835 25.8588 10.9896 26.7596 10.1391C52.6403 -14.2974 58.1546 11.724 56.1504 22.6553Z"
                        fill="#FF3938"
                    />
                    <path
                        d="M19.3669 26C16.4029 26 14 28.7973 14 32.2478C14 35.6983 16.4029 38.4955 19.3669 38.4955C22.331 38.4955 24.7338 35.6983 24.7339 32.2478C24.7339 28.7973 22.331 26 19.3669 26Z"
                        fill="white"
                    />
                    <path
                        d="M19.7597 29.7629C17.8367 29.7629 16.2777 31.5778 16.2777 33.8164C16.2777 36.0551 17.8367 37.8699 19.7597 37.8699C21.6828 37.8699 23.2417 36.0551 23.2417 33.8164C23.2417 31.5778 21.6828 29.7629 19.7597 29.7629Z"
                        fill="#202020"
                    />
                    <path
                        d="M40.3669 24C37.4029 24 35 26.7973 35 30.2478C35 33.6983 37.4029 36.4955 40.3669 36.4955C43.331 36.4955 45.7338 33.6983 45.7339 30.2478C45.7339 26.7973 43.331 24 40.3669 24Z"
                        fill="white"
                    />
                    <path
                        d="M40.4819 28C38.5588 28 36.9999 29.8148 36.9999 32.0535C36.9999 34.2921 38.5588 36.107 40.4819 36.107C42.4049 36.107 43.9639 34.2921 43.9639 32.0535C43.9639 29.8148 42.4049 28 40.4819 28Z"
                        fill="#202020"
                    />
                    <path
                        d="M33.3672 36.0536C32.8743 35.8807 32.3347 36.14 32.1617 36.6328C31.782 37.7151 30.8879 38.4162 30.034 38.5581C29.6186 38.6271 29.2172 38.5655 28.8613 38.3638C28.5057 38.1622 28.1337 37.7854 27.8434 37.1216C27.6341 36.643 27.0766 36.4247 26.5981 36.634C26.1195 36.8432 25.9011 37.4009 26.1104 37.8795C26.5372 38.8553 27.1622 39.575 27.9287 40.0094C28.6949 40.4436 29.541 40.5573 30.3442 40.4239C31.9276 40.1606 33.355 38.9446 33.9464 37.259C34.1193 36.7662 33.86 36.2265 33.3672 36.0536Z"
                        fill="#202020"
                    />
                    <path
                        d="M36.0522 41.7211C36.5872 41.6758 37.1196 41.8447 37.5407 42.19C37.9613 42.5354 38.2362 43.0288 38.2964 43.5626C38.3505 44.0581 38.3997 44.5245 38.4512 45.0106C39.139 51.4871 39.816 58.0035 40.5292 64.4506C40.5694 64.7682 40.651 65.0037 40.7172 65.1087C40.7882 65.2187 40.8014 65.1909 40.8284 65.1968C40.8499 65.2084 41.3575 65.3334 42.0379 65.209C42.1875 65.1845 42.3415 65.1523 42.4949 65.1131C42.5724 65.0934 42.6485 65.0721 42.7178 65.0507C42.7557 65.0391 42.7869 65.0289 42.819 65.018C42.8323 65.0133 42.8494 65.0073 42.8598 65.0032C42.8647 65.0013 42.8699 64.9993 42.8731 64.9979C42.8738 64.9973 42.8848 64.9931 42.8528 65.0035C43.5662 64.7371 44.3489 64.7693 45.0325 65.1047C45.7159 65.4394 46.2442 66.0499 46.4975 66.7901C46.7507 67.5303 46.7069 68.3364 46.3717 69.0195C46.0368 69.7034 45.4379 70.2084 44.7108 70.4348C43.9086 70.676 43.3857 70.7561 42.708 70.8305C41.2783 70.9525 39.4942 70.9304 37.7197 69.7165C35.9109 68.4627 35.3074 66.3364 35.2385 64.8992C34.8765 58.373 34.5566 51.848 34.2241 45.3428C34.1993 44.8604 34.1747 44.3728 34.1501 43.9141C34.1196 43.3778 34.3075 42.8451 34.664 42.4339C35.0209 42.0226 35.5172 41.7665 36.0522 41.7211Z"
                        fill="#FF3938"
                    />
                    <path
                        d="M25.0099 40.2909C25.52 40.4592 25.9434 40.8238 26.1951 41.3068C26.4464 41.7897 26.5053 42.3516 26.3509 42.8663C26.2028 43.3532 26.065 43.8014 25.9178 44.28C24.0084 50.4975 22.0727 56.7499 20.1977 62.9518C20.0143 63.6289 20.0933 63.9758 20.2612 64.2625C20.4282 64.56 20.8889 64.9855 21.5647 65.3122C21.7058 65.3814 21.8552 65.447 22.0045 65.5044C22.0788 65.5331 22.1555 65.5604 22.2231 65.5824C22.2618 65.5953 22.2911 65.6043 22.3241 65.614C22.3379 65.6179 22.3536 65.6223 22.3644 65.625C22.3695 65.6262 22.3738 65.6272 22.3769 65.6278C22.376 65.6271 22.3905 65.6309 22.3534 65.6196C23.0904 65.811 23.7128 66.2867 24.0804 66.9536C24.448 67.6198 24.5309 68.4225 24.3138 69.1737C24.0966 69.925 23.5982 70.56 22.9317 70.9273C22.2651 71.2952 21.4849 71.3654 20.7594 71.1341C19.9309 70.8594 19.4616 70.619 18.8619 70.2868C17.5419 69.5268 16.166 68.4179 15.3308 66.6479C14.4726 64.8761 14.6232 62.7634 15.1717 61.293C17.3953 55.1547 19.6575 49.0325 21.8996 42.9262C22.0699 42.4616 22.2387 42.0034 22.3994 41.5621C22.5817 41.0566 22.9635 40.6402 23.4528 40.4018C23.9426 40.1635 24.4999 40.1225 25.0099 40.2909Z"
                        fill="#FF3938"
                    />
                </svg>

                <Subheading centered>
                    Ajude o Healtie a chegar em mais lugares
                </Subheading>
                <Paragraph centered>
                    Contribua com informações sobre unidades de saúde e ajude a
                    melhorar a nossa base de dados.
                    <Stack direction="row" center padding>
                        <Button variant="secondary">
                            Contribuir <ArrowUpRightIcon />
                        </Button>
                    </Stack>
                </Paragraph>
            </section>
        </div>
    )
}

const Card = ({
    icon: Icon,
    title,
    children,
}: {
    icon: React.ElementType
    title: string
    children: React.ReactNode
}) => {
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
                flex: 1,
                padding: '1.25rem',
                borderRadius: 'lg',
                backgroundColor: 'white',
            })}
        >
            <Icon size={28} />
            <h3
                className={css({
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    lineHeight: 'tight',
                    maxWidth: '30ch',
                })}
            >
                {title}
            </h3>
            <Paragraph>{children}</Paragraph>
        </div>
    )
}
