# Desafio - W.A.

Este projeto consiste um site para visualização de um catálogo de filmes alimentado por uma API criado também pelo autor do projeto.

## Orientações

## Para rodar o projeto, siga os seguintes passos:

### Docker

- Monte a imagem:

```
  docker build -t <NOME_DA_IMAGEM> .
```

- Inicie o container:

```
docker run -d -p 3000:3000 --name <NOME_DO_CONTAINER> <NOME_DA_IMAGEM>
```

- Acesse pelo endereço: http://localhost:3000

### Dev container

- Abra o projeto dentro do container através da extensão Dev container do VsCode.

- Instale as dependências do projeto:

```
  yarn install
```

- Rode o servidor

```
  yarn start
```

- Acesse pelo endereço: http://localhost:3000

### Linha de comando

- Instale as dependências do projeto:

```
  yarn install
```

- Rode o servidor:

```
  yarn start
```

- Acesse pelo endereço: http://localhost:3000

## Para rodar testes automatizados

- Rode o comando no console:

```
yarn test
```

## Projetos hospedados

- [Origem dos dados ](http://ghibli-api.softdevelopments.com.br/)
- [Backend ](http://wa-movie-api.softdevelopments.com.br/)
- [Frontend](http://wa-movie.softdevelopments.com.br/)
