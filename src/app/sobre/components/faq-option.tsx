'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { PlusIcon } from '@phosphor-icons/react'

import { css } from '../../../../styled-system/css'
import { Paragraph } from '@/components/Typography'

interface FAQOptionProps {
    question: string
    answer: string
}

export function FAQOption({ question, answer }: FAQOptionProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className={container}>
            <button
                className={buttonWrapper}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <motion.div
                    initial={false}
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                >
                    <PlusIcon size={24} />
                </motion.div>
                <p>{question}</p>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isExpanded ? 'auto' : 0 }}
            >
                <AnimatePresence>
                    {isExpanded && (
                        <div className={contentContainer}>
                            <Paragraph size="subheadline" marginCompact>
                                {answer}
                            </Paragraph>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

const container = css({
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'gray.200',
    overflow: 'hidden',
})

const buttonWrapper = css({
    width: '100%',
    paddingY: '1rem',
    fontSize: '1.25rem',
    fontWeight: '500',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'color 0.1s',
    textAlign: 'left',

    '& svg': {
        marginX: '1rem',
        willChange: 'transform',
    },

    _hover: {
        color: 'tint',
    },
})

const contentContainer = css({
    paddingX: '1rem',
    paddingBottom: '1rem',
    willChange: 'transform',
})
