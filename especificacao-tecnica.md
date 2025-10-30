# Especificação Técnica - Portal Nossa Ronda Solidária

## Arquitetura Técnica

### Visão Geral da Arquitetura
O sistema será desenvolvido utilizando uma arquitetura de microsserviços, com separação clara entre frontend e backend:

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|    Frontend      |<--->|     Backend      |<--->|  Banco de Dados  |
|    (Next.js)     |     |    (Node.js)     |     |   (PostgreSQL)   |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
         ^                       ^                        ^
         |                       |                        |
         v                       v                        v
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  Serviços Cloud  |     |    Integrações   |     |    Segurança     |
|  (Armazenamento) |     |     Externas     |     |                  |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
```

### Stack de Tecnologias

#### Frontend
- **Framework**: Next.js (React)
- **Estilização**: TailwindCSS
- **Gerenciamento de Estado**: React Context API + SWR para fetching de dados
- **Componentes UI**: Headless UI + Tailwind
- **Formulários**: React Hook Form + Zod para validação
- **Autenticação**: NextAuth.js

#### Backend
- **Framework**: Node.js com Express
- **API**: REST com documentação Swagger
- **Autenticação**: JWT + OAuth2 (Google, Facebook)
- **Validação**: Joi ou Zod
- **Logging**: Winston

#### Banco de Dados
- **Principal**: PostgreSQL
- **ORM**: Prisma
- **Cache**: Redis (opcional para escala)

#### DevOps e Infraestrutura
- **Hospedagem Frontend**: Vercel
- **Hospedagem Backend**: Railway
- **CI/CD**: GitHub Actions
- **Monitoramento**: Sentry

#### Serviços Externos
- **Armazenamento de Imagens**: Cloudinary
- **Notificações por Email**: SendGrid
- **Notificações por WhatsApp**: Twilio WhatsApp API
- **Geração de QR Code**: qrcode.js

### Requisitos Não-Funcionais

1. **Segurança**
   - Autenticação segura com JWT
   - HTTPS em todos os ambientes
   - Proteção contra ataques comuns (CSRF, XSS, SQL Injection)
   - Sanitização de inputs

2. **Performance**
   - Tempo de carregamento inicial < 2s
   - Otimização de imagens
   - Lazy loading de componentes
   - Paginação para listas grandes

3. **Escalabilidade**
   - Arquitetura que suporte crescimento de usuários
   - Banco de dados com índices otimizados
   - Cache para consultas frequentes

4. **Acessibilidade**
   - Conformidade com WCAG 2.1 nível AA
   - Suporte a leitores de tela
   - Navegação por teclado
   - Contraste adequado

5. **Responsividade**
   - Design mobile-first
   - Breakpoints para mobile, tablet e desktop
   - Testes em múltiplos dispositivos

6. **Manutenibilidade**
   - Código bem documentado
   - Testes automatizados
   - Padrões de código consistentes
   - Modularização

## Estrutura do Banco de Dados

### Diagrama ER

```
+----------------+       +----------------+       +----------------+
|     Users      |       |     Events     |       |  Attendances   |
+----------------+       +----------------+       +----------------+
| id             |<---+  | id             |<---+  | id             |
| name           |    |  | title          |    |  | user_id        |
| email          |    |  | description    |    |  | event_id       |
| phone          |    |  | date           |    |  | check_in_time  |
| document       |    |  | start_time     |    |  | check_out_time |
| birth_date     |    |  | end_time       |    |  | status         |
| gender         |    |  | location       |    |  | points_earned  |
| profile_pic    |    |  | max_volunteers |    |  | created_at     |
| preferences    |    |  | status         |    |  +----------------+
| availability   |    |  | created_by     |    |
| points         |    |  | created_at     |    |
| role           |    |  +----------------+    |
| created_at     |    |                        |
+----------------+    |                        |
      |               |                        |
      |               |                        |
      v               |                        |
+----------------+    |                        |
|     Teams      |    |                        |
+----------------+    |                        |
| id             |<---+                        |
| name           |                             |
| description    |                             |
| leader_id      |                             |
| created_at     |                             |
+----------------+                             |
      ^                                        |
      |                                        |
      |                                        |
