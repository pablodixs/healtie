import { css, cx } from '../../../styled-system/css'
import { useState, forwardRef, useId } from 'react'

export type ToggleSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ToggleProps {
    onChange?: (checked: boolean) => void
    /** Controlled checked state */
    checked?: boolean
    /** Uncontrolled initial state */
    defaultChecked?: boolean
    /** Visual label text */
    label?: string
    /** Hide the textual label but keep it accessible */
    hideLabel?: boolean
    /** Size variant */
    size?: ToggleSize
    /** Disabled state */
    disabled?: boolean
    /** Input id (auto-generated if omitted) */
    id?: string
    /** Input name for forms */
    name?: string
    /** Extra classNames to merge */
    className?: string
    /** Accessible label when no visible label provided */
    ariaLabel?: string
}

const sizeMap: Record<
    ToggleSize,
    { w: number; h: number; knob: number; translate: number }
> = {
    sm: { w: 32, h: 18, knob: 14, translate: 14 },
    md: { w: 44, h: 24, knob: 20, translate: 20 },
    lg: { w: 60, h: 34, knob: 26, translate: 26 }, // legacy size (original)
    xl: { w: 72, h: 42, knob: 34, translate: 30 },
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
    {
        onChange,
        checked: controlledChecked,
        defaultChecked,
        label,
        hideLabel = false,
        size = 'lg',
        disabled = false,
        id: providedId,
        name,
        className,
        ariaLabel,
    },
    ref
) {
    const autoId = useId()
    const id = providedId ?? `toggle-${autoId}`
    const [internalChecked, setInternalChecked] = useState<boolean>(
        defaultChecked ?? false
    )
    const isControlled = controlledChecked !== undefined
    const isChecked = isControlled ? controlledChecked! : internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked
        if (!isControlled) setInternalChecked(value)
        onChange?.(value)
    }

    const { w, h, knob, translate } = sizeMap[size]

    const toggleStyles = css({
        position: 'relative',
        display: 'inline-block',
        width: `${w}px`,
        height: `${h}px`,
        verticalAlign: 'middle',
        userSelect: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',

        '& input': {
            opacity: 0,
            width: 0,
            height: 0,
            margin: 0,
            position: 'absolute',
            inset: 0,
            cursor: 'inherit',

            _focusVisible: {
                '& + .slider': {
                    outline: '2px solid token(colors.tint)',
                    outlineOffset: '2px',
                },
            },
            _checked: {
                '& + .slider': {
                    backgroundColor: 'tint',
                    _before: {
                        transform: `translateX(${translate}px)`,
                    },
                },
            },
            _disabled: {
                '& + .slider': {
                    opacity: 0.5,
                    cursor: 'not-allowed',
                },
            },
        },

        '& .slider': {
            position: 'absolute',
            cursor: 'inherit',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
            transition: 'background-color .25s, box-shadow .25s',
            _before: {
                position: 'absolute',
                content: '""',
                height: `${knob}px`,
                width: `${knob}px`,
                left: `${(h - knob) / 2}px`,
                bottom: `${(h - knob) / 2}px`,
                backgroundColor: 'white',
                transition: 'transform .25s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
            },
        },
        '& .round': {
            borderRadius: `${h}px`,
            _before: { borderRadius: '50%' },
        },
    })

    const wrapper = css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        justifyContent: 'space-between',
        width: '100%',
    })

    const labelClass = css({
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...(hideLabel && {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
            color: 'primary',
        }),
    })

    const accessibleLabel = !hideLabel ? label : ariaLabel || label

    return (
        <span className={wrapper}>
            {label && (
                <label htmlFor={id} className={labelClass}>
                    {label}
                </label>
            )}
            <label className={cx(toggleStyles, className)}>
                <input
                    ref={ref}
                    id={id}
                    name={name}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleChange}
                    disabled={disabled}
                    aria-checked={isChecked}
                    aria-label={accessibleLabel}
                    role="switch"
                />
                <span className="slider round" aria-hidden="true" />
            </label>
        </span>
    )
})

Toggle.displayName = 'Toggle'
