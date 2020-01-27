let kenmerk = document.getElementById('kenmerk');
kenmerk.addEventListener('change', (e) => {
    sortBooksOBJ.kenmerk = e.target.value;
    sortBooksOBJ.sorteren();
});

// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        sortBooksOBJ.data = JSON.parse(this.responseText);
        sortBooksOBJ.insertJSdateIn();
        sortBooksOBJ.sorteren();
    }
}
xmlhttp.open('GET', "boek.json", true);
xmlhttp.send();


const makeTableHead = (arr) => {
    let head = "<table class='bookselection'><tr>";
    arr.forEach((item) => {
        head += "<th>" + item + "</th>";
    });
    head += "</tr>";
    return head;
}

const makeTableRow = (arr, accent) => {
    let row = "";
   if(accent==true) {
    row = "<tr class='bookselection__row--accent'>";
   } else {
    row = "<tr class='bookselection__row'>";
   }
    arr.forEach((item) => {
        row += "<td class='bookselection__data'>" + item + "</td>";
    });
    row += "</tr>";
    return row;
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
    let date = new Date(myArray[1], giveMonthNumber(myArray[0 ]));
    return date ;
}

// Object dat de boeken uitvoert en sorteert.
let sortBooksOBJ = {
    data: "",
 
    kenmerk: "titel",
     
    insertJSdateIn: function() {
        this.data.forEach((item) => {
            item.jsDate = makeJSdate(item.uitgave)
        })
    },


    sorteren: function () {
        this.data.sort((a, b) => a["this.kenmerk"] > b["this.kenmerk "] ? 1 : -1);
        this.uitvoeren(this.data);
    },

    uitvoeren: function (data) {
        let uitvoer = makeTableHead([
            "titel",
            "auteur(s)",
            "cover",
            "uitgave",
            "bladzijden",
            "taal",
            "EAN"
        ]);
        for (let i = 0; i < data.length; i++) {
            let accent = false;
            i%2 == 0 ? accent = true : accent = false;
            let imgElement =
                "<img src='" +
                data[i].cover +
                "' class='bookselection__img'> ";
            uitvoer += makeTableRow(
                [data[i].titel,
                    data[i].auteur[0],
                    imgElement,
                    data[i].uitgave,
                    data[i].paginas,
                    data[i].taal,
                    data[i].ean
                ], accent);

        }
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }
}