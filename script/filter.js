import { pagination } from "./pagination.js";

export function filter() {
    let filterform = document.getElementById('filterform');
    let search = document.getElementById('search');
    // Add event listener to the search input
    search.addEventListener('keyup', function(event){ 
        const searchValue = event.target.value.toLowerCase();
        const resultsContainer = document.getElementById('main');
        resultsContainer.innerHTML = ''; // Clear previous results
        let found = false; // Track if any products match the search input
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if(key.startsWith('product_')){
                const data = JSON.parse(localStorage.getItem(key));
                if(data.productName.toLowerCase().includes(searchValue)){
                    found = true; // Set found to true if a product matches
                    const div = document.createElement('div');
                    div.classList.add(`${data.productId}`);
                    div.classList.add('card');
                    div.innerHTML = `
                            <div class="product-data">
                                <img src="${data.productImage}" alt="${data.productName}">
                                <h3>${data.productName}</h3>
                                <p>Price: ${data.price}</p>
                                <p class="desc">${data.description}</p>
                            </div>
                            <div>
                                <button type="button" class="btn update">update</button>
                                <button type="button" class="btn delete">delete</button>
                            </div>
                        `;
                        if(data.outOfStock){
                            div.innerHTML += `<p style="color:red;text-align:center">Out of Stock</p>`;
                        }else{
                            div.innerHTML += `<p style="color:green;text-align:center">In Stock</p>`;
                        }
                        div.querySelector('.update').addEventListener('click', function() { // Add event listener to the update button
                            window.location.href = `./edit.html?id=${key}`;  // Redirect to the edit page
                        });
                        div.querySelector('.delete').addEventListener('click', function() {  // Add event listener to the delete button
                            if(confirm('Are you sure you want to delete this product?')){
                                localStorage.removeItem(key);
                                div.remove();
                            }
                        });
                        div.querySelector('.product-data').addEventListener('click', function() {    // Add event listener to the product to display single product
                            window.location.href = `./product.html?id=${key}`;  // Redirect to the product page
                        });
                        resultsContainer.appendChild(div); // Append the created div to the results container
                }
            }
        }
        if (!found) {
            resultsContainer.innerHTML = '<p>No products found matching the filter criteria.</p>';
        }

        pagination(); // Call pagination to update the pagination buttons
    });

    // Add event listener to the reset button
    document.getElementsByClassName('reset')[0].addEventListener('click', function(){ // Add event listener to the reset button
        window.location.reload(); // Reload the page
    });

    // Add event listener to the filter form gets submitted
    if(filterform){
        filterform.addEventListener('submit', function(event){
            event.preventDefault();
            const category = document.getElementById('Category').value;
            const price = document.getElementById('Price').value;
            const outOfStock = document.getElementById('outofStock').checked;
            const resultsContainer = document.getElementById('main'); 
            resultsContainer.innerHTML = ''; // Clear previous results
            
            let found = false; // Track if any products match the filter

            for (let i = 0; i < localStorage.length; i++) { 
                const key = localStorage.key(i);
                if (key.startsWith('product_')) {
                    const data = JSON.parse(localStorage.getItem(key));
                    const matchesCategory = category === 'All' || data.category === category; // Check if the input category matches with data category
                    const matchesPrice = price === 'All' || (               // Check if the input price matches with data price
                        (price === '0-500' && data.price <= 500) ||
                        (price === '500-1000' && data.price > 500 && data.price <= 1000) ||
                        (price === '1000-5000' && data.price > 1000 && data.price <= 5000) ||
                        (price === '5000 & above' && data.price > 5000)
                    );
                    const matchesStock = outOfStock === true && data.outOfStock === outOfStock; // Check if the input stock matches with data stock

                    if(matchesCategory && matchesPrice && !matchesStock){
                        found = true; // Set found to true if a product matches
                        const div = document.createElement('div');
                        div.classList.add(`${data.productId}`);
                        div.classList.add('card');
                        div.innerHTML = `
                            <div class="product-data">
                                <img src="${data.productImage}" alt="${data.productName}">
                                <h3>${data.productName}</h3>
                                <p>Price: ${data.price}</p>
                                <p class="desc">${data.description}</p>
                            </div>
                            <div>
                                <button type="button" class="btn update">update</button>
                                <button type="button" class="btn delete">delete</button>
                            </div>
                        `;
                        if(data.outOfStock){
                            div.innerHTML += `<p style="color:red;text-align:center">Out of Stock</p>`;
                        }else{
                            div.innerHTML += `<p style="color:green;text-align:center">In Stock</p>`;
                        }
                        div.querySelector('.update').addEventListener('click', function() { // Add event listener to the update button
                            window.location.href = `./edit.html?id=${key}`;  // Redirect to the edit page
                        });
                        div.querySelector('.delete').addEventListener('click', function() {  // Add event listener to the delete button
                            if(confirm('Are you sure you want to delete this product?')){
                                localStorage.removeItem(key);
                                div.remove();
                            }
                        });
                        div.querySelector('.product-data').addEventListener('click', function() {    // Add event listener to the product to display single product
                            window.location.href = `./product.html?id=${key}`;  // Redirect to the product page
                        });
                        resultsContainer.appendChild(div); // Append the created div to the results container
                    }
                }
            }

            if (!found) {
                resultsContainer.innerHTML = '<p>No products found matching the filter criteria.</p>';
            }

            pagination(); // Call pagination to update the pagination buttons
        });
    }
}