'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import { styles } from './styles'
import { AsideEstablishmentDetails } from './components/AsideEstablishmentDetails'
import { AsideDefault } from './components/AsideDefaultState'

export default function Page() {
    const param = useSearchParams()
    const establishmentCnes = param.get('establishment')

    return (
        <LayoutGroup id="aside">
            <motion.section
                layout
                transition={{
                    layout: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                    },
                }}
                className={styles}
            >
                <AnimatePresence mode="wait">
                    {establishmentCnes ? (
                        <AsideEstablishmentDetails
                            selectedEstablishmentCnes={establishmentCnes}
                        />
                    ) : (
                        <AsideDefault />
                    )}
                </AnimatePresence>
            </motion.section>
        </LayoutGroup>
    )
}
