makeRequest = () => {
    return new Promise((resolve, reject) => {
        const skuString = window.location.search;
        const urlParameter = new URLSearchParams(skuString);
        const id = urlParameter.get('id');

        let apiRequest = new XMLHttpRequest();
        //id is used to build the unique url for the single product page
        apiRequest.open('GET', 'http://localhost:3000/api/cameras/' + id);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    //if ready state and status return success codes, resolve promise with response
                    resolve(JSON.parse(apiRequest.response));
                } else {
                    //if unsuccessful, reject with error message
                    reject('API Request Failed!');
                }
            }
        }
    });
}

createSingleSku = (response) => {
    const skuId = document.querySelector('section');

    const cameraTitle = document.createElement('h1');
    const cameraDescription = document.createElement('p');
    const skuContent = document.getElementById('skuContent');
        
    cameraTitle.innerHTML += '<h1 class="display-4 mt-md-3 text-warning">' + response[i].name + '</h1>';
    cameraDescription.innerHTML += '<p class="lead mb-5">This camera is perfect for weekend trips to the mountains or days off exploring your own city. How you use it is up to you, but we know it\'ll produce the best pics and memoroies.</p>';
    skuContent.innerHTML += '<div class="row my-3">';
    skuContent.innerHTML += '<img class="border-light shadow" id="skuImg" src="' + response[i].imageUrl + '" width="95%" height="100%" alt="Popular camera"/>';
    skuContent.innerHTML += '<p class="my-3">' + response[i].description + '</p>';
    skuContent.innerHTML += '<p class="font-weight-bold text-warning">' + '€' + response[i].price / 100 + '</p>';
    skuContent.innerHTML += '<hr>';
    skuContent.innerHTML += '<div class="my-1 mx-5">';
    skuContent.innerHTML += '<a href="cart.html"><button type="button" class="btn btn-dark col-2-md">Add to Cart <i class="fas fa-arrow-right"></i></button></a></div></div>';

    skuId.appendChild(skuContent);
}

init();
