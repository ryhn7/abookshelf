const books = [];
const RENDER_EVENT = 'render-book';
const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOKSHELF_APPS';

document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addBook();
        submitForm.reset();
    });

    if (isStorageExist()) {
        loadDataStorage();
    }
});

const addBook = () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const years = document.getElementById('years').value;
    const isCompleted = document.getElementById('isCompleted').checked;

    const generateID = generateId();
    const bookObj = generateBookObj(title, author, years, generateID, isCompleted, false);
    books.push(bookObj);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

const generateId = () => {
    return +new Date();
};

const generateBookObj = (title, author, years, id, isCompleted) => {
    return {
        title,
        author,
        years: parseInt(years),
        id,
        isCompleted
    }
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

const toast = () => {
    const toast = document.getElementById("toast");
    const closeIcon = document.getElementById("close");
    const progress = document.getElementById("progress");

        toast.classList.add("aktif");
        progress.classList.add("aktif");

        timer1 = setTimeout(() => {
            toast.classList.remove("aktif");
        }, 5000); //1s = 1000 milliseconds

        timer2 = setTimeout(() => {
            progress.classList.remove("aktif");
        }, 5300);

    closeIcon.addEventListener("click", () => {
        toast.classList.remove("aktif");

        setTimeout(() => {
            progress.classList.remove("aktif");
        }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
    });
}

const infoBook = () => {

    const total = document.getElementById('total');
    total.innerHTML = `<h2>${books.length}</h2>`;

    const unread = document.getElementById('unread');
    const completed = document.getElementById('completed');
    let count = 0;

    for (let i = 0; i < books.length; i++) {
        if (books[i].isCompleted) {
            count++;
        }
    }
    completed.innerHTML = `<h2>${count}</h2>`;
    unread.innerHTML = `<h2>${books.length - count}</h2>`;
};

