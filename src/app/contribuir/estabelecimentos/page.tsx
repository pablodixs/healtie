import { BackButton } from '@/components/Button/BackButton'
import { Heading } from '@/components/Typography/Heading'
import { Paragraph } from '@/components/Typography/Paragraph'
import { PencilIcon, PlusIcon } from '@phosphor-icons/react/dist/ssr'
import { css } from '../../../../styled-system/css'
import { Input } from '@/components/Form/Input'
import { Label } from '@/components/Form/Label'
import { stack } from '../../../../styled-system/patterns'

export default function Page() {
    return (
        <main>
            <header>
                <BackButton />
                <Heading style={{ marginTop: '1rem' }}>
                    Estabelecimentos
                </Heading>
                <Paragraph>
                    Indique um estabelecimento ou corrija informações
                    incorretas.
                </Paragraph>
                <section className={selectionGroup}>
                    <button data-active="true">
                        <PlusIcon /> Adicionar Estabelecimento
                    </button>
                    <button>
                        <PencilIcon /> Corrigir Estabelecimento
                    </button>
                    <hr />
                </section>
            </header>
            <form className={formContainer}>
                <fieldset className={fieldsetStyles}>
                    <Label htmlFor="cnes">CNES</Label>
                    <Input
                        type="number"
                        id="cnes"
                        name="cnes"
                        placeholder="CNES do estabelecimento"
                        required
                    />
                    <Label htmlFor="nome">Nome do Estabelecimento</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        placeholder="Nome do estabelecimento"
                        required
                    />
                </fieldset>
                <div>
                    <Label>Mapa</Label>
                    <div className={stack({ direction: 'row' })}>
                        <div>
                            <Label>Latitude</Label>
                            <Input
                                type="number"
                                step="any"
                                id="latitude"
                                name="latitude"
                                placeholder="000000"
                                required
                            />
                        </div>
                        <div>
                            <Label>Longitude</Label>
                            <Input
                                type="number"
                                step="any"
                                id="longitude"
                                name="longitude"
                                placeholder="000000"
                                required
                            />
                        </div>
                    </div>
                </div>
            </form>
        </main>
    )
}

const selectionGroup = css({
    '& button': {
        padding: '.5rem 0',
        marginRight: '2rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.5rem',
        fontSize: '0.875rem',
        color: '#737373ff',
        borderBottom: '1px solid transparent',
        cursor: 'pointer',

        _hover: {
            borderBottomColor: 'primary',
            color: 'primary',
        },

        '& [data-active="true"]': {
            borderBottomColor: 'primary',
            color: 'primary',
        },
    },

    '& hr': {
        borderColor: '#eee',
        mt: '-1px',
    },
})

const formContainer = css({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '1rem',
})

const fieldsetStyles = css({
    display: 'flex',
    flexDirection: 'column',
})
