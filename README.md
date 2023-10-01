# Challenge Opah

## Descrição

Este projeto é um aplicativo React desenvolvido com o Vite.

## Como Rodar o Projeto

Para rodar este projeto em sua máquina local, siga os passos abaixo:

1. Certifique-se de que você tenha o Node.js instalado. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).

2. Clone este repositório em sua máquina usando o comando:

```bash
 git clone https://github.com/seu-usuario/challenge-opah.git
```

3.  Navegue até a pasta do projeto:

```bash
cd challenge-opah
```

4.  Instale as dependências do projeto:

```bash
yarn
```

5.  Inicie o servidor de desenvolvimento:

```bash
yarn run dev
```

## Exemplo de Requisições

- Insert a person

  - url: https://eoobbrocsh5s3k.m.pipedream.net
  - payload:

  ```json
  {
    "id": "string",
    "data": {
      "name": "string",
      "email": "string",
      "cpf": "string",
      "birth_date": "string"
    }
  }
  ```

  - Get list of persons
  - url: https://eou3ns36bjp3reg.m.pipedream.net
  - payload:

  ```json
  {
    "offset": 0,
    "limit": 5
  }
  ```

<!-- Imagem à esquerda -->
<img src="src/assets/form.jpeg" alt="Formulário" align="left" width="350"/>

<!-- Imagem à direita -->
<img src="src/assets/list.jpeg" alt="Lista" align="right" width="350"/>

---
