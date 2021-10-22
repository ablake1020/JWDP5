"use strict";

makeRequest = function makeRequest() {
  return new Promise(function (resolve, reject) {
    var apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', 'http://localhost:3000/api/cameras/');
    apiRequest.send();

    apiRequest.onreadystatechange = function () {
      if (apiRequest.readyState === 4) {
        if (apiRequest.status === 200) {
          //if ready state and status return success codes, resolve promise with response
          resolve(JSON.parse(apiRequest.response));
        } else {
          //if unsuccessful, reject with error message
          reject('Oh no, the server is down!');
        }
      }
    };
  });
}; //function to create cards


createCard = function createCard(response) {
  var main = document.getElementById('products-list');

  for (var i in response) {
    //create elements for cards
    var card = document.createElement('article');
    var productCard = document.createElement('div'); //const newA = document.createElement('a');
    //add bootstrap classes and attributes

    card.classList.add('card', 'my-4', 'mb-lg-0', 'border-light', 'shadow');
    productCard.classList.add('card', 'shadow', 'm-4', 'p-0'); //item image, description, and link through clickable button

    productCard.innerHTML += '<img src="' + response[i].imageUrl + '" alt="" class="card-img-top img-fluid" style="min-height:200px;width:auto;overflow:hidden;">';
    productCard.innerHTML += '<div class="card-body"> <h2 class="card-title">' + response[i].name + '</h2> <p class="card-text">' + response[i].description + '</p> <p class="card-text">' + '$' + response[i].price / 100 + '</p> </div>';
    productCard.innerHTML += '<a href="single-product.html?id=' + response[i]._id + '" class="btn btn-dark m-3 w-50"> More Details </a>'; //add completed elements to the card

    card.appendChild(productCard);
    main.appendChild(card);
  }
};

init = function init() {
  var requestPromise, response;
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //call makeRequest for api request and "await" response
          requestPromise = makeRequest();
          _context.next = 4;
          return regeneratorRuntime.awrap(requestPromise);

        case 4:
          response = _context.sent;
          //pass response to createCard fuction to display results
          createCard(response);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          //error message displayed if request fails
          document.querySelector('main').innerHTML = '<h2 class = "mx-auto">' + _context.t0 + '</h2>';

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

init();