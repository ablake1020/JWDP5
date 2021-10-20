const url = 'http://localhost:3000/api/cameras';
const skuContainer = document.getElementById('products');
const singleProduct = './singleProduct.html?id=';

function acquireSkus() {
    const response = await fetch(url);
    const data = await response.json();

    for (let i = 0; i < data.length(); i++) {
        let cameraId = data[i]._id;
        let cameraName = data[i].name;
        let cameraDescription = data[i].description;
        let cameraPrice = data[i].price.toString();
        let cameraImage = data[i].imageUrl;

        let product = document.createElement('div');

        product.innerHTML = `
            <a href="product.html?id=${cameraId}">
                <div class=" col-12 shadow">
                    <img src="${cameraImage}" class="card-img-top" alt="Product Image">
                    <div class="content">
                        <h3>${cameraName}</h3>
                        <p class="desc">${cameraDescription}</p>
                        <span class="price">$ ${cameraPrice}</span>
                    </div>
                </div>
            </a>`;

        skuContainer.appendChild(product);
    }
};