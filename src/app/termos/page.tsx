import { css } from '../../../styled-system/css'

const sections = [
    ['aceitacao', 'Aceitação dos Termos'],
    ['sobre', 'Sobre o Healtie'],
    ['saude', 'Informações de saúde e emergências'],
    ['dados', 'Fontes e precisão das informações'],
    ['uso', 'Uso permitido'],
    ['contas', 'Contas de usuário'],
    ['contribuicoes', 'Contribuições da comunidade'],
    ['menores', 'Uso por menores'],
    ['terceiros', 'Geolocalização e serviços de terceiros'],
    ['propriedade', 'Propriedade intelectual'],
    ['disponibilidade', 'Disponibilidade e alterações'],
    ['responsabilidade', 'Responsabilidades'],
    ['privacidade', 'Privacidade e dados pessoais'],
    ['alteracoes', 'Alterações destes Termos'],
    ['lei', 'Lei aplicável e foro'],
    ['contato', 'Contato'],
] as const

const page = css({
    width: '100%',
    maxWidth: '1100px',
    marginX: 'auto',
    paddingX: { base: '1rem', md: '2rem' },
    paddingTop: { base: '2rem', md: '4rem' },
    paddingBottom: { base: '5rem', md: '8rem' },
})

const header = css({
    maxWidth: '70ch',
    marginBottom: { base: '2.5rem', md: '4rem' },
})

const eyebrow = css({
    color: 'neutral.500',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '.75rem',
})

const title = css({
    color: '#151515',
    fontSize: { base: '2.25rem', md: '3rem' },
    fontWeight: 570,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
    textWrap: 'balance',
})

const introduction = css({
    color: 'neutral.600',
    fontSize: { base: '1rem', md: '1.125rem' },
    lineHeight: 1.6,
    marginTop: '1.25rem',
})

const layout = css({
    display: { base: 'block', lg: 'grid' },
    gridTemplateColumns: '250px minmax(0, 1fr)',
    gap: { lg: '4rem' },
    alignItems: 'start',
})

const summary = css({
    backgroundColor: 'neutral.50',
    borderRadius: '12px',
    padding: '1.25rem',
    marginBottom: { base: '3rem', lg: 0 },
    position: { lg: 'sticky' },
    top: { lg: '6.5rem' },

    '& h2': {
        color: 'primary',
        fontSize: '1rem',
        fontWeight: 570,
        marginBottom: '.75rem',
    },

    '& ol': {
        display: 'grid',
        gap: '.15rem',
        listStyle: 'none',
    },

    '& a': {
        color: 'neutral.600',
        display: 'block',
        fontSize: '0.875rem',
        lineHeight: 1.35,
        paddingY: '.4rem',
        textDecoration: 'none',
        textUnderlineOffset: '4px',

        _hover: {
            color: 'primary',
            textDecoration: 'underline',
        },

        _focusVisible: {
            outline: '2px solid',
            outlineColor: 'tint',
            outlineOffset: '3px',
            borderRadius: '4px',
        },
    },
})

const article = css({
    maxWidth: '70ch',
    minWidth: 0,

    '& section': {
        marginBottom: { base: '3rem', md: '4rem' },
        scrollMarginTop: '7rem',
    },

    '& h2': {
        color: '#151515',
        fontSize: { base: '1.5rem', md: '1.75rem' },
        fontWeight: 570,
        letterSpacing: '-0.025em',
        lineHeight: 1.2,
        marginBottom: '1rem',
        textWrap: 'balance',
    },

    '& p, & li': {
        color: 'primary',
        fontSize: '1rem',
        lineHeight: 1.65,
        overflowWrap: 'break-word',
    },

    '& p + p': {
        marginTop: '1rem',
    },

    '& ul': {
        display: 'grid',
        gap: '.75rem',
        listStyleType: 'disc',
        paddingInlineStart: '1.4rem',
        marginTop: '1rem',
    },

    '& a': {
        color: 'tint',
        fontWeight: 500,
        textDecoration: 'underline',
        textDecorationSkipInk: 'auto',
        textUnderlineOffset: '3px',

        _focusVisible: {
            outline: '2px solid',
            outlineColor: 'tint',
            outlineOffset: '3px',
            borderRadius: '2px',
        },
    },

    '& strong': {
        fontWeight: 570,
    },
})

