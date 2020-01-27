// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState==4 && this.status == 200) {
       sortBooksOBJ.data = JSON.parse(this.responseText);
       sortBooksOBJ.sorteren();
   } 
}
xmlhttp.open('GET', "boek.json"  , true);
xmlhttp.send();


// Object dat de boeken uitvoert en sorteert.
let sortBooksOBJ = {
    data: "",

    sorteren: function() {
        this.data.sort( (a,b) => a.auteur[0] > b.auteur[0] ? 1 : -1);
        this.uitvoeren();
    },

    uitvoeren: function() {
        let uitvoer = "";
        for ( let i=0; i<this.data.length; i++) {
            uitvoer += this.data[i].auteur + "<br>";
        }
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }
}