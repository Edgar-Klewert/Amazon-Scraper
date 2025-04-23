import cors from "cors";
import express from "express";
import { setupRoutes } from "./src/routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Adicione timeout
const response = await axios.get(url, {
	headers,
	timeout: 10000, // 10 segundos
});

if (products.length === 0) {
	products = fallbackParseProductData(document);
	if (products.length === 0) {
		throw new Error("No products found - possible CAPTCHA or layout change");
	}
}

// Setup routes
setupRoutes(app);

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
	console.log(
		`Try accessing: http://localhost:${PORT}/api/scrape?keyword=laptop`,
	);
});
