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

// Load cart from localStorage ή create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ----------------------
// FUNCTIONS
// ----------------------

// Προσθήκη προϊόντος στο cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartPopup(item.title);
}

// Ενημέρωση αριθμού στο cart icon
function updateCartCount() {
    const cartCountElems = document.querySelectorAll('.cart-count');
    cartCountElems.forEach(span => span.textContent = cart.length);
}
updateCartCount();

// Popup επιβεβαίωσης
function showCartPopup(title) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.innerHTML = `
        <div class="cart-popup-box">
            <h3>✔ Το προσθέσατε στο καλάθι!</h3>
            <p><strong>${title}</strong></p>
            <div class="popup-buttons">
                <button id="continueBtn">Συνέχεια στο Shop</button>
                <button id="goToCartBtn">Μετάβαση στο Καλάθι</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("continueBtn").onclick = () => popup.remove();
    document.getElementById("goToCartBtn").onclick = () => window.location.href = "cart.html";
}

// Εμφάνιση cart στο cart.html
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const cartTotalElem = document.getElementById("cart-total");

    if (!cartContainer || !cartTotalElem) return;

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="cart-details">
                <h3>${item.title}</h3>
                <p>€${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(div);
        total += parseFloat(item.price);
    });

    cartTotalElem.textContent = total.toFixed(2);

    // Remove item buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
            updateCartCount();
        });
    });
}

// ----------------------
// COMICS.HTML Add to Cart Buttons
// ----------------------
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const title = btn.dataset.title;
        const price = parseFloat(btn.dataset.price);
        const img = btn.dataset.img;

        addToCart({ title, price, img });
    });
});

// ----------------------
// COMIC-DETAIL.HTML Add to Cart Button
// ----------------------
const comicDetailBtn = document.querySelector(".add-to-cart-btn");
if (comicDetailBtn && typeof comic !== "undefined") {
    comicDetailBtn.addEventListener("click", () => {
        addToCart({
            title: comic.title,
            price: parseFloat(comic.price.replace("€", "")),
            img: comic.images[0]
        });
    });
}