+----------------+    +----------------+       |
| TeamMembers    |    | EventSignups   |       |
+----------------+    +----------------+       |
| id             |    | id             |       |
| team_id        |    | user_id        |-------+
| user_id        |    | event_id       |-------+
| role           |    | status         |
| created_at     |    | signup_time    |
+----------------+    | created_at     |
                      +----------------+
                             |
                             |
                             v
                      +----------------+
                      | Notifications  |
                      +----------------+
                      | id             |
                      | user_id        |
                      | event_id       |
                      | type           |
                      | message        |
                      | read           |
                      | created_at     |
                      +----------------+
                             |
                             |
                             v
                      +----------------+
                      | Achievements   |
                      +----------------+
                      | id             |
                      | name           |
                      | description    |
                      | points_required|
                      | badge_image    |
                      | created_at     |
                      +----------------+
                             ^
                             |
                             |
                      +----------------+
                      | UserAchievements|
                      +----------------+
                      | id             |
                      | user_id        |
                      | achievement_id |
                      | earned_at      |
                      +----------------+
```

### Modelos de Dados

#### Users (Usuários)
- **id**: UUID (PK)
- **name**: String (Nome completo)
- **email**: String (Email único)
- **password**: String (Hash da senha)
- **phone**: String (Telefone)
- **document**: String (CPF/RG)
- **birth_date**: Date (Data de nascimento)
- **gender**: Enum (Gênero)
- **profile_pic**: String (URL da foto)
- **preferences**: JSON (Preferências de atuação)
- **availability**: JSON (Disponibilidade)
- **points**: Integer (Pontos acumulados)
- **role**: Enum (admin, coordinator, volunteer)
- **terms_accepted**: Boolean
- **created_at**: DateTime
- **updated_at**: DateTime

#### Events (Eventos/Ações)
- **id**: UUID (PK)
- **title**: String (Título do evento)
- **description**: Text (Descrição)
- **date**: Date (Data)
- **start_time**: Time (Hora de início)
- **end_time**: Time (Hora de término)
- **location**: String (Local)
- **location_coords**: JSON (Coordenadas para geolocalização)
- **max_volunteers**: Integer (Limite de vagas)
- **status**: Enum (scheduled, ongoing, completed, cancelled)
- **created_by**: UUID (FK - Users)
- **created_at**: DateTime
- **updated_at**: DateTime

#### Teams (Equipes)
- **id**: UUID (PK)
- **name**: String (Nome da equipe)
- **description**: Text (Descrição)
- **leader_id**: UUID (FK - Users)
- **created_at**: DateTime
- **updated_at**: DateTime

#### TeamMembers (Membros de Equipe)
- **id**: UUID (PK)
- **team_id**: UUID (FK - Teams)
- **user_id**: UUID (FK - Users)
- **role**: String (Papel na equipe)
- **created_at**: DateTime
- **updated_at**: DateTime

#### EventSignups (Inscrições em Eventos)
- **id**: UUID (PK)
- **user_id**: UUID (FK - Users)
- **event_id**: UUID (FK - Events)
- **status**: Enum (confirmed, waitlist, cancelled)
- **signup_time**: DateTime
- **created_at**: DateTime
- **updated_at**: DateTime

#### Attendances (Presenças)
- **id**: UUID (PK)
- **user_id**: UUID (FK - Users)
- **event_id**: UUID (FK - Events)
- **check_in_time**: DateTime
- **check_out_time**: DateTime (opcional)
- **status**: Enum (checked_in, checked_out, absent)
- **points_earned**: Integer
- **created_at**: DateTime
- **updated_at**: DateTime

#### Notifications (Notificações)
- **id**: UUID (PK)
- **user_id**: UUID (FK - Users)
- **event_id**: UUID (FK - Events, opcional)
- **type**: Enum (event_reminder, check_in_confirmation, achievement_earned)
- **message**: Text
- **read**: Boolean
- **created_at**: DateTime
- **updated_at**: DateTime

#### Achievements (Conquistas)
- **id**: UUID (PK)
- **name**: String (Nome da conquista)
- **description**: Text (Descrição)
- **points_required**: Integer (Pontos necessários)
- **badge_image**: String (URL da imagem)
- **created_at**: DateTime
- **updated_at**: DateTime

#### UserAchievements (Conquistas do Usuário)
- **id**: UUID (PK)
- **user_id**: UUID (FK - Users)
- **achievement_id**: UUID (FK - Achievements)
- **earned_at**: DateTime
- **created_at**: DateTime
- **updated_at**: DateTime