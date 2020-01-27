const url = "boek.json";

let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if(this.readyState==4 && this.status == 200) {
       document.getElementById('uitvoer').innerHTML = this.responseText;
   } else {
       console.log("readystate " + this.readyState);
       console.log("status " + this.status);
   }
}

xmlhttp.open('GET', url, true);
xmlhttp.send();