HEAD
# [https-mesclaplanilhas.web.app](https://mesclaplanilhas.web.app/)
Site que faz a junção de duas planilhas usando uma coluna de cada como chave primaria. Facilita no trbalho de manipulação de planilhas do dia a adia.
https://mesclaplanilhas.web.app/

# Site de Junção de Planilhas

## 📊 Sobre o Projeto

Este projeto é uma aplicação web moderna desenvolvida para facilitar a **manipulação e junção de dados** entre duas planilhas diferentes. A ferramenta permite aos usuários combinar informações de múltiplas fontes de dados de forma intuitiva e eficiente, utilizando uma coluna chave comum para estabelecer a relação entre os conjuntos de dados.

### 🎯 Principais Funcionalidades

- **Upload de duas planilhas** (Excel ou CSV)
- **Seleção inteligente de colunas chave** para junção
- **Interface de seleção por checkboxes** para escolher colunas desejadas
- **Junção automática** baseada em valores correspondentes
- **Formatação avançada** da planilha final com tabela verde e filtros
- **Download da planilha resultante** pronta para uso

---

## 🛠️ Tecnologias e Bibliotecas

### Frontend
- **React 18** - Framework JavaScript para construção de interfaces
- **Material UI (MUI)** - Biblioteca de componentes React para design moderno
- **Axios** - Cliente HTTP para comunicação com o backend

### Backend
- **Node.js** - Runtime JavaScript para execução do servidor
- **Express.js** - Framework web para criação de APIs REST
- **Multer** - Middleware para upload de arquivos

### Manipulação de Dados
- **SheetJS (xlsx)** - Biblioteca para leitura e processamento de arquivos Excel/CSV
  - Utilizada para extrair dados das planilhas de entrada
  - Processamento de diferentes formatos de arquivo
  - Conversão automática de tipos de dados

- **ExcelJS** - Biblioteca avançada para criação e formatação de planilhas Excel
  - Geração da planilha final com formatação profissional
  - Criação de tabelas formatadas com cores e estilos
  - Aplicação de filtros automáticos em todas as colunas
  - Congelamento da primeira linha (cabeçalho)
  - Ajuste automático da largura das colunas

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM ou Yarn

### Backend
1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm start
```

O backend estará disponível em `http://localhost:5000`

### Frontend
1. Em um novo terminal, navegue até a pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie a aplicação:
```bash
npm start
```

O frontend estará disponível em `http://localhost:3000`

---

## 📋 Como Usar

### 1. Upload das Planilhas
- Selecione duas planilhas (Excel ou CSV) que contenham dados relacionados
- Clique em "Carregar Planilhas" para processar os arquivos

### 2. Seleção das Chaves
- Escolha a coluna chave de cada planilha
- Esta coluna deve conter valores únicos que relacionam os dados entre as planilhas

### 3. Seleção das Colunas
- Marque apenas as colunas que deseja incluir na planilha final
- A ordem será definida pela sequência de seleção dos checkboxes
- Colunas não marcadas serão automaticamente excluídas

### 4. Geração e Download
- Clique em "Juntar e Gerar Planilha" para processar os dados
- Baixe a planilha final formatada e pronta para uso

---

## 🔧 Funcionalidades Técnicas

### Processamento de Dados
- **Junção por chave**: Utiliza valores correspondentes para combinar registros
- **Tratamento de tipos**: Converte automaticamente dados para texto ou número
- **Valores padrão**: Preenche campos vazios com valores padrão

### Formatação da Planilha Final
- **Tabela formatada**: Estilo verde sem zebrado
- **Filtros automáticos**: Aplicados em todas as colunas
- **Cabeçalho congelado**: Primeira linha fixa para navegação
- **Largura ajustada**: Colunas com tamanho otimizado

---

## 📁 Estrutura do Projeto

```
novo_site_planilha/
├── backend/
│   ├── index.js          # Servidor Express e endpoints
│   ├── package.json      # Dependências do backend
│   └── uploads/          # Pasta para arquivos temporários
├── frontend/
│   ├── src/
│   │   ├── App.js        # Componente principal React
│   │   ├── index.js      # Ponto de entrada React
│   │   └── App.css       # Estilos CSS
│   ├── public/
│   │   └── index.html    # HTML base
│   └── package.json      # Dependências do frontend
└── README.md             # Documentação do projeto
```

---

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes. 
=======
# [https-mesclaplanilhas.web.app](https://mesclaplanilhas.web.app/)
Site que faz a junção de duas planilhas usando uma coluna de cada como chave primaria. Facilita no trbalho de manipulação de planilhas do dia a adia.
https://mesclaplanilhas.web.app/
>>>>>>> dbd509b2bfd7e1df2e7fe5d58ab2f3495f411ee4
