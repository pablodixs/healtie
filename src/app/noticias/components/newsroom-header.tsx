'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Link } from '@/components/Link'
import { css } from '../../../../styled-system/css'
import { useSearchParams } from 'next/navigation'
import { Heading } from '@/components/Typography'

const categories = [
    { label: 'Anúncios', value: 'anuncios' },
    { label: 'Atualizações', value: 'atualizacoes' },
]

export function NewsroomHeader() {
    const tab = useSearchParams().get('tab')

    return (
        <header>
            <div className={css({ overflow: 'hidden' })}>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={tab || 'newsroom-header'}
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{
                            duration: 0.25,
                            type: 'spring',
                            bounce: 0,
                        }}
                    >
                        <Heading>
                            {tab
                                ? categories.find(
                                      (category) => category.value === tab
                                  )?.label
                                : 'Newsroom'}
                        </Heading>
                    </motion.div>
                </AnimatePresence>
            </div>
            <section
                className={css({
                    marginTop: '1rem',
                    display: 'flex',
                    gap: '.5rem',
                })}
            >
                {categories.map((category) => (
                    <Link
                        key={category.value}
                        size="sm"
                        variant={
                            tab === category.value ? 'secondary' : 'bordered'
                        }
                        href={
                            tab === category.value
                                ? '/noticias'
                                : `/noticias?tab=${category.value}`
                        }
                    >
                        {category.label}
                    </Link>
                ))}
            </section>
        </header>
    )
}
