# Diretrizes de Responsividade — Portfólio João Lucas

Fonte da verdade para como este projeto trata layout em diferentes tamanhos
de tela. Este documento existe porque, no estado atual do código (ver seção
4), nenhum componente tem adaptação para mobile — o layout inteiro foi
portado 1:1 do frame desktop do Figma em valores fixos de pixel.

**Regra geral, sem exceção: toda interface construída ou alterada neste
projeto precisa ser responsiva.** Nenhuma tela, seção ou componente é
considerado "pronto" se só foi validado no viewport desktop do Figma. Vale
para trabalho novo e para qualquer alteração em um componente existente.

---

## 1. Abordagem: mobile-first

Comece pelo layout mobile (menor viewport) e adicione complexidade para
telas maiores com os prefixos responsivos do Tailwind (`sm:`, `md:`, `lg:`,
`xl:`, `2xl:`) — nunca o contrário (desenhar para desktop e "encolher"
depois).

Breakpoints do projeto (padrão Tailwind — ainda não sobrescritos em
`tailwind.config.ts`; usar estes até existir uma decisão diferente
documentada):

| Breakpoint | min-width | Uso típico |
|---|---|---|
| `sm` | 640px | ajustes finos ainda em mobile (telas grandes de celular) |
| `md` | 768px | tablet / início de layout multi-coluna |
| `lg` | 1024px | onde o layout "cheio" do Figma geralmente começa |
| `xl` | 1280px | desktop grande |
| `2xl` | 1536px | telas muito largas — travar crescimento do conteúdo (`max-w`), não esticar |

Nenhum componente deve assumir que o breakpoint em que foi desenhado no
Figma (normalmente `lg`/`xl`) é o único estado possível.

## 2. Regras práticas

- **Nunca** usar `w-[Npx]` / `h-[Npx]` fixos em um container, seção ou
  wrapper que precise se adaptar ao viewport. Fixed px só é aceitável em
  elementos de tamanho intencionalmente constante em qualquer tela (ex.: um
  ícone de 24px).
- Larguras de conteúdo usam `w-full` + `max-w-*` + padding lateral fluido —
  nunca uma largura fixa sozinha.
- Grids/flex que hoje têm largura fixa por item viram `flex-wrap` ou `grid`
  com colunas que colapsam para 1 em mobile e crescem nos breakpoints
  maiores.
- Tipografia continua usando só os tokens de type scale (`display`, `h1`,
  `h2`...) — mas o mesmo elemento pode trocar de token entre breakpoints
  (ex.: um `h1` no desktop pode renderizar como `h2` em mobile) em vez de
  manter um tamanho grande demais para a tela.
- Imagens sempre via `next/image`, sem altura fixa em px que corte a imagem
  em telas estreitas — usar `aspect-ratio` + `w-full`, ou `fill` dentro de
  um container que define a proporção.
- Nenhum elemento pode forçar scroll horizontal na página — se aparecer, é
  bug bloqueante, não polimento.
- Touch targets (botões, links, itens de navegação) precisam de no mínimo
  44×44px de área clicável em qualquer breakpoint, mesmo que o conteúdo
  visual seja menor.
- Espaçamento (`gap`, `padding`, `margin`) pode — e geralmente deve —
  reduzir em mobile. Não é obrigatório manter o mesmo `gap-[87px]` do Figma
  em uma tela de 375px.
- **Texto ou conteúdo vazando para fora da borda de um card/container é
  bug bloqueante, nunca polimento — sem exceção.** Não basta não ter
  scroll horizontal na página: um card pode estar contido na página como
  um todo e ainda assim ter texto vazando visualmente por cima da própria
  borda/rounded corner dele. Antes de considerar um card pronto, teste com
  o conteúdo mais longo realista que ele vai receber (não só o texto de
  exemplo curto), no mobile.
  - Causa comum a checar: um item flex com `flex-1` mas sem `w-full`
    dentro de um wrapper que muda de `flex-col` (mobile) para
    `sm:flex-row`/`lg:flex-row` (desktop). `flex-1` só define largura
    quando o eixo principal do container é horizontal — no estado
    `flex-col` o eixo principal é vertical, então `flex-1` não segura
    largura nenhuma, e o item cresce para caber o conteúdo. Se esse
    conteúdo incluir texto com `truncate`/`whitespace-nowrap`, a
    largura “natural” dele é a frase inteira em uma linha só — o `truncate`
    não tem uma caixa para cortar e o texto vaza sem nem mostrar
    reticências. Precisa de `w-full` (ou outra largura explícita) em toda
    combinação de breakpoint, não só na que usa `flex-row`.
  - Caso real corrigido em 2026-08-26: `components/ui/ProjectCard.tsx`
    (descrição do projeto vazando para fora do card no mobile) — ver o
    comentário no componente para o diagnóstico completo.

## 3. Checklist antes de considerar um componente/seção pronto

- [ ] Testado visualmente em pelo menos 3 larguras: ~375px (mobile),
      ~768px (tablet), ~1440px (desktop)
- [ ] Nenhum valor fixo de largura/altura em px em containers de layout
      (permitido só em elementos de tamanho intencionalmente constante)
- [ ] Sem scroll horizontal em nenhum dos três breakpoints
- [ ] Texto não estoura o container nem fica ilegível em nenhum breakpoint
- [ ] Imagens mantêm proporção e não cortam conteúdo importante
- [ ] Botões/links mantêm área de toque adequada em mobile

## 4. Dívida técnica atual (levantamento, ago/2026)

Busca no código por `sm:`/`md:`/`lg:`/`xl:` não retornou nenhuma ocorrência
em `app/` ou `components/` — zero breakpoints responsivos no projeto hoje.
Pontos concretos que precisam de retrofit:

- `components/layout/Header.tsx` — header fixo com `w-[564px]`, não se
  adapta a telas estreitas.
- `components/sections/Hero.tsx` — `max-w-[1049px]`, bloco de texto
  `w-[588px]`, imagem `h-[373px] w-[374px]` fixa, `gap-[87px]`.
- `components/sections/PillarsSection.tsx` / `components/ui/PillarCard.tsx`
  — cards com `h-[328px]` fixo; em telas estreitas o texto tende a estourar
  essa altura.
- `components/ui/ProjectCard.tsx` — imagem do card com `h-[482px]` fixo.
- `app/case-studies/page.tsx` — container `max-w-[1312px]` (ok como teto,
  mas sem padding/coluna adaptada para mobile).
- `app/case-studies/[slug]/page.tsx` — múltiplos blocos fixos: header de
  `h-[97px]`, imagens de `h-[480px]`/`h-[520px]`, cards de metadado com
  `min-w-[200px]` que ainda podem empilhar mal em telas muito estreitas.

Nada disso é "erro" de quem portou — o Figma só tinha o frame desktop. Mas a
partir de agora, qualquer alteração que toque um desses arquivos precisa
sair com pelo menos aquele componente responsivo, não só a feature nova.

## 5. Relação com os design tokens

Isso não substitui a regra de tokens (ver `docs/design-tokens.md`): nunca
um hex ou tamanho solto. Responsividade não é desculpa para inventar um
valor novo fora da escala — é sobre *quando* aplicar cada token/breakpoint
do Tailwind, não sobre criar valores novos.
