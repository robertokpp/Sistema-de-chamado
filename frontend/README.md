# HelpDesk Web

Frontend do HelpDesk desenvolvido com React, TypeScript, Vite e TailwindCSS.

## Requisitos

- Node.js 20 ou superior
- npm
- HelpDesk API em execução

## Configuração local

1. Instale as dependências:

```bash
npm install
```

2. Copie `.env.example` para `.env`:

```env
VITE_API_URL=http://localhost:3333
```

3. Inicie a aplicação:

```bash
npm run dev
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o Vite em desenvolvimento |
| `npm run build` | Valida o TypeScript e gera o build em `dist` |
| `npm run preview` | Visualiza localmente o build de produção |

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Defina **Root Directory** como `frontend`.
3. Mantenha o framework **Vite**.
4. Configure `VITE_API_URL` com a URL pública da API no Render, sem barra no final.
5. Faça o deploy.

O arquivo `vercel.json` direciona as rotas do React para `index.html`, permitindo atualizar ou acessar diretamente URLs internas sem receber erro 404.

Depois do primeiro deploy, copie a URL da Vercel e atualize `APP_ORIGIN` no serviço do Render. Se alterar uma variável de ambiente, faça um novo deploy para aplicar o valor ao bundle do Vite.

## Perfis

A aplicação possui interfaces separadas para:

- Administrador: gerencia técnicos, clientes, serviços e chamados.
- Técnico: acompanha chamados atribuídos e atualiza atendimentos.
- Cliente: cria chamados e acompanha o histórico.

O seed do backend cria o administrador `admin@helpdesk.com` e os técnicos `tecnico1@helpdesk.com`, `tecnico2@helpdesk.com` e `tecnico3@helpdesk.com`. As senhas iniciais são definidas de forma segura nas variáveis do backend.
