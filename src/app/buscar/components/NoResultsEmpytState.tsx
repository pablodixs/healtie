import { Paragraph } from '@/components/Typography/Paragraph'
import Link from 'next/link'
import { css } from '../../../../styled-system/css'

interface NoResultsEmptyStateProps {
    query: string
}

export function NoResultsEmptyState({ query }: NoResultsEmptyStateProps) {
    return (
        <div className={container}>
            <Paragraph>Nenhum resultado para &ldquo;{query}&rdquo;</Paragraph>
            <Link className={linkStyle} href="/ajuda">
                Precisa de ajuda?
            </Link>
        </div>
    )
}

const container = css({
    width: '100%',
    maxWidth: '800px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const linkStyle = css({
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5ch',
    color: 'gray.500',
    fontSize: '0.875rem',

    _hover: {
        color: 'tint',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
    },
})
