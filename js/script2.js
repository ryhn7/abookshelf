const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

document.addEventListener('DOMContentLoaded', () => {
    if (isStorageExist()) {
        loadDataStorage();
    }
});


document.addEventListener(RENDER_EVENT, function () {

    const unreadBook = document.getElementById('unread-book');
    unreadBook.innerHTML = '';

    const readBook = document.getElementById('completed-books');
    readBook.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = createBook(bookItem);
        // bookCollection.append(bookElement);
        if (!bookItem.isCompleted) {
            unreadBook.append(bookElement);
        } else {
            readBook.append(bookElement);
        }
    }
});

const createBook = (bookObj) => {
    if (bookObj.isCompleted) {
        const td1 = document.createElement('td');
        td1.innerHTML = `<i class="fab fa-lg text-danger me-3"></i><strong>${bookObj.title}</strong>`

        const td2 = document.createElement('td');
        td2.innerText = bookObj.author;

        const td3 = document.createElement('td');
        td3.innerText = bookObj.years;

        const td4 = document.createElement('td');
        td4.innerHTML = `<span class="badge bg-label-success me-1">Completed</span>`;

        const trashBtn = document.createElement('button');
        trashBtn.classList.add('dropdown-item');
        trashBtn.innerHTML = '<i class="bx bx-trash me-1"></i> Delete';

        trashBtn.addEventListener('click', () => {
            removeBook(bookObj.id);
        });

        const resetBtn = document.createElement('button');
        resetBtn.classList.add('dropdown-item');
        resetBtn.innerHTML = '<i class="bx bx-reset me-1"></i>Reset';

        resetBtn.addEventListener('click', () => {
            resetBook(bookObj.id);
        });

        const inner = document.createElement('div');
        inner.classList.add('dropdown-menu');
        inner.append(resetBtn, trashBtn);

        const btnInner = document.createElement('button');
        btnInner.classList.add('btn', 'p-0', 'dropdown-toggle', 'hide-arrow');
        btnInner.setAttribute('data-bs-toggle', 'dropdown');
        btnInner.innerHTML = '<i class="bx bx-dots-vertical-rounded"></i>';

        const outer = document.createElement('div');
        outer.classList.add('dropdown');
        outer.append(btnInner, inner);

        const td5 = document.createElement('td');
        td5.append(outer);

        const book = document.createElement('tr');
        book.classList.add('book');
        book.append(td1, td2, td3, td4, td5);
        book.setAttribute('id', `book-${bookObj.id}`);

        return book;


    } else {
        const td1 = document.createElement('td');
        td1.innerHTML = `<i class="fab fa-lg text-danger me-3"></i><strong>${bookObj.title}</strong>`

        const td2 = document.createElement('td');
        td2.innerText = bookObj.author;

        const td3 = document.createElement('td');
        td3.innerText = bookObj.years;

        const td4 = document.createElement('td');
        td4.innerHTML = `<span class="badge bg-label-warning me-1">Uncompleted</span>`;

        const trashBtn = document.createElement('button');
        trashBtn.classList.add('dropdown-item');
        trashBtn.innerHTML = '<i class="bx bx-trash me-1"></i> Delete';

        trashBtn.addEventListener('click', () => {
            removeBook(bookObj.id);
        });

        const finishBtn = document.createElement('button');
        finishBtn.classList.add('dropdown-item');
        finishBtn.innerHTML = '<i class="bx bx-check-circle me-1"></i>Finish Read';

        finishBtn.addEventListener('click', () => {
            finishBook(bookObj.id);
        });

        const inner = document.createElement('div');
        inner.classList.add('dropdown-menu');
        inner.append(finishBtn, trashBtn);

        const btnInner = document.createElement('button');
        btnInner.classList.add('btn', 'p-0', 'dropdown-toggle', 'hide-arrow');
        btnInner.setAttribute('data-bs-toggle', 'dropdown');
        btnInner.innerHTML = '<i class="bx bx-dots-vertical-rounded"></i>';

        const outer = document.createElement('div');
        outer.classList.add('dropdown');
        outer.append(btnInner, inner);

        const td5 = document.createElement('td');
        td5.append(outer);

        const book = document.createElement('tr');
        book.classList.add('book');
        book.append(td1, td2, td3, td4, td5);
        book.setAttribute('id', `book-${bookObj.id}`);

        return book;

    }

}

const finishBook = (bookId) => {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

const removeBook = (bookId) => {
    const confirm = window.confirm('Are you sure to delete this book?');

    if (confirm) {
        const bookTarget = findBookIndex(bookId);

        if (bookTarget === -1) return;

        books.splice(bookTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
    } else {
        return;
    }
    saveData();
};;

const resetBook = (bookId) => {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

const findBook = (bookId) => {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
};

const findBookIndex = (bookId) => {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }

    return -1;
};

const saveData = () => {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
};

const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
        alert('Your browser is not supported');
        return false;
    }
    return true;
}


const loadDataStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
};