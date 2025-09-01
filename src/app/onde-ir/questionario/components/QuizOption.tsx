import Image from 'next/image'
import { motion } from 'motion/react'

import { css } from '../../../../../styled-system/css'
import { Paragraph } from '@/components/Typography/Paragraph'
import { OptionQuestion } from '@/utils/whereToGoQuestions'

interface QuizOptionProps {
    option: OptionQuestion
    onSelect: (value: string) => void
    index: number
}

export function QuizOption({ option, onSelect, index }: QuizOptionProps) {
    return (
        <motion.button
            initial={{ opacity: 0, filter: 'blur(5px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option.value)}
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
            {option.imageUrl && (
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
            )}
            <span
                className={css({
                    mt: '.75rem',
                    lineHeight: 'tight',
                })}
            >
                {option.label}
            </span>
            <Paragraph size="caption" subtle>
                {option.description}
            </Paragraph>
        </motion.button>
    )
}
