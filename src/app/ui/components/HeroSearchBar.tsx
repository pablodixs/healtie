'use client'

import {
    Dispatch,
    InputHTMLAttributes,
    SetStateAction,
    useState,
    useEffect,
} from 'react'
import { AnimatePresence, motion, stagger } from 'motion/react'
import {
    AmbulanceIcon,
    FirstAidIcon,
    HospitalIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from '@/components/Button'
import { css, cva } from '../../../../styled-system/css'

interface HeroSearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    filterValue?: string | null
    onFilterChange?: Dispatch<SetStateAction<string | null>>
    isInputFocused?: boolean
    onInputFocusChange?: Dispatch<SetStateAction<boolean>>
}

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

export function HeroSearchBar({
    filterValue,
    onFilterChange,
    onInputFocusChange,
    isInputFocused,
    ...props
}: HeroSearchBarProps) {
    const [placeholder, setPlaceholder] = useState(
        'Busque por unidades de saúde, cidade ou serviços...'
    )

    // Determinar o tipo atual baseado no filterValue ou estado padrão
    const currentFilterType = filterValue || 'default'

    // Sincronizar placeholder quando filterValue mudar externamente
    useEffect(() => {
        const placeholders = {
            HOSPITAL: 'Buscar por hospitais...',
            UPA: 'Buscar por Unidades de Pronto Atendimento...',
            UBS: 'Buscar por Unidades Básicas de Saúde...',
            default: 'Busque por unidades de saúde, cidade ou serviços...',
        }

        const newPlaceholder =
            placeholders[currentFilterType as keyof typeof placeholders] ||
            placeholders.default
        setPlaceholder(newPlaceholder)
    }, [currentFilterType])

    function handleFilterSelect(filterType: 'HOSPITAL' | 'UPA' | 'UBS') {
        const isCurrentlySelected = currentFilterType === filterType

        if (isCurrentlySelected) {
            // Desselecionar o filtro atual
            onFilterChange?.(null)
        } else {
            // Selecionar novo filtro
            onFilterChange?.(filterType)
        }
    }

    return (
        <div className={heroSearchBarContainer}>
            <AnimatePresence>
                <motion.div
                    key={'search-bar'}
                    className={searchBarContainer}
                    initial={{ width: '800px' }}
                    animate={{ width: '634px' }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                >
                    <input
                        {...props}
                        onFocus={() => onInputFocusChange?.(true)}
                        onBlur={() => onInputFocusChange?.(false)}
                        type="text"
                        placeholder={placeholder}
                    />
                    <Button variant="secondary" aria-label="Buscar">
                        <MagnifyingGlassIcon size={22} weight="bold" />
                    </Button>
                </motion.div>
                <motion.div
                    key={'options'}
                    className={optionCont}
                    variants={optionsContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={options} key="hospital">
                        <button
                            className={filterButtonSelect({
                                type:
                                    currentFilterType === 'HOSPITAL'
                                        ? 'hospital'
                                        : 'default',
                            })}
                            onClick={() => handleFilterSelect('HOSPITAL')}
                        >
                            <HospitalIcon
                                size={26}
                                weight={
                                    currentFilterType === 'HOSPITAL'
                                        ? 'fill'
                                        : 'regular'
                                }
                            />
                        </button>
                    </motion.div>
                    <motion.div variants={options} key="ambulance">
                        <button
                            className={filterButtonSelect({
                                type:
                                    currentFilterType === 'UPA'
                                        ? 'UPA'
                                        : 'default',
                            })}
                            onClick={() => handleFilterSelect('UPA')}
                        >
                            <AmbulanceIcon
                                size={26}
                                weight={
                                    currentFilterType === 'UPA'
                                        ? 'fill'
                                        : 'regular'
                                }
                            />
                        </button>
                    </motion.div>
                    <motion.div variants={options} key="first-aid">
                        <button
                            className={filterButtonSelect({
                                type:
                                    currentFilterType === 'UBS'
                                        ? 'UBS'
                                        : 'default',
                            })}
                            onClick={() => handleFilterSelect('UBS')}
                        >
                            <FirstAidIcon
                                size={26}
                                weight={
                                    currentFilterType === 'UBS'
                                        ? 'fill'
                                        : 'regular'
                                }
                            />
                        </button>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

const optionCont = css({
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
})

const filterButtonSelect = cva({
    base: {
        maxHeight: '3.375rem',
        backgroundColor: 'background',
        color: 'primary',
        padding: '.75rem',
        borderRadius: 'full',
        border: 'none',
        cursor: 'pointer',
        transition: 'scale 0.3s cubic-bezier(0.47,0,0.1,1.42)',

        _hover: {
            scale: 1.1,
        },
    },
    variants: {
        type: {
            default: {},
            UBS: {
                backgroundColor: 'tint',
                color: 'white',
            },
            hospital: {
                backgroundColor: '#9553F9',
                color: 'white',
            },
            UPA: {
                backgroundColor: '#FF5310',
                color: 'white',
            },
        },
    },
})

const heroSearchBarContainer = css({
    maxWidth: '836px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    mb: '1.5rem',
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
    zIndex: 10,

    '& input': {
        flex: 1,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        lineHeight: '1rem',
        fontSize: '1.125rem',
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
