# 🚀 Deploy no Vercel - Passo a Passo

## Por que Vercel?
- ✅ **Gratuito** para projetos pessoais
- ✅ **Integração perfeita** com Next.js
- ✅ **Deploy automático** a cada push no GitHub
- ✅ **HTTPS automático** e CDN global
- ✅ **Domínio personalizado** gratuito

## Passo 1: Preparar o Código

### 1.1 Verificar se o build funciona
```bash
npm run build
```
✅ **Status:** Verificado - Build funcionando perfeitamente!

### 1.2 Criar conta no GitHub (se não tiver)
1. Acesse [github.com](https://github.com)
2. Crie uma conta gratuita
3. Confirme seu email

### 1.3 Subir código para GitHub
```bash
# Inicializar repositório Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Projeto Núcleo de Responsabilidade - Pronto para deploy"

# Criar repositório no GitHub e conectar
# (Siga as instruções do GitHub após criar o repositório)
git remote add origin https://github.com/SEU-USUARIO/nrs.git
git branch -M main
git push -u origin main
```

## Passo 2: Deploy no Vercel

### 2.1 Criar conta no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. **Importante:** Faça login com sua conta do GitHub

### 2.2 Importar projeto
1. No dashboard do Vercel, clique em "New Project"
2. Selecione seu repositório "nrs" da lista
3. Clique em "Import"

### 2.3 Configurar deploy
- **Framework Preset:** Next.js (detectado automaticamente)
- **Root Directory:** `./` (padrão)
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install` (padrão)

### 2.4 Variáveis de ambiente (se necessário)
Se você tiver variáveis de ambiente, adicione na seção "Environment Variables":
```
NEXT_PUBLIC_API_URL=https://sua-api.com
DATABASE_URL=sua-string-de-conexao
```

### 2.5 Deploy!
1. Clique em "Deploy"
2. Aguarde alguns minutos
3. 🎉 **Seu app estará online!**

## Passo 3: Acessar seu App

Após o deploy, você receberá:
- **URL temporária:** `https://nrs-xyz123.vercel.app`
- **URL de produção:** `https://nrs.vercel.app` (se disponível)

## Passo 4: Configurar Domínio Personalizado (Opcional)

### 4.1 No painel do Vercel
1. Vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure o DNS conforme instruções

### 4.2 Domínio gratuito
O Vercel oferece subdomínios gratuitos como:
- `nrs.vercel.app`
- `nucleo-responsabilidade.vercel.app`

## Passo 5: Deploy Automático

✅ **Configurado automaticamente!**

A partir de agora, toda vez que você fizer um push para o GitHub:
1. Vercel detecta automaticamente
2. Faz o build do projeto
3. Atualiza o site em produção

```bash
# Para atualizar o site, basta:
git add .
git commit -m "Atualização do site"
git push
```

## Comandos Úteis

```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Deploy direto via CLI
vercel

# Deploy de produção via CLI
vercel --prod

# Ver logs de deploy
vercel logs
```

## Monitoramento

No dashboard do Vercel você pode ver:
- 📊 **Analytics** de visitantes
- 🚀 **Performance** do site
- 📝 **Logs** de deploy
- 🔧 **Configurações** avançadas

## Solução de Problemas

### Build falha
```bash
# Testar localmente primeiro
npm run build
npm start
```

### Erro de dependências
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro de ambiente
- Verificar variáveis de ambiente no Vercel
- Verificar se todas as variáveis começam com `NEXT_PUBLIC_` para uso no frontend

## Próximos Passos

1. ✅ **Deploy realizado**
2. 🔧 **Configurar analytics** (Google Analytics)
3. 🛡️ **Configurar monitoramento** (Sentry)
4. 📱 **Testar responsividade** em dispositivos móveis
5. 🚀 **Otimizar performance** (Lighthouse)

---

**🎉 Parabéns! Seu app está online e acessível para o mundo todo!**