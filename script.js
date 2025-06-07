document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let isRegistered = localStorage.getItem('isRegistered') === 'true';
    let currentProduct = null;

    // Predefined product list with detailed information
    const productsList = [
        {
            name: "Handmade Vase",
            price: 3750,
            category: "Home Decor",
            image: "https://images.pexels.com/photos/6782345/pexels-photo-6782345.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A beautifully crafted ceramic vase, hand-painted with intricate floral patterns. Perfect for adding a touch of elegance to your living space.",
            specifications: ["Material: Ceramic", "Height: 12 inches", "Color: Blue and White", "Hand-painted"],
            seller: {
                name: "Priya Sharma",
                address: "123 Pottery Lane, Jaipur, Rajasthan, India",
                contact: "+91 98765 43210"
            },
            inStock: false
        },
        {
            name: "Artisan Necklace",
            price: 2500,
            category: "Jewelry",
            image: "https://images.unsplash.com/photo-1611598735228-4a30f5e9b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "A handcrafted necklace featuring natural turquoise stones set in sterling silver. Ideal for both casual and formal occasions.",
            specifications: ["Material: Sterling Silver, Turquoise", "Length: 18 inches", "Weight: 20 grams", "Handmade"],
            seller: {
                name: "Anjali Verma",
                address: "45 Jewel Street, Udaipur, Rajasthan, India",
                contact: "+91 91234 56789"
            },
            inStock: true
        },
        {
            name: "Woven Basket",
            price: 2083,
            category: "Home Decor",
            image: "https://images.pexels.com/photos/191360/pexels-photo-191360.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A sturdy woven basket made from natural bamboo. Perfect for storage or as a decorative piece in your home.",
            specifications: ["Material: Bamboo", "Diameter: 15 inches", "Height: 10 inches", "Handwoven"],
            seller: {
                name: "Rahul Mehta",
                address: "78 Craft Village, Guwahati, Assam, India",
                contact: "+91 87654 32109"
            },
            inStock: true
        },
        {
            name: "Ceramic Plate",
            price: 2917,
            category: "Home Decor",
            image: "https://images.pexels.com/photos/6096278/pexels-photo-6096278.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A handcrafted ceramic plate with a minimalist design. Great for serving snacks or as a decorative item.",
            specifications: ["Material: Ceramic", "Diameter: 10 inches", "Color: Off-White", "Dishwasher Safe"],
            seller: {
                name: "Kavita Reddy",
                address: "12 Artisan Road, Hyderabad, Telangana, India",
                contact: "+91 90123 45678"
            },
            inStock: true
        },
        {
            name: "Abstract Painting",
            price: 5000,
            category: "Art",
            image: "https://images.pexels.com/photos/1252869/pexels-photo-1252869.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A vibrant abstract painting on canvas, created using acrylic paints. Adds a pop of color to any room.",
            specifications: ["Medium: Acrylic on Canvas", "Dimensions: 24 x 24 inches", "Framed: No", "Signed by Artist"],
            seller: {
                name: "Vikram Singh",
                address: "56 Art Lane, Mumbai, Maharashtra, India",
                contact: "+91 89012 34567"
            },
            inStock: true
        },
        {
            name: "Charcoal Sketch",
            price: 3000,
            category: "Art",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "A detailed charcoal sketch depicting a serene landscape. Perfect for art enthusiasts and collectors.",
            specifications: ["Medium: Charcoal on Paper", "Dimensions: 18 x 12 inches", "Framed: Yes", "Signed by Artist"],
            seller: {
                name: "Neha Kapoor",
                address: "34 Sketch Street, Delhi, India",
                contact: "+91 78901 23456"
            },
            inStock: true
        },
        {
            name: "Watercolor Portrait",
            price: 4500,
            category: "Art",
            image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A stunning watercolor portrait capturing intricate details with vibrant colors. A great addition to your art collection.",
            specifications: ["Medium: Watercolor on Paper", "Dimensions: 20 x 16 inches", "Framed: Yes", "Signed by Artist"],
            seller: {
                name: "Arjun Patel",
                address: "89 Canvas Road, Ahmedabad, Gujarat, India",
                contact: "+91 67890 12345"
            },
            inStock: true
        },
        {
            name: "Beaded Bracelet",
            price: 1800,
            category: "Jewelry",
            image: "https://images.pexels.com/photos/2785557/pexels-photo-2785557.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A delicate beaded bracelet made with glass beads and an adjustable clasp. Perfect for everyday wear.",
            specifications: ["Material: Glass Beads, Metal Clasp", "Length: Adjustable (6-8 inches)", "Weight: 10 grams", "Handmade"],
            seller: {
                name: "Suman Gupta",
                address: "23 Bead Market, Kolkata, West Bengal, India",
                contact: "+91 56789 01234"
            },
            inStock: true
        },
        {
            name: "Silver Earrings",
            price: 2200,
            category: "Jewelry",
            image: "https://images.unsplash.com/photo-1605101202151-393d6e39e3c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "Elegant sterling silver earrings with a dangling design. Suitable for both casual and formal outfits.",
            specifications: ["Material: Sterling Silver", "Length: 2 inches", "Weight: 15 grams", "Handcrafted"],
            seller: {
                name: "Ritu Desai",
                address: "67 Silver Lane, Pune, Maharashtra, India",
                contact: "+91 45678 90123"
            },
            inStock: true
        },
        {
            name: "Handwoven Scarf",
            price: 1500,
            category: "Fashion",
            image: "https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A soft handwoven scarf made from pure cotton. Keeps you warm while adding style to your outfit.",
            specifications: ["Material: 100% Cotton", "Dimensions: 70 x 20 inches", "Color: Multicolor", "Handwoven"],
            seller: {
                name: "Amita Bose",
                address: "45 Weave Street, Chennai, Tamil Nadu, India",
                contact: "+91 34567 89012"
            },
            inStock: true
        },
        {
            name: "Embroidered Kurta",
            price: 3500,
            category: "Fashion",
            image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A traditional kurta with intricate hand embroidery, made from breathable cotton fabric. Perfect for festive occasions.",
            specifications: ["Material: Cotton", "Size: Medium", "Color: Red", "Hand Embroidered"],
            seller: {
                name: "Deepak Malhotra",
                address: "12 Textile Road, Lucknow, Uttar Pradesh, India",
                contact: "+91 23456 78901"
            },
            inStock: true
        },
        {
            name: "Leather Belt",
            price: 2000,
            category: "Fashion",
            image: "https://images.unsplash.com/photo-1591561954650-2e718e3a15f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "A durable leather belt with a classic buckle design. Suitable for both formal and casual wear.",
            specifications: ["Material: Genuine Leather", "Length: 42 inches", "Width: 1.5 inches", "Color: Brown"],
            seller: {
                name: "Suresh Nair",
                address: "78 Leather Market, Kanpur, Uttar Pradesh, India",
                contact: "+91 12345 67890"
            },
            inStock: true
        },
        {
            name: "Wooden Wall Art",
            price: 4000,
            category: "Home Decor",
            image: "https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=300",
            description: "A hand-carved wooden wall art piece featuring a tree of life design. Adds a rustic charm to your home decor.",
            specifications: ["Material: Mango Wood", "Dimensions: 20 x 20 inches", "Color: Natural Wood", "Hand-carved"],
            seller: {
                name: "Meena Kumari",
                address: "56 Woodcraft Lane, Jodhpur, Rajasthan, India",
                contact: "+91 01234 56789"
            },
            inStock: true
        },
        {
            name: "Macrame Plant Hanger",
            price: 1200,
            category: "Home Decor",
            image: "https://images.unsplash.com/photo-1596462502278-27bf71533222?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
            description: "A hand-knotted macrame plant hanger, perfect for displaying your favorite indoor plants.",
            specifications: ["Material: Cotton Rope", "Length: 36 inches", "Color: Beige", "Hand-knotted"],
            seller: {
                name: "Lakshmi Iyer",
                address: "34 Craft Avenue, Bengaluru, Karnataka, India",
                contact: "+91 90123 45678"
            },
            inStock: true
        }
    ];

    const updateCartCount = () => {
        const uniqueItems = new Set(cart.map(item => item.name)).size;
        document.querySelectorAll('.cart-count').forEach(el => {
            if (uniqueItems > 0) {
                el.textContent = uniqueItems;
                el.classList.add('visible');
            } else {
                el.textContent = '';
                el.classList.remove('visible');
            }
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

    const updateWishlistDisplay = () => {
        const wishlistItems = document.getElementById('wishlist-items');
        if (!wishlistItems) return;

        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistItems.innerHTML = '';

        wishlist.forEach((item, index) => {
            const wishlistItem = document.createElement('div');
            wishlistItem.classList.add('cart-item');
            wishlistItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            wishlistItems.appendChild(wishlistItem);
        });

        document.querySelectorAll('.wishlist-items .remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                wishlist.splice(index, 1);
                localStorage.setItem('wishlist', JSON.stringify(wishlist));
                updateWishlistDisplay();
            });
        });
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

    const trackProductView = (productName) => {
        let viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
        if (!viewedProducts.includes(productName)) {
            viewedProducts.push(productName);
            localStorage.setItem('viewedProducts', JSON.stringify(viewedProducts));
        }
    };

    const populatePersonalizedRecommendations = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product');
        const product = productsList.find(p => p.name === productName);
        if (product) {
            trackProductView(productName);
            const viewedProducts = JSON.parse(localStorage.getItem('viewedProducts')) || [];
            const relatedCategories = productsList.filter(p => p.category === product.category && p.name !== productName);
            const recommendations = relatedCategories.filter(p => viewedProducts.includes(p.name)).slice(0, 3);
            const personalizedGrid = document.getElementById('personalized-recommendations');
            if (personalizedGrid) {
                personalizedGrid.innerHTML = '';
                if (recommendations.length === 0) {
                    const p = document.createElement('p');
                    p.textContent = 'No recommendations yet. View more products to see suggestions!';
                    personalizedGrid.appendChild(p);
                } else {
                    recommendations.forEach(p => {
                        const card = document.createElement('div');
                        card.classList.add('product-card');
                        card.dataset.name = p.name;
                        card.dataset.price = p.price;
                        card.dataset.category = p.category;
                        card.innerHTML = `
                            <a href="product-detail.html?product=${encodeURIComponent(p.name)}">
                                <img src="${p.image}" alt="${p.name}">
                                <h3>${p.name}</h3>
                                <p>₹${p.price}</p>
                            </a>
                            <button class="add-to-cart">Add to Cart</button>
                        `;
                        personalizedGrid.appendChild(card);
                    });
                    attachAddToCartListeners();
                }
            }
        }
    };

    // Populate Product Detail Page
    const populateProductDetail = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product');
        const product = productsList.find(p => p.name === productName);

        if (product) {
            currentProduct = {
                name: product.name,
                price: product.price,
                image: product.image
            };

            document.getElementById('product-image').src = product.image;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `₹${product.price}`;
            document.getElementById('product-description').textContent = product.description;

            const specsList = document.getElementById('product-specifications');
            specsList.innerHTML = '';
            product.specifications.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                specsList.appendChild(li);
            });

            document.getElementById('seller-name').textContent = product.seller.name;
            document.getElementById('seller-address').textContent = product.seller.address;
            document.getElementById('seller-contact').textContent = product.seller.contact;

            // Update buttons based on stock status
            const addToCartButton = document.querySelector('.add-to-cart');
            const buyNowButton = document.querySelector('.buy-now');
            const wishlistButton = document.querySelector('.add-to-wishlist');
            const notifyMeButton = document.createElement('button');
            notifyMeButton.classList.add('notify-me');
            notifyMeButton.textContent = 'Notify Me';

            if (!product.inStock) {
                addToCartButton.style.display = 'none';
                buyNowButton.style.display = 'none';
                document.querySelector('.product-actions').appendChild(notifyMeButton);
                notifyMeButton.addEventListener('click', () => {
                    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
                    notifications.push({ productName, requestedAt: new Date().toISOString() });
                    localStorage.setItem('notifications', JSON.stringify(notifications));
                    alert(`You will be notified when ${productName} is back in stock.`);
                });
            } else {
                addToCartButton.removeEventListener('click', handleAddToCartClick);
                addToCartButton.addEventListener('click', handleAddToCartClick);

                buyNowButton.addEventListener('click', () => {
                    const existingItem = cart.find(item => item.name === currentProduct.name);
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        cart.push({ ...currentProduct, quantity: 1 });
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartDisplay();
                    window.location.href = 'checkout.html';
                });
            }

            wishlistButton.addEventListener('click', () => {
                const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
                const existingItem = wishlist.find(item => item.name === currentProduct.name);
                if (!existingItem) {
                    wishlist.push({ ...currentProduct, quantity: 1 });
                    localStorage.setItem('wishlist', JSON.stringify(wishlist));
                    alert(`${currentProduct.name} added to wishlist!`);
                } else {
                    alert(`${currentProduct.name} is already in your wishlist.`);
                }
            });

            loadReviews(productName);
            loadQA(productName);
        }
    };

    // Populate Related Products
    const populateRelatedProducts = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const productName = urlParams.get('product');
        const product = productsList.find(p => p.name === productName);
        if (product) {
            const relatedProducts = productsList.filter(p => p.category === product.category && p.name !== product.name).slice(0, 3);
            const relatedGrid = document.getElementById('related-products');
            if (relatedGrid) {
                relatedGrid.innerHTML = '';
                relatedProducts.forEach(p => {
                    const card = document.createElement('div');
                    card.classList.add('product-card');
                    card.dataset.name = p.name;
                    card.dataset.price = p.price;
                    card.dataset.category = p.category;
                    card.innerHTML = `
                        <a href="product-detail.html?product=${encodeURIComponent(p.name)}">
                            <img src="${p.image}" alt="${p.name}">
                            <h3>${p.name}</h3>
                            <p>₹${p.price}</p>
                        </a>
                        <button class="add-to-cart">Add to Cart</button>
                    `;
                    relatedGrid.appendChild(card);
                });
                attachAddToCartListeners();
            }
        }
    };

    // Handle Reviews
    const loadReviews = (productName) => {
        const reviews = JSON.parse(localStorage.getItem(`reviews_${productName}`)) || [];
        const reviewsList = document.getElementById('reviews-list');
        const averageRating = document.getElementById('average-rating');

        if (reviewsList && averageRating) {
            reviewsList.innerHTML = '';
            if (reviews.length === 0) {
                averageRating.textContent = 'No reviews yet.';
            } else {
                const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                const stars = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
                averageRating.textContent = `${avg.toFixed(1)} ${stars} (${reviews.length} reviews)`;

                reviews.forEach(review => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.classList.add('review');
                    reviewDiv.innerHTML = `
                        <p><strong>Rating:</strong> ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                        <p>${review.text}</p>
                    `;
                    reviewsList.appendChild(reviewDiv);
                });
            }

            const reviewForm = document.getElementById('review-form');
            if (reviewForm) {
                reviewForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const rating = parseInt(document.getElementById('rating').value);
                    const text = document.getElementById('review-text').value;
                    reviews.push({ rating, text });
                    localStorage.setItem(`reviews_${productName}`, JSON.stringify(reviews));
                    loadReviews(productName);
                    reviewForm.reset();
                });
            }
        }
    };

    // Handle Q&A
    const loadQA = (productName) => {
        const qaList = document.getElementById('qa-list');
        const qa = JSON.parse(localStorage.getItem(`qa_${productName}`)) || [];

        if (qaList) {
            qaList.innerHTML = '';
            qa.forEach(item => {
                const qaDiv = document.createElement('div');
                qaDiv.classList.add('qa');
                qaDiv.innerHTML = `<p><strong>Q:</strong> ${item.question}</p>`;
                qaList.appendChild(qaDiv);
            });

            const qaForm = document.getElementById('qa-form');
            if (qaForm) {
                qaForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const question = document.getElementById('question').value;
                    qa.push({ question });
                    localStorage.setItem(`qa_${productName}`, JSON.stringify(qa));
                    loadQA(productName);
                    qaForm.reset();
                });
            }
        }
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
                    <a href="product-detail.html?product=${encodeURIComponent(product.name)}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>₹${product.price}</p>
                    </a>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                categoryProducts.appendChild(productCard);
            });
            attachAddToCartListeners();
        }
    };

    // Populate All Products on Products Page
    const populateAllProducts = () => {
        const productGrid = document.getElementById('all-products');
        if (productGrid) {
            productGrid.innerHTML = '';
            productsList.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.dataset.name = product.name;
                productCard.dataset.price = product.price;
                productCard.dataset.category = product.category;
                productCard.innerHTML = `
                    <a href="product-detail.html?product=${encodeURIComponent(product.name)}">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>₹${product.price}</p>
                    </a>
                    <button class="add-to-cart">Add to Cart</button>
                `;
                productGrid.appendChild(productCard);
            });
            attachAddToCartListeners();
        }
    };

    // Helper function to attach Add to Cart event listeners
    const attachAddToCartListeners = () => {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.removeEventListener('click', handleAddToCartClick);
            button.addEventListener('click', handleAddToCartClick);
        });
    };

    const handleAddToCartClick = (e) => {
        const button = e.target;
        const card = button.closest('.product-card') || button.closest('.product-info');
        if (!card) return;
        currentProduct = {
            name: card.dataset.name || document.getElementById('product-name').textContent,
            price: parseFloat(card.dataset.price || document.getElementById('product-price').textContent.replace('₹', '')),
            image: card.querySelector('img')?.src || document.getElementById('product-image').src
        };
        document.getElementById('cart-product-name').textContent = currentProduct.name;
        document.getElementById('cart-quantity').value = 1;
        showPopup('add-to-cart-popup');
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

    // Voice Search
    const voiceSearchButton = document.getElementById('voice-search');
    if (voiceSearchButton) {
        voiceSearchButton.addEventListener('click', () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onresult = (event) => {
                const query = event.results[0][0].transcript;
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            };

            recognition.onerror = (event) => {
                alert('Voice search failed. Please try again.');
                console.error('Voice search error:', event.error);
            };
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
            attachAddToCartListeners();
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
        const popup = document.getElementById(id);
        if (popup) popup.style.display = 'flex';
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
        if (!currentProduct) return;
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
    updateWishlistDisplay();
    updateOrderSummary();
    populateCategoryProducts();
    populateAllProducts();
    populateProductDetail();
    populateRelatedProducts();
    populatePersonalizedRecommendations();
    filterProductsBySearch();
    attachAddToCartListeners();
});