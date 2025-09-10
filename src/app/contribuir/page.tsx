import Link from 'next/link'

import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { css } from '../../../styled-system/css'

export default function Page() {
    return (
        <main>
            <Heading centered>Contribua com o Healtie</Heading>
            <section
                className={css({
                    mt: '1.5rem',
                    display: 'grid',
                    gap: '1rem',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px, 1fr))',
                })}
            >
                <Link
                    href="/contribuir/estabelecimentos"
                    className={css({
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '.5rem',
                        borderRadius: '0.75rem',
                        backgroundColor: 'white',
                        border: '1px solid',
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#202020',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: 450,
                        fontSize: '1.125rem',
                        minWidth: '100px',
                        transition: 'all ease 0.1s',

                        _hover: {
                            borderColor: 'rgba(0, 0, 0, 0.25)',
                        },
                    })}
                >
                    {/* {imageUrl && (
                        <Image
                            src={option.imageUrl}
                            alt={option.label}
                            width={320}
                            height={200}
                            className={css({
                                width: '100%',
                                height: '120px',
                                objectFit: 'cover',
                                aspectRatio: '1/1',
                                borderRadius: 'calc(1rem - 0.5rem)',
                            })}
                            quality={100}
                        />
                    )} */}
                    <span
                        className={css({
                            mt: '.75rem',
                            lineHeight: 'tight',
                        })}
                    >
                        Estabelecimentos
                    </span>
                    <Paragraph size="caption" subtle>
                        Indique um estabelecimento ou corrija informações
                        incorretas
                    </Paragraph>
                </Link>
            </section>
        </main>
    )
}
