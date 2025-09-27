'use client'

import { motion, stagger, AnimatePresence } from 'motion/react'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/Button'
import { css } from '../../../../styled-system/css'

const optionsContainer = {
    visible: {
        width: '166px',
        opacity: 1,
        transition: {
            delay: 0.8,
            when: 'beforeChildren',
            delayChildren: stagger(0.1),
        },
    },
    hidden: {
        width: '0',
        opacity: 0,
        transition: {
            when: 'afterChildren',
        },
    },
}

const options = {
    visible: { opacity: 1, filter: 'blur(0px)', x: 0 },
    hidden: { opacity: 0, filter: 'blur(4px)', x: -100 },
}

export function HeroSearchBar() {
    return (
        <div className={heroSearchBarContainer}>
            <AnimatePresence>
                <motion.div
                    className={searchBarContainer}
                    initial={{ width: '800px' }}
                    animate={{ width: '634px' }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                >
                    <input
                        type="text"
                        placeholder="Busque por unidades de saúde, cidade ou serviços..."
                    />
                    <Button variant="secondary">
                        <MagnifyingGlassIcon size={24} weight="bold" />
                    </Button>
                </motion.div>
                <motion.div
                    className={optionCont}
                    variants={optionsContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={options} key="hospital">
                        <Button variant="subtle" iconButton>
                            <HospitalIcon size={26} />
                        </Button>
                    </motion.div>
                    <motion.div variants={options} key="ambulance">
                        <Button variant="subtle" iconButton>
                            <AmbulanceIcon size={26} />
                        </Button>
                    </motion.div>
                    <motion.div variants={options} key="first-aid">
                        <Button variant="subtle" size="large" iconButton>
                            <FirstAidIcon size={26} />
                        </Button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

const optionCont = css({
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',

    '& button': {
        maxHeight: '3.375rem',
        backgroundColor: 'background',
        color: 'primary',
        padding: '.75rem',
        borderRadius: 'full',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.1s ease-in-out',

        _hover: {
            scale: 1.05,
        },
    },
})

const heroSearchBarContainer = css({
    maxWidth: '836px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
})

const searchBarContainer = css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem 1rem',
    backgroundColor: 'background',
    padding: '.5rem',
    borderRadius: 'full',
    paddingLeft: '1.5rem',
    flex: 1,
    maxHeight: '3.375rem',

    '& input': {
        flex: 1,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        lineHeight: '1rem',
    },

    '& button': {
        backgroundColor: 'primary',
        color: 'white',
        padding: '.5rem',
        borderRadius: 'full',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.1s ease-in-out',

        _hover: {
            backgroundColor: '#202020',
        },
    },
})
