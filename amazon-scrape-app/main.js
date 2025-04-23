const API_URL = "http://localhost:3001/api"; // Updated port to match backend

const searchBtn = document.getElementById("searchBtn");
const keywordInput = document.getElementById("keyword");
const resultsDiv = document.getElementById("results");
const loadingDiv = document.getElementById("loading");

async function searchProducts(keyword) {
	try {
		loadingDiv.classList.remove("hidden");
		resultsDiv.innerHTML = "";

		const response = await fetch(
			`${API_URL}/scrape?keyword=${encodeURIComponent(keyword)}`,
		);

		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		const data = await response.json();

		// Exibindo os dados da API no console para verificar o que está sendo retornado
		console.log("Fetched data:", data); // Aqui você verá os dados no console

		displayResults(data.products);
	} catch (error) {
		resultsDiv.innerHTML = `
      <div class="error">
        Error: ${error.message}. Please try again later.
      </div>
    `;
	} finally {
		loadingDiv.classList.add("hidden");
	}
}

function displayResults(products) {
	resultsDiv.innerHTML = products
		.map(
			(product) => `
    <div class="product-card">
      <img src="${product.imageUrl || "/placeholder.png"}" alt="${product.title}">
      <h3>${product.title}</h3>
      <div class="product-info">
        <p>Rating: ${product.rating}</p>
        <p>Reviews: ${product.reviewCount}</p>
      </div>
    </div>
  `,
		)
		.join("");
}

searchBtn.addEventListener("click", () => {
	const keyword = keywordInput.value.trim();
	if (keyword) {
		searchProducts(keyword);
	}
});

keywordInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		const keyword = keywordInput.value.trim();
		if (keyword) {
			searchProducts(keyword);
		}
	}
});
