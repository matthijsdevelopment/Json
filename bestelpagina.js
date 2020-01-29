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
        }
        bestelling.forEach( item => {
            this.items.push(item);
        })
        return bestelling;
    },

    verwijderItem: function(ean) {
        this.items.forEach((item, index) => {
            if (item.ean == ean) {
                this.items.splice(index, 1);
                ean = 4;
            }
        })

        localStorage.setItem('orderBooks', JSON.stringify(this.items));
        document.querySelector('.orderBook__remove').innerHTML = this.items.length;
        if (this.items.length > 0) {
            document.querySelector('.orderBook__remove').innerHTML = this.items.length;
        } else {
            document.querySelector('.orderBook__remove').innerHTML = "";
        }
        this.uitvoeren();
    },

    totalCalculation: function() {
        let total = 0;
        this.items.forEach( book => {
            total += book.prijs;
        });
        return total;
        },

    uitvoeren: function() {

        document.getElementById('bestelling').innerHTML = "";

        this.items.forEach( book => {
            let section = document.createElement('section');
            section.className = 'orderdBook';

            let img = document.createElement('img');
            img.className = 'orderdBook__cover';
            img.setAttribute('src', book.cover);
            img.setAttribute('alt', turnTextAround(book.titel));


            let title = document.createElement('h3');
            title.className = 'orderdBook__title';
            title.textContent = turnTextAround(book.titel);

            let price = document.createElement('div');
            price.className = 'borderdBook__price';
            price.textContent = book.prijs.toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

            let verwijder = document.createElement('div');
            verwijder.className = "orderBook__remove";
            verwijder.addEventListener('click', () => {
                this.verwijderItem(book.ean);
            });

            section.appendChild(img);
            section.appendChild(title);
            section.appendChild(price);
            section.appendChild(verwijder)
            document.getElementById('bestelling').appendChild(section);
        });
        let section = document.createElement('section');
        section.className = 'orderdBook';

        let totalText = document.createElement('div');
        totalText.className = 'orderdBook__total-tekst';
        totalText.innerHTML = 'Total :';

        let totalPrice = document.createElement('div');
        totalPrice.className = 'orderdBook__total-price';
        totalPrice.textContent = this.totalCalculation().toLocaleString('nl-NL', {currency: 'EUR', style: 'currency'});

        section.appendChild(totalText);
        section.appendChild(totalPrice);
        document.getElementById('bestelling').appendChild(section);

        if (this.items.length > 0) {
            document.querySelector('.shoppingcart__number').innerHTML = this.items.length;
            } else {
            document.querySelector('.shoppingcart__number').innerHTML = '';
            }
        
    }
    
}

shoppingcart.pickUpItems();
shoppingcart.uitvoeren();

