<h1 align="center">
   <a href="#"> CSV to JSON Challenge </a>
</h1>

<h3 align="center">
    Conversor de arquivo csv para json elaborado com testes automatizados.
</h3>

<p align="center">
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>


<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#sobre">Sobre</a> •
 <a href="#recursos">Recursos</a> •
 <a href="#como-funciona">Como funciona</a> • 
 <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a> • 
 <a href="#autor">Autor</a> • 
 <a href="#licença">Licença</a> •
</p>


## Sobre

Este é o projeto de um conversor de dados no formato CSV para o fomato JSON.

---

## Recursos

- [x] Criar uma classe com métodos que:
   - [x] Leiam um arquivo do tipo CSV
   - [x] Validem as informações carregadas desse arquivo
   - [x] Caso passe na validação, converta o conteúdo do arquivo para o formato JSON

---

## Como funciona

Este projeto é dividido em duas partes:
1. Conversor de CSV para JSON ([arquivo index.js](https://github.com/GabrielMMello/csv-to-json-challenge/blob/main/index.js))
2. Testes automatizados do conversor

Os testes automatizados executam o conversor recebendo como valor de entrada os arquivos de entrada e comparando com os arquivos de saída esperados.

Os testes foram realizados de modo que, caso o conversor não passe em algum teste, o erro seja exibido no cmd/terminal. 
Por outro lado, caso o conversor passe nos testes não haverá nenhuma notificação no cmd/terminal.

### Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas na sua máquina:
[Git] (https://git-scm.com) e [Node.js] (https://nodejs.org/en/) na versão 14.15.5
Além disso, é bom ter um editor para trabalhar com o código como o [VSCode] (https://code.visualstudio.com/)

#### Rodando os testes (executando o conteúdo do arquivo)

```bash

# Clone esta pasta
$ git clone https://github.com/GabrielMMello/csv-to-json-challenge.git

# Acesse a pasta do projeto com o cmd/terminal
$ cd csv-to-json-challenge

# Execute o programa com os testes com o seguinte comando
$ node index.js

# O resultado será exibido no cmd/terminal. Como padrão o conversor será baixado passando nos testes. 


```

---

## Tecnologias utilizadas

As seguintes ferramentas foram utilizadas na construção do projeto:

#### **Linguagem**  ([Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript))

#### **Execução**  ([Node.js](https://nodejs.org/en/))

#### **Utilidades**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**


---

## Autor

<a href="https://www.linkedin.com/in/gabriel-mendes-mello/">
 <sub><b>Gabriel Mendes Mello</b></sub>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Gabriel-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-mendes-mello/)](https://www.linkedin.com/in/gabriel-mendes-mello/) 
[![Gmail Badge](https://img.shields.io/badge/-gabrielmendesmello@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielmendesmello@gmail.com)](mailto:gabrielmendesmello@gmail.com)
[![FreeCodeCamp Badge](https://img.shields.io/badge/-Gabriel-black?style=flat-square&logo=freecodecamp&logoColor=white&link=https://www.freecodecamp.org/gabrielmmello)](https://www.freecodecamp.org/gabrielmmello)

---

## Licença

Este projeto está sob a licença [MIT](./LICENSE).

Feito com carinho por Gabriel Mello
[Me contate a qualquer momento!](https://www.linkedin.com/in/gabriel-mendes-mello/)
