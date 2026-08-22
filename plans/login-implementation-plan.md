# Plano de Implementação: Página de Login (Atomic Design & Reuso para Cadastro)

Este plano define a arquitetura, estrutura de componentes em **Atomic Design**, configuração de estilo com **Tailwind CSS** e testes unitários com **Vitest / React Testing Library** para a tela de Login do **Code-Connect**, projetada para fácil reuso na futura tela de Cadastro.

---

## 1. 🎯 Visão Geral & Layout

A tela de login consiste em:
- **Background Temático**: Fundo escuro (`#030708` / `#0B0D0E`) com marcas d'água sutis da logo entrelaçada do Code Connect.
- **Card Central de Autenticação**: Card com bordas arredondadas e fundo escuro (`#171D1F`), dividido em 2 colunas:
  - **Coluna Esquerda (Banner)**: Imagem de destaque (`/IMG_1 - Desktop.png`) com cantos arredondados.
  - **Coluna Direita (Formulário)**:
    - Cabeçalho: Título **Login** e subtítulo **"Boas-vindas! Faça seu login."**
    - Campos: **Email ou usuário** e **Senha** com visual moderno dark.
    - Controles: Checkbox **"Lembrar-me"** e link **"Esqueci a senha"**.
    - Ação Principal: Botão verde vibrante (`#81FE88`) com texto **Login** e ícone de seta (`→`).
    - Divisor: Linha sutil com **"ou entre com outras contas"**.
    - Acesso Social: Botões para **Github** (`/Github.svg`) e **Gmail** (`/Google.svg`).
    - Rodapé: **"Ainda não tem conta? Crie seu cadastro! 📋"** com link verde em destaque.

> [!TIP]
> **Foco no Reuso (Cadastro)**: O layout base (`AuthLayout`) e a estrutura de banner (`AuthBanner`) serão desacoplados do formulário, permitindo que a futura página de Registro apenas instancie o `AuthLayout` com a nova imagem de banner e o `RegisterForm`.

---

## 2. 🧱 Arquitetura em Atomic Design

```
apps/web/src/
├── components/
│   ├── atoms/
│   │   ├── Button/           # Botão primário neon, secundário, ghost
│   │   ├── Input/            # Campo de entrada com estilos dark e focus ring
│   │   ├── Checkbox/         # Checkbox personalizado acessível
│   │   ├── SocialButton/     # Botão com ícone SVG e rótulo inferior
│   │   ├── Divider/          # Linha divisória com texto centralizado
│   │   └── Link/             # Links utilitários e links destacados em verde
│   ├── molecules/
│   │   ├── FormField/        # Label + Input + Mensagem de erro de validação
│   │   └── SocialLoginGroup/ # Grupo de botões sociais (Github + Google/Gmail)
│   ├── organisms/
│   │   ├── AuthBanner/       # Componente do banner lateral (responsivo e reutilizável)
│   │   └── LoginForm/        # Formulário completo de Login integrado
│   └── templates/
│       └── AuthLayout/       # Layout central com card split e background temático
├── pages/
│   └── LoginPage/            # Conecta AuthLayout + AuthBanner + LoginForm
```

---

## 3. 📦 Dependências e Configurações Prévias

Para suportar Tailwind CSS e a suíte de testes obrigatória (Vitest):

1. **Tailwind CSS**: Instalação do `@tailwindcss/vite` e `tailwindcss` no `apps/web`.
2. **Vitest & Testing Library**:
   - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`.
   - Criação de `setupTests.ts` para matchers do `@testing-library/jest-dom`.
   - Adição do script `"test": "vitest run"` no `package.json` de `apps/web`.

---

## 4. 📝 Arquivos Propostos

### 4.1 Configurações & Setup
#### [MODIFY] [`package.json`](file:///e:/Projetos/Code-Connect/apps/web/package.json)
- Adicionar scripts de teste e dependências (`tailwindcss`, `@tailwindcss/vite`, `vitest`, testing-library).

#### [MODIFY] [`vite.config.ts`](file:///e:/Projetos/Code-Connect/apps/web/vite.config.ts)
- Configurar plugin do Tailwind CSS e bloco `test: { environment: 'jsdom', setupFiles: './src/setupTests.ts' }`.

#### [NEW] [`src/setupTests.ts`](file:///e:/Projetos/Code-Connect/apps/web/src/setupTests.ts)
- Configurar importação de `@testing-library/jest-dom`.

#### [MODIFY] [`src/index.css`](file:///e:/Projetos/Code-Connect/apps/web/src/index.css)
- Importar diretivas do Tailwind CSS `@import "tailwindcss";` e configurar tokens de cor personalizados (dark background `#05080A`, card `#171D1F`, neon green `#81FE88`, inputs `#2B3235`, muted texts).

---

