class Product {
    constructor(name, price, image, id) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.id = id;
    }
}

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addProduct(product) {
        this.items.push(product);
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}

const cart = new Cart();

function addToCart(productName, productPrice, productImage) {
    const productId = `${productName}-${Date.now()}`;
    const product = new Product(productName, productPrice, productImage, productId);
    cart.addProduct(product);
    alert(`${productName} has been added to your cart.`);
}

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productName = productElement.querySelector('.product-name').textContent;
        const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('$', ''));
        const productImage = productElement.querySelector('img').src;

        addToCart(productName, productPrice, productImage);
    });
});