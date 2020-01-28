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

let sortBooksOBJ = {
    data: "",

    kenmerk: "titel",

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

        data.forEach( book => {
            let section = document.createElement('section');
            section.className = 'book';
    
            let img = document.createElement('img');
            img.className = 'bookSelection__cover';
            img.setAttribute('src', book.cover);
            img.setAttribute('alt', book.titel);


            let title = document.createElement('h3');
            title.className = 'book__title';
            title.textContent = book.titel;

            section.appendChild(img);
            section.appendChild(title);
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