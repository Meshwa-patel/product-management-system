import { createProduct } from "./create.js";
import { readProducts } from "./read.js";
import { filter } from "./filter.js";
import { pagination } from "./pagination.js";

//vadidate file using mime type
document.addEventListener('DOMContentLoaded', function() {
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

    createProduct();
    filter();

    //check if there is data on local storage 
    let hasProduct = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('product_')) {
            hasProduct = true;
            break;
        }
    }

    // Add default product that user can see
    if (!hasProduct) {
        let data1 = {
            productId: `product_${generateUUID()}`,
            productName: 'watch',
            price: 500,
            description: 'This is a watch, it is a type of accessory that is worn on the wrist.',
            category: 'Accessories',
            mfDate: '2025-01-01',
            pricing: 'retail',
            outOfStock: false,
            productImage: 'https://assets.ajio.com/medias/sys_master/root/20230921/meKx/650c4c2bddf7791519efcd10/-473Wx593H-466612236-black-MODEL.jpg'
        };
        localStorage.setItem(data1.productId, JSON.stringify(data1));
        let data2 = {
            productId: `product_${generateUUID()}`,
            productName: 'laptop',
            price: 1200,
            description: 'This is a high-performance laptop, ideal for work, gaming, and entertainment.',
            category: 'Electronics',
            mfDate: '2024-12-15',
            pricing: 'retail',
            outOfStock: false,
            productImage: 'https://images-cdn.ubuy.co.in/64ce34f067df9d3f2d44a477-microsoft-surface-laptop-go-12-4.jpg'
        };
        localStorage.setItem(data2.productId, JSON.stringify(data2));
        let data3 = {
            productId: `product_${generateUUID()}`,
            productName: 'Sneakers',
            price: 3000,
            description: 'These are comfortable shoes, perfect for running and sports activities.',
            category: 'Fashion',
            mfDate: '2025-02-20',
            pricing: 'wholesale',
            outOfStock: true,
            productImage: 'https://assets.ajio.com/medias/sys_master/root/20230228/Vw3n/63fe18f1aeb26924e3990131/-473Wx593H-469435736-white-MODEL.jpg'
        };        
        localStorage.setItem(data3.productId, JSON.stringify(data3));
    }
    readProducts();
    pagination();
});

function generateUUID() {
    return 'xxxx-xxxx'.replace(/[x]/g, function() {   // '/[x]/'' is a regular expression that matches the character x. g is a flag that means "global," so it will match all occurrences of x in the string, not just the first one.
        return Math.floor(Math.random() * 16).toString(16);
    });
}