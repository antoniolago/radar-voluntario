# Radar Voluntário

Projeto da disciplina de Laboratório de Criação, este projeto visa criar um radar para aproximar as pessoas de projetos voluntários à sua volta.

## Pré-requisitos

- [Docker](https://www.docker.com/products/docker-desktop/)

## Rodando o projeto com Docker

```bash
docker-compose up --build
```

Acesse [http://localhost:9090](http://localhost:9090) para ver o projeto.

## Rodando o projeto sem Docker

### Pré-requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

### Banco de dados

Recomendado usar o Docker para rodar o banco de dados, mas se preferir pode instalar o [PostgreSQL](https://www.postgresql.org/) localmente.

```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=docker -d postgres
```

Utilize um client para se conectar ao banco de dados ([Postbird](https://github.com/Paxa/postbird) por exemplo) e crie um banco de dados com o nome `radar-voluntario`.

### Front-end

```
$ cd frontend
$ yarn install
$ yarn dev
```
### Back-end

```
$ cd backend
$ yarn install
$ npx prisma migrate deploy
$ yarn dev
```

Acesse [https://localhost:9090](https://localhost:9090) para ver o projeto.