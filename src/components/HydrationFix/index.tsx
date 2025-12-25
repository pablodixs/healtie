'use client'

import { useEffect } from 'react'

/**
 * Este componente remove atributos injetados por browser extensions
 * que causam erros de hidratação, especialmente de password managers
 * como Bitwarden, 1Password, LastPass, etc.
 */
export function HydrationFix() {
    useEffect(() => {
        // Remove atributos conhecidos de extensions após a hidratação
        const removeExtensionAttributes = () => {
            // Pattern de atributos injetados por extensions
            const extensionAttrs = [
                'bis_register', // Bitwarden
                'data-1p-ignore', // 1Password
                'data-lpignore', // LastPass
                'data-form-type', // LastPass
                'autocorrect',
                'autocapitalize',
                'data-lastpass',
                '__processed_', // Pode ser do Bitwarden
            ]

            // Percorre todos os atributos do body e remove os conhecidos
            const body = document.body
            const attrs = Array.from(body.attributes)

            attrs.forEach((attr) => {
                const attrName = attr.name.toLowerCase()
                if (
                    extensionAttrs.some(
                        (ext) =>
                            attrName.includes(ext) || attrName.startsWith('_')
                    )
                ) {
                    body.removeAttribute(attr.name)
                }
            })

            // Limpa também atributos de elementos input
            document.querySelectorAll('input').forEach((input) => {
                const inputAttrs = Array.from(input.attributes)
                inputAttrs.forEach((attr) => {
                    const attrName = attr.name.toLowerCase()
                    if (
                        extensionAttrs.some(
                            (ext) =>
                                attrName.includes(ext) ||
                                attrName.startsWith('_')
                        )
                    ) {
                        input.removeAttribute(attr.name)
                    }
                })
            })
        }

        // Executa após a hidratação estar completa
        // Pequeno delay para garantir que tudo foi renderizado
        const timer = requestAnimationFrame(() => {
            removeExtensionAttributes()
        })

        return () => {
            cancelAnimationFrame(timer)
        }
    }, [])

    return null
}
