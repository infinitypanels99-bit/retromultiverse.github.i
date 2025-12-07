window.addEventListener('load', () => {
    const stage = document.getElementById('stage');

    // Επιβεβαίωση ότι οι χαρακτήρες υπάρχουν
    const heroes = [
        document.getElementById('hero1'),
        document.getElementById('hero2'),
        document.getElementById('hero3'),
        document.getElementById('hero4')
    ];

    heroes.forEach(hero => {
        if (!hero) console.warn('Missing hero element in stage:', hero);
    });


});
// ----------------------
// CART SYSTEM
// ----------------------
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = loadCart();
    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.textContent = cart.length;
}

// Add item
// --- GLOBAL CART HANDLING ---


// Load cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Update cart icon counter
function updateCartCount() {
const cartCount = document.querySelector('.cart-count');
if (cartCount) {
cartCount.textContent = cart.length;
}
}


updateCartCount();


// Add an item to cart
function addToCart(product) {
cart.push(product);
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
alert("Added to cart!");
}


// Trigger from button
const addToCartBtn = document.querySelector("#addToCartBtn");
if (addToCartBtn) {
addToCartBtn.addEventListener("click", () => {
const productData = {
title: document.querySelector('.comic-title')?.textContent || "Comic",
price: document.querySelector('.comic-price')?.textContent || "0",
image: document.querySelector('.main-image')?.src || ""
};


addToCart(productData);
});
