# 📝 Todo App – Full Stack Application

A simple full-stack Todo App built with **Next.js** for the frontend, **NestJS** for the backend, **PostgreSQL** for the database (via Docker), and **TypeORM** for ORM. The app supports JWT authentication, DTO validation, and RESTful API communication. Testing is handled with **Jest**.

---

## 📦 Technologies Used

- Frontend: [Next.js](https://nextjs.org/)
- Backend: [NestJS](https://nestjs.com/)
- Database: [PostgreSQL](https://www.postgresql.org/) via [Docker](https://www.docker.com/)
- ORM: [TypeORM](https://typeorm.io/)
- API: RESTful
- Authentication: JWT
- Testing: [Jest](https://jestjs.io/)
- Version Control: Git & GitHub
- Code Editor: VS Code (Recommended)

---

## ⚙️ Requirements

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/)
- Text Editor (e.g., VS Code)

---

## 🚀 Application Deployment (Installation Guide)

### 1. Clone the Repository

```bash
git clone https://github.com/Qosanglesz/todo-app.git
```

---

### 2. Setup Backend

```bash
cd ./backend-nestjs
npm install
```

#### Create a `.env` file in `./backend-nestjs` directory:

```env
# NestJS
PORT=8000
NODE_ENV=development
FRONTEND_ORIGIN=http://localhost:3000

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
POSTGRES_DB=tododb
POSTGRES_PORT=5432
POSTGRES_SYNCHRONIZE=true # Use false in production

# PGAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=root
PGADMIN_PORT=5050

# JWT
JWT_SECRET=secret
```

#### Run Docker containers:

```bash
docker-compose --env-file .env up -d
```

#### (Optional) Run migrations if `POSTGRES_SYNCHRONIZE=false`:

```bash
npm run typeorm:run-migrations
```

---

### 3. Run NestJS Server

```bash
npm run start:dev
```

---

### 4. Run Tests for Backend

To run tests for the backend using Jest, execute the following command:

```bash
npm run test
```

---

### 5. Setup Frontend

```bash
cd ../frontend-nextjs
npm install
```

#### Create a `.env.local` file in `./frontend-nextjs` directory:

```env
NEXT_PUBLIC_BACKEND_DOMAIN="http://localhost:8000"
NEXT_PUBLIC_DOMAIN="http://localhost:3000"
```

#### Run the development server:

```bash
npm run dev
```

---

## ✅ Project Features

- User authentication (JWT)
- Todo creation, editing, deletion
- PostgreSQL + pgAdmin support via Docker
- Pagination support
- Layered and microservice architecture
- DTO validation using NestJS pipes
- Unit testing using Jest
- Clean codebase with modular structure

---

## 📄 License

MIT License

---

## 👤 Author

> Developed by [Qosanglesz](https://github.com/Qosanglesz)