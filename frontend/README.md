<p align="center">
  <a href="https://alignui.com">
    <img src="./public/images/logo.svg" height="96">
    <h3 align="center">AlignUI Design System</h3>
  </a>
  <p align="center">The Design System You Need</p>
</p>

[Join the AlignUI Community](https://discord.gg/alignui)

# Aplicação Fullstack Go + Next.js

Esta é uma aplicação fullstack que combina uma API REST em Go com um frontend moderno em Next.js.

## Funcionalidades

- ✅ API RESTful em Go com PostgreSQL
- ✅ Frontend em Next.js com TypeScript
- ✅ CRUD completo de usuários
- ✅ Interface moderna com AlignUI
- ✅ Integração com notificações (Sonner)
- ✅ Validação de formulários
- ✅ Configuração Docker Compose

## Tecnologias Utilizadas

### Backend
- Go 1.19+
- Gorilla Mux (router)
- PostgreSQL
- Docker

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- AlignUI
- Axios
- Sonner (notificações)

## Como Executar

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento)
- Go 1.19+ (para desenvolvimento)

### Execução com Docker Compose

1. Clone o repositório e navegue até a pasta do projeto
2. Execute o Docker Compose:

```bash
docker-compose up -d
```

3. Acesse a aplicação:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

### Execução para Desenvolvimento

#### Backend
```bash
cd backend
go mod tidy
DATABASE_URL=postgres://user:password@localhost:5432/dbname go run main.go
```

#### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

## Estrutura do Projeto

```
fullstack-go-nextjs/
├── backend/
│   ├── main.go          # API Go
│   │   └── go.dockerfile    # Dockerfile do backend
├── frontend/
│   ├── app/
│   │   ├── usuarios/    # Página de gerenciamento de usuários
│   │   ├── layout.tsx   # Layout principal
│   │   └── page.tsx     # Página inicial
│   ├── components/
│   │   ├── UserForm.tsx # Formulário de usuário
│   │   ├── UserList.tsx # Lista de usuários
│   │   └── ui/          # Componentes base
│   ├── services/
│   │   └── api.ts       # Serviços da API
│   └── types/
│       └── user.ts      # Tipos TypeScript
├── compose.yml          # Docker Compose
└── README.md
```

## API Endpoints

- `GET /api/go/users` - Listar todos os usuários
- `GET /api/go/users/:id` - Buscar usuário por ID
- `POST /api/go/users` - Criar novo usuário
- `PUT /api/go/users/:id` - Atualizar usuário
- `DELETE /api/go/users/:id` - Deletar usuário

## Variáveis de Ambiente

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend
```
DATABASE_URL=postgres://user:password@localhost:5432/dbname
```

## Desenvolvimento

### Adicionando Novas Funcionalidades

1. **Backend**: Adicione novas rotas em `backend/main.go`
2. **Frontend**: 
   - Adicione novos tipos em `frontend/types/`
   - Adicione novos serviços em `frontend/services/`
   - Crie novos componentes em `frontend/components/`
   - Adicione novas páginas em `frontend/app/`

### Testando a API

Você pode testar a API usando curl ou Postman:

```bash
# Listar usuários
curl http://localhost:3001/api/go/users

# Criar usuário
curl -X POST http://localhost:3001/api/go/users \
  -H "Content-Type: application/json" \
  -d '{"name": "João Silva", "email": "joao@email.com"}'
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
