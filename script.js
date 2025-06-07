document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let isRegistered = localStorage.getItem('isRegistered') === 'true';
    let currentProduct = null;

    // Predefined product list for categories
    const productsList = [
        // Existing Products
        { name: "Handmade Vase", price: 3750, category: "Home Decor", image: "https://images.pexels.com/photos/6782345/pexels-photo-6782345.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Artisan Necklace", price: 2500, category: "Jewelry", image: "https://images.unsplash.com/photo-1611598735228-4a30f5e9b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Woven Basket", price: 2083, category: "Home Decor", image: "https://images.pexels.com/photos/191360/pexels-photo-191360.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Ceramic Plate", price: 2917, category: "Home Decor", image: "https://images.pexels.com/photos/6096278/pexels-photo-6096278.jpeg?auto=compress&cs=tinysrgb&w=300" },
        // Art Category
        { name: "Abstract Painting", price: 5000, category: "Art", image: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Charcoal Sketch", price: 3000, category: "Art", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        { name: "Watercolor Portrait", price: 4500, category: "Art", image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=300" },
        // Jewelry Category
        { name: "Beaded Bracelet", price: 1800, category: "Jewelry", image: "https://images.pexels.com/photos/2785557/pexels-photo-2785557.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Silver Earrings", price: 2200, category: "Jewelry", image: "https://images.unsplash.com/photo-1605101202151-393d6e39e3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        // Fashion Category
        { name: "Handwoven Scarf", price: 1500, category: "Fashion", image: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Embroidered Kurta", price: 3500, category: "Fashion", image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Leather Belt", price: 2000, category: "Fashion", image: "https://images.unsplash.com/photo-1591561954650-2e718e3a15f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
        // Home Decor Category
        { name: "Wooden Wall Art", price: 4000, category: "Home Decor", image: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=300" },
        { name: "Macrame Plant Hanger", price: 1200, category: "Home Decor", image: "https://images.unsplash.com/photo-1596462502278-27bf71533222?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    ];

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

    // Populate Category Page
    const populateCategoryProducts = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const categoryTitle = document.getElementById('category-title');
        const categoryProducts = document.getElementById('category-products');

        if (category && categoryTitle && categoryProducts) {
            categoryTitle.textContent = `${category} Products`;
            const filteredProducts = productsList.filter(product => product.category === category);

            categoryProducts.innerHTML = '';
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.name = product.name;
                productCard.dataset.price = product.price;
                productCard.dataset.category = product.category;
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>₹${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                categoryProducts.appendChild(productCard);
            });
        }
    };

    // Search Functionality
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Filter Products on Products Page Based on Search
    const filterProductsBySearch = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search')?.toLowerCase();
        const productGrid = document.querySelector('.product-grid');

        if (searchQuery && productGrid) {
            const productCards = productGrid.querySelectorAll('.product-card');
            productCards.forEach(card => {
                const productName = card.dataset.name.toLowerCase();
                if (productName.includes(searchQuery)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
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

    // Initialize page-specific functions
    updateCartDisplay();
    updateOrderSummary();
    populateCategoryProducts();
    filterProductsBySearch();
});