# Deploy da API no Render

Este guia publica a API HelpDesk e um banco PostgreSQL no Render usando o arquivo `render.yaml` da raiz do repositório.

## URLs do projeto

- API em produção: https://helpdesk-api-fywz.onrender.com
- Health check: https://helpdesk-api-fywz.onrender.com/health
- Frontend autorizado: https://sistema-de-chamado-woad.vercel.app

## Pré-requisitos

- Repositório enviado para o GitHub.
- Conta no Render conectada ao GitHub.
- Senhas seguras para o administrador e os técnicos iniciais.

## Passo a passo

1. Acesse o [Dashboard do Render](https://dashboard.render.com/).
2. Clique em **New +** e selecione **Blueprint**.
3. Conecte o repositório `robertokpp/Sistema-de-chamado`.
4. O Render detectará o arquivo `render.yaml` na raiz.
5. Confirme a criação dos recursos `helpdesk-api` e `helpdesk-db`.
6. Preencha as variáveis marcadas como obrigatórias:

| Variável | Valor |
| --- | --- |
| `APP_ORIGIN` | `https://sistema-de-chamado-woad.vercel.app` |
| `ADMIN_PASSWORD` | Senha segura para `admin@helpdesk.com` |
| `TECHNICAL_DEFAULT_PASSWORD` | Senha provisória segura para os técnicos |

As variáveis `DATABASE_URL` e `SECRET` são configuradas automaticamente pelo Blueprint. Não salve senhas ou connection strings no Git.

7. Clique em **Apply** e aguarde o deploy.
8. Confira se o serviço apresenta o status **Live**.
9. Abra `/health` e confirme a resposta:

```json
{
  "status": "ok"
}
```

## Processo executado pelo Render

Build:

```bash
npm ci --include=dev && npm exec prisma generate && npm run build
```

Inicialização:

```bash
npm exec prisma migrate deploy && npm run seed && npm start
```

Esse processo instala as dependências de compilação, gera o Prisma Client, valida o TypeScript, aplica as migrations e cria os dados iniciais antes de iniciar a API.

## Dados iniciais

O seed cria, sem duplicar registros:

- `admin@helpdesk.com`;
- `tecnico1@helpdesk.com`;
- `tecnico2@helpdesk.com`;
- `tecnico3@helpdesk.com`;
- cinco serviços iniciais.

As senhas são obtidas de `ADMIN_PASSWORD` e `TECHNICAL_DEFAULT_PASSWORD`.

## Atualizar o deploy

Após enviar um novo commit para a branch configurada, o Render inicia um novo deploy automaticamente. Para executar manualmente, abra o serviço e selecione **Manual Deploy > Deploy latest commit**.

## Verificação de CORS

O valor de `APP_ORIGIN` deve ser exatamente a URL da Vercel, com `https://` e sem barra no final. Depois de alterar essa variável, faça um novo deploy da API.

Exemplo de teste no PowerShell:

```powershell
Invoke-WebRequest `
  -Uri "https://helpdesk-api-fywz.onrender.com/health" `
  -Headers @{ Origin = "https://sistema-de-chamado-woad.vercel.app" }
```

O cabeçalho `Access-Control-Allow-Origin` deve conter a URL do frontend.

## Problemas comuns

### Build falha no TypeScript ou Prisma

- Confirme que o Root Directory é `backend`.
- Confira se o `package-lock.json` foi enviado ao GitHub.
- Use o comando de build definido no `render.yaml`.

### Erro de conexão com o banco

- Confirme que `DATABASE_URL` está vinculada ao banco `helpdesk-db`.
- Consulte os logs das migrations no início do deploy.

### Frontend recebe erro de CORS

- Corrija `APP_ORIGIN` para a URL atual da Vercel.
- Remova a barra final da URL.
- Execute um novo deploy no Render.

### Avatares desaparecem após reiniciar

O filesystem do plano gratuito é efêmero. Para manter uploads permanentemente, configure um disco persistente ou armazenamento de objetos e ajuste `UPLOADS_DIR`.

### Serviço demora para responder

No plano gratuito, a instância pode ficar inativa. A primeira requisição após esse período pode levar alguns segundos.

