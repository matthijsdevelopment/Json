let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState==4 && this.status == 200) {
       sortBooksOBJ.data = JSON.parse(this.responseText);
       sortBooksOBJ.uitvoeren();
   } 
}

xmlhttp.open('GET', "boek.json"  , true);
xmlhttp.send();

let sortBooksOBJ = {
    data: "",

    uitvoeren: function() {
        let uitvoer = "";
        for ( let i=0; i<this.data.length; i++) {
            uitvoer += this.data[i].titel + "<br>";
        }
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }
}