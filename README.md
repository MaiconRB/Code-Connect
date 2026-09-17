# Code-Connect

Monorepo de uma rede social para desenvolvedores: API REST em **NestJS** e frontend em **React + Tailwind CSS**, com a UI construída em **Atomic Design** (atoms → molecules → organisms → templates → pages).

![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-workspaces-F69220?logo=pnpm&logoColor=white)

## Estrutura

Monorepo gerenciado com `pnpm workspaces`:

```
Code-Connect/
├── apps/
│   ├── api/   # Backend REST em NestJS + TypeScript + Jest
│   └── web/   # Frontend em React + Vite + Tailwind, organizado em Atomic Design
└── plans/     # Planos de implementação de features
```

No frontend, os componentes seguem Atomic Design:

```
src/components/
├── atoms/       # Button, Input, Checkbox, SocialButton, Divider, Link
├── molecules/    # FormField, SocialLoginGroup
├── organisms/    # AuthBanner, LoginForm, RegisterForm
└── templates/    # AuthLayout
```

## Funcionalidades

- Telas de **Login** e **Cadastro** com layout dark, banner lateral e login social (GitHub/Google)
- Formulários com validação e componentes 100% reutilizáveis entre Login e Cadastro
- Testes unitários dos componentes com **Vitest + Testing Library**
- API em **NestJS** com estrutura modular pronta para novos domínios (`modules/<recurso>`)

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org/) e [pnpm](https://pnpm.io/).

```bash
pnpm install

# roda API e frontend juntos
pnpm dev

# ou separadamente
pnpm api:dev   # NestJS em watch mode
pnpm web:dev   # Vite dev server
```

## Testes

```bash
pnpm web:test   # Vitest (frontend)
pnpm api:test   # Jest (backend)
```
