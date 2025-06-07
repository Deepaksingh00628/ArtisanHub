document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let isRegistered = localStorage.getItem('isRegistered') === 'true';
    let currentProduct = null;

    const updateCartCount = () => {
        const uniqueItems = new Set(cart.map(item => item.name)).size;
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = uniqueItems;
        });
    };

    const updateCartDisplay = () => {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        if (!cartItems || !cartTotal) return;

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" data-index="${index}">
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
        updateCartCount();
    };

    const updateOrderSummary = () => {
        const orderItems = document.getElementById('order-items');
        const orderTotal = document.getElementById('order-total');
        if (!orderItems || !orderTotal) return;

        orderItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `${item.name}: ₹${(item.price * item.quantity).toFixed(2)} (Qty: ${item.quantity})`;
            orderItems.appendChild(p);
            total += item.price * item.quantity;
        });

        orderTotal.textContent = total.toFixed(2);
    };

    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
            });
        });
    }

    const showPopup = (id) => {
        document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
        document.getElementById(id).style.display = 'flex';
    };

    const closePopups = () => {
        document.querySelectorAll('.popup').forEach(popup => popup.style.display = 'none');
    };

    document.querySelectorAll('.popup-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            showPopup(trigger.getAttribute('href').substring(1) + '-popup');
        });
    });

    document.querySelectorAll('.close').forEach(close => {
        close.addEventListener('click', closePopups);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            currentProduct = {
                name: card.dataset.name,
                price: parseFloat(card.dataset.price),
                image: card.querySelector('img').src
            };
            document.getElementById('cart-product-name').textContent = currentProduct.name;
            document.getElementById('cart-quantity').value = 1;
            showPopup('add-to-cart-popup');
        });
    });

    const quantityInput = document.getElementById('cart-quantity');
    const minusBtn = document.querySelector('#add-to-cart-popup .minus');
    const plusBtn = document.querySelector('#add-to-cart-popup .plus');

    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    }

    document.getElementById('confirm-add-to-cart')?.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        const existingItem = cart.find(item => item.name === currentProduct.name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...currentProduct, quantity });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        closePopups();
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn') || e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.dataset.index);
            if (e.target.classList.contains('minus') && cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else if (e.target.classList.contains('plus')) {
                cart[index].quantity += 1;
            } else if (e.target.classList.contains('remove-item')) {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('quantity')) {
            const index = parseInt(e.target.dataset.index);
            const value = parseInt(e.target.value);
            if (value >= 1) {
                cart[index].quantity = value;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            }
        }
    });

    document.getElementById('login-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        closePopups();
    });

    document.getElementById('register-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        isRegistered = true;
        localStorage.setItem('isRegistered', 'true');
        closePopups();
        showPopup('seller-product-popup');
    });

    document.getElementById('seller-product-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Product submitted successfully!');
        closePopups();
    });

    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isRegistered) {
            showPopup('register-popup');
        } else {
            alert('Order placed successfully!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateOrderSummary();
            closePopups();
        }
    });

    updateCartDisplay();
    updateOrderSummary();
});