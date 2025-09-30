import { Subheading } from '@/components/Typography/Subheading'

interface NoResultsEmptyStateProps {
    query: string
}

export function NoResultsEmptyState({ query }: NoResultsEmptyStateProps) {
    return (
        <div>
            <Subheading>Nenhum resultado para &ldquo;{query}&rdquo;</Subheading>
        </div>
    )
}
