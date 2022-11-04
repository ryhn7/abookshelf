const STORAGE_KEY = 'BOOKSHELF_APPS';

const showData = () => {
    let book = JSON.parse(localStorage.getItem(STORAGE_KEY));
    var card = document.getElementById('card-result');

    // loop data book from local storage and show it in card
    for (let i = 0; i < book.length; i++) {
        if (book[i].isCompleted) {
            card.innerHTML += `
            <div>
            <h5 class="card-title">Title: ${book[i].title}</h5>
        <p class="card-text">Author: ${book[i].author}</p>
        <p class="card-text">Year: ${book[i].years}</p>
        <p class="card-text">Status: <span class=" text-success">COMPLETED</span></p>
        <hr>
        </div>
            `;
        }
        else {
            card.innerHTML += `
            <div>
            <h5 class="card-title">Title: ${book[i].title}</h5>
        <p class="card-text">Author: ${book[i].author}</p>
        <p class="card-text">Year: ${book[i].years}</p>
        <p class="card-text">Status: <span class=" text-warning">UNCOMPLETED</span></p>
        <hr>
        </div>
            `;
        }
    };
};


// make live seacrh filter
const searchBook = () => {

    const input = document.getElementById('search-input');
    const filter = input.value.toUpperCase();
    const card = document.getElementById('card-result');
    const div = card.getElementsByTagName('div');

    for (let i = 0; i < div.length; i++) {
        const title = div[i].textContent || div[i].innerText;
        if (title.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
};

const input = document.getElementById('search-input');

input.addEventListener('keyup', searchBook);


