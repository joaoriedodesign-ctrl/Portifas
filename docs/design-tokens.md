# Design Tokens — Portfólio João Lucas (v2)

Substitui a seção de cor da referência anterior (paper quente + acentos
vermelho/azul/amarelo) por uma paleta de neutros preta/cinza com um único
acento de marca em laranja. Tipografia mantida sem alterações — ver seção
2. Espelha as coleções `Primitivas` e `Semânticas` do Figma e os arquivos
de código `design-tokens/design-tokens-colors.json`,
`styles/tokens-colors.css`, `design-tokens/design-tokens-typography.json`,
`styles/tokens-typography.css` — **propagados para o código em 2026-08-26**
(ver seção 4) junto com um retrofit de responsividade em todo componente
tocado, por exigência de `docs/diretrizes-responsividade.md`.

**Regra geral (inalterada): nunca usar valor solto (hex, tamanho de fonte,
espaçamento) em componente ou tela quando existir um token equivalente
aqui. Referenciar sempre pelo nome do token semântico. Se faltar um valor,
não inventar — sinalizar a lacuna e propor adição antes de usar.**

---

## 1. Cor

### 1.1 Primitivas

**`primary` (escala neutra) — INVERTIDA para modo escuro em 2026-08-26**

A pedido do usuário, a escala foi espelhada (50↔950, 100↔900, 200↔800,
300↔700, 400↔600, 500 no meio) para virar o site inteiro em modo escuro.
Os nomes dos degraus e todos os aliases semânticos (seção 1.2) **não**
mudaram — só o hex por trás de cada nome. Ou seja, `primary-50` deixou de
ser "o tom mais claro possível" e passou a ser o mais escuro; a coluna
"Uso sugerido" abaixo já reflete o significado novo, não o antigo.

| Token | Hex | Uso sugerido |
|---|---|---|
| `primary-50` | `#171717` | fundo mais escuro possível (background da página) |
| `primary-100` | `#242424` | superfície elevada (card sobre o background) |
| `primary-200` | `#383838` | superfície secundária / borda padrão |
| `primary-300` | `#4d4d4d` | borda em ênfase, texto desabilitado |
| `primary-400` | `#666666` | ícone secundário |
| `primary-500` | `#808080` | ponto médio da escala — uso pontual |
| `primary-600` | `#9e9e9e` | texto secundário |
| `primary-700` | `#bdbdbd` | texto sobre superfície secundária (on-surface) |
| `primary-800` | `#d6d6d6` | reservado — sem uso semântico ainda |
| `primary-900` | `#ebebeb` | texto primário, tinta principal |
| `primary-950` | `#f5f5f5` | branco de maior ênfase (ex.: hover de texto sobre CTA transparente) |

Checagem de contraste (WCAG) feita ao inverter, porque uma inversão cega
podia quebrar o botão primário: fundo `#171717` vs. `text/primary`
(`#ebebeb`) = 15:1; vs. `text/secondary` (`#9e9e9e`) = 6.7:1; `brand-500`
(laranja, inalterado) vs. `cta-primary/text` agora `#171717` (era
`#f5f5f5`) = 6.1:1 — na real *melhor* contraste que o texto claro teria
dado contra o laranja (2.7:1, abaixo do mínimo AA de 3:1). A inversão não
só funcionou como corrigiu um contraste que ficaria ruim se eu tivesse só
trocado o texto do botão para uma cor clara "óbvia" sem checar.

**`Brand` (acento)**

| Token | Hex | Uso sugerido |
|---|---|---|
| `brand-50` | `#f6f5f3` | reservado |
| `brand-100` | `#f1e9e4` | reservado |
| `brand-200` | `#ebd2c2` | reservado |
| `brand-300` | `#ebb48e` | reservado |
| `brand-400` | `#f08e4c` | estado disabled do CTA primário, se necessário |
| `brand-500` | `#ff6700` | cor de marca principal — CTA primário, links, destaque pontual |
| `brand-600` | `#c75305` | brand em hover |
| `brand-700` | `#903f09` | reservado (brand em pressed/active, se necessário) |
| `brand-800` | `#62300e` | reservado |
| `brand-900` | `#39200e` | reservado |
| `brand-950` | `#22150b` | reservado |

