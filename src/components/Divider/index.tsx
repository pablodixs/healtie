interface DividerProps {
    margin?: 'compact' | 'normal' | 'spacious'
}

export function Divider({ margin = 'normal' }: DividerProps) {
    return (
        <hr
            style={{
                margin:
                    margin === 'compact'
                        ? '1rem 0'
                        : margin === 'spacious'
                          ? '3rem 0'
                          : '2rem 0',
                color: 'rgba(0,0,0, 0.05)',
                width: '100%',
            }}
        />
    )
}
