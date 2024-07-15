<h1 style="text-align: center;">
  DailyDietAPI 
</h1>

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Static Badge](https://img.shields.io/badge/knex-black?style=for-the-badge&logo=knexdotjs&logoColor=white&logoSize=amg&color=%23ff8144)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Static Badge](https://img.shields.io/badge/MIT-maker?style=for-the-badge&label=License&labelColor=%23303030&color=%23808080)

## Sobre o projeto
Esta API foi projetada para gerenciar o cadastro de refeições, oferecendo um conjunto completo de funcionalidades CRUD (Create, Read, Update, Delete). Ela garante a segurança dos dados através de autenticação **BasicAuth**, assegurando que apenas usuários autorizados possam acessar e manipular as informações das refeições.

## Tecnologias utilizadas

### Servidor
• [Node.js](https://nodejs.org/en/) | • [Typescript](https://www.typescriptlang.org/)  | • [Fastify](https://fastify.dev/) | • [zod](https://zod.dev/)

### Banco de Dados
• [Knex](https://knexjs.org/) | • [Postgres](https://www.postgresql.org/) | • [Docker](https://www.docker.com/) 

### Segurança
• [BasicAuth](https://github.com/fastify/fastify-basic-auth) | • [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)

## Como usar
Clone o projeto e execute os comandos abaixo para configurar e iniciar a API.  
De uma olhada no [.env.example](.env.example) para configurar as variáveis de ambiente. Após configurar o **.env**, execute o docker compose para iniciar o banco de dados.

```bash
npm install
```
_Instalar as dependencias da aplicação._

```bash
npm run dev
```
_O comando npm run dev iniciará o servidor localmente. Certifique-se de ter o Node.js instalado em sua máquina. url padrão http://localhost:3000_

```bash
npm run knex -- migrate:latest
```
_Executa as migrations necessárias para utilizar a API._

## API Endpoints

### user
| Rota                   | Descrição        |
|------------------------|------------------|
| <kbd>POST /user/</kbd> | Cria um usuário. |

### food
Para chamar os endpoints da API, você deve fornecer um cabeçalho de autenticação **BasicAuth** com as credenciais de usuário. 

| Rota                         | Descrição                            |
|------------------------------|--------------------------------------|
| <kbd>POST /food/</kbd>       | Cadastra uma nova transação.         |
| <kbd>GET /food/:id</kbd>     | Recupera uma transação.              |
| <kbd>GET /food/metrics</kbd> | Recupera todas as transações.        |
| <kbd>GET /food/balance</kbd> | Recupera o balanço(resumo) da conta. |
| <kbd>PUT /food/:id</kbd>     | Cadastra uma nova transação.         |
| <kbd>DELETE /food/:id</kbd>  | Cadastra uma nova transação.         |

### Schemas
#### POST /transactions/
```json
{
  "title": "string",
  "amount": "number",
  "type": "debit | credit"
}
```
_Certifique-se de fornecer dados válidos para cada campo conforme o esquema acima._



Este README fornece uma visão geral detalhada do projeto, incluindo instruções claras sobre como configurar, usar e testar a API. Se tiver alguma dúvida ou sugestão, não hesite em entrar em contato ou contribuir para o projeto!