### 4.2 Átomos (`src/components/atoms/`)
#### [NEW] [`Button.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Button/Button.tsx) & [`Button.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Button/Button.test.tsx)
- Botão reutilizável com variantes (`primary` verde com texto preto, `secondary`, `ghost`), estados (`disabled`, `isLoading`) e suporte a ícones (`rightIcon`).

#### [NEW] [`Input.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Input/Input.tsx) & [`Input.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Input/Input.test.tsx)
- Input com estilos escuros, placeholder contrastante, bordas suaves e anel de foco verde.

#### [NEW] [`Checkbox.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Checkbox/Checkbox.tsx) & [`Checkbox.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Checkbox/Checkbox.test.tsx)
- Checkbox acessível estilizado com SVG de checkmark verde e rótulo associado.

#### [NEW] [`SocialButton.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/SocialButton/SocialButton.tsx) & [`SocialButton.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/SocialButton/SocialButton.test.tsx)
- Botão de login social com ícone centralizado (Github/Google) e legenda inferior ("Github", "Gmail").

#### [NEW] [`Divider.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Divider/Divider.tsx) & [`Divider.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Divider/Divider.test.tsx)
- Divisor horizontal sutil com texto centralizado opcional.

#### [NEW] [`Link.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Link/Link.tsx) & [`Link.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/atoms/Link/Link.test.tsx)
- Componente de link tipado com suporte a variantes `default`, `muted` (para "Esqueci a senha") e `highlight` (verde com ícone para "Crie seu cadastro!").

---

### 4.3 Moléculas (`src/components/molecules/`)
#### [NEW] [`FormField.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/molecules/FormField/FormField.tsx) & [`FormField.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/molecules/FormField/FormField.test.tsx)
- Combinação de Label, Input e mensagem de erro (com `htmlFor` e `aria-invalid` / `aria-describedby`).

#### [NEW] [`SocialLoginGroup.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/molecules/SocialLoginGroup/SocialLoginGroup.tsx) & [`SocialLoginGroup.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/molecules/SocialLoginGroup/SocialLoginGroup.test.tsx)
- Renderiza lado a lado os botões sociais de Github e Gmail com handlers de clique.

---

### 4.4 Organismos (`src/components/organisms/`)
#### [NEW] [`AuthBanner.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/organisms/AuthBanner/AuthBanner.tsx) & [`AuthBanner.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/organisms/AuthBanner/AuthBanner.test.tsx)
- Exibe o banner lateral com proporção adequada, bordas arredondadas e suporte a imagem customizável (preparado para trocar imagem no cadastro).

#### [NEW] [`LoginForm.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/organisms/LoginForm/LoginForm.tsx) & [`LoginForm.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/organisms/LoginForm/LoginForm.test.tsx)
- Organismo que agrupa os campos de entrada (Email/Usuário, Senha), linha de "Lembrar-me" + "Esqueci a senha", botão de submissão `Login →`, divisor, `SocialLoginGroup`, e CTA de cadastro.

---

### 4.5 Templates (`src/components/templates/`)
#### [NEW] [`AuthLayout.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/templates/AuthLayout/AuthLayout.tsx) & [`AuthLayout.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/components/templates/AuthLayout/AuthLayout.test.tsx)
- Template de layout que renderiza:
  - Fundo escuro com logos de elos Code Connect em marca d'água.
  - Card centralizado responsivo (coluna única em mobile, duas colunas em desktop).
  - Slot esquerdo: `banner` (recebe `AuthBanner`).
  - Slot direito: cabeçalho (`title`, `subtitle`) + `children` (recebe `LoginForm` ou futuramente `RegisterForm`).

---

### 4.6 Páginas (`src/pages/`) & App
#### [NEW] [`LoginPage.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/pages/LoginPage/LoginPage.tsx) & [`LoginPage.test.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/pages/LoginPage/LoginPage.test.tsx)
- Instancia `AuthLayout` passando `AuthBanner` com a imagem `/IMG_1 - Desktop.png` e o componente `LoginForm`.

#### [MODIFY] [`src/App.tsx`](file:///e:/Projetos/Code-Connect/apps/web/src/App.tsx)
- Renderizar a `LoginPage`.

---

## 5. 🧪 Plano de Verificação e Testes

1. **Testes Unitários Automatizados**:
   - Executar `pnpm --filter web test` para garantir que todos os 11 arquivos de teste passem (100% dos novos componentes cobertos).
2. **Checagem de Linter e Tipagem**:
   - Executar `pnpm --filter web lint` e `pnpm --filter web build` para validar tipos do TypeScript e regras de linter sem erros.
3. **Verificação Visual / Manual**:
   - Iniciar o servidor de desenvolvimento `pnpm --filter web dev` e verificar a renderização responsiva, cores idênticas ao design fornecido e comportamento interativo de foco, hover e formulário.

