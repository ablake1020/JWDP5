makeRequest = () => {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/');
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

createSkuCards = (response) => {
    const skuCards = document.getElementById('products-list');
    for (let i in response) {
        //creates elements for sku cards
        const cardItself = document.createElement('article');
        const cameraInfo = document.createElement('div');

        cardItself.classList.add('col', 'col-lg-4', 'col-sm-6', 'card-body');
        cameraInfo.classList.add('card', 'col-lg-12', 'shadow', 'p-0');

        cameraInfo.innerHTML += '<img src="' + response[i].imageUrl + '" alt="buy our cameras!" class="card-img-top img-fluid">';
        cameraInfo.innerHTML += '<div class="card-body"> <h2 class="card-title">' + response[i].name + '</h2> <p class="card-text text-secondary">' + response[i].description + '</p> <p class="card-text text-warning">' + '€ ' + response[i].price / 100 + '</p> </div>';
        cameraInfo.innerHTML += '<a href="product.html?id=' + response[i]._id + '" class="btn btn-outline-dark m-3 w-50"> More Details <i class="fas fa-arrow-right"></i></a>';

        cardItself.appendChild(cameraInfo);
        skuCards.appendChild(cardItself);
    }
}

init = async() => {
    try {
        const requestPromise = makeRequest();
        const response = await requestPromise;
        createSkuCards(response);
    } catch (error) {
        document.querySelector('main').innerHTML = '<h2 class = "my-5 mx-5">' + error + '</h2>';
    }
}

init();