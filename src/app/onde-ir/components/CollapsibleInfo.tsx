'use client'

import { useState } from 'react'
import { css } from '../../../../styled-system/css'

interface CollapsibleInfoProps {
    title: string
    content: string
}

export function CollapsibleInfo({ title, content }: CollapsibleInfoProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={collapsibleInfoContainer}>
            <button onClick={() => setIsOpen(!isOpen)}>{title}</button>
            {isOpen && <div>{content}</div>}
        </div>
    )
}

const collapsibleInfoContainer = css({
    overflow: 'hidden',

    '& button': {
        width: '100%',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        padding: '1rem 0',
        color: '#151515',
        fontWeight: 500,
    },

    '& div': {
        padding: '1rem 0',
        color: '#0009',
    },
})