Valores exatamente como fornecidos (tailwind config do usuário). Tons
marcados "reservado" não têm uso semântico definido ainda — não usar em
componente sem antes definir um token semântico para eles.

**Restrição mantida:** fundos coloridos com `brand-*` são proibidos fora de
CTA, link ou destaque pontual — a marca não vira cor de fundo de seção.

### 1.2 Semânticas

**Surfaces**

| Token | Aponta para | Uso |
|---|---|---|
| `surface/background` | `primary-50` | fundo da página |
| `surface/primary` | `primary-100` | superfície elevada padrão (cards, painéis) sobre o background |
| `surface/secondary` | `primary-200` | superfície secundária/aninhada — tags, blocos dentro de um card, alternância de seção |
| `border/background` | `primary-200` | divisórias sobre o background da página |
| `border/surface-primary` | `#2e2e2e` (valor próprio, fora da escala) | contorno de cards/painéis em `surface/primary` — suavizado duas vezes 2026-08-26 (ver nota abaixo) |
| `border/surface-secondary` | `primary-300` | contorno de elementos em `surface/secondary` (ver nota 3.2) — mantido no valor original, não suavizado |
| `on-surface/primary` | `primary-900` | texto e ícones sobre `surface/primary` |
| `on-surface/secondary` | `primary-700` | texto e ícones sobre `surface/secondary` |

**Texto (uso geral, não vinculado a uma surface específica)**

| Token | Aponta para | Uso |
|---|---|---|
| `text/primary` | `primary-900` | títulos, corpo principal |
| `text/secondary` | `primary-600` | legendas, texto de apoio |
| `text/disable` | `primary-300` | texto/label de controle desabilitado — não usar para conteúdo real, só para estado disabled |

**Botões (CTA)**

| Token | Estado | Aponta para |
|---|---|---|
| `cta-primary/bg` | default | `brand-500` |
| `cta-primary/bg` | hover | `brand-600` |
| `cta-primary/text` | default | `primary-50` |
| `cta-primary/border` | default | transparente |
| `cta-secondary/bg` | default | transparente |
| `cta-secondary/bg` | hover | `primary-100` |
| `cta-secondary/border` | default | `primary-900` |
| `cta-secondary/text` | default | `primary-900` |
| `cta-transparent/bg` | default | transparente |
| `cta-transparent/bg` | hover | `primary-100` |
| `cta-transparent/border` | default | transparente |
| `cta-transparent/text` | default | `brand-500` |
| `cta-transparent/text` | hover | `brand-600` |

---

## 2. Tipografia (mantida — sem alterações)

### 2.1 Família

| Token | Valor |
|---|---|
| `font-family/heading` | Sora |
| `font-family/body` | DM Sans |

### 2.2 Peso

| Token | Valor |
|---|---|
| `font-style/heading-extrabold` | ExtraBold (800) |
| `font-style/heading-bold` | Bold (700) |
| `font-style/heading-semibold` | SemiBold (600) |
| `font-style/body-regular` | Regular (400) |
| `font-style/body-medium` | Medium (500) |
| `font-style/body-semibold` | SemiBold (600) |

### 2.3 Tamanho / line-height / letter-spacing (primitivas)

| Token | Tamanho | Line-height | Letter-spacing |
|---|---|---|---|
| `display` | 56px | 60px | -1.5px |
| `h1` | 40px | 46px | -1px |
| `h2` | 32px | 38px | -0.5px |
| `h3` | 24px | 30px | 0px |
| `h4` | 20px | 26px | 0px |
| `body-lg` | 18px | 28px | 0px |
| `body` | 16px | 26px | 0px |
| `body-sm` | 14px | 20px | 0px |
| `caption` | 12px | 16px | 0.2px |
| `label` (usa tamanho de `body-sm`) | 14px | 20px | 0.2px |

