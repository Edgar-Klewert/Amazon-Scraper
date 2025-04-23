/**
 * Extracts product information from the Amazon search results HTML
 * @param {Document} document - JSDOM document
 * @returns {Array} - Array of product objects
 */
export function parseProductData(document) {
	const products = [];

	// Amazon frequently changes their HTML structure, so we need to be adaptable
	// These selectors work as of November 2023, but might need updates
	const productCards = document.querySelectorAll(
		'[data-component-type="s-search-result"]',
	);

	console.log(`Found ${productCards.length} product cards`);

	productCards.forEach((card, index) => {
		try {
			// Extract product title
			const titleElement = card.querySelector("h2 a span");
			const title = titleElement
				? titleElement.textContent.trim()
				: "Title not found";

			// Extract rating
			const ratingElement = card.querySelector(
				".a-icon-star-small .a-icon-alt",
			);
			let rating = "No rating";
			if (ratingElement) {
				const ratingText = ratingElement.textContent;
				// Format: "4.5 out of 5 stars"
				const ratingMatch = ratingText.match(/([0-9.]+) out of/);
				rating = ratingMatch ? ratingMatch[1] : "Unknown rating";
			}

			// Extract review count
			const reviewCountElement = card.querySelector(
				".a-size-base.s-underline-text",
			);
			let reviewCount = "No reviews";
			if (reviewCountElement) {
				reviewCount = reviewCountElement.textContent
					.replace(/[(),]/g, "")
					.trim();
			}

			// Extract image URL
			const imageElement = card.querySelector(".s-image");
			const imageUrl = imageElement ? imageElement.getAttribute("src") : null;

			// Creating product object
			const product = {
				id: index + 1,
				title,
				rating,
				reviewCount,
				imageUrl,
			};

			products.push(product);
		} catch (error) {
			console.error(`Failed to parse product ${index + 1}:`, error.message);
		}
	});

	return products;
}

/**
 * Alternative way to parse products if the main method fails
 * @param {Document} document - JSDOM document
 * @returns {Array} - Array of product objects
 */
export function fallbackParseProductData(document) {
	const products = [];

	// Alternative selectors
	const productContainers = document.querySelectorAll(".s-result-item");

	productContainers.forEach((container, index) => {
		try {
			// Check if it's a valid product and not a sponsored item or other content
			if (
				!container.getAttribute("data-asin") ||
				container.classList.contains("AdHolder")
			) {
				return;
			}

			const title =
				container.querySelector(".a-text-normal")?.textContent.trim() ||
				"Unknown Title";

			// Try different rating selector patterns
			const ratingElement =
				container.querySelector(".a-icon-star-small") ||
				container.querySelector(".a-icon-star");
			let rating = "No rating";

			if (ratingElement) {
				const ratingText =
					ratingElement.textContent ||
					ratingElement.getAttribute("aria-label") ||
					"";
				const ratingMatch =
					ratingText.match(/([0-9.]+) out of/) ||
					ratingText.match(/([0-9.]+) stars/);
				rating = ratingMatch ? ratingMatch[1] : "Unknown rating";
			}

			// Try multiple selectors for review count
			const reviewCountElement =
				container.querySelector(".a-size-base.s-underline-text") ||
				container.querySelector(".a-link-normal .a-size-base");
			const reviewCount = reviewCountElement
				? reviewCountElement.textContent.replace(/[(),]/g, "").trim()
				: "No reviews";

			// Try different image selectors
			const imageElement =
				container.querySelector(".s-image") ||
				container.querySelector("img.a-dynamic-image");
			const imageUrl = imageElement ? imageElement.getAttribute("src") : null;

			products.push({
				id: index + 1,
				title,
				rating,
				reviewCount,
				imageUrl,
			});
		} catch (error) {
			console.error(
				`Failed to parse product with fallback method ${index + 1}:`,
				error.message,
			);
		}
	});

	return products;
}
