// Vue instance for index.html
if (document.getElementById('app')) {
  new Vue({
    el: "#app",
    data: {
      paraText: "Best Price This Year",
      buyButtonText: "Shop Now",
      products: [
        { id: 1, name: "Star-01", image: "img/2024col/1.jpg", stars: [1, 2, 3, 4, 5], price: 330, stock: 5, detail: "This is Quantum-01." },
        { id: 2, name: "Quantum-02", image: "img/2024col/2.jpg", stars: [1, 2, 3, 4, 5], price: 350, stock: 4, detail: "This is Quantum-02." },
        { id: 3, name: "Quantum-03", image: "img/2024col/3.jpg", stars: [1, 2, 3, 4, 5], price: 300, stock: 6, detail: "This is Quantum-03." },
        { id: 4, name: "Quantum-04", image: "img/2024col/4.jpg", stars: [1, 2, 3, 4, 5], price: 350, stock: 2, detail: "This is Quantum-04." },
        { id: 5, name: "Star-01", image: "img/Glasses/12.jpg", stars: [1, 2, 3, 4, 5], price: 350, stock: 2, detail: "This is Star-01." },
        { id: 6, name: "Star-04", image: "img/Glasses/11.jpg", stars: [1, 2, 3, 4, 5], price: 350, stock: 2, detail: "This is Star-04." },
      ],
      cart: [],
      searchQuery: '',
    },
    computed: {
      cartCount() {
        return this.cart.reduce((total, product) => total + product.quantity, 0);
      },
      filteredProducts() {
        return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      addToCart(product) {
        if (product.stock > 0) {
          let itemInCart = this.cart.find(item => item.name === product.name);
          if (itemInCart) {
            itemInCart.quantity++;
          } else {
            this.cart.push({ ...product, quantity: 1 });
          }
          product.stock--; // Reduce stock
          localStorage.setItem("cart", JSON.stringify(this.cart));
          localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
          alert(`${product.name} has been added to your cart.`);
        } else {
          alert("This product is out of stock.");
        }
      },
      addQuantity(index) {
        let product = this.products[index];
        if (product.stock > 0) {
          product.quantity++;
          product.stock--; // Reduce stock
          localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
        } else {
          alert("This product is out of stock.");
        }
      },
      reduceQuantity(index) {
        let product = this.products[index];
        if (product.quantity > 1) {
          product.quantity--;
          product.stock++; // Increase stock
          localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
        } else {
          this.removeFromCart(index);
        }
      },
      removeFromCart(index) {
        let removed = this.cart.splice(index, 1)[0];
        let productIndex = this.products.findIndex(product => product.name === removed.name);
        if (productIndex !== -1) {
          this.products[productIndex].stock += removed.quantity; // Increase stock
        }
        localStorage.setItem("cart", JSON.stringify(this.cart));
        localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
      },
      clearCart() {
        this.cart.forEach(item => {
          let productIndex = this.products.findIndex(product => product.name === item.name);
          if (productIndex !== -1) {
            this.products[productIndex].stock += item.quantity; // Increase stock
          }
        });
        this.cart = [];
        localStorage.setItem("cart", JSON.stringify(this.cart));
        localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
      },
      processPayment() {
        // Simulate payment processing logic
        alert('Payment processed successfully!');
        this.clearCart();
      }
    },
    mounted() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      }
      if (localStorage.getItem("products")) {
        this.products = JSON.parse(localStorage.getItem("products"));
      }
    },
  });
}

if (document.getElementById('app-cart')) {
  new Vue({
    el: "#app-cart",
    data: {
      cart: [], // Data untuk menyimpan keranjang belanja
      payment: { name: '', cardNumber: '', expiry: '' } // Data untuk informasi pembayaran
    },
    computed: {
      // Menghitung jumlah total item di keranjang belanja
      cartCount() {
        return this.cart.reduce((total, product) => total + product.quantity, 0);
      }
    },
    methods: {
      // Fungsi untuk menambah produk ke keranjang belanja
      addToCart(product) {
        if (product.stock > 0) {
          let itemInCart = this.cart.find(item => item.name === product.name);
          if (itemInCart) {
            itemInCart.quantity++;
          } else {
            this.cart.push({ ...product, quantity: 1 });
          }
          product.stock--; // Reduce stock
          localStorage.setItem("cart", JSON.stringify(this.cart));
          localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
          alert(`${product.name} has been added to your cart.`);
        } else {
          alert("This product is out of stock.");
        }
      },
      // Fungsi untuk menambah kuantitas produk di keranjang belanja
      addQuantity(index) {
        let product = this.cart[index];
        if (product.stock > 0) {
          product.quantity++;
          product.stock--; // Reduce stock
          localStorage.setItem("cart", JSON.stringify(this.cart)); // Update cart data
        } else {
          alert("This product is out of stock.");
        }
      },
      // Fungsi untuk mengurangi kuantitas produk di keranjang belanja
      reduceQuantity(index) {
        let product = this.cart[index];
        if (product.quantity > 1) {
          product.quantity--;
          product.stock++; // Increase stock
          localStorage.setItem("cart", JSON.stringify(this.cart)); // Update cart data
        } else {
          this.removeFromCart(index);
        }
      },
      // Fungsi untuk menghapus produk dari keranjang belanja
      removeFromCart(index) {
        let removed = this.cart.splice(index, 1)[0];
        let productIndex = this.products.findIndex(product => product.name === removed.name);
        if (productIndex !== -1) {
          this.products[productIndex].stock += removed.quantity; // Increase stock
        }
        localStorage.setItem("cart", JSON.stringify(this.cart)); // Update cart data
        localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
      },
      // Fungsi untuk membersihkan keranjang belanja
      clearCart() {
        this.cart.forEach(item => {
          let productIndex = this.products.findIndex(product => product.name === item.name);
          if (productIndex !== -1) {
            this.products[productIndex].stock += item.quantity; // Increase stock
          }
        });
        this.cart = [];
        localStorage.setItem("cart", JSON.stringify(this.cart)); // Update cart data
        localStorage.setItem("products", JSON.stringify(this.products)); // Update products data
      },
      // Fungsi untuk memproses pembayaran
      processPayment() {
        // Simulasi logika pemrosesan pembayaran
        alert('Payment processed successfully!');
        this.clearCart();
      }
    },
    mounted() {
      if (localStorage.getItem("cart")) {
        this.cart = JSON.parse(localStorage.getItem("cart"));
      }
      if (localStorage.getItem("products")) {
        this.products = JSON.parse(localStorage.getItem("products"));
      }
    },
  });
}