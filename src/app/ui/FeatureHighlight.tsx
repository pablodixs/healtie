import Image from 'next/image'
import { css } from '../../../styled-system/css'

import { Button } from '@/components/Button'
import { Stack } from '@/components/Stacks'
import { Paragraph } from '@/components/Typography/Paragraph'
import { Subheading } from '@/components/Typography/Subheading'
import { ArrowRightIcon, CompassIcon } from '@phosphor-icons/react/dist/ssr'

export function FeatureHighlight() {
    return (
        <section className={featureContainer}>
            <Image
                src={'/pictures/onde_ir_illustration.png'}
                alt="Ilustração de onde ir"
                width={500}
                height={321}
                quality={100}
                style={{ borderRadius: 12 }}
            />
            <div
                className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                })}
            >
                <div>
                    <span
                        className={css({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.25rem',
                            color: 'tint',
                            fontWeight: '500',
                            mb: '0.25rem',
                        })}
                    >
                        <CompassIcon weight="fill" size={18} />
                        Onde Ir?
                    </span>
                    <Subheading>
                        Saiba em qual unidade de saúde <br /> você deve ir
                    </Subheading>
                    <Paragraph compact>
                        Saber para onde ir na hora certa faz toda a diferença.
                        Responda algumas perguntas e descubra qual unidade de
                        saúde é a mais indicada para o seu caso, garantindo um
                        atendimento mais rápido e adequado.
                    </Paragraph>
                </div>
                <Stack direction="row">
                    <Button variant="secondary">
                        Descobrir agora <ArrowRightIcon />
                    </Button>
                    <Button variant="text">Saiba mais</Button>
                </Stack>
            </div>
        </section>
    )
}

const featureContainer = css({
    margin: '2rem auto',
    width: 'fit-content',
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    gap: '2rem',
    padding: {
        base: '1rem',
        md: 0,
    },

    '& img': {
        maxWidth: '400px',
        width: { base: '100%', md: '40%' },
        borderRadius: 12,
        objectFit: 'cover',
        aspectRatio: '16/9',
        maxHeight: 'auto',
    },
})
