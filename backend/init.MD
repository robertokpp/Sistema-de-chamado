*Inicialize o projeto Node.js: npm init -y

*Instale as dependências principais: npm install express

*Instale as dependências de desenvolvimento: npm install -D typescript ts-node-dev @types/node @types/express @types/cors

*Inicialize o TypeScript: npx tsc --init

*Crie a estrutura inicial: src
*Crie o arquivo principal: src/server.ts

*Adicione os scripts no package.json:
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

*Inicialize o Prisma:npx prisma init

*Estrutura inicial sugerida:

*backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── routes/
│   ├── middlewares/
│   ├── types/
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── README.md