### 2.4 Text styles (escala composta, já aplicados no Figma)

| Style | Família | Peso | Tamanho / LH | Letter-spacing | Uso |
|---|---|---|---|---|---|
| `Heading/Display` | Sora | ExtraBold | 56 / 60 | -1.5px | hero, nome em destaque |
| `Heading/H1` | Sora | Bold | 40 / 46 | -1px | título de seção principal |
| `Heading/H2` | Sora | Bold | 32 / 38 | -0.5px | título de seção |
| `Heading/H3` | Sora | SemiBold | 24 / 30 | 0px | subtítulo |
| `Heading/H4` | Sora | SemiBold | 20 / 26 | 0px | subtítulo menor, título de card |
| `Body/Large` | DM Sans | Regular | 18 / 28 | 0px | intro, destaque de parágrafo |
| `Body/Base` | DM Sans | Regular | 16 / 26 | 0px | corpo padrão |
| `Body/Small` | DM Sans | Regular | 14 / 20 | 0px | texto de apoio, metadados |
| `Caption` | DM Sans | Medium | 12 / 16 | 0.2px | legendas, datas, tags |
| `Label/Button` | DM Sans | SemiBold | 14 / 20 | 0.2px | texto de botão/CTA |

Cor do texto: sempre via token semântico (`text/primary`, `text/secondary`,
`text/disable`), nunca hex direto.

---

## 2.5 Ajuste 2026-08-26 — bordas mais suaves em modo escuro

Duas rodadas, a pedido do usuário:

1. `border/surface-primary` passou de `primary-300` (diferença de 41
   contra o fill de `surface/primary`, `#242424`) para `primary-200`
   (diferença de 20) — ainda lia como contorno de contraste alto tipo
   "caixa desenhada" no modo escuro com a escala invertida.
2. Usuário pediu explicitamente "só um nível de diferença da cor
   surface" — mais sutil do que qualquer degrau nomeado da escala
   `primary` permite (o próximo degrau acima do fill já é `+20`; não
   existe um `primary-150`). `border/surface-primary` agora é um valor
   próprio, **fora da escala de primitivas documentada**: `#2e2e2e`,
   10 pontos acima do fill (`#242424`). Sinalizando isso como pede a
   regra do projeto — é um valor novo, não uma referência a um token
   primitivo existente, criado porque o pedido explicitamente exigia uma
   diferença menor do que a granularidade atual da escala oferece. Se
   isso se repetir em outro lugar, vale considerar formalizar um degrau
   intermediário na escala em vez de seguir criando valores soltos.

`border/surface-secondary` foi deixado no valor original (`primary-300`)
de propósito nas duas rodadas: nada consome esse token ainda, e a nota 2
abaixo já apontava que ele pode precisar de *mais* separação, não menos,
quando surgir um caso de uso real.

## 3. Notas de decisão (não inventar sem sinalizar)

O pedido definiu quais slots semânticos existem (surface
background/primary/secondary + borders + on-surface, CTA
primary/secondary/transparent, texto primary/secondary/disable) e qual
escala primitiva usar — mas não qual degrau exato de cada escala (50–950)
mapeia para cada slot. As escolhas da seção 1.2 seguem uma lógica de
contraste crescente (quanto mais "de fundo" o elemento, mais claro; quanto
mais "conteúdo", mais escuro), mas são uma proposta, não um dado que você
declarou. Sinalizando antes de propagar para
`design-tokens/`, `styles/*.css` e `tailwind.config.ts`:

1. `surface/primary` e `surface/secondary` em `primary-100`/`primary-200`
   — deixei o `background` mais claro que as duas superfícies para elas
   "flutuarem" visualmente sobre a página.
