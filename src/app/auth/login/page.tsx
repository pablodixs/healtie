import { Heading, Paragraph } from '@/components/Typography'
import { css } from '../../../../styled-system/css'
import { Input } from '@/components/Form/Input'
import { Label } from '@/components/Form/Label'
import { Link } from '@/components/Link'
import { Button } from '@/components/Button'

export default function Page() {
    return (
        <main className={layoutStyle}>
            <div className={formContainerStyle}>
                <Heading centered>Bem-vindo de volta!</Heading>
                <Paragraph subtle centered>
                    Entre na sua conta do Healtie para continuar.
                </Paragraph>
                <form className={formStyle}>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        type="text"
                        id="email"
                        placeholder="exemplo@dominio.com"
                    />
                    <Label htmlFor="password">Senha</Label>
                    <Input
                        id="password"
                        placeholder="********"
                        type="password"
                    />
                    <footer className={formFooterStyle}>
                        <Link
                            href="/auth/recuperacao"
                            variant="textSubtle"
                            size="sm"
                        >
                            Esqueceu a senha?
                        </Link>
                        <Button variant="secondary" fullWidth>
                            Entrar
                        </Button>
                        <Button variant="subtle" fullWidth>
                            Criar uma conta
                        </Button>
                    </footer>
                </form>
            </div>
            <div className={illustrationStyle}></div>
        </main>
    )
}

const formContainerStyle = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
})

const layoutStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: 'calc(100dvh - 8.25rem)',
    gap: '2rem',
})

const formStyle = css({
    my: '2.5rem',

    '& input': {
        width: '100%',
    },
})

const formFooterStyle = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '1rem',
    mt: '1rem',
})

const illustrationStyle = css({
    backgroundColor: 'neutral.100',
    borderRadius: '12px',
    height: '100%',
    width: '100%',
})
