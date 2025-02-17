# Processador de Arquivos KML

Este repositório contém um script em Node.js para processar arquivos KML e corrigir nomes duplicados de talhões dentro de cada fazenda.

## Funcionalidades

- Identifica e renomeia talhões duplicados no arquivo KML.
- Mantém a estrutura do arquivo original, alterando apenas os nomes duplicados.
- Gera um novo arquivo corrigido na pasta de saída.
- Exibe um relatório de duplicatas corrigidas no console.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado os seguintes itens:

- [Node.js](https://nodejs.org/)
- Gerenciador de pacotes npm

## Instalação

1. Clone este repositório:

   ```sh
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

## Uso

1. Edite o script para ajustar os nomes dos arquivos conforme necessário:
   - Linha 103: Nome do arquivo de entrada.
   - Linha 104: Nome do arquivo de saída.

2. Execute o script:

   ```sh
   node script.js
   ```

3. O arquivo corrigido será salvo na pasta `./output`.
4. O console exibirá um relatório com os talhões duplicados corrigidos.

## Estrutura do Projeto

```
📁 projeto
│-- 📄 script.js
│-- 📂 output
│   ├── exemplo - Corrigido.kml
│-- 📄 package.json
│-- 📄 README.md
```

## Observações

- Sempre substituir "plotname" pelo nome do talhão e "farmname" pelo nome da fazenda no script.
- Certifique-se de que o arquivo KML está na mesma pasta do script ou atualize o caminho na variável `filePath`.

## Licença

Este projeto é de uso livre e pode ser modificado conforme necessário.

---

Feito com ❤️ para facilitar o processamento de arquivos KML! 🚀

