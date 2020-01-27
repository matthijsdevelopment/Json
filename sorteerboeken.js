// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        sortBooksOBJ.data = JSON.parse(this.responseText);
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

const makeTableRow = (arr) => {
    let row = "<tr class='bookselection__row'>";
    arr.forEach((item) => {
        row += "<td class='bookselection__data'>" + item + "</td>";
    });
    row += "</tr>";
    return row;
}

// Object dat de boeken uitvoert en sorteert.
let sortBooksOBJ = {
    data: "",

    sorteren: function () {
        this.data.sort((a, b) => a.auteur[0] > b.auteur[0] ? 1 : -1);
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
                ]);

        }
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }
}