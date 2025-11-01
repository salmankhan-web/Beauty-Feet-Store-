// Mobile Menu Toggle Function
// Toggles the mobile navigation menu and overlay
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Scroll Observer for Animations
// Uses Intersection Observer to trigger animations when elements enter viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'  // Trigger slightly early for smooth entry
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Uncomment below to unobserve after animation for performance
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements: sections, headings, cards, etc.
document.querySelectorAll('section, h2, .category-card, .item-card, .review, form, footer').forEach(el => {
    observer.observe(el);
});

// Hero Section Load Animation
// Triggers home animations on page load
window.addEventListener('load', () => {
    document.getElementById('home').style.opacity = '1';
    // Trigger home elements
    document.querySelector('#home h1').classList.add('animate');
    document.querySelector('#home p').classList.add('animate');
});

// Cart Functionality - Local Storage Based
// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add Item to Cart Function
// Adds or increments item in cart, updates storage and count
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // No alert as per original request
}

// Remove Item from Cart Function
// Filters out the item and updates display/storage
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Update Cart Count Badge
// Calculates total quantity and updates badges
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('mobile-cart-count').textContent = count;
}

// Update Cart Display in Modal
// Renders cart items and total in the modal
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const total = document.getElementById('total');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        total.textContent = 'Total: Rs. 0';
        return;
    }
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name} (x${item.quantity}) - Rs. ${item.price * item.quantity}</span>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        </div>
    `).join('');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    total.textContent = `Total: Rs. ${totalPrice}`;
}

// Open Cart Modal
// Displays the modal with updated cart
function openCart() {
    updateCartDisplay();
    document.getElementById('cartModal').style.display = 'block';
}

// Close Cart Modal
// Hides the modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout Function (Demo)
// Clears cart on "successful" checkout
function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    alert('Checkout successful! (Demo)');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    closeCart();
    updateCartCount();
}

// Event Listeners
// Cart icon clicks to open modal
document.getElementById('cart-icon').addEventListener('click', function(e) { e.preventDefault(); openCart(); });
document.getElementById('mobile-cart').addEventListener('click', function(e) { e.preventDefault(); openCart(); });
// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('cartModal');
    if (event.target == modal) closeCart();
};

// Smooth Scrolling for Desktop Links
// Handles smooth scroll for nav links
document.querySelectorAll('#desktopMenu a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize Cart Count on Load
updateCartCount();
