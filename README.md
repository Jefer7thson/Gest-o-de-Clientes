
# Executando o Projeto Localmente

## Pré-requisitos:

- **Node.js** (versão v16.20.0 ou superior)
- **Npm** (versão 8.19.4 ou superior)
- **Postgres** (versão 16.2)

## Instalação das Dependências

1. Clone o repositório do projeto para sua máquina: git clone https://github.com/seu-usuario/seu-repositorio.git

2. Acesse o diretório do projeto:
- cd seu-repositorio

3. Instale as dependências do projeto:
- npm install


## Rodando o Projeto

- Inicie o servidor de desenvolvimento nas duas pastas primeiro -> **BACKEND** depois **FRONTEND**:
- npm start

O projeto estará disponível em http://localhost:3001/.

## DDL da Tabela do Banco de Dados

## Consultas SQL na API

- SELECT * FROM usuarios;

## Obter usuário por ID:

- SELECT * FROM usuarios WHERE id = ?;

## Inserir novo usuário:

- INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);

## Atualizar usuário por ID:

- UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?;

## - Excluir usuário por ID:

- DELETE FROM usuarios WHERE id = ?;

-----------------------------------------------------------

##LINK DO VIDEO DE DEMOSTRAÇÃO: https://1drv.ms/u/s!Atry-EHGq2uxgsUTK46BFespBkONkw?e=V9IwBs 




