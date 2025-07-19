# 🚀 Guia de Deploy no Firebase

## 📋 Pré-requisitos

1. **Conta Google** com acesso ao Firebase
2. **Node.js** instalado
3. **Firebase CLI** instalado globalmente

---

## 🔧 Configuração Inicial

### 1. Instalar Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Fazer login no Firebase
```bash
firebase login
```

### 3. Criar projeto no Firebase Console
1. Acesse: https://console.firebase.google.com/
2. Clique em "Criar projeto"
3. Digite o nome do projeto (ex: "juntar-planilhas")
4. Siga os passos de configuração
5. Anote o **ID do projeto**

### 4. Configurar o projeto local
```bash
cd frontend
firebase init hosting
```

**Responda às perguntas:**
- Selecione seu projeto criado
- Public directory: `build`
- Configure as single-page app: `Yes`
- Não sobrescreva index.html: `No`

---

## 🌐 Deploy do Backend (Heroku)

### 1. Criar conta no Heroku
1. Acesse: https://heroku.com/
2. Crie uma conta gratuita

### 2. Instalar Heroku CLI
```bash
# Windows
# Baixe e instale de: https://devcenter.heroku.com/articles/heroku-cli

# Mac/Linux
brew install heroku/brew/heroku
```

### 3. Fazer login no Heroku
```bash
heroku login
```

### 4. Preparar o backend
```bash
cd backend
```

### 5. Criar arquivo Procfile
```bash
echo "web: node index.js" > Procfile
```

### 6. Criar app no Heroku
```bash
heroku create seu-app-backend
```

### 7. Deploy do backend
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### 8. Obter URL do backend
```bash
heroku info
```
Anote a URL (ex: https://seu-app-backend.herokuapp.com)

---

## 🔄 Atualizar URLs do Frontend

### 1. Editar App.js
Substitua `https://seu-backend.herokuapp.com` pela URL real do seu backend:

```javascript
// Em frontend/src/App.js, substitua todas as URLs:
const res = await axios.post('https://SEU-APP-BACKEND.herokuapp.com/upload', formData);
const colRes = await axios.post('https://SEU-APP-BACKEND.herokuapp.com/columns', res.data);
const res = await axios.post('https://SEU-APP-BACKEND.herokuapp.com/merge', {...});
const url = `https://SEU-APP-BACKEND.herokuapp.com/download?file=${encodeURIComponent(mergedFile)}`;
```

### 2. Atualizar .firebaserc
```json
{
  "projects": {
    "default": "SEU-ID-DO-PROJETO-FIREBASE"
  }
}
```

---

## 🚀 Deploy do Frontend

### 1. Instalar dependências
```bash
cd frontend
npm install
```

### 2. Fazer build
```bash
npm run build
```

### 3. Deploy no Firebase
```bash
firebase deploy
```

### 4. Verificar deploy
O Firebase fornecerá uma URL (ex: https://seu-projeto.web.app)

---

## ✅ Verificação Final

### 1. Testar o site
- Acesse a URL fornecida pelo Firebase
- Teste o upload de planilhas
- Verifique se a junção funciona

### 2. Verificar logs do backend
```bash
heroku logs --tail
```

### 3. Verificar logs do Firebase
```bash
firebase hosting:channel:list
```

---

## 🐛 Solução de Problemas

### Erro: "Backend não responde"
- Verifique se o Heroku está rodando: `heroku ps`
- Verifique os logs: `heroku logs --tail`
- Verifique se as URLs estão corretas no frontend

### Erro: "Build falha"
- Verifique se todas as dependências estão instaladas
- Verifique se não há erros de sintaxe
- Tente: `npm run build` localmente primeiro

### Erro: "CORS"
- Verifique se o backend está configurado para aceitar requisições do domínio do Firebase

### Erro: "Arquivo não encontrado"
- Verifique se o diretório `build` foi criado
- Verifique se o `firebase.json` está configurado corretamente

---

## 🔄 Atualizações Futuras

### Para atualizar o frontend:
```bash
cd frontend
npm run build
firebase deploy
```

### Para atualizar o backend:
```bash
cd backend
git add .
git commit -m "Update"
git push heroku main
```

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do Heroku: `heroku logs --tail`
2. Verifique os logs do Firebase: `firebase hosting:channel:list`
3. Teste localmente primeiro
4. Verifique se todas as URLs estão corretas

**Boa sorte com o deploy! 🎉** 