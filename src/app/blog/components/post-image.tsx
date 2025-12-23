import Image from 'next/image'
import { css } from '../../../../styled-system/css'

export function PostImage({ src, alt }: { src: string; alt: string }) {
    return (
        <Image
            className={css({
                borderRadius: '12px',
                outline: '1px solid rgba(0, 0, 0, 0.1)',
                mt: '3rem',
            })}
            src={src}
            alt={alt}
            width={800}
            height={450}
            quality={100}
        />
    )
}