2. `border/surface-primary` e `border/surface-secondary` caindo no mesmo
   tom (`primary-300`) — se `secondary` precisar de uma borda mais forte
   para se diferenciar visualmente do `primary`, considerar `primary-400`
   aí.
3. `text/disable` em `primary-300` — deliberadamente mais claro que
   qualquer texto "ativo" do sistema.
4. `cta-secondary` desenhado como outline (sem preenchimento) e
   `cta-transparent` como "ghost" com texto na cor de marca — não foi
   especificado se `secondary` deveria ter preenchimento sólido; ficou como
   outline pela hierarquia usual primary > secondary > transparent.
5. Tons "reservado" na escala `Brand` (50–300, 700–950) documentados mas
   sem uso — ficam fora de componentes até surgir uma necessidade real
   (ex.: um badge ou estado de erro/sucesso que precise de um tom claro de
   brand).

## 4. Migração dos tokens antigos

| Token antigo | Novo |
|---|---|
| `bg/page` | `surface/background` |
| `bg/surface` | `surface/primary` |
| `border/default` | `border/surface-primary` |
| `border/strong` | sem correspondência direta — usar `border/surface-secondary` ou `primary-400` (ver nota 3.2) |
| `text/primary` | `text/primary` (mesmo nome, novo valor) |
| `text/secondary` | `text/secondary` (mesmo nome, novo valor) |
| `text/inverse` | `cta-primary/text` (era texto sobre o CTA vermelho; agora vive como token de botão) |
| `brand/primary` + `brand/primary-hover` | `cta-primary/bg` (default/hover) |
| `brand/secondary` + `brand/secondary-hover` | sem correspondência — o azul foi descontinuado; sinalizar antes de reintroduzir um segundo acento |
| `brand/tertiary` + `brand/tertiary-hover` | sem correspondência — o amarelo foi descontinuado |

**Atualização 2026-08-26:** o usuário confirmou os mapeamentos da seção 3
como estão (sem ajuste). Este documento foi propagado para
`design-tokens/design-tokens-colors.json`, `styles/tokens-colors.css` e
`tailwind.config.ts` — os três arquivos agora refletem a paleta v2. Os
valores de cor em `tokens-colors.css`/`tailwind.config.ts` são armazenados
como triplas "R G B" (não hex) para que os modificadores de opacidade do
Tailwind (`bg-surface-primary/60`, por exemplo) funcionem em qualquer
token; `design-tokens-colors.json` mantém hex, por ser o formato DTCG
espelhando o Figma.

Consequências que exigiram uma decisão nova, não coberta pela seção 3
(sinalizando aqui, como manda a regra do projeto):

- **Acento único:** com o antigo `brand/secondary` (azul) e `brand/tertiary`
  (amarelo) descontinuados, todo uso não-CTA desses tons virou o único
  acento (`brand-500`, "destaque pontual") — ex.: eyebrows em caption,
  `Badge`, valores de estatística.
- **`PillarCard`:** as variantes `home`/`case-study` eram diferenciadas por
  matiz (ponto azul vs. vermelho) — sem uma segunda cor, viraram
  "acento vs. neutro": `home` usa `brand-500` no número e no ponto,
  `case-study` usa a escala `on-surface` (neutra) nos dois. Proposta nova,
  não confirmada com o usuário ainda.
- **Retrofit de responsividade:** todo componente tocado nesta migração
  também saiu mobile-first (ver `docs/diretrizes-responsividade.md`),
  incluindo um mecanismo novo: `.heading-display/h1/h2/h3` em
  `tokens-typography.css` agora renderizam um degrau abaixo (`display`→`h1`,
  `h1`→`h2` etc.) abaixo de `lg` (1024px), globalmente, em vez de cada
  componente decidir isso individualmente.
- **Gap não resolvido:** `public/images/hero/hero-visual.png` é uma
  composição de pixels fixa com os blobs azul/amarelo antigos "assados" na
  imagem — trocar isso exige um novo asset de design, não um valor de
  token; sinalizado, não corrigido nesta passada.
