// Tableau pour stocker les produits dans le panier
let cartItems = [];

// Fonction pour ajouter un produit au panier
function addToCart(productName, price, image) {
    cartItems.push({ name: productName, price: price, image: image });
    updateCart();
}

// Fonction pour retirer un produit du panier
function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    let total = 0;

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const productImage = document.createElement("img");
        productImage.src = item.image;
        cartItem.appendChild(productImage);

        const productName = document.createElement("h2");
        productName.textContent = item.name;
        cartItem.appendChild(productName);

        const productPrice = document.createElement("span");
        productPrice.classList.add("price");
        productPrice.textContent = `€${item.price.toFixed(2)}`;
        cartItem.appendChild(productPrice);

        // Bouton "Supprimer" pour retirer l'article du panier
        const removeButton = document.createElement("button");
        removeButton.textContent = "Supprimer";
        removeButton.onclick = function() {
            removeItemFromCart(index);
        };
        cartItem.appendChild(removeButton);

        cartContainer.appendChild(cartItem);

        total += item.price;
    });

    const cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.textContent = `€${total.toFixed(2)}`;
}

// Fonction pour vider le panier
function clearCart() {
    cartItems = [];
    updateCart();
}

// Exemple d'ajout de produits au panier (utilisation factice)
addToCart("Pommes", 2.99, "images/pomme.jpg");
addToCart("Bananes", 1.49, "images/banane.jpg");
addToCart("Carottes", 3.25, "images/carotte.jpg");
addToCart("Fraise", 1.49, 'images/fraise.jpg');
addToCart('Carottes', 3.25, 'images/grenade.jpg');
addToCart('Groseille', 3.25, 'images/groseille.jpg');
addToCart('radis', 3.25, 'images/radis.jpg');
addToCart('poire', 3.25, 'images/poire.jpg');
addToCart('abricot', 3.25, 'images/abricot.jpg');
addToCart('ananas', 3.25, 'images/ananas.jpg');
addToCart('ail', 3.25, 'images/ail.jpg');
addToCart('asperge', 3.25, 'images/asperge.jpg');
addToCart('avocat', 3.25, 'images/avocat.jpg');
addToCart('betterave', 3.25, 'images/betterave.jpg');
addToCart('celeri', 3.25, 'images/celeri.jpg')


// Fonction pour récupérer le panier depuis le localStorage
function getCartFromStorage() {
    const cartString = localStorage.getItem("cart");
    return cartString ? JSON.parse(cartString) : [];
  }
  
  // Fonction pour calculer le total de la commande
  function calculateTotal(cart) {
    let totalAmount = 0;
    cart.forEach((product) => {
      const { price, quantity } = product;
      totalAmount += price * quantity;
    });
    return totalAmount;
  }
  
  // Fonction pour afficher le récapitulatif de la commande
  function displayCartInRecap() {
    const cart = getCartFromStorage();
    const recapTable = document.getElementById("recap-table");
    const totalElement = document.getElementById("total");
    let totalAmount = 0;
  
    recapTable.innerHTML = `
      <tr>
          <th>Produit</th>
          <th>Prix Unitaire</th>
          <th>Quantité</th>
          <th>Total</th>
      </tr>
    `;
  
    cart.forEach((product) => {
      const { name, price, quantity } = product;
      const total = price * quantity;
      totalAmount += total;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${name}</td>
        <td>${price.toFixed(2)} €</td>
        <td>${quantity}</td>
        <td>${total.toFixed(2)} €</td>
      `;
      recapTable.appendChild(row);
    });
  
    totalElement.textContent = `Total à Payer : ${totalAmount.toFixed(2)} €`;
  }
  
  // Au chargement de la page de paiement, afficher les produits du panier
  document.addEventListener("DOMContentLoaded", () => {
    displayCartInRecap();
  });
  