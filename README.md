# CodeXchange

CodeXchange is a real-time space for sharing and discussing code with colleagues or friends.

Unlike a general-purpose chat app, CodeXchange is built around code — keeping it readable, easy to share, and easier to revisit later.

## Live Demo

**https://code-xchange.vercel.app**

You can try the application using the guest demo option on the sign-in page, or create your own account.

## Why I Built It

Sharing code with colleagues was surprisingly frustrating.

When I needed to share anything from a small snippet to an entire file, we often used Google Chat. Code formatting and syntax didn't always survive the process — some characters would be changed or formatting would be lost, which meant manually correcting the code before it could be used. Longer pieces of code were also difficult to share.

I personally ran into this problem often enough that I decided to build a solution.

**CodeXchange was built as a simple space for sharing code and discussing it in real time, without losing the structure of the code along the way.**

## What It Does

CodeXchange gives developers a dedicated space to share and discuss code with colleagues or friends in real time.

It is designed around two simple ideas:

- **Share code without losing its structure.** Code can be shared without the formatting and character limitations that come with general-purpose chat platforms.
- **Keep code separate from conversations.** Instead of mixing code with everyday messages, CodeXchange keeps code-focused conversations in one place, making it easier to find and revisit code when needed.

The idea is simple: **a dedicated space that becomes a living notebook for the code you share.**

## Features

- Real-time one-to-one conversations
- Code sharing with syntax highlighting for 35+ languages
- Copy code directly from shared messages
- Online presence
- Unread-message notifications
- Guest demo access for quick evaluation

## Engineering

CodeXchange is built as a small full-stack application with separate client and server responsibilities.

The client communicates with the backend through REST APIs for persistent data and Socket.IO for real-time events such as messages, notifications, and online presence.

The backend uses MongoDB for persistence and combines an Express API with a Socket.IO server.

### Architecture

```text

  		React Client
    			↓
          
  	REST + Socket.IO
          	 	↓
          
Express + Socket.IO Server    
				↓
          
		Mongoose
          		↓

	MongoDB Atlas 
```

## Engineering Challenges & Learnings

Building CodeXchange was an opportunity to work through several practical engineering problems:

### Real-time communication

The application needed conversations, notifications, and presence information to update without requiring users to refresh the page. Socket.IO is used to provide the real-time communication layer between the client and server.

### Sharing code reliably

The core product problem was preserving code as code rather than treating it like ordinary chat text. The application uses a dedicated code editor and syntax highlighting so shared code remains readable and useful.

### Building end to end

CodeXchange was designed and developed independently, covering the frontend experience, backend APIs, real-time communication, authentication, persistence, and deployment.

### Working within lightweight infrastructure

The application is deployed using Vercel with MongoDB Atlas as the database. Keeping the project running within free and hobby-tier infrastructure also became part of the practical deployment experience.

## Tech Stack

| Layer          | Technology               |
| -------------- | ------------------------ |
| Frontend       | React, Vite, Material UI |
| Code editor    | Monaco Editor            |
| Realtime       | Socket.IO                |
| Backend        | Node.js, Express         |
| Database       | MongoDB, Mongoose        |
| Authentication | bcrypt                   |
| Deployment     | Vercel                   |

## Project Structure

```text
CodeXchange/
├── client/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       └── utils/
└── server/
    ├── Controllers/
    ├── Models/
    ├── Routes/
    └── Socket/
```

The project is intentionally kept as a small two-part application: a React client and a Node.js/Express server.

## Running Locally

### Prerequisites

- Node.js 18+
- A MongoDB connection string, either from MongoDB Atlas or a local MongoDB instance

### 1. Clone and install

```bash
git clone https://github.com/ganeshpc007/CodeXchange.git
cd CodeXchange

cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

Create environment files for both applications:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

#### Server

| Variable      | Description                 |
| ------------- | --------------------------- |
| `ATLAS_URI` | MongoDB connection string   |
| `PORT`      | Port for the Express server |

#### Client

| Variable                | Description                     |
| ----------------------- | ------------------------------- |
| `VITE_API_BASE_URL`   | Base URL of the REST API        |
| `VITE_SOCKET_URL`     | URL of the Socket.IO server     |
| `VITE_GUEST_EMAIL`    | Optional guest account email    |
| `VITE_GUEST_PASSWORD` | Optional guest account password |

Guest credentials are optional. They only work when a matching guest account exists in the database.

### 3. Run the applications

Start the server:

```bash
cd server
npm start
```

In another terminal, start the client:

```bash
cd client
npm run dev
```

The client will be available at:

```text
http://localhost:5173
```

## Project Status

CodeXchange is a completed personal project and remains available as a working demo.

The hosted application uses lightweight infrastructure, so availability may occasionally depend on the state of the underlying free-tier services.

## Feedback

If you find an issue or have an idea for improvement, feel free to open an issue or submit a pull request.
