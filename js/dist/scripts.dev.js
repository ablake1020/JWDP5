"use strict";

var url = 'http://localhost:3000/api/cameras';
var productsContainer = document.getElementById('products');
var singleProduct = './product.html?id=';
fetch(url).then(function (response) {
  return response.json();
}).then(function (data) {
  return createCards(data);
});

function createCards(array) {
  var container, length, i, col;
  return regeneratorRuntime.async(function createCards$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          container = document.getElementById('cameras-list');
          length = array.length;

          for (i = 0; i < length; i++) {
            col = createCard(array[i]);
            container.appendChild(col);
          }

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}