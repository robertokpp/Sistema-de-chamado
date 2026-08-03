# Deploy do frontend na Vercel

Este guia publica o frontend React/Vite do HelpDesk na Vercel e configura a comunicação com a API do Render.

## URLs do projeto

- Frontend em produção: https://sistema-de-chamado-woad.vercel.app
- API utilizada: https://helpdesk-api-fywz.onrender.com

## Pré-requisitos

- API publicada e respondendo em `/health`.
- Repositório enviado para o GitHub.
- Conta na Vercel conectada ao GitHub.

## Passo a passo

1. Acesse o [Dashboard da Vercel](https://vercel.com/dashboard).
2. Clique em **Add New > Project**.
3. Importe o repositório `robertokpp/Sistema-de-chamado`.
4. Configure o projeto:

| Campo | Valor |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Em **Environment Variables**, adicione:

```env
VITE_API_URL=https://helpdesk-api-fywz.onrender.com
```

Marque a variável para os ambientes **Production**, **Preview** e **Development**, conforme necessário.

6. Clique em **Deploy**.
7. Ao finalizar, abra a URL gerada e teste o login e as requisições à API.

## Rotas do React

O arquivo `vercel.json` contém um rewrite para `index.html`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Isso permite atualizar ou acessar diretamente páginas internas sem erro 404.

## Liberar o frontend no Render

Depois de obter a URL final da Vercel, abra o serviço da API no Render e configure:

```env
APP_ORIGIN=https://sistema-de-chamado-woad.vercel.app
```

Não use barra no final. Faça um novo deploy da API para aplicar a alteração.

## Atualizar o deploy

Novos commits na branch configurada geram deployments automaticamente. Quando uma variável `VITE_*` for alterada, é obrigatório fazer um novo deploy, pois o Vite incorpora esses valores durante o build.

Para refazer manualmente:

1. Abra **Deployments**.
2. Localize o deployment mais recente.
3. Abra o menu de opções.
4. Clique em **Redeploy**.

## Validação

Antes de considerar o deploy concluído, confirme:

- a página de login abre sem erros;
- as rotas internas continuam funcionando após atualizar a página;
- o navegador não mostra erro de CORS;
- as requisições apontam para `https://helpdesk-api-fywz.onrender.com`;
- o login retorna token e carrega a interface correspondente ao perfil.

## Problemas comuns

### O frontend tenta acessar localhost

- Confirme `VITE_API_URL` nas configurações do projeto.
- Verifique se o valor começa com `https://`.
- Execute um novo deploy após alterar a variável.

### Erro de CORS

- Confirme se `APP_ORIGIN` no Render é igual à URL da Vercel.
- Não inclua caminhos nem barra no final.
- Faça um novo deploy do backend.

### Página interna retorna 404

- Confirme que `vercel.json` está dentro da pasta `frontend`.
- Faça um novo deploy para aplicar o rewrite.

### Build falha

Execute localmente, dentro de `frontend`:

```bash
npm install
npm run build
```

Corrija os erros exibidos antes de reenviar o commit.

### API demora na primeira requisição

O Render gratuito pode suspender a API quando ela fica sem uso. A primeira chamada pode demorar enquanto o serviço reinicia.

