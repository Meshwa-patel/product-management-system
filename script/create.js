// Store data in localStorage
function createProduct(){
    const productForm = document.getElementById("productForm");
    if (productForm) {
        productForm.addEventListener("submit", function(event) {
            event.preventDefault();

            // Capture form values
            const productName = document.getElementById("productName").value;
            const price = document.getElementById("price").value;
            const description = document.getElementById("description").value;
            const category = document.getElementById("category").value;
            const outOfStock = document.getElementById("outofStock").checked;
            const mfDate = document.getElementById("mfdate").value;
            const pricing = document.querySelector('input[class="pricing"]:checked').value;

            // Log the collected data
            let data = { 'productId' : `product_${generateUUID()}`, productName, price, description, category, mfDate, pricing, outOfStock };

            // Capture image file
            const productImage = document.getElementById("productImage").files[0];
            if (productImage) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    data.productImage = e.target.result; // Store base64 image string
                    saveToLocalStorage(data); // Save the data after the image is processed
                    alert("Product saved successfully!"); // Show success message
                    productForm.reset(); // Clear the form
                    setTimeout(function() {
                        window.location.href = './index.html'; // Redirect to the homepage after a short delay
                    }, 200);
                };
                reader.readAsDataURL(productImage); // Read image as a base64 URL
            } else {
                alert("Please add an image");
            }
        });
    }
}

function generateUUID() {
    return 'xxxx-xxxx'.replace(/[x]/g, function() {   // '/[x]/'' is a regular expression that matches the character x. g is a flag that means "global," so it will match all occurrences of x in the string, not just the first one.
        return Math.floor(Math.random() * 16).toString(16);
    });
}

function saveToLocalStorage(data) {
    let uniqueKey = `product_${generateUUID()}`;
    localStorage.setItem(uniqueKey, JSON.stringify(data));
}

export { createProduct };