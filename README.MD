
# APIREST-ALY

## Descrição

Projeto APIREST-ALY é uma aplicação Node.js utilizando Express e PostgreSQL, incluindo migrações de banco de dados, testes automatizados, documentação de API via Swagger e Domain-Driven Design (DDD).

## Pré-requisitos

- Node.js versão 20.13.1
- PostgreSQL

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/jrgomessep/apirest-aly.git
    cd apirest-aly
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Gere o arquivo `.env` a partir do exemplo:
    ```bash
    cp .env.example .env
    ```

4. Configure as variáveis de ambiente no arquivo `.env`:
    ```env
    DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
    PORT=3000
    ```

## Migrações

Para aplicar migrações em um ambiente de produção, utilize:
```bash
npx prisma migrate deploy
```

## Carregar Dados de um Arquivo XLSX

Para carregar os dados a partir de um arquivo `xlsx`, coloque o arquivo `store.xlsx` na pasta `xlsx` com o seguinte formato:

| | | | | | |
|-|-|-|-|-|-|
|StoreID|StoreName|Location|Owner|EstablishedYear|NumberOfEmployees|
|1|Burger Palace|New York, NY|Alice Johnson|2005|20|
|2|Taco Town|Los Angeles, CA|Bob Smith|2010|15|
|3|Pizza Planet|Chicago, IL|Charlie Brown|2008|25|
|4|Fry Factory|Houston, TX|Dana White|2012|10|
|5|Noodle Nest|Phoenix, AZ|Eve Black|2016|30|


E execute o script:
```bash
npm run script:data
```

## Scripts Disponíveis

- Iniciar o servidor:
    ```bash
    npm start
    ```

- Construir o projeto:
    ```bash
    npm run build
    ```

- Executar os testes:
    ```bash
    npm run test
    ```

- Assistir mudanças nos testes:
    ```bash
    npm run test:watch
    ```

- Testar arquivos staged:
    ```bash
    npm run test:staged
    ```

- Gerar relatório de cobertura de testes:
    ```bash
    npm run test:coverage
    ```

- Linting:
    ```bash
    npm run lint
    npm run lint:fix
    ```

## Documentação da API

A documentação da API pode ser visualizada em:
[http://localhost:PORTA/api-docs](http://localhost:PORTA/api-docs)

## Dependências

- @prisma/client
- express
- module-alias
- rimraf
- swagger-jsdoc
- swagger-ui-express
- xlsx

## Dependências de Desenvolvimento

- @types/express
- @types/jest
- @types/module-alias
- @types/node
- @types/supertest
- @types/swagger-jsdoc
- @types/swagger-ui-express
- @types/xlsx
- @typescript-eslint/eslint-plugin
- eslint
- eslint-config-standard-with-typescript
- eslint-plugin-import
- eslint-plugin-jest
- eslint-plugin-n
- eslint-plugin-promise
- husky
- jest
- jest-mock-extended
- lint-staged
- prisma
- supertest
- ts-jest
- typescript

## Controle de Qualidade de Código
- Commit Verification with Husky: Utilizamos o Husky para garantir que todos os commits seguem os padrões definidos.
- Pre-commit Hook with Linting: Utilizamos npx lint-staged para rodar o linting em arquivos staged antes de cada commit.
- Pre-push Hook with Test Coverage: Utilizamos npm run test:coverage para garantir que todos os testes passem e a cobertura de testes é gerada antes de cada push.
