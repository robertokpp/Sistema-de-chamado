# Estrutura do Frontend

Este documento descreve a organizacao da pasta `frontend` do projeto **Sistema de Chamado**.

## Visao geral

O frontend foi construido com **React**, **TypeScript** e **Vite**. A aplicacao usa **React Router** para rotas, **Axios** para comunicacao com a API e **Tailwind CSS** para estilos.

## Arvore de pastas

```txt
frontend/
|-- public/
|   `-- Logo_Favicon.png
|-- src/
|   |-- assets/
|   |   |-- Card.png
|   |   |-- Card-1.png
|   |   |-- Card-2.png
|   |   |-- Card-3.png
|   |   |-- Card-4.png
|   |   |-- Login_Background.png
|   |   |-- Logo_IconDark.svg
|   |   |-- Logo_IconLight.svg
|   |   |-- circle-help.svg
|   |   |-- logo.svg
|   |   |-- mycalls.svg
|   |   `-- newcall.svg
|   |-- components/
|   |   |-- Aside.tsx
|   |   |-- Button.tsx
|   |   |-- Header.tsx
|   |   |-- Inputs.tsx
|   |   `-- MenuLink.tsx
|   |-- pages/
|   |   |-- Calls.tsx
|   |   |-- Details.tsx
|   |   |-- NewCall.tsx
|   |   |-- SignIn.tsx
|   |   `-- SignUp.tsx
|   |-- routes/
|   |   |-- admin-router.tsx
|   |   |-- auth-router.tsx
|   |   |-- client-router.tsx
|   |   `-- index.tsx
|   |-- services/
|   |   `-- api.ts
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- .gitignore
|-- index.html
|-- package-lock.json
|-- package.json
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

## Pastas principais

### `public/`

Arquivos publicos servidos diretamente pelo Vite. Atualmente contem o favicon/logo da aplicacao.

### `src/`

Contem todo o codigo-fonte principal da aplicacao React.

### `src/assets/`

Imagens, icones e arquivos visuais usados nas telas e componentes.

### `src/components/`

Componentes reutilizaveis da interface:

- `Aside.tsx`: menu lateral da aplicacao.
- `Button.tsx`: componente de botao reutilizavel.
- `Header.tsx`: cabecalho das telas.
- `Inputs.tsx`: componente de campo/input.
- `MenuLink.tsx`: link usado no menu de navegacao.

### `src/pages/`

Paginas principais da aplicacao:

- `Calls.tsx`: listagem/visualizacao de chamados.
- `Details.tsx`: detalhes de um chamado.
- `NewCall.tsx`: criacao de novo chamado.
- `SignIn.tsx`: tela de login.
- `SignUp.tsx`: tela de cadastro.

### `src/routes/`

Configuracao das rotas da aplicacao:

- `index.tsx`: define o roteador principal e seleciona qual grupo de rotas carregar.
- `auth-router.tsx`: rotas de autenticacao.
- `client-router.tsx`: rotas para usuario cliente.
- `admin-router.tsx`: rotas para usuario administrador.

### `src/services/`

Servicos externos e configuracoes de comunicacao:

- `api.ts`: instancia do Axios configurada com a URL base do backend.

## Arquivos principais

- `src/main.tsx`: ponto de entrada da aplicacao React.
- `src/App.tsx`: componente raiz que renderiza as rotas.
- `src/index.css`: estilos globais da aplicacao.
- `index.html`: HTML base usado pelo Vite.
- `package.json`: dependencias e scripts do frontend.
- `vite.config.ts`: configuracao do Vite.
- `tsconfig*.json`: configuracoes do TypeScript.

## Scripts disponiveis

```bash
npm run dev
npm run build
npm run preview
```

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: gera a versao de producao.
- `npm run preview`: abre uma previa local do build de producao.
