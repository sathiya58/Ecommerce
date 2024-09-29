const apiUrl = 'https://fakestoreapi.com/products';
let productsList = [];
let cart = [];

// Fetch products from Fake Store API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        productsList = products; // Store fetched products globally
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products on the webpage
function displayProducts(products) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="buyNow(${product.id})">Buy Now</button>
        `;
        productsSection.appendChild(productCard);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = productsList.find(p => p.id === productId);
    cart.push(product);
    displayCart();
}

// Simulate a purchase
function buyNow(productId) {
    const product = productsList.find(p => p.id === productId);
    alert(`Thank you for purchasing ${product.title}!`);
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            ${product.title} - $${product.price}
            <button onclick="deleteItem(${index})">Delete</button>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Delete item from cart
function deleteItem(index) {
    cart.splice(index, 1);
    displayCart();
}

// Search function to filter products
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredProducts = productsList.filter(product => product.title.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
});

// Fetch and display products on page load
fetchProducts();
