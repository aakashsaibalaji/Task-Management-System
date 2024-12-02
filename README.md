# Task Management App

A full-stack web application built with **Next.js** for the frontend and **Express.js** for the backend, featuring authentication using **Firebase**. The project utilizes **TypeScript**, **ShadCN UI components**, and **Tailwind CSS** for the frontend design.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Demo](#demo)

## Features

- User authentication using Firebase (Login and Registration).
- Modern UI design with ShadCN and Tailwind CSS.
- Fully responsive design.
- TypeScript support for better type safety.
- API integration with a robust Express.js backend.

## Technologies Used

### Frontend:
- **Next.js** (React Framework)
- **TypeScript** (Strongly-typed JavaScript)
- **Tailwind CSS** (Utility-first CSS framework)
- **ShadCN** (UI Components)

### Backend:
- **Express.js** (Web application framework for Node.js)
- **MongoDB**(Stored user and Loan Details)

### Authentication:
- **Firebase** (User Authentication and API integration)

## Project Structure

## Demo:
A video demonstration of the application is available [here](https://www.dropbox.com/scl/fi/97njihfbi7i5ieiuksfxt/2024-12-02-19-44-56.mkv?rlkey=ouuft0ihp5v2tglbrksujgkmk&st=rkjkisae&dl=0).

### Frontend and Backend Structure Including Instructions.:
```plaintext
/frontend
 /app
  ├── /_components
  ├── /Context
  ├── /admin
  ├── /firebase
  ├── layout.tsx
  └── page.tsx
/backend
  ├── /controllers
  ├── /routes
  ├── /models
  ├── /utils
  ├── server.js
  └── package.json
```

# Setup Instructions
Prerequisites:
- **Node.js** installed on your machine.
- A **Firebase project** configured for authentication.
---
## Steps:
1.Clone the Repository
```plaintext
git clone https://github.com/aakashsaibalaji/
```

2.Install Dependencies
Navigate to both the frontend and backend folders and run:
```plaintext
npm install
```

3.Add Firebase Configuration
Create a .env.local file in the frontend folder and add the following keys (replace with your Firebase project values)
```plaintext
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

4.Add Backend MongoDB Url local or altas in .env.
```plaintext
MONGO_URL=
```

5.Run Backend.
```plaintext
cd Backend
npm run start
```

6.Run frotend.
```plaintext
->cd frontend
->npm run dev
```




