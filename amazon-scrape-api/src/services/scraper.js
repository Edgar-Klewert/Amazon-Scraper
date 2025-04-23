import axios from "axios";
import { JSDOM } from "jsdom";
import { parseProductData } from "../utils/parser.js";

// Constants
const USER_AGENT =
	"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
const BASE_URL = "https://www.amazon.com/s";

/**
 * Scrapes Amazon search results for a given keyword
 * @param {string} keyword - Search term
 * @param {number} maxResults - Maximum number of results to fetch (default is 10)
 * @returns {Promise<Array>} - Array of product objects
 */
export async function scrapeAmazon(keyword, maxResults = 10) {
	try {
		// Construct search URL
		const url = `${BASE_URL}?k=${encodeURIComponent(keyword)}`;

		// Set headers to mimic a browser
		const headers = {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			"Accept-Language": "en-US,en;q=0.9",
			"Accept-Encoding": "gzip, deflate, br",
			Connection: "keep-alive",
			"Upgrade-Insecure-Requests": "1",
			"Sec-Fetch-Dest": "document",
			"Sec-Fetch-Mode": "navigate",
			"Sec-Fetch-Site": "none",
			"Sec-Fetch-User": "?1",
			"Cache-Control": "max-age=0",
		};

		console.log(`Sending request to: ${url}`);
		const response = await axios.get(url, { headers });

		if (response.status !== 200) {
			throw new Error(
				`Failed to fetch Amazon search results: ${response.status}`,
			);
		}

		const dom = new JSDOM(response.data);
		const document = dom.window.document;

		const products = parseProductData(document);

		const limitedProducts = products.slice(0, maxResults);

		console.log(`Successfully scraped ${limitedProducts.length} products`);
		return limitedProducts;
	} catch (error) {
		console.error("Error during scraping:", error);
		throw new Error(`Failed to scrape Amazon: ${error.message}`);
	}
}
