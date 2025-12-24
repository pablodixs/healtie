import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { css } from '../../../../styled-system/css'
import { Paragraph, Subheading } from '@/components/Typography'
import { PostToolbar } from '../components/post-toolbar'
import { PostImage } from '../components/post-image'
import { Divider } from '@/components/Divider'
import { Link } from '@/components/Link'
import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr'

const mdxComponents = {
    PostToolbar,
    PostImage,
    Divider,
}

type Props = {
    params: Promise<{
        post: string
    }>
}

export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params
    if (!resolvedParams.post) {
        return {}
    }

    const { data } = getPostBySlug(resolvedParams.post)

    if (!data) {
        return {}
    }

    return {
        title: data.title + ' | Healtie',
        description: data.description,
        openGraph: {
            title: data.title + ' | Healtie',
            description: data.description,
            type: 'article',
            images: [
                {
                    url:
                        `https://healtie.app${data.ogImage}` ||
                        `https://healtie.app/pictures/og-image.png`,
                    width: 1900,
                    height: 600,
                    alt: 'Healtie',
                },
            ],
        },
    }
}

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({
        post: post.slug,
    }))
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ post: string }>
}) {
    const resolvedParams = await params
    const slug = resolvedParams.post

    if (!slug) {
        return notFound()
    }

    const { content, data: post } = getPostBySlug(slug)

    return (
        <div className={wrapper}>
            <article>
                <header>
                    <div
                        className={css({
                            display: 'flex',
                            gap: '2rem',
                            justifyContent: 'center',
                        })}
                    >
                        <Paragraph size="caption" subtle>
                            {new Date(post.date).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </Paragraph>
                        <Paragraph size="caption">{post.category}</Paragraph>
                    </div>
                    <Subheading size="lg" centered style={{ margin: '2rem 0' }}>
                        {post.title}
                    </Subheading>
                    <Paragraph
                        centered
                        size="subheadline"
                        style={{ marginBottom: '2rem' }}
                    >
                        {post.description}
                    </Paragraph>
                </header>
                <section className={article}>
                    <MDXRemote source={content} components={mdxComponents} />
                </section>
            </article>
            <PostToolbar />
            <section
                className={css({
                    my: '3rem',
                })}
            >
                <div
                    className={css({
                        display: 'flex',
                        justifyContent: 'space-between',
                    })}
                >
                    <Subheading>Outras notícias</Subheading>
                    <Link href="/noticias" variant="text">
                        Ver mais <ArrowRightIcon weight="bold" />
                    </Link>
                </div>
            </section>
        </div>
    )
}

const wrapper = css({
    maxWidth: '800px',
    marginX: 'auto',
    paddingX: {
        base: '1rem',
        md: '0',
    },
})

const article = css({
    '& h1': {
        display: 'none',
    },

    '& p': {
        fontSize: '1rem',
        color: 'primary',
        lineHeight: 'relaxed',
        margin: '.75rem 0',
        textWrap: 'pretty',

        '& strong': {
            fontWeight: 550,
        },
    },

    '& a': {
        fontWeight: 450,
        color: '#202020',
        textDecoration: 'underline',
        textUnderlineOffset: '4px',
        textDecorationThickness: '1.5px',
        textDecorationColor: 'neutral.200',
        transition: 'all 0.1s ease-in-out',

        _hover: {
            textDecorationColor: 'neutral.300',
        },
    },

    '& h2': {
        fontSize: {
            md: '1.875rem',
            base: '1.5rem',
        },
        color: '#151515',
        fontWeight: 570,
        lineHeight: 'tight',
        letterSpacing: 'tight',
        textWrap: 'balance',
        mb: '2rem',
        mt: '4rem',
    },

    '& img': {
        borderRadius: '12px',
        boxShadow: '0 0 0 -1px rgba(0, 0, 0, 0.1)',
        marginY: '3rem',
    },

    '& ul': {
        pt: '0.25rem',
        listStyleType: 'disc',
        listStylePosition: 'inside',
        color: 'primary',
        fontWeight: 450,
    },

    '& li': {
        marginY: '0.75rem',
    },
})
