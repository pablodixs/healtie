import { Paragraph } from '@/components/Typography'
import Link from 'next/link'
import { css } from '../../../../styled-system/css'
import Image from 'next/image'

export function PostLink({
    post,
}: {
    post: {
        slug: string
        title: string
        date: string
        category: string
        image?: string
    }
}) {
    return (
        <Link
            className={css({
                width: 'fit-content',
            })}
            href={`/noticias/${post.slug}`}
        >
            <div
                className={css({
                    width: '300px',
                    height: '300px',
                    borderRadius: '12px',
                    backgroundColor: 'neutral.100',
                    mb: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 0 0 -1px rgba(0, 0, 0, 0.1)',
                })}
            >
                {post.image && (
                    <Image
                        src={post.image}
                        alt={post.title}
                        width={300}
                        height={300}
                        quality={100}
                        className={css({
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease-in-out',
                            willChange: 'transform',

                            _hover: {
                                transform: 'scale(1.05)',
                            },
                        })}
                    />
                )}
            </div>
            <Paragraph bolder marginCompact>
                {post.title}
            </Paragraph>
            <div className={css({ display: 'flex', gap: '1rem' })}>
                <Paragraph size="caption" marginCompact>
                    {post.category}
                </Paragraph>
                <Paragraph size="caption" marginCompact subtle>
                    {new Date(post.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                    })}
                </Paragraph>
            </div>
        </Link>
    )
}
