let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');

let searchInput = document.querySelector('input.input-items');
let searchButton = document.querySelector('button.search-icn');
let mainPage = document.querySelector('.main_page');

let buttons = document.querySelectorAll(".buttons");

mainPage.addEventListener('click' , function(){   // clicking on flipkart icon returns to page 1 // main page
    currentPage = 1;   // change string to number
    fetchProducts(currentPage);
})


buttons.forEach((button, index) => {
    button.dataset.page = index + 1; // Set data-page to 1 for the first button, 2 for the second, etc.
    button.addEventListener('click', function() {
        currentPage = Number(button.dataset.page);   // change string to number
        fetchProducts(currentPage);
    });
});


// {
//     "products": [
//       {
//         "id": 1,
//         "title": "iPhone 9",
//         "description": "An apple mobile which is nothing like apple",
//         "price": 549,
//         "discountPercentage": 12.96,
//         "rating": 4.69,
//         "stock": 94,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "...",
//         "images": ["...", "...", "..."]
//       },
//       {...},
//       {...},
//       {...}
//       // 30 items
//     ],
  
//     "total": 100,   // total 100 items so 4 pages max
//     "skip": 0,
//     "limit": 30    // gives 30 producs to the page 
//   }

// this is jSON file for understanding 

let currentPage = 1;     // using let because the value changes

 
const limit = 30;     


function fetchProducts(page) {
    fetch(`https://dummyjson.com/products?skip=${(page - 1) * limit}&limit=${limit}`)
    .then(response => response.json())
    
    /// populate data on to the page

     // creating the 


    
    .then(data => {
        let container = document.querySelector('.container');
        container.innerHTML = ''; // Clear the container we are addin to container
        data.products.forEach(product => {
            let productDiv = document.createElement('div'); // we have to keep it inside to code work
            productDiv.className = 'items';
            productDiv.innerHTML = `
                <img style="height: 200px; width: 200px;" src="${product.thumbnail}" alt="${product.title}">
                <p>${product.title}</p>
                <p>₹<span>${product.price}</span> ₹<span><del>${product.price / (1 - product.discountPercentage/100)}</del></span><span> ${product.discountPercentage}%</span> off</p> 
                <p>${product.description}</p>
                <p>Only ${product.stock} left</p>
            `;
            container.appendChild(productDiv);     // adding items to 'container div'
        });


        // Enable or disable navigation buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage * limit >= data.total;     // actual total items 100
    })
    .catch(error => console.error('Error:', error));
}

// Fetch the first page of products when the page loads
fetchProducts(currentPage);   // calling function

// Add event listeners to the navigation buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    currentPage--;
    fetchProducts(currentPage);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    fetchProducts(currentPage);
});

// on clicking of the search button we are populating the items to the page 

searchButton.addEventListener('click', function() {
    let query = searchInput.value;
    fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(response => response.json())
    .then(data => {
        let container = document.querySelector('.container');
        container.innerHTML = ''; // Clear the container
        data.products.forEach(product => {
            let productDiv = document.createElement('div');
            productDiv.className = 'items';
            productDiv.innerHTML = `
                <img style="height: 200px; width: 200px;" src="${product.thumbnail}" alt="${product.title}">
                <p>${product.title}</p>
                <p>₹<span>${product.price}</span> ₹<span><del>${product.price / (1 - product.discountPercentage/100)}</del></span><span> ${product.discountPercentage}%</span> off</p> 
                <p>${product.description}</p>
                <p>Only ${product.stock} left</p>
            `;
            container.appendChild(productDiv);
        });
    })
    .catch(error => console.error('Error:', error));
});
