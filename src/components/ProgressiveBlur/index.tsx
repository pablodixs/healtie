import styles from './styles.module.css'

export function ProgressiveBlur() {
    return (
        <div className={styles.progressiveBlurContainer}>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
            <div className={styles['blur-filter']}></div>
        </div>
    )
}
