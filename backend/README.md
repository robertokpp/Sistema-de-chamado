# HelpDesk API

API do sistema HelpDesk desenvolvida com Node.js, Express, TypeScript, PostgreSQL e Prisma.

## Requisitos

- Node.js 20 ou superior
- PostgreSQL 15 ou superior
- npm

## Configuração local

1. Instale as dependências:

```bash
npm install
```

2. Copie `.env.example` para `.env` e ajuste os valores:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/sistema_chamados?schema=public
PORT=3333
SECRET=uma-chave-jwt-longa-e-aleatoria
APP_ORIGIN=http://localhost:5173
UPLOADS_DIR=uploads
ADMIN_PASSWORD=uma-senha-inicial-segura
TECHNICAL_DEFAULT_PASSWORD=outra-senha-inicial-segura
```

3. Gere o Prisma Client e aplique as migrations:

```bash
npm exec prisma generate
npm exec prisma migrate deploy
npm run seed
```

4. Inicie a API:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`. O endpoint `GET /health` pode ser usado para verificar a disponibilidade do serviço.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor com recarregamento automático |
| `npm run seed` | Cria os dados iniciais obrigatórios de forma idempotente |
| `npm run build` | Valida e compila o TypeScript em `dist` |
| `npm start` | Inicia o servidor em produção |
| `npm test` | Executa os testes Jest |
| `npm run test:watch` | Executa os testes em modo interativo |
| `npm run test:coverage` | Gera o relatório de cobertura |

## Testes

Os testes usam Jest e Supertest com o Prisma mockado. Isso permite validar autenticação, autorização e endpoints sem alterar o banco local.

```bash
npm test
```

Cobertura atual: autenticação, usuários, serviços, chamados e restrições por perfil.

## Deploy no Render

O passo a passo completo de publicação e solução de problemas está em [DEPLOY_RENDER.md](./DEPLOY_RENDER.md).

O arquivo `render.yaml`, localizado na raiz do repositório, define a API e o PostgreSQL. No Render:

1. Crie um **Blueprint** conectado ao repositório.
2. Confirme o arquivo `render.yaml`.
3. Informe `APP_ORIGIN` com a URL final do frontend, sem barra no final, por exemplo `https://helpdesk.vercel.app`.
4. Informe senhas seguras em `ADMIN_PASSWORD` e `TECHNICAL_DEFAULT_PASSWORD`.
5. Aguarde o build, o seed, as migrations e o health check.
6. Copie a URL pública gerada para configurar `VITE_API_URL` na Vercel.

O Render fornece `DATABASE_URL` pelo banco definido no Blueprint e gera `SECRET` automaticamente. Nunca adicione esses valores ao Git.

No plano gratuito, migrations e seed são executados antes do servidor em cada inicialização. O PostgreSQL gratuito do Render expira após 30 dias e deve ser atualizado para um plano persistente antes disso caso o projeto precise continuar disponível.

## Dados iniciais

O seed cria os registros exigidos pelo desafio sem duplicá-los em novas execuções:

- Admin: `admin@helpdesk.com`
- Técnico 1: `tecnico1@helpdesk.com`, das 08h às 12h e das 14h às 18h
- Técnico 2: `tecnico2@helpdesk.com`, das 10h às 14h e das 16h às 20h
- Técnico 3: `tecnico3@helpdesk.com`, das 12h às 16h e das 18h às 22h
- Cinco serviços iniciais

As senhas são lidas das variáveis `ADMIN_PASSWORD` e `TECHNICAL_DEFAULT_PASSWORD` e não ficam armazenadas no repositório.

## Docker

Para iniciar somente o PostgreSQL local:

```bash
docker compose up -d
```

Para construir a imagem da API:

```bash
docker build -t helpdesk-api .
```

### Uploads

Por padrão, os avatares são salvos em `UPLOADS_DIR`. O filesystem de uma instância gratuita pode ser descartado em reinicializações. Para persistência definitiva, use um serviço de armazenamento de objetos ou um disco persistente do Render e configure `UPLOADS_DIR` para o ponto de montagem.

## Segurança

- JWT obrigatório nas rotas privadas.
- Autorização baseada nos perfis `ADMIN`, `TECHNICAL` e `CLIENT`.
- CORS limitado às origens definidas em `APP_ORIGIN`.
- Senhas armazenadas com hash bcrypt.
- Upload limitado a 2 MB e aos formatos PNG, JPEG e WebP.
