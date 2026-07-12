# Library Management System

A full-stack web application for managing library operations such as book records, members, borrowing, returns, reservations, and fines.

## Overview

This project provides a simple and scalable digital workflow for libraries to:

- manage books, authors, categories, and inventory
- register and track library members
- issue and return books
- monitor overdue loans and calculate fines
- reserve books for future use
- separate backend APIs from a React frontend interface

## Features

### Core Modules

- Book management
- Author management
- Category-based organization
- Member registration and profile tracking
- Loan issuance and return processing
- Reservation management
- Fine calculation and status tracking
- User authentication and authorization support

### Workflow

1. Admin or librarian adds books to the catalog.
2. Members register with membership details.
3. Members borrow books based on available copies.
4. The system tracks due dates and returning status.
5. Overdue books generate fines.
6. Members can reserve unavailable books and wait for fulfillment.

## Tech Stack

### Backend

- Node.js
- Express.js
- Sequelize ORM
- MySQL / PostgreSQL-compatible database support
- JWT-based authentication utilities

### Frontend

- React
- Vite
- Tailwind CSS

## Project Structure

```text
README.md
backend/
  package.json
  src/
    index.js
    controllers/
    models/
    routes/
    db/
    config/
    middlewares/
    utils/
frontend/
  package.json
  src/
```

## Main Database Entities

- User
- Member
- Book
- Author
- Category
- Loan
- Reservation
- Fine

## Running the Project

### Backend

```bash
cd backend
npm install
npm run backend
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API Notes

The backend is designed as a REST-style service and exposes user-related routes through the Express application. Additional endpoints can be added for books, authors, loans, members, reservations, and fines.

## Future Enhancements

- role-based admin and librarian access
- dashboard analytics for books and circulation
- book search and filtering
- email/SMS reminders for due dates
- barcode or RFID integration
- reporting and statistics for operations

## Conclusion

The Library Management System is designed to streamline library operations with a clean backend architecture and a modern frontend interface. It can be extended into a production-ready system with additional security, reporting, and automation features.
