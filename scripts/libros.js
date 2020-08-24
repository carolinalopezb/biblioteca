var librosArray = [];

var minPag = undefined;
var maxPag = undefined;

const ORDER_ASC_BY_PAG ="pag->PAG";
const ORDER_DESC_BY_PAG ="PAG->pag";
const ORDER_DESC_BY_ID ="ID->id";

function showLibros(array) { 

    let contenido = "<br><hr><br>";
    for (let i = 0; i < array.length; i++) {
        let libro = array[i];

        if(((minPag == undefined) || (minPag != undefined && parseInt(libro.paginas) >= minPag)) && 
        ((maxPag == undefined) || (maxPag != undefined && parseInt(libro.paginas) <= maxPag))){

            contenido += 'Título: ' + libro.titulo + '<br>';
            contenido += 'Editorial: ' + libro.editorial + '<br>';
            contenido += 'Páginas: ' + libro.paginas + '<br>';
            contenido += '<br><hr><br>'
        }
        document.getElementById("listado").innerHTML = contenido; 
    }
    
} 


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(LIBROS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            librosArray = resultObj.data;

            librosArray = sortLibros(ORDER_ASC_BY_PAG, librosArray);

            showLibros(librosArray);
        }
    });
    document.getElementById("sortPagDesc").addEventListener("click", function(){
        librosArray = sortLibros(ORDER_DESC_BY_ID, librosArray);

        showLibros(librosArray);
    });

    document.getElementById("sortPagAsc").addEventListener("click", function(){
        librosArray = sortLibros(ORDER_ASC_BY_PAG, librosArray);

        showLibros(librosArray);
    });

    document.getElementById("sortIdDesc").addEventListener("click", function(){

        librosArray = sortLibros(ORDER_DESC_BY_ID, librosArray);
     
        showLibros(librosArray);
    });


//------------------------------------------------------------------------------------------------------------

    document.getElementById('filtrar').addEventListener("click", function (){
        minPag = document.getElementById("min").value;
        maxPag = document.getElementById("max").value;
    
        if ((minPag != undefined) && (minPag != "") && (parseInt(minPag)) >= 0){
            minPag = parseInt(minPag);
        }else{
            minPag = undefined;
        }
        if ((maxPag != undefined) && (maxPag != "") && (parseInt(maxPag)) >= 0){
            maxPag = parseInt(maxPag);
        }else{
            maxPag = undefined;
        }
        showLibros(librosArray);
    });
    
    document.getElementById('limpiar').addEventListener("click", function (){
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";
    
        minPag = undefined;
        maxPag = undefined;
        
        showLibros(librosArray);
    });

});

function sortLibros(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_PAG){
        result = array.sort(function(a,b){
            if (a.paginas < b.paginas) { return -1; }
            if (a.paginas > b.paginas) { return 1; }
            return 0;
        });


} else if (criterio === ORDER_DESC_BY_PAG) {
    result = array.sort(function(a,b){
        if (a.paginas > b.paginas) { return -1; }
        if (a.paginas < b.paginas) { return 1; }
        return 0; 
     });
} else if (criterio === ORDER_DESC_BY_ID) {
    result = array.sort(function(a,b){
        if (a.id > b.id) { return -1; }
        if (a.id < b.id) { return 1; }
        return 0; 
     });
}

return result;
}






