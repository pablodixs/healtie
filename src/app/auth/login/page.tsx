import { Heading, Paragraph, Subheading } from '@/components/Typography'
import { css } from '../../../../styled-system/css'
import { Input } from '@/components/Form/Input'
import { Label } from '@/components/Form/Label'
import { Link } from '@/components/Link'
import { Button } from '@/components/Button'

export default function Page() {
    return (
        <main className={layoutStyle}>
            <div>
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
                    <Link
                        href="/auth/recuperacao"
                        variant="textSubtle"
                        size="sm"
                    >
                        Esqueceu a senha?
                    </Link>
                    <div>
                        <Button size="large" variant="secondary" fullWidth>
                            Entrar
                        </Button>
                        <Button size="large" variant="subtle" fullWidth>
                            Criar uma conta
                        </Button>
                    </div>
                </form>
            </div>
            <div className={illustrationStyle}></div>
        </main>
    )
}

const layoutStyle = css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: 'calc(100dvh - 8.25rem)',
    gap: '2rem',
})

const formStyle = css({
    mt: '2.5rem',

    '& input': {
        width: '100%',
    },
})

const illustrationStyle = css({
    backgroundColor: 'neutral.100',
    borderRadius: '12px',
    height: '100%',
    width: '100%',
})
