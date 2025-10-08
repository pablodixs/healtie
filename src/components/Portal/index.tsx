'use client'

import { createPortal } from 'react-dom'
import { ReactNode, useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'

export function Portal({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    return mounted
        ? createPortal(
              <AnimatePresence>{children}</AnimatePresence>,
              document.querySelector('#portal') as Element
          )
        : null
}
