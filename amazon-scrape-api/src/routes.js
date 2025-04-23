import { scrapeAmazon } from "./services/scraper.js";

export function setupRoutes(app) {
	// Scrape endpoint
	app.get("/api/scrape", async (req, res) => {
		try {
			const { keyword } = req.query;

			if (!keyword) {
				return res.status(400).json({
					error: "Missing required query parameter: keyword",
				});
			}

			console.log(`Scraping Amazon for: "${keyword}"`);
			const results = await scrapeAmazon(keyword);

			return res.json({
				keyword,
				count: results.length,
				products: results,
			});
		} catch (error) {
			console.error("Scraping error:", error.message);
			return res.status(500).json({
				error: "Failed to scrape Amazon",
				message: error.message,
			});
		}
	});

	// Health check endpoint
	app.get("/api/health", (req, res) => {
		res.json({ status: "OK", timestamp: new Date().toISOString() });
	});
}
