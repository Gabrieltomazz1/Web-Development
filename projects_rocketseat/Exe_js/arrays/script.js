const booksByCategory = [
    {
        category: 'Riqueza',
        books: [{
            title: 'Os segredos da mente milionaria',
            author: 'T. Marv Eker',
        },
        {
            title: 'O homem mais rico da babilonia',
            author: 'George S. Clason',
        },
        {
            title: 'Pai rico, pai pobre',
            author: 'Robert T. Kiyosaki e Sharon L. Lechter',
        },

        ],
    },
    {
        category: 'Inteligencia Emocional',
        books: [
            {
                title: 'Voce é insubstituivel',
                author: 'Augusto Cury',
            },
            {
                title: 'Ansiedade - Como enfrentar o mal do seculo',
                author: 'Augusto Cury',
            },
            {
                title: 'Os 7 habitor de pessoas altamente eficazes',
                author: 'Stepehn R. Covey',
            },
        ],
    },
];

const totalCategories = booksByCategory.length;
console.log(totalCategories);


for(let category of booksByCategory){
    console.log('Total de livros de categoria: ', category.category);
    console.log(category.books.length);
}

function countAuthors() {
    let authors = [];

    for(let category of booksByCategory){
        for(let book of category.books){
            if(authors.indexOf(book.author) === -1){
                authors.push(book.author);
               }
        }
    }
    console.log("Total de autores: ", authors.length);
    
}

countAuthors();


function booksOfAugustoCury(){
    let books = [];
    for(let category of booksByCategory){
        for(let book of category.books){
            if(book.author === 'Augusto Cury'){
                books.push(book.title);
            }
        }
    }
    console.log("Livros do Autor: ", books);
}

booksOfAugustoCury();