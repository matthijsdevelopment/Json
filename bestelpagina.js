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
            document.querySelector('.shoppingcart__number').innerHTML =  bestelling.length;
        }
        bestelling.forEach( item => {
            this.items.push(item);
        })
        return bestelling;
    },

    uitvoeren: function() {

        document.getElementById('uitvoer').innerHTML = "";

        this.items.forEach( book => {
            let section = document.createElement('section');
            section.className = 'orderdBook';
    
            let main = document.createElement('main');
            main .className = 'orderdBook__main';

            let img = document.createElement('img');
            img.className = 'orderdBook__cover';
            img.setAttribute('src', book.cover);
            img.setAttribute('alt', turnTextAround(book.titel));


            let title = document.createElement('h3');
            title.className = 'orderdBook__title';
            title.textContent = turnTextAround(book.titel);

            let price = document.createElement('div');
            price.className = 'borderdBook __price';
            price.textContent = book.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});


            section.appendChild(img);
            main.appendChild(title);
            section.appendChild(main);
            section.appendChild(price);
            document.getElementById('uitvoer').appendChild(section);
        });
    
    }
    
}

shoppingcart.pickUpItems();
shoppingcart.uitvoeren();

