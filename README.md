# EstatePro (Backend)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

# 📌 Overview

EstatePro is a user-friendly rental house finding website that connects tenants with landlords seamlessly. Tenants can browse available properties and make a one-time payment securely through ShurjoPay. The platform supports three roles—Admin, Tenant, and Landlord—each with tailored access to manage listings, payments, and user interactions efficiently.

## 🌍 Live URL

- [Front-end](https://estatepro-lac.vercel.app/)
- [Back-end](https://estatepro-server.vercel.app/)

## 📂 Repository Link

- [Front-end](https://github.com/Farsit-007/EstatePro-Frontend)
- [Back-end](https://github.com/Farsit-007/EstatePro-Backend)

## 🛠️ Features

- **User Authentication**: JWT-based login/registration.
- **House Management**: Landloard => Create house,update and sell.
- **Admin Dashboard**: Admin will approve the the hosue for sell.
- **Responsive UI**: Built with Nest.js, Tailwind CSS & Shadcn UI.
- **Payment Integration**: ShurjoPay for House purchase

## 🏗️ Tech Stack

#### Frontend

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod

#### Backend

- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Payment Method**: ShurjoPay
- **Image hosting**: Multer & Cloudinary
- **Mail Provider**: Nodemailer
- **Validation**: Zod

---

## 🏃‍♂️ Setup Guide (Frontend)

### Prerequisites

- Node.js ≥18.x
- npm/yarn/pnpm

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/Farsit-007/EstatePro-Frontend.git
   cd EstatePro-Frontend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create .env file with:

   ```bash
   NEXT_PUBLIC_API_URL="your_backend_url"
   CLOUD_NAME = ""

   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## 🏃‍♂️ Setup Guide (Backend)

### Prerequisites

- Node.js ≥18.x
- npm/yarn/pnpm

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/Farsit-007/EstatePro-Backend.git
   cd EstatePro-Backend

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create .env file with:

   ```bash
   NODE_ENV=""
   PORT=5000
   DATABASE_URL=""

   JWT_ACCESS_SECRET=""
   JWT_REFRESH_SECRET=""

   SMTP_EMAIL=""
   SMTP_PASSWORD=""
   RESET_PASSWORD_LINK="https://estatepro-lac.vercel.app/change-password"

   SP_ENDPOINT=""
   SP_USERNAME=""
   SP_PASSWORD=""
   SP_PREFIX=""
   SP_RETURN_URL=""
   SP_RETURN_URL="https://estatepro-lac.vercel.app/verify"
   DB_FILE=""

   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## License

MIT (do whatever you want to do :smile: )
