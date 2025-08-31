import { Paragraph } from '@/components/Typography/Paragraph'
import { css } from '../../../../styled-system/css'

export function FeatureCard({
    icon: Icon,
    title,
    children,
}: {
    icon: React.ElementType
    title: string
    children: React.ReactNode
}) {
    return (
        <div
            className={css({
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
                flex: 1,
                padding: '1.25rem',
                borderRadius: 'lg',
                backgroundColor: 'white',
            })}
        >
            <Icon size={28} />
            <h3
                className={css({
                    fontSize: '1.375rem',
                    fontWeight: 500,
                    lineHeight: 'tight',
                    maxWidth: '30ch',
                })}
            >
                {title}
            </h3>
            <Paragraph>{children}</Paragraph>
        </div>
    )
}
