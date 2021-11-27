makeRequest = () => {
    return new Promise((resolve, reject) => {
        const skuString = window.location.search;
        const urlParameter = new URLSearchParams(skuString);
        const id = urlParameter.get('id');

        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    reject('Oh no, the server is down!');
                }
            }
        }
    });
}

createSingleSku = (response) => {
    const cameraName = response.name;
    const cameraDescription = response.description;
    const cameraImg = response.imageUrl;
    const cameraPrice = response.price;
    const skuId = document.getElementById('skuId');
    const cameraTitle = document.createElement('h1');
    const genericDescription = document.createElement('p');
    const skuContent = document.createElement('article');
    const addToCart = document.createElement('div');
    const addToCartMessage = document.createElement('div');
        // code below adds the page's contents with DOM manipulation
    cameraTitle.innerHTML += '<h1 style="font-size:3rem; width:95%;" class="display-4 mt-4 mt-md-3 text-warning">' + cameraName + '</h1>';
    genericDescription.innerHTML += '<p class="lead mb-5">This camera is perfect for weekend trips to the mountains or days off exploring your own city. How you use it is up to you, but we know it\'ll produce the best pics and memoroies.</p>';
    
    skuContent.innerHTML += '<div class="row my-3">';
    skuContent.innerHTML += '<img class="border-light shadow mx-5" id="skuImg" src="' + cameraImg + '" width="60%" height="25%" alt="Popular camera"/>';
    skuContent.innerHTML += '<p style="font-size:1rem; width:60%;" class="my-3 mx-5">' + cameraDescription + '</p>';
    skuContent.innerHTML += '<p style="font-size:1.35rem;" class="font-weight-bold text-warning mx-5 mb-4">' + '€' + cameraPrice / 100 + '</p>';
    skuContent.innerHTML += '<div class="my-1 mx-5"></div></div>';
    
    addToCart.innerHTML += '<button class="btn btn-dark add-to-cart col-2-md mb-5 mx-5">Add to Cart <i class="fas fa-arrow-right"></i></button>';
    addToCart.setAttribute('type', 'submit');
    //this adds the function prompt an action when 'add to cart' button is clicked

    const dropdownMenu = document.createElement('form');
    const dropdownLabel = document.createElement('label');
    const dropdownOptions = document.createElement('select');

    //add attributes, classes and content to lens info
    dropdownOptions.classList.add('bg-outline-dark', 'text-dark', 'dropdown-toggle', 'w-auto');
    dropdownLabel.innerHTML = '<p class="mx-5">Choose your lens:</p>';

    //'for' loop to show all of the lens options for each camera
    for (let i in response.lenses) {
        const option = document.createElement('option');
        option.innerHTML = response.lenses[i];
        option.setAttribute('value', response.lenses[i]);
        dropdownOptions.appendChild(option);
    }

    dropdownMenu.appendChild(dropdownLabel);
    dropdownMenu.appendChild(dropdownOptions);
    
    addToCart.addEventListener('click', () => {
        let itemsInCart = [];
        const localStorageContent = localStorage.getItem(' cart');

        if (localStorageContent === null) {
            itemsInCart = [];
        } else {
            itemsInCart = JSON.parse(localStorageContent);
        } //the info that appears in localStorage
        let skuForSale = {
            imageUrl: response.imageUrl,
            name: response.name,
            id: response._id,
            price: response.price,
            lens: dropdownOptions.value,
            quantity: 1,
        };

        itemsInCart.push(skuForSale);
        localStorage.setItem(' cart', JSON.stringify(itemsInCart));
        addNumCart();
    });

    addToCart.onclick = function () {
        addToCartMessage.innerHTML += '<p class="alert shadow alert-success col-md-5">This camera has been added to your cart! <i class="fas fa-shopping-cart"></i></p>';
        addToCartMessage.setTimeout(() => {
            addToCartMessage.classList.remove('alert', 'alert-success', 'shadow');
        }, 4000);
    }

    skuId.appendChild(cameraTitle);
    skuId.appendChild(genericDescription);
    skuId.appendChild(skuContent);
    skuId.appendChild(dropdownMenu);
    skuId.appendChild(addToCart);
    skuId.appendChild(addToCartMessage);
    
}

init = async() => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        createSingleSku(response);
    } catch (error) {
        document.querySelector('main').innerHTML = '<h2 class = "my-5 mx-5">' + error + '</h2>';
    }
}

init();