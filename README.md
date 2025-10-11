# CookQuery

A culinary recipe portal featuring sorting, filtering, searching, and pagination (SFWP) functionality.

## Requirements

- Node.js (v16 or higher)
- npm (v8 or higher)

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/gubbl3bum/CookQuery
cd cookquery
```

### 2. Install Backend dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend dependencies
```bash
cd ../frontend
npm install
```

## Running the Project

### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on: **http://localhost:3000**  
Swagger UI: **http://localhost:3000/api-docs**

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on: **http://localhost:5173**

## Quick Start

1️⃣ **Install dependencies**
```bash
cd backend && npm install && cd ../frontend && npm install
```

2️⃣ **Start Backend**
```bash
cd backend && npm run dev
```

3️⃣ **Start Frontend** (new terminal)
```bash
cd frontend && npm run dev
```

 **Done!** Open http://localhost:5173

## API Documentation

After starting the backend, full API documentation is available at:
- **Swagger UI**: http://localhost:3000/api-docs

## SFWP Features

- **Sorting**: by time, rating, name
- **Filtering**: cuisine type, difficulty level
- **Searching**: by recipe name and description
- **Pagination**: 12 recipes per page

## Project Structure

```
cookquery/
├── backend/              # Node.js + Express server
│   ├── routes/          # API endpoints
│   ├── data/            # Data storage (recipes.json)
│   └── server.js        # Main server file
├── frontend/            # Vue.js application
│   ├── src/
│   │   ├── components/  # Vue components
│   │   └── services/    # API service
│   └── public/
└── documentation/       # Project documentation
```

## Technologies

**Backend:**
- Node.js
- Express.js
- Swagger (swagger-jsdoc, swagger-ui-express)
- CORS

**Frontend:**
- Vue.js 3 (Composition API)
- Axios
- CSS3

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | Get recipes list with SFWP |
| GET | `/api/recipes/:id` | Get recipe details |

### Sample query with parameters:
```
GET /api/recipes?sort=ocena&order=desc&kuchnia=wloska&szukaj=carbonara&strona=1&limit=12
``

## Features

- Modern, responsive UI
- Real-time search functionality
- Advanced filtering options
- Dynamic sorting capabilities
- Smooth pagination
- Interactive Swagger documentation
- RESTful API architecture

##  Screenshots

### Main Page
Recipe listing with search and filters

### Swagger Documentation
Interactive API documentation at `/api-docs`

## License

Educational project - University/College

## Contributing

This is an educational project. Feel free to fork and experiment!


---
