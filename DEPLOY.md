# 🚀 Guia de Deploy - Núcleo de Responsabilidade

## Opções de Deploy

### 1. **Vercel (Recomendado)**
A forma mais fácil para apps Next.js:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel

# Para deploy de produção
vercel --prod
```

**Ou via interface web:**
1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu GitHub
3. Importe este repositório
4. Deploy automático!

### 2. **Netlify**
```bash
# Build do projeto
npm run build

# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy de produção
netlify deploy --prod
```

### 3. **GitHub Pages (Site Estático)**
```bash
# 1. Descomente a linha no next.config.js:
# output: 'export'

# 2. Build estático
npm run build

# 3. O conteúdo estará na pasta 'dist'
# 4. Faça upload para GitHub Pages
```

### 4. **Hospedagem Própria**
```bash
# Build de produção
npm run build

# Iniciar servidor
npm start
```

## Preparação para Produção

### Variáveis de Ambiente
Crie um arquivo `.env.production`:
```
NEXT_PUBLIC_API_URL=https://sua-api.com
DATABASE_URL=sua-string-de-conexao
```

### Otimizações
- ✅ Imagens otimizadas (já configurado)
- ✅ CSS minificado automaticamente
- ✅ JavaScript minificado automaticamente
- ✅ Configuração de produção no next.config.js

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção local
npm start

# Verificar build
npm run build && npm start
```

## Checklist Pré-Deploy

- [ ] Testar build local: `npm run build && npm start`
- [ ] Configurar variáveis de ambiente
- [ ] Verificar todas as páginas funcionando
- [ ] Testar responsividade
- [ ] Verificar performance (Lighthouse)

## Domínio Personalizado

### Vercel
1. Vá em Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

### Netlify
1. Vá em Domain Settings
2. Adicione custom domain
3. Configure DNS

## Monitoramento

Após o deploy, monitore:
- Performance (Core Web Vitals)
- Erros (Sentry recomendado)
- Analytics (Google Analytics)
- Uptime (UptimeRobot)