let cart = JSON.parse(localStorage.getItem("orangeShopCart")) || [];

const cartButton = document.querySelector(".cart-button");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const shopNowButton = document.querySelector("#shopNowButton");

const products = [
    {
        name: "Smartphone",
        price: 5999
    },
    {
        name: "Wireless Earphones",
        price: 299
    },
    {
        name: "Gaming Keyboard",
        price: 899
    },
    {
        name: "Oversized Shirt",
        price: 199
    },
    {
        name: "School Backpack",
        price: 499
    },
    {
        name: "Wireless Mouse",
        price: 349
    },
    {
        name: "Casual Shoes",
        price: 799
    },
    {
        name: "USB Charger",
        price: 249
    }
];

function updateCart() {
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartText = document.querySelector(".cart-button");

    if (cartText) {
        cartText.innerHTML = `🛒 Cart (${totalItems})`;
    }

    localStorage.setItem(
        "orangeShopCart",
        JSON.stringify(cart)
    );
}

function addToCart(productIndex) {
    const product = products[productIndex];

    const existingProduct = cart.find(
        item => item.name === product.name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();

    alert(`${product.name} added to cart! 🛒`);
}

const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        addToCart(index);
    });
});

if (cartButton) {
    cartButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! 🛒");
            return;
        }

        showCart();
    });
}

function showCart() {
    let cartMessage = "🛒 YOUR ORANGE SHOP CART\n\n";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartMessage += `${index + 1}. ${item.name}\n`;
        cartMessage += `₱${item.price} x ${item.quantity}\n`;
        cartMessage += `Subtotal: ₱${itemTotal}\n\n`;
    });

    cartMessage += `TOTAL: ₱${total}\n\n`;
    cartMessage += "Proceed to checkout?";

    const proceed = confirm(cartMessage);

    if (proceed) {
        window.location.href = "checkout.html";
    }
}

if (searchButton) {
    searchButton.addEventListener("click", searchProducts);
}

if (searchInput) {
    searchInput.addEventListener("keyup", event => {
        if (event.key === "Enter") {
            searchProducts();
        }
    });
}

function searchProducts() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        const productName = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

if (shopNowButton) {
    shopNowButton.addEventListener("click", () => {
        document.querySelector("#products").scrollIntoView({
            behavior: "smooth"
        });
    });
}

updateCart();