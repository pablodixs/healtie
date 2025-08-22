import Image from 'next/image'

import { Paragraph } from '../Typography/Paragraph'
import { Heading } from '../Typography/Heading'
import { landingIntroStyles } from './styles'
import { ReactNode } from 'react'

interface LandingIntroProps {
    preTitle: string
    title: string
    description: string
    imageSrc?: string
    children?: ReactNode
}

export function LandingIntro({
    preTitle,
    title,
    description,
    imageSrc,
    children,
}: LandingIntroProps) {
    return (
        <section className={landingIntroStyles()}>
            <Paragraph bolder centered>
                {preTitle}
            </Paragraph>
            <Heading centered>{title}</Heading>
            <Paragraph subtle centered>
                {description}
            </Paragraph>
            {imageSrc && (
                <Image src={imageSrc} alt={title} width={1000} height={500} />
            )}
            {children}
        </section>
    )
}
