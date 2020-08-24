// en este array voy a guardar lo que se encuentre en el json
var usersArray = [];

//esta es la funcion que verificara que los datos que dio el ususario, se enc
function validateUser(array, userIn, passwordIn) { 
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == userIn && usuario.password == passwordIn){
            return true;
        }
    }

    return false;
} 



document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("submitBtn").addEventListener("click", function(e) {

        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true;
        
        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (inputPassword.value === ''){
            inputPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            // todo lo que viene a continuación, no se los pide el obligatorio, pero sirve para practicar
            // ustedes solo deben poner el window.location

            getJSONData(USUARIOS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usersArray = resultObj.data;
        
                    if ( validateUser(usersArray, inputEmail.value, inputPassword.value) ){

                        localStorage.setItem('user-logged',JSON.stringify({email: inputEmail.value}));

                        window.location = 'index.html';
                    }else{
                        alert("Usuario o contraseña incorrectas!");
                    }
                }
            });

        }else{
            alert("Debes ingresar los datos!")
        }
    });
});