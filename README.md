📁 Company Finder

A simple full-stack application to search and filter companies by name, country, industry, tags, and more.
Frontend is built using React + Vite, and backend uses JSON Server to serve mock API data.

🚀 Project Structure
company-finder/
│── frontend/       # React app (Vite + MUI)
│── backend/        # JSON Server backend
│   └── db.json     # Mock database
│── README.md

🎯 Features

Search companies by name

Filter by country, industry, and tags

Responsive UI built with Material UI

Backend using JSON Server (mock API)

Fully deployable on Vercel (frontend) & Render (backend)

🖥️ Frontend (React)
🔧 Setup
cd frontend
npm install
npm run dev

📦 Build
npm run build

🗄️ Backend (JSON Server)
🔧 Setup
cd backend
npm install
npx json-server --watch db.json --port 5000


This starts API at:

http://localhost:5000/companies

🌐 Deployment Guide
Frontend → Vercel

Go to https://vercel.com

Import your GitHub repository

Select frontend/ as project root

Build Command: npm run build

Output Directory: dist

Backend → Render (JSON Server)

Go to https://render.com

Create new Web Service

Connect GitHub repository

Choose backend/ folder

Build Command:

npm install


Start Command:

npx json-server --watch db.json --port 10000


Render will give you a live API URL like:

https://companyfinder-backend.onrender.com/companies

🔗 Environment Setup (Optional)

Create a .env in frontend:

VITE_API_URL=https://your-render-backend-url/companies


Use in React:

const API_URL = import.meta.env.VITE_API_URL;

👤 Author

Prasanth Manne
Full-Stack Developer

📄 License

MIT License
