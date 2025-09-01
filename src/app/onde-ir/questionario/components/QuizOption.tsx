import Image from 'next/image'

import { css } from '../../../../../styled-system/css'
import { Paragraph } from '@/components/Typography/Paragraph'
import { OptionQuestion } from '@/utils/whereToGoQuestions'

interface QuizOptionProps {
    option: OptionQuestion
    onSelect: (value: string) => void
}

export function QuizOption({ option, onSelect }: QuizOptionProps) {
    return (
        <button
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
        </button>
    )
}
