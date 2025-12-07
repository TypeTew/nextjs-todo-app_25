# Me Do List App

A modern, aesthetically pleasing To-Do list application built with Next.js, featuring user authentication and a persistent MySQL database.

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: `next-auth` (Client-side components)

### Backend
- **API**: Next.js Route Handlers (`app/api/*`)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Credentials Provider with JWT)
- **Database Driver**: `mysql2` (Direct connection pool)
- **Password Hashing**: `bcryptjs`

### Database & Infrastructure
- **Database**: MySQL 8.0
- **Containerization**: Docker & Docker Compose
- **Management UI**: Adminer (Web-based DB management)

## 📂 Project Structure

```bash
├── app/
│   ├── api/             # API Route Handlers (Backend)
│   │   ├── auth/        # Authentication routes
│   │   ├── register/    # User registration
│   │   └── todos/       # CRUD operations for tasks
│   ├── components/      # Reusable UI components (Navbar, Button, etc.)
│   ├── dashboard/       # Protected Dashboard page
│   ├── signin/          # Login page
│   ├── signup/          # Registration page
│   └── page.tsx         # Landing page
├── db/
│   └── schema.sql       # Database initialization script
├── lib/
│   ├── auth.ts          # NextAuth configuration & logic
│   └── db.ts            # MySQL connection pool configuration
├── public/              # Static assets
└── docker-compose.yml   # MySQL and Adminer services configuration
```

## 🛠️ How to Run

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (must be running)

### 2. Environment Setup
The project uses a `.env` file for configuration. It has been pre-configured for local development:

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=medolist_db
DB_PORT=3306
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=medolist_secret_key_2025
```

### 3. Start the Database
Use Docker Compose to spin up the MySQL database and Adminer.

```bash
docker-compose up -d
```
*This command will automatically initialize the database tables using `db/schema.sql`.*

### 4. Install Dependencies
```bash
npm install
```

### 5. Run the Application
Start the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Management
You can manage the database via **Adminer** at [http://localhost:8080](http://localhost:8080).

- **System**: MySQL
- **Server**: `db`
- **Username**: `root`
- **Password**: (leave empty)
- **Database**: `medolist_db`
