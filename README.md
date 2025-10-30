# Nossa Ronda Solidária

Sistema de gerenciamento de voluntários para ações solidárias.

## Funcionalidades Principais

- Dashboard administrativo
- Cadastro e autenticação de voluntários
- Sistema de check-in com QR Code
- Calendário de eventos
- Gamificação e conquistas
- Área do voluntário
- Sistema de comunicação
- Gestão de equipes

## Tecnologias Utilizadas

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Express
- **Banco de Dados**: PostgreSQL, Prisma
- **Autenticação**: NextAuth.js
- **Outros**: QR Code, SendGrid, Cloudinary

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
npm run dev
```

## Estrutura do Projeto

- `/src/app` - Rotas e páginas da aplicação
- `/src/components` - Componentes reutilizáveis
- `/src/lib` - Utilitários e configurações
- `/prisma` - Esquema do banco de dados e migrações
- `/public` - Arquivos estáticos

## Licença

Este projeto está licenciado sob a licença MIT.