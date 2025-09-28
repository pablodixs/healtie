'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import { Heading } from '@/components/Typography/Heading'
import { css } from '../../../styled-system/css'
import { HeroSearchBar } from '../ui/components/HeroSearchBar'

import data from '@/utils/unidades.json'
import { Link } from '@/components/Link'
import { useState } from 'react'

export default function Page() {
    const [establishmentFilter, setEstablishmentFilter] = useState<
        string | null
    >(null)

    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get('q') || ''

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        router.push(`?q=${value}`)
    }

    const filteredEstablishments = data.establishments.filter(
        (establishment) => {
            const searchTerm = query.toLowerCase()
            return (
                establishment.name.toLowerCase().includes(searchTerm) ||
                establishment.city.toLowerCase().includes(searchTerm)
            )
        }
    )

    return (
        <motion.main
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.35 }}
            className={css({
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                gap: '1rem',
                height: '95dvh',
            })}
        >
            <div
                className={css({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1ch',
                })}
            >
                <Heading>Busca </Heading>
                <AnimatePresence mode="wait">
                    {establishmentFilter && (
                        <motion.div
                            initial={{
                                width: '0ch',
                                opacity: 0,
                                filter: 'blur(8px)',
                                scale: 0.75,
                            }}
                            animate={{
                                width: 'auto',
                                opacity: 1,
                                scale: 1,
                                filter: 'blur(0px)',
                            }}
                            exit={{
                                width: '0ch',
                                opacity: 0,
                                scale: 0.75,
                                filter: 'blur(8px)',
                            }}
                        >
                            <Heading style={{ textWrap: 'nowrap' }}>
                                por {establishmentFilter}
                            </Heading>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <HeroSearchBar
                filterValue={establishmentFilter}
                onFilterChange={setEstablishmentFilter}
                autoFocus
                value={query}
                onChange={handleChange}
            />
            {filteredEstablishments.length > 0 && query && (
                <>
                    <span>{filteredEstablishments.length} resultados </span>
                    <div
                        className={css({
                            alignItems: 'flex-start',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            width: '100%',
                            maxWidth: '800px',
                        })}
                    >
                        {filteredEstablishments.map((establishment) => (
                            <Link
                                className={css({ fontSize: '1.125rem' })}
                                variant="text"
                                href={`/unidades/${establishment.cnes}`}
                                key={establishment.cnes}
                            >
                                {establishment.name} - {establishment.city}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </motion.main>
    )
}
