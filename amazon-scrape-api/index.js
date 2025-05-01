import cors from "cors";
import express from "express";
import { setupRoutes } from "./src/routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
setupRoutes(app);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
	console.log(`🔍 Test: http://localhost:${PORT}/api/scrape?keyword=laptop`);
});
