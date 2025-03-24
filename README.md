# Sistema de Cadastro de Notícias com Auth JWT

Este projeto é um backend simples desenvolvido com **NestJS**, utilizando **JWT** para autenticação. O sistema permite o cadastro de autores e notícias, e inclui funcionalidades para login, CRUD de autores e gerenciamento de notícias.

## Funcionalidades

- **Login** de autores com autenticação via JWT.
- **Cadastro de autores** (nome, email, senha).
- **CRUD de notícias**:
  - Criação, leitura, atualização e remoção de notícias.
  - Filtragem de notícias por autor.

## Instalação

### Pré-requisitos

- **Node.js**
- **MySql**
- **TypeORM**

### Passos para Instalar

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/oaleekis/unews-backend
    cd unews-backend
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Crie um arquivo `.env` com base no env.example** com as seguintes variáveis de ambiente:
    ```env
    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=
    DB_DATABASE=database
    JWT_SECRET= suajwtsecret
    JWT_EXPIRATION_TIME= 3600
    ```


4. **Execute as migrações do banco de dados** para configurar as tabelas:
    ```bash
    npm run migration:run
    ```

5. **Inicie o servidor**:
    ```bash
    npm run start
    ```

## Endpoints

### 1. **Login**
- **Método**: `POST`
- **Rota**: `/auth/login`
- **Descrição**: Realiza o login de um autor e retorna um token JWT.
- **Corpo da Requisição**:
  ```json
  {
    "email": "author@example.com",
    "password": "senha123"
  }

### 2. **Cadastro de Autor**
- **Método**: `POST`
- **Rota**: `/authors`
- **Descrição**: Cria um novo Autor.
- **Corpo da Requisição**:
  ```json
  {
  "name": "Nome do Autor",
  "email": "author@example.com",
  "password": "senha123"
  }

### 3. **Gerenciamento de Notícias**
- **Método**: `POST`
- **Rota**: `/news`
- **Descrição**: Cria uma nova notícia (requer autenticação JWT).
- **Corpo da Requisição**:
  ```json
  {
  "title": "Título da Notícia",
  "content": "Conteúdo da notícia"
  }

- **Método**: `GET`
- **Rota**: `/news`
- **Descrição**: Lista todas as notícias. Aceita parâmetros de filtro.

---

- **Método**: `GET`
- **Rota**: `/news/me`
- **Descrição**: Lista todas as notícias do autor da requisição.

---

- **Método**: `GET`
- **Rota**: `/news/:id`
- **Descrição**: Retorna os detalhes de uma notícia específica.

---

- **Método**: `PUT`
- **Rota**: `/news/:id`
- **Descrição**: Atualiza os dados de uma notícia.

---

- **Método**: `DELETE`
- **Rota**: `/news/:id`
- **Descrição**: Deleta uma notícia