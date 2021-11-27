let orderId;

let localStorageContent = localStorage.getItem('cart');
let cartItemsArray = JSON.parse(localStorageContent);

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let emailAddress = document.getElementById('emailAddress');
let shippingAddress = document.getElementById('shippingAddress');
let city = document.getElementById('city');
let postalCode = document.getElementById('postalCode');
let country = document.getElementById('country');

function displayCartItems() {
    const cartItemsWhole = document.getElementById('purchase-info');
    let cartArray = JSON.parse(localStorage.getItem('cart'));

    if (cartArray) {
        for (let i = 0; i < cartArray.length; i++) {
            let tableRow = document.createElement('tr');
            let nameOfCamera = document.createElement('td');
            let nameOfLens = document.createElement('td');
            let quantitySection = document.createElement('td');
            let priceSection = document.createElement('td');

            nameOfCamera.innerHTML = cartArray[i].name;
            nameOfLens.innerHTML = cartArray[i].lens;
            quantitySection.innerHTML = cartArray[i].quantity;
            priceSection.innerHTML = (priceNum * cartArray[i].quantity) + '€ ';

            tableRow.append(nameOfCamera, nameOfLens, quantitySection, priceSection);
            cartItemsWhole.appendChild('tr');
        }
    }
}