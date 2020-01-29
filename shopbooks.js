let kenmerk = document.getElementById('kenmerk');
kenmerk.addEventListener('change', (e) => {
    sortBooksOBJ.kenmerk = e.target.value;
    sortBooksOBJ.sorteren();
});

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        sortBooksOBJ.data = JSON.parse(this.responseText);
        sortBooksOBJ.insertJSdateIn();
        sortBooksOBJ.data.forEach(book => {
            book.dataUpp = book.titel.toUpperCase();
            book.sortAuteur = book.auteur[0];
        });
        sortBooksOBJ.sorteren();
    }
}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();


const makeTableHead = (arr) => {
    let head = "<table class='bookselection'><tr>";
    arr.forEach((item) => {
        head += "<th>" + item + "</th>";
    });
    head += "</tr>";
    return head;
}



const giveMonthNumber = (month) => {
    let number;
    switch (month) {
        case "januari":
            number = 0;
            break;
        case "februari":
            number = 1;
            break;
        case "maart":
            number = 2;
            break;
        case "april":
            number = 3;
            break;
        case "mei":
            number = 4;
            break;
        case "juni":
            number = 5;
            break;
        case "juli":
            number = 6;
            break;
        case "augustus":
            number = 7;
            break;
        case "september":
            number = 8;
            break;
        case "oktober":
            number = 9;
            break;
        case "november":
            number = 10;
            break;
        case "december":
            number = 11;
            break;
        default:
            number = 0

    }
    return number
}

const makeJSdate = (monthYear) => {
    let myArray = monthYear.split(" ");
    let date = new Date(myArray[1], giveMonthNumber(myArray[0]));
    return date;
}

const makePlus = (array) => {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        switch (i) {
            case array.length - 1:
                string += array[i];
                break;
            case array.length - 2:
                string += array[i] + " en ";
                break;
            default:
                string += array[i] + ", ";

        }
    }
    return string;
}


const turnTextAround = (string) => {
    if( string.indexOf(',') != -1 ) {
        let array = string.split(',');
        string = array[1] + ' ' + array[0];    
    }
    return string;
}

let shoppingcart = {
    items: [], 
    pickUpItems: function() {
        let bestelling;
        if( localStorage.getItem('orderBooks') == null ) {
            bestelling = [];
        } else {
            bestelling = JSON.parse(localStorage.getItem('orderBooks'));
            this.uitvoeren();
        }
        return bestelling;
    },

    toevoegen: function(el) {
        this.items = this.pickUpItems();
        this.items.push(el);
        localStorage.setItem('orderBooks', JSON.stringify(this.items));
        this.uitvoeren();
    },
 
    uitvoeren: function() {
        if (this.items.length > 0) {
        document.querySelector('.shoppingcart__number').innerHTML = this.items.length;
        } else {
        document.querySelector('.shoppingcart__number').innerHTML = '';
        }
    }

}

shoppingcart.pickUpItems();


let sortBooksOBJ = {
    data: "",

    kenmerk: "titelUpp",

    up: 1,

    insertJSdateIn: function () {
        this.data.forEach((item) => {
            item.jsDate = makeJSdate(item.uitgave)
        })
    },

    sorteren: function () {
        this.data.sort((a, b) => a["this.kenmerk"] > b["this.kenmerk "] ? 1*this.up : -1*this.up);
        this.uitvoeren(this.data);
    },

    uitvoeren: function (data) {

        document.getElementById('uitvoer').innerHTML = "";

        data.forEach( book => {
            let section = document.createElement('section');
            section.className = 'booksection';
    
            let main = document.createElement('main');
            main .className = 'booksection__main';

            let img = document.createElement('img');
            img.className = 'bookSelection__cover';
            img.setAttribute('src', book.cover);
            img.setAttribute('alt', turnTextAround(book.titel));


            let title = document.createElement('h3');
            title.className = 'booksection__title';
            title.textContent = turnTextAround(book.titel);

            let auteurs = document.createElement('p');
            auteurs.className = 'booksection__auteur';
            book.auteur[0] = turnTextAround(book.auteur[0]);
            auteurs.textContent = makePlus(book.auteur);

            let overig = document.createElement('p');
            overig.className = 'booksection__overig';
            overig.textContent = 'datum: '+book.uitgave+' | aantal paginas '+book.paginas+' | taal: '+book.taal+' | ean '+book.ean;

            let price = document.createElement('div');
            price.className = 'booksection__price';
            price.textContent = book.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

            let button = document.createElement('button');
            button.className = 'booksection__button';
            button.innerHTML = 'Add to <br> Cart'
            button.addEventListener('click', () => {
                shoppingcart.toevoegen(book);
            })



            section.appendChild(img);
            main.appendChild(title);
            main.appendChild(auteurs);
            main.appendChild(overig);
            section.appendChild(main);
            section.appendChild(price);
            price.appendChild(button)
            document.getElementById('uitvoer').appendChild(section);
        });
  
    }
}

document.getElementsByName('up').forEach((item) => {
    item.addEventListener('click', (e)=> {
        sortBooksOBJ.up = parseInt(e.target.value);
        sortBooksOBJ.sorteren();
    })
    
})