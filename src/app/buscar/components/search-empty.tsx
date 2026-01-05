'use client'

import { motion } from 'motion/react'

import { NoResultsEmptyState } from './NoResultsEmpytState'

interface SearchEmptyProps {
    query: string
}

export function SearchEmpty({ query }: SearchEmptyProps) {
    return (
        <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
        >
            <NoResultsEmptyState query={query} />
        </motion.div>
    )
}
