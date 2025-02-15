
// Update product details in localStorage
function productdetails(productId) {
    const productForm = document.getElementById("productForm");
    if (productForm) {
        const data = JSON.parse(localStorage.getItem(productId));
        if (data) {  // Check if the product exists . If it does, pull the data and put it in the form
            document.getElementById('productName').value = data.productName;
            document.getElementById('price').value = data.price;
            document.getElementById('description').value = data.description;
            document.getElementById('category').value = data.category;
            document.getElementById('mfdate').value = data.mfDate;
            document.getElementById('outofStock').checked = data.outOfStock;
            document.getElementById(`${data.pricing}`).checked = true;
            document.getElementById('productImage').src = data.productImage;
            var oldProductImage = data.productImage;
            // Handle image separately, to display image at side
            const productImage = document.getElementById('productImage');
            if (productImage) {
                    const imgPreview = document.createElement('img');
                    imgPreview.src = data.productImage;
                    imgPreview.alt = data.productName;
                    imgPreview.style.maxWidth = '100px';
                    imgPreview.style.border = '1px solid #ccc';
                    productImage.parentNode.insertBefore(imgPreview, productImage.nextSibling);
            }

        } else {
            console.error(`No product found with ID: ${productId}`);
        }
    } else {
        console.error('Product form not found');
    }
    // Validate the image file type
    const fileInput = document.querySelector('input[type="file"]');
    if (!fileInput) {
        console.log('file input not found');
    } else {
        fileInput.addEventListener('change', function(event) {
            const file = this.files[0];
            const reader = new FileReader();
    
            reader.onloadend = function(e) {
                const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                let header = "";
                for (let i = 0; i < arr.length; i++) {
                    header += arr[i].toString(16);
                }
    
                let type = "";
                switch (header) {
                    case "89504e47":
                        type = "image/png";
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                        type = "image/jpeg";
                        break;
                    default:
                        type = "unknown";
                        break;
                }
    
                if (type === "image/jpeg" || type === "image/png") {
                    console.log('File type is valid.');
                } else {
                    alert('Please upload a valid image file.');
                    event.target.value = ''; // Clear the input value
                }
            };
    
            reader.readAsArrayBuffer(file);
        });
    }
    document.getElementById('productForm').addEventListener('submit', (event) => {  // Add event listener to the form to update the product
        event.preventDefault();
        const oldproductId = productId;

    // Capture form values
    const productName = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const outOfStock = document.getElementById("outofStock").checked;
    const mfDate = document.getElementById("mfdate").value;
    const pricing = document.querySelector('input[class="pricing"]:checked').value;

    // Log the collected data
    let data = { 'productId' : oldproductId , productName, price, description, category, mfDate, pricing, outOfStock };

    // Capture image file
    const productImage = document.getElementById("productImage").files[0];
    if (productImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            data.productImage = e.target.result; // Store base64 image string
            localStorage.removeItem(oldproductId);
            localStorage.setItem(oldproductId, JSON.stringify(data)); // Save the data after the image is processed
            alert("Product saved successfully!"); // Show success message
            productForm.reset(); // Clear the form
            setTimeout(function() {
                window.location.href = './'; // Redirect to the homepage after a short delay
            }, 200);
        };
        reader.readAsDataURL(productImage); // Read image as a base64 URL
    } else {
        data.productImage = oldProductImage;
            localStorage.removeItem(oldproductId);
            localStorage.setItem(oldproductId, JSON.stringify(data)); // Save the data after the image is processed
            alert("Product saved successfully!"); // Show success message
            productForm.reset(); // Clear the form
            setTimeout(function() {
                window.location.href = './'; // Redirect to the homepage after a short delay
            }, 200);
    }
    });
}

export { productdetails };