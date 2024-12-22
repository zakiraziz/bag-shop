let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

// Update the cart on page load
updateCart();

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.price += price;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    total += price;
    saveCart();
    updateCart();
}

function removeFromCart(item) {
    const itemIndex = cart.findIndex(cartItem => cartItem.item === item);
    if (itemIndex > -1) {
        total -= cart[itemIndex].price / cart[itemIndex].quantity;
        cart[itemIndex].quantity -= 1;

        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
    }
    saveCart();
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyMessage = 'Your cart is empty.';

    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.textContent = emptyMessage;
    } else {
        cart.forEach(({ item, price, quantity }) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item} - $${(price / quantity).toFixed(2)} x ${quantity} 
                <button class="remove-btn" onclick="removeFromCart('${item}')">Remove</button>
            `;
            cartItems.appendChild(li);
        });
    }

    cartTotal.textContent = total.toFixed(2);

    // Animate cart update
    cartItems.style.animation = 'fadeIn 0.5s';
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('total', total.toFixed(2));
}

// CSS for button styling and animations
const style = document.createElement('style');
style.textContent = `
    .remove-btn {
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 5px 10px;
        margin-left: 10px;
        cursor: pointer;
        border-radius: 5px;
        font-size: 0.9rem;
        transition: background-color 0.3s;
    }

    .remove-btn:hover {
        background-color: #ff1a1a;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
