// Product Data with categories
const products = [
    { id: 1, name: 'Wireless Headphones', price: 2999, originalPrice: 4999, discount: 40, category: 'electronics', rating: 4.2, image: 'assets/headphone.webp' },
    { id: 2, name: 'Smart Watch', price: 7999, originalPrice: 12999, discount: 38, category: 'electronics', rating: 4.5, image: 'assets/Smarkwatch.webp' },
    { id: 3, name: 'Laptop', price: 49999, originalPrice: 69999, discount: 28, category: 'laptop', rating: 4.3, image: 'assets/laptop.webp' },
    { id: 4, name: 'Smartphone', price: 19999, originalPrice: 29999, discount: 33, category: 'mobile', rating: 4.4, image: 'assets/Smart Phones.webp' },
    { id: 5, name: 'Tablet', price: 14999, originalPrice: 21999, discount: 31, category: 'mobile', rating: 4.1, image: 'assets/Tablets.webp' },
    { id: 6, name: 'DSLR Camera', price: 34999, originalPrice: 49999, discount: 30, category: 'electronics', rating: 4.6, image: 'assets/Camera.webp' },
    { id: 7, name: 'Gaming Console', price: 29999, originalPrice: 39999, discount: 25, category: 'gaming', rating: 4.7, image: 'assets/Gaming console.webp' },
    { id: 8, name: 'Bluetooth Speaker', price: 1999, originalPrice: 3499, discount: 42, category: 'accessories', rating: 4.0, image: 'assets/Speakers.webp' },
    { id: 9, name: 'Fitness Tracker', price: 2999, originalPrice: 4999, discount: 40, category: 'accessories', rating: 4.2, image: 'assets/FitnessTracker.webp' },
    { id: 10, name: 'Wireless Mouse', price: 899, originalPrice: 1499, discount: 40, category: 'accessories', rating: 4.1, image: 'assets/Gamingmouse.webp' },
    { id: 11, name: 'Mechanical Keyboard', price: 4999, originalPrice: 6999, discount: 28, category: 'accessories', rating: 4.4, image: 'assets/Gamingkeyboard.webp' },
    { id: 12, name: 'LED Monitor', price: 12999, originalPrice: 18999, discount: 31, category: 'electronics', rating: 4.3, image: 'assets/Monitor.webp' },
    { id: 13, name: 'Gaming Mouse', price: 2499, originalPrice: 3999, discount: 37, category: 'gaming', rating: 4.5, image: 'assets/Gamingmouse1.webp' },
    { id: 14, name: 'Gaming Keyboard', price: 5999, originalPrice: 8999, discount: 33, category: 'gaming', rating: 4.6, image: 'assets/Gamingkeyboard1.webp' },
    { id: 15, name: 'Gaming Headset', price: 3999, originalPrice: 5999, discount: 33, category: 'gaming', rating: 4.4, image: 'assets/GamingHeadsets.webp' },
    { id: 16, name: 'Smart TV', price: 24999, originalPrice: 34999, discount: 28, category: 'electronics', rating: 4.5, image: 'assets/SmartTV.webp' }
];

// Cart Data
let cart = [];
let filteredProducts = [...products];
let currentCategory = 'all';
let currentSort = 'default';

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    displayProducts();
    loadCart();
    updateCartCount();
});

// Display Products
function displayProducts(productsToShow = filteredProducts) {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    if (productsToShow.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #878787;">No products found</p>';
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image"><img src="${product.image}" alt="${product.name}" /></div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="rating-stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span class="rating-text">(${product.rating})</span>
                </div>
                <div class="product-price-section">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <span class="product-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    <span class="product-discount">${product.discount}% off</span>
                </div>
                <div class="product-offer">Free delivery</div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter by Category
function filterCategory(category) {
    currentCategory = category;
    if (category === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    sortProducts(); // Apply current sort after filtering
}

// Sort Products
function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    currentSort = sortSelect.value;

    if (currentSort === 'low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        // Default order (original order)
        if (currentCategory === 'all') {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter(product => product.category === currentCategory);
        }
    }
    displayProducts(filteredProducts);
}

// Search Products
function searchProducts(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

function performSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchTerm = searchBox.value.toLowerCase().trim();

    if (searchTerm === '') {
        if (currentCategory === 'all') {
            filteredProducts = [...products];
        } else {
            filteredProducts = products.filter(product => product.category === currentCategory);
        }
    } else {
        filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
    }
    sortProducts(); // Apply current sort after searching
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartCount();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        updateCartDisplay();
        updateCartCount();
    }
}

// Display Cart
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image"><img src="${item.image}" alt="${item.name}" /></div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString('en-IN');
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Hide cart count badge if empty
    if (totalItems === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'flex';
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');

    // Add overlay
    let overlay = document.querySelector('.cart-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.onclick = toggleCart;
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase!\n\nTotal: ₹${total.toLocaleString('en-IN')}\n\nYour order has been placed successfully.`);

    cart = [];
    saveCart();
    updateCartDisplay();
    updateCartCount();
    toggleCart();
}

// Save Cart to Local Storage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Show Notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #2874f0;
        color: white;
        padding: 12px 24px;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        font-size: 14px;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);