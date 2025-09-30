'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { css } from '../../../styled-system/css'

import { Heading } from '@/components/Typography/Heading'
import { HeroSearchBar } from './components/HeroSearchBar'
import { SearchTags } from './components/SearchTags'
import { Subheading } from '@/components/Typography/Subheading'

export function HeroSearchContainer() {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false)
    return (
        <div className={heroContainer}>
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    flex: 1,
                    gap: '1.5rem',
                    textAlign: 'center',
                })}
            >
                <AnimatePresence mode="sync" initial={false}>
                    {!isSearchBarFocused && (
                        <motion.div
                            initial={{
                                height: 0,
                                opacity: 0,
                                filter: 'blur(10px)',
                                y: 20,
                            }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                filter: 'blur(0px)',
                                y: 0,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                filter: 'blur(10px)',
                                y: 20,
                            }}
                        >
                            <Image
                                src={'/pictures/doodle.png'}
                                alt=""
                                width={800}
                                height={320}
                                quality={100}
                                draggable={false}
                                priority
                            />
                            <Heading centered>
                                Seu guia na saúde pública <br /> do Distrito
                                Federal
                            </Heading>
                        </motion.div>
                    )}
                </AnimatePresence>
                <HeroSearchBar
                    isInputFocused={isSearchBarFocused}
                    onInputFocusChange={setIsSearchBarFocused}
                />
                <AnimatePresence>
                    {isSearchBarFocused && (
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                        >
                            <Subheading>Buscando...</Subheading>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <SearchTags />
        </div>
    )
}

const heroContainer = css({
    height: 'calc(100dvh - 6.25rem)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem',

    '& img': {
        base: {
            width: 'auto',
            maxWidth: '600px',
        },
        md: {
            width: '800px',
            height: 'auto',
        },
    },
})
