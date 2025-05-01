# 📦 Amazon Scraper

A complete application for searching and displaying Amazon products via API and frontend.

---

## 🧠 Overview

This project has two parts:

- **Backend (API)** — Built with [Bun](https://bun.sh/), scrapes product data from Amazon.
- **Frontend (UI)** — A modern, lightweight interface built with [Vite](https://vitejs.dev/) and plain JavaScript (no React).

---

## ⚙️ Requirements

- [Bun v1.0.0+](https://bun.sh/)
- Node.js v18+ (for frontend, if not using Bun)
- Internet connection

---

## 📁 Project Structure

```
amazon-scraper/
├── backend/     → API for scraping Amazon search results
└── frontend/    → Web interface for product searching
```

---

## 💻 Backend - Amazon Scraper API

### ✨ Features

- Search Amazon by keyword
- Returns:
  - Product title
  - Rating (0-5 stars)
  - Review count
  - Image URL

### 🛠️ Installation

```bash
git clone https://github.com/Edgar-Klewert/Amazon-Scraper.git
cd amazon-scraper-api
bun install
```

### 🚀 Run the Server

```bash
bun start          # production mode
bun dev            # development mode (hot reload)
```

Access: [http://localhost:3001](http://localhost:3001)

### 🔌 API Endpoints

#### 🔍 Search Products

**GET** `/api/scrape?keyword={term}[&maxResults={n}]`

| Parameter     | Required | Default | Description                         |
|---------------|----------|---------|-------------------------------------|
| `keyword`     | Yes      | —       | Search term                         |
| `maxResults`  | No       | 10      | Maximum number of products returned |

**Example**:

```bash
curl "http://localhost:3001/api/scrape?keyword=wireless+headphones&maxResults=3"
```

**Response**:

```json
{
  "keyword": "wireless headphones",
  "count": 3,
  "products": [
    {
      "id": 1,
      "title": "Premium Wireless Headphones with Noise Cancellation",
      "rating": "4.6",
      "reviewCount": "12,345",
      "imageUrl": "https://m.media-amazon.com/images/I/71example.jpg"
    }
  ]
}
```

#### ✅ Health Check

**GET** `/api/health`

```json
{
  "status": "OK",
  "timestamp": "2023-11-15T12:00:00.000Z"
}
```

### ⚠️ Important Notes

- **Rate Limiting**: Add 2–5 second delays between requests.
- **CAPTCHA**: Amazon may prompt human verification.
- **HTML Changes**: Amazon's DOM structure may change and break the scraper.
- **Legality**: Check [Amazon’s Terms of Service](https://www.amazon.com/gp/help/customer/display.html?nodeId=508088). For educational use only.

---

## 🌐 Frontend - Amazon Product Scraper UI

### ✨ Features

- Clean, responsive UI
- Real-time product search
- Product cards with image, title, rating, and reviews
- Loading spinner, error banners, and keyboard navigation

### 🛠️ Installation

```bash
cd amazon-scraper-app
bun install  # or npm install
```

### 🚀 Run the App

1. Make sure the backend is running
2. Start the frontend:

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 🔧 Configuration (.env)

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:3001
VITE_MAX_RESULTS=12
VITE_DEFAULT_KEYWORD="electronics"
```

### 🏗️ Build for Production

```bash
bun run build
```

Build output will be in the `/dist` folder.

---

## 🖼️ UI Components

| Component       | Description                          |
|------------------|--------------------------------------|
| **Search Bar**   | Input field with search button       |
| **Product Grid** | Responsive layout for product cards  |
| **Spinner**      | Animated loading indicator           |
| **Error Banner** | Displays API errors                  |

---

## 📱 Responsive Design

| Screen Size     | Layout         |
|------------------|----------------|
| Mobile <768px    | 1 column       |
| Tablet 768–1024px| 2 columns      |
| Desktop >1024px  | 3–4 columns    |

---

## 🚦 Development Scripts

| Command            | Description                          |
|--------------------|--------------------------------------|
| `bun run dev`      | Start development server             |
| `bun run build`    | Generate production build            |
| `bun run preview`  | Preview production build locally     |

---

## 🧰 Local Setup Tips

### Install Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

### Run both services (in separate terminals)

```bash
# Terminal 1:
cd backend && bun dev

# Terminal 2:
cd frontend && bun run dev
```

---

## 🔗 Architecture

```
Frontend (port 5173) → Backend (port 3001) → Amazon.com
```

---

## 🛠️ FAQ

- **Empty results?**
  - Amazon CAPTCHA might be triggered.
  - The HTML structure may have changed.

- **API errors?**
  - Make sure the backend is running.
  - Verify required parameters in your request.

