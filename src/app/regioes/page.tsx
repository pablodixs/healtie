import { Divider } from '@/components/Divider'
import { Heading, Paragraph, Subheading } from '@/components/Typography'
import { css } from '../../../styled-system/css'
import { Link } from '@/components/Link'

const centroOesteAvailableCities = [
    {
        name: 'Distrito Federal',
        value: 'df',
        cities: [{ name: 'Brasília', value: 'brasilia' }],
    },
    {
        name: 'Goiás',
        value: 'go',
        cities: [
            {
                name: 'Santo Antônio do Descoberto',
                value: 'santo-antonio-do-descoberto',
            },
        ],
    },
]

export default function Page() {
    return (
        <>
            <Heading centered>Disponibilidade do Healtie</Heading>
            <Paragraph centered size="subheadline">
                Está é a lista de cidades os dados dos estabelecimentos de saúde
                estão disponíveis. <br /> Estamos trabalhando para expandir a
                disponíbilidade para mais estados do Brasil.
            </Paragraph>
            <Divider />
            <div>
                <Subheading>Centro-Oeste</Subheading>
                {centroOesteAvailableCities.map((state) => (
                    <ul className={listStyles} key={state.name}>
                        <Paragraph marginCompact bolder subtle>
                            {state.name}
                        </Paragraph>
                        {state.cities.map((city) => (
                            <li key={city.name}>
                                <Link
                                    variant="textSubtle"
                                    href={`/regioes/${state.value}/${city.value}`}
                                >
                                    {city.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </>
    )
}

const listStyles = css({
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem',
    mt: '.5rem',
    listStyle: 'inside',
})
