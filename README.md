# 📚 LibraryMS - Library Management System

A full-stack **Library Management System** built with **MySQL + Express + React + Node.js** that allows admins to manage books, members, loans, fines, reservations, and users with role-based access control.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Axios |
| **Backend** | Node.js, Express 5, Sequelize ORM |
| **Database** | MySQL |
| **Auth** | JWT + Refresh Tokens, bcrypt |

---

## ✨ Features

### Admin Dashboard
- Stats cards (total books, members, loans)
- Monthly loans bar chart
- Category distribution progress bars
- Recent loans table

### Books Management
- Grid view with book cards
- Search by title/ISBN/author
- Filter by category
- Add / Edit / Delete books
- Track total & available copies

### Members Management
- Table view with search
- Add / Edit / Delete members
- Membership type badges (Student / Faculty / Public)
- Stats cards (total / student / faculty / public)

### Loans
- Borrow books (auto-decrements available copies)
- Return books (auto-increments available copies)
- Due date tracking
- Loan status (active / returned / overdue)

### Fines
- Track overdue fines per loan
- Mark as paid

### Reservations
- Book reservation queue
- Status tracking (waiting / fulfilled / cancelled)

### Users
- Role-based access (Admin / Librarian / Member)
- Manage system users

---

## 🗄️ Database Schema

```
Users ──→ Members ──→ Loans ──→ Fines
  │                    │
  └────→ Books ←───────┘
           │
           ├──→ Categories
           │
           └──→ Authors (M:N via BookAuthors)
```

### Models

| Model | Table | Key Fields |
|---|---|---|
| **User** | Users | id, username, email, password, role (Admin/Librarian/Member), member_id, is_active |
| **Member** | Members | id, name, email, phone, address, membership_type (Student/Faculty/Public), max_books_allowed |
| **Book** | Books | id, title, isbn (unique), publisher, publication_year, total_copies, available_copies, shelf_location, category_id, user_id |
| **Author** | Authors | id, name, bio |
| **BookAuthor** | BookAuthors | book_id, author_id (junction table) |
| **Category** | categories | id, name (unique), description |
| **Loan** | Loans | id, book_id, member_id, loan_date, due_date, return_date, status (active/returned/overdue) |
| **Fine** | Fines | id, loan_id, amount, paid, fine_date |
| **Reservation** | Reservations | id, book_id, member_id, reservation_date, status (waiting/fulfilled/cancelled) |
| **RefreshToken** | RefreshTokens | id, user_id, token_hash, expires_at, revoked_at |

---

## 📡 API Routes

### Authentication
| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/v1/users` | Register new user | — |
| POST | `/api/v1/users/login` | Login | — |
| POST | `/api/v1/users/logout` | Logout | — |

### Users
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/users` | Fetch all users | Admin |

### Books
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/books` | List all books | Admin |
| POST | `/api/v1/books` | Create a book | Admin |
| GET | `/api/v1/books/:id` | Get book details | Admin |
| PUT | `/api/v1/books/:id` | Update a book | Admin |
| DELETE | `/api/v1/books/:id` | Delete a book | Admin |

### Members
| Method | Route | Description | Auth |
|---|---|---|---|
| GET | `/api/v1/members` | List all members | Admin |
| POST | `/api/v1/members` | Create a member | Admin |
| GET | `/api/v1/members/:id` | Get member details | Admin |
| PUT | `/api/v1/members/:id` | Update a member | Admin |
| DELETE | `/api/v1/members/:id` | Delete a member | Admin |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- MySQL

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

#### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=8000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=library
DB_DIALECT=mysql
JWT_SECRET=your_jwt_secret_key
```

```bash
# Start backend server
npm run backend
```

#### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000/api/v1
```

```bash
# Start frontend dev server
npm run dev
```

Open **http://localhost:5173** in your browser, register an Admin account, and start managing your library.

---

## 📁 Project Structure

<details>
<summary>Click to expand</summary>

```
backend/
├── src/
│   ├── config/                     Database configuration
│   ├── controllers/                Route handlers
│   ├── db/                         Sequelize connection setup
│   ├── middlewares/                Auth & role middleware (JWT)
│   ├── models/                     Sequelize models & associations
│   ├── routes/                     API route definitions
│   └── utils/                      JWT generation helpers
├── .env
└── package.json

frontend/
├── src/
│   ├── _auth/                      Login & Register pages
│   ├── _root/pages/                All app pages
│   │   └── admin/                  Admin pages (Dashboard, Books, Members, Users)
│   ├── components/                 Shared components (Sidebar, Topbar, Modals)
│   ├── store/                      Zustand state management
│   ├── api/                        Axios instances & API functions
│   ├── constants/                  Sidebar links, role configs
│   └── types/                      TypeScript type definitions
├── .env
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── postcss.config.js
├── vite.config.ts
├── index.html
├── package-lock.json
└── package.json
```

</details>

---

## 📸 Screenshots

> *(Add screenshots here once the project is complete)*
>
> | Page | Preview |
> |---|---|
> | Sign In | ![(https://postimg.cc/gnFj75B0)](https://i.postimg.cc/X7X5r6f9/sign-inpage.png) |
> | Admin Dashboard | ![(link-to-screenshot)](https://i.postimg.cc/qvV74PQx/admindashboard.png) |
> | Books Management | ![(link-to-screenshot)](https://i.postimg.cc/j2nsrcfK/bookspage.png) |
> | Members Management | ![(link-to-screenshot](https://i.postimg.cc/28pqSLSb/userspage.png)) |
> | Users | ![(link-to-screenshot](https://i.postimg.cc/2SrV4pv3/memberspage.png)) |

---

## 🔮 Future Enhancements

- [ ] Librarian role dashboard (Issue Book, Return Book, Overdue)
- [ ] Member portal (Browse Books, My Books, Reservations)
- [ ] Email notifications for overdue books
- [ ] Barcode / QR code scanning for books
- [ ] Advanced reporting and analytics
- [ ] Dark mode toggle
- [ ] PDF export for reports

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**AbBaS kHaN**
