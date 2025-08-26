import Link from 'next/link'
import { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cva } from '../../../styled-system/css'

interface NavbarLinkProps {
    children: ReactNode
    href: string
}

export function NavbarLink({ children, href }: NavbarLinkProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                transition: {
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                },
            }}
            whileTap={{
                scale: 0.98,
                transition: {
                    type: 'spring',
                    damping: 15,
                    stiffness: 600,
                },
            }}
        >
            <Link className={navbarLink()} href={href}>
                <motion.span
                    initial={{ opacity: 0.8 }}
                    whileHover={{
                        opacity: 1,
                        transition: { duration: 0.2 },
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <motion.span
                        whileHover={{
                            transition: {
                                scale: {
                                    type: 'spring',
                                    damping: 15,
                                    stiffness: 400,
                                },
                                rotate: { duration: 0.3, ease: 'easeInOut' },
                            },
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '.5rem',
                        }}
                    >
                        {children}
                    </motion.span>
                </motion.span>
            </Link>
        </motion.div>
    )
}

const navbarLink = cva({
    base: {
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '.5rem',
        borderRadius: 'full',
        lineHeight: 1,
        fontWeight: 450,
        fontSize: '0.875rem',
        color: 'primary',
        width: '100%',

        '& svg': {
            fontSize: '1.25rem',
        },

        _hover: {
            backgroundColor: 'cream',
        },
    },
})
