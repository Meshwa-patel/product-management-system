// Get all products from localStorage
function readProducts() {
    const mainDiv = document.getElementById('main');
    if(mainDiv){
        mainDiv.innerHTML = ''; // Clear previous content
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('product_')) {  // Check if the key is a product key
                const data = JSON.parse(localStorage.getItem(key));  // Get product data from localStorage
                const div = document.createElement('div');
                div.classList.add(`${data.productId}`);
                div.classList.add('card');
                // Display product details
                div.innerHTML = `
                    <div class="product-data">
                        <img src="${data.productImage}" alt="${data.productName}">
                        <h3>${data.productName}</h3>
                        <p>Price: ${data.price}</p>
                        <p class="desc">${data.description}</p>
                    </div>
                    <div >
                        <button type="button" class="btn update">update</button>
                        <button type="button" class="btn delete">delete</button>
                    <div>
                `;
                if(data.outOfStock){
                    div.innerHTML += `<p style="color:red;text-align:center">Out of Stock</p>`;
                }else{
                    div.innerHTML += `<p style="color:green;text-align:center">In Stock</p>`;
                }
                div.querySelector('.update').addEventListener('click', function() {  // Add event listener to the update button
                    window.location.href = `./edit.html?id=${key}`;  // Redirect to the edit page
                });
                div.querySelector('.delete').addEventListener('click', function() {  // Add event listener to the delete button
                    if(confirm('Are you sure you want to delete this product?')){
                        localStorage.removeItem(key);
                        div.remove();
                    }
                });
                div.querySelector('.product-data').addEventListener('click', function() {  // Add event listener to the product to display single product
                    window.location.href = `./product.html?id=${key}`;  // Redirect to the product page
                });
                mainDiv.appendChild(div);
            }
        }
    }
}

export { readProducts };