const alert = css({
    backgroundColor: 'red.50',
    borderInlineStart: '4px solid',
    borderColor: 'red.500',
    borderRadius: '8px',
    padding: '1rem',
    marginY: '1.25rem',
})

export default function TermsPage() {
    return (
        <main className={page} id="conteudo-principal">
            <header className={header}>
                <p className={eyebrow}>Legal</p>
                <h1 className={title}>Termos de Uso do Healtie</h1>
                <p className={introduction}>
                    Estes Termos estabelecem as regras para acessar e utilizar o
                    Healtie. Leia o documento com atenção antes de usar a
                    plataforma.
                </p>
                <p className={eyebrow}>Vigência: 14 de agosto de 2026</p>
            </header>

            <div className={layout}>
                <nav className={summary} aria-labelledby="titulo-sumario">
                    <h2 id="titulo-sumario">Neste documento</h2>
                    <ol>
                        {sections.map(([id, label]) => (
                            <li key={id}>
                                <a href={`#${id}`}>{label}</a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <article className={article}>
                    <section id="aceitacao">
                        <h2>1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar ou usar o site, as funcionalidades e os
                            serviços do Healtie, você declara que leu, entendeu e
                            concorda com estes Termos de Uso. Caso não concorde,
                            não utilize a plataforma.
                        </p>
                        <p>
                            O Healtie é operado por <strong>51.053.249 PABLO DIAS
                            DOS SANTOS SOARES - ME</strong>, inscrita no CNPJ sob o
                            nº <strong>51.053.249/0001-04</strong>, denominada
                            “Healtie” neste documento.
                        </p>
                    </section>

                    <section id="sobre">
                        <h2>2. Sobre o Healtie</h2>
                        <p>
                            O Healtie é uma plataforma gratuita e informativa
                            que ajuda pessoas a localizar e consultar
                            estabelecimentos e serviços de saúde. A plataforma
                            pode apresentar mapas, endereços, telefones,
                            horários, tipos de atendimento, indicadores e
                            relatos da comunidade.
                        </p>
                        <p>
                            O Healtie é uma iniciativa independente. Não integra,
                            representa, opera em nome ou mantém vínculo oficial
                            com o Sistema Único de Saúde (SUS), o Ministério da
                            Saúde, o DATASUS, o CNES ou os estabelecimentos
                            exibidos, salvo quando houver informação expressa em
                            sentido contrário.
                        </p>
                    </section>

                    <section id="saude">
                        <h2>3. Informações de saúde e emergências</h2>
                        <p>
                            O Healtie <strong>não presta atendimento médico, não
                            realiza diagnóstico ou triagem clínica e não indica
                            tratamento</strong>. Questionários, filtros,
                            classificações, sugestões de unidades e outros
                            conteúdos têm finalidade exclusivamente informativa
                            e não substituem a avaliação de um profissional de
                            saúde.
                        </p>
                        <div className={alert}>
                            <p>
                                <strong>Em caso de urgência ou emergência, não
                                espere uma resposta da plataforma.</strong>{' '}
                                Procure atendimento médico imediatamente ou
                                ligue gratuitamente para o SAMU pelo número 192.
                            </p>
                        </div>
                        <p>
                            Consulte as orientações oficiais sobre o serviço na{' '}
                            <a
                                href="https://www.gov.br/saude/pt-br/composicao/saes/samu-192"
                                target="_blank"
                                rel="noreferrer"
                            >
                                página do SAMU 192 no Ministério da Saúde
                            </a>
                            . Decisões relacionadas à sua saúde devem considerar
                            suas circunstâncias individuais e, sempre que
                            necessário, orientação profissional.
                        </p>
                    </section>

                    <section id="dados">
                        <h2>4. Fontes e precisão das informações</h2>
                        <p>
                            Parte das informações exibidas é obtida de bases
                            públicas, incluindo o Cadastro Nacional de
                            Estabelecimentos de Saúde (CNES) e serviços do
                            DATASUS. Outros dados podem vir de estabelecimentos,
                            provedores de mapas e contribuições da comunidade.
                        </p>
                        <p>
                            Embora busquemos apresentar informações úteis e
                            atualizadas, dados de terceiros podem estar
                            incompletos, indisponíveis, desatualizados ou
                            incorretos. O Healtie não garante horários,
                            localização, disponibilidade de profissionais,
                            medicamentos ou serviços, nível de lotação, tempo de
                            espera ou capacidade de atendimento. Confirme as
                            informações diretamente com o estabelecimento antes
                            de se deslocar ou tomar uma decisão.
                        </p>
                    </section>

                    <section id="uso">
                        <h2>5. Uso permitido</h2>
                        <p>Ao utilizar o Healtie, você se compromete a:</p>
                        <ul>
                            <li>usar a plataforma de forma lícita, ética e compatível com sua finalidade;</li>
                            <li>não interferir na segurança, disponibilidade ou funcionamento do serviço;</li>
                            <li>não acessar sistemas ou dados sem autorização, nem tentar contornar limitações técnicas;</li>
                            <li>não utilizar automação para extrair, copiar ou sobrecarregar a plataforma em desacordo com a lei ou sem autorização;</li>
                            <li>não se passar por outra pessoa ou apresentar vínculo inexistente com uma instituição.</li>
                        </ul>
                    </section>

                    <section id="contas">
                        <h2>6. Contas de usuário</h2>
                        <p>
                            Se o Healtie disponibilizar contas, você deverá
                            fornecer informações verdadeiras e atualizadas,
                            proteger suas credenciais e comunicar prontamente
                            qualquer uso não autorizado. Você será responsável
                            pelas atividades realizadas em sua conta, na medida
                            permitida pela legislação.
                        </p>
                        <p>
                            Poderemos restringir ou suspender uma conta quando
                            houver indícios de fraude, risco à segurança,
                            violação destes Termos ou obrigação legal, garantindo
                            meios razoáveis de contestação quando aplicável.
                        </p>
                    </section>

                    <section id="contribuicoes">
                        <h2>7. Contribuições da comunidade</h2>
                        <p>
                            O Healtie poderá permitir o envio de avaliações,
                            relatos, comentários, correções e outras informações.
                            Você é responsável pelo conteúdo que enviar e declara
                            possuir os direitos e autorizações necessários para
                            compartilhá-lo.
                        </p>
                        <p>Não envie conteúdo:</p>
                        <ul>
                            <li>falso, enganoso, ofensivo, discriminatório, ameaçador, ilegal ou meramente publicitário;</li>
                            <li>que viole direitos autorais, imagem, honra, privacidade ou outros direitos de terceiros;</li>
                            <li>que contenha dados pessoais, prontuários ou informações médicas capazes de identificar terceiros;</li>
                            <li>que exponha profissionais, pacientes ou acompanhantes de maneira indevida.</li>
                        </ul>
                        <p>
                            Você mantém a autoria de sua contribuição e concede
                            ao Healtie uma licença gratuita, não exclusiva,
                            mundial e válida durante o prazo de proteção dos
                            respectivos direitos para armazenar, reproduzir,
                            adaptar, organizar, moderar, anonimizar, agregar,
                            exibir e distribuir o conteúdo na plataforma e em
                            materiais diretamente relacionados ao serviço.
                        </p>
                        <p>
                            Podemos analisar, recusar, ocultar, anonimizar ou
                            remover contribuições para proteger usuários e
                            terceiros, cumprir a lei ou aplicar estes Termos. Uma
                            denúncia, remoção ou decisão de moderação poderá ser
                            contestada pelo e-mail indicado na seção de contato.
                        </p>
                    </section>

                    <section id="menores">
                        <h2>8. Uso por menores</h2>
                        <p>
                            Menores de idade podem consultar o Healtie com o
                            acompanhamento de seus pais ou responsáveis legais.
                            O responsável deve supervisionar contribuições,
                            criação de conta e qualquer decisão relacionada à
                            saúde. A plataforma não deve ser utilizada por
                            menores para substituir a orientação de um adulto ou
                            profissional de saúde.
                        </p>
                    </section>

                    <section id="terceiros">
                        <h2>9. Geolocalização e serviços de terceiros</h2>
                        <p>
                            Com sua autorização, o Healtie pode usar a localização
                            disponibilizada pelo seu dispositivo para ordenar
                            resultados, calcular distâncias e mostrar unidades
                            próximas. Você pode negar ou revogar essa permissão
                            nas configurações do navegador ou dispositivo, embora
                            algumas funcionalidades possam ficar limitadas.
                        </p>
                        <p>
                            Mapas, rotas, análises, links e outros recursos podem
                            ser fornecidos por terceiros e estão sujeitos aos
                            respectivos termos e políticas. O Healtie não controla
                            o conteúdo, a disponibilidade ou as práticas desses
                            serviços externos.
                        </p>
                    </section>

                    <section id="propriedade">
                        <h2>10. Propriedade intelectual</h2>
                        <p>
                            A marca Healtie, sua identidade visual, interface,
                            textos, ilustrações, software e demais conteúdos
                            próprios são protegidos pela legislação aplicável.
                            Estes Termos concedem apenas uma autorização pessoal,
                            limitada, revogável e não transferível para usar a
                            plataforma conforme sua finalidade.
                        </p>
                        <p>
                            Bases públicas e conteúdos de terceiros permanecem
                            sujeitos às regras de suas fontes e respectivos
                            titulares. Nenhuma disposição transfere ao Healtie
                            direitos que pertençam a terceiros.
                        </p>
                    </section>

                    <section id="disponibilidade">
                        <h2>11. Disponibilidade e alterações do serviço</h2>
                        <p>
                            O Healtie poderá corrigir, aprimorar, incluir,
                            restringir ou descontinuar funcionalidades, bem como
                            interromper temporariamente o serviço para manutenção,
                            segurança ou situações fora de seu controle. Quando
                            razoavelmente possível, mudanças relevantes serão
                            comunicadas com antecedência.
                        </p>
                    </section>

                    <section id="responsabilidade">
                        <h2>12. Responsabilidades</h2>
                        <p>
                            Dentro dos limites permitidos pela legislação, o
                            Healtie não se responsabiliza por decisões médicas,
                            deslocamentos, atrasos, indisponibilidade de
                            atendimento ou danos decorrentes de informações de
                            terceiros, contribuições de usuários, falhas de
                            conectividade ou uso da plataforma em desacordo com
                            estes Termos.
                        </p>
                        <p>
                            Nada nesta seção exclui ou limita responsabilidade
                            que não possa ser afastada por lei, nem restringe
                            direitos assegurados pela legislação de defesa do
                            consumidor.
                        </p>
                    </section>

                    <section id="privacidade">
                        <h2>13. Privacidade e dados pessoais</h2>
                        <p>
                            O tratamento de dados pessoais relacionado ao Healtie
                            observa a legislação aplicável, incluindo a Lei Geral
                            de Proteção de Dados Pessoais (LGPD). Informações sobre
                            dados coletados, finalidades, compartilhamentos,
                            retenção, segurança e direitos dos titulares serão
                            detalhadas na Política de Privacidade da plataforma.
                        </p>
                    </section>

                    <section id="alteracoes">
                        <h2>14. Alterações destes Termos</h2>
                        <p>
                            Estes Termos poderão ser atualizados para refletir
                            mudanças no serviço, na legislação ou em nossas
                            práticas. A versão vigente e sua data serão mantidas
                            nesta página. Alterações materiais serão comunicadas
                            de forma destacada e entrarão em vigor na data
                            informada. O uso continuado após essa data representa
                            aceitação da versão atualizada.
                        </p>
                    </section>

                    <section id="lei">
                        <h2>15. Lei aplicável e foro</h2>
                        <p>
                            Estes Termos são regidos pelas leis da República
                            Federativa do Brasil. Fica eleito o foro de
                            Brasília/DF para resolver controvérsias, ressalvado o
                            foro do domicílio do consumidor e qualquer outro foro
                            assegurado por norma obrigatória.
                        </p>
                    </section>

                    <section id="contato">
                        <h2>16. Contato</h2>
                        <p>
                            Para dúvidas, denúncias, contestações de moderação ou
                            assuntos relacionados a estes Termos, escreva para{' '}
                            <a href="mailto:contanto@healtie.app">
                                contanto@healtie.app
                            </a>
                            .
                        </p>
                    </section>
                </article>
            </div>
        </main>
    )
}
