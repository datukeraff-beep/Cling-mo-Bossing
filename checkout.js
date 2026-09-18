const cart = JSON.parse(
    localStorage.getItem("orangeShopCart")
) || [];

const orderSummary = document.querySelector("#orderSummary");
const orderTotal = document.querySelector("#orderTotal");
const placeOrderButton = document.querySelector("#placeOrderButton");

let total = 0;

function displayOrder() {
    if (cart.length === 0) {
        orderSummary.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        orderTotal.textContent = "₱0";
        placeOrderButton.disabled = true;
        return;
    }

    orderSummary.innerHTML = "";
    total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const itemElement = document.createElement("div");

        itemElement.className = "order-item";

        itemElement.innerHTML = `
            <p>
                <strong>${item.name}</strong>
                <br>
                Quantity: ${item.quantity}
                <br>
                Price: ₱${subtotal.toLocaleString()}
            </p>
            <hr>
        `;

        orderSummary.appendChild(itemElement);
    });

    orderTotal.textContent = `₱${total.toLocaleString()}`;
}

placeOrderButton.addEventListener("click", () => {
    const customerName =
        document.querySelector("#customerName").value.trim();

    const contactNumber =
        document.querySelector("#contactNumber").value.trim();

    const deliveryAddress =
        document.querySelector("#deliveryAddress").value.trim();

    const paymentMethod =
        document.querySelector("#paymentMethod").value;

    if (
        customerName === "" ||
        contactNumber === "" ||
        deliveryAddress === ""
    ) {
        alert("Please complete all customer information.");
        return;
    }

    if (paymentMethod === "") {
        alert("Please select a payment method.");
        return;
    }

    alert("Order placed successfully! 🎉");

    localStorage.removeItem("orangeShopCart");

    window.location.href = "success.html";
});

displayOrder();