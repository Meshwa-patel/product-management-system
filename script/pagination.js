export function pagination(){
    const cardsperpage = 6;
    let cards = document.querySelectorAll('.card');
    let paginationdiv = document.getElementById('pages');
    let nuofpages = Math.ceil(cards.length / cardsperpage); // Calculate pages based on filtered cards
    let currentPage = 1;
    paginationdiv.innerHTML = '';

    // Get existing left and right buttons
    let leftButton = document.querySelector('.fa-angle-left');
    let rightButton = document.querySelector('.fa-angle-right');
    
    // Create pagination buttons
    for(let i = 1; i <= nuofpages; i++){
        let pages = document.createElement('button');
        pages.id = 'pagebutton';
        pages.innerText = i;
        if (i === 1) {
            pages.classList.add('active');
        }
        paginationdiv.appendChild(pages);
    }

    // Show the first set of cards
    displayPage(1);

    // Add event listener for pagination buttons
    paginationdiv.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            currentPage = parseInt(e.target.innerText);
            displayPage(currentPage);
            updateButtons();
        }
    });

    // Add event listeners for left and right buttons
    leftButton.addEventListener('click', function() {
        currentPage = Math.max(1, currentPage - 1);
        displayPage(currentPage);
        updateButtons();
    });

    rightButton.addEventListener('click', function() {
        currentPage = Math.min(nuofpages, currentPage + 1);
        displayPage(currentPage);
        updateButtons();
    });

    // Function to display the current page
    function displayPage(pageNumber) {
        let start = (pageNumber - 1) * cardsperpage;  // Calculate the start and end index of the cards to be displayed
        let end = start + cardsperpage;
        for (let i = 0; i < cards.length; i++) {
            if (i >= start && i < end) {
                cards[i].style.display = 'block';
            } else {
                cards[i].style.display = 'none';
            }
        }
    }

    // Function to update the active button
    function updateButtons() {
        let buttons = paginationdiv.querySelectorAll('button');
        buttons.forEach(button => button.classList.remove('active'));
        buttons[currentPage - 1].classList.add('active');
    }
}