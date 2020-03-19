// capturando el formulario
let form = document.querySelector("#userRegForm")

//capturar los elementos del formulario

let formInputs = Array.from(form.elements);

//sacamos el boton Submit del Array
formInputs.pop();

// Objeto donde almacenamos los errores

let inputErrors = {}

// iteramos sobre todos los campos del formulario

formInputs.forEach(oneInput => {

    // Agregamos el evento bluer a cadacampo
    oneInput.addEventListener("blur", function(){
        // Capturamos el valor del campo individualmente
        let inputValue = this.value;        
        // Chequeo de campo vacio

        if (validator.isEmpty(inputValue, { ignore_whitespace: true})){
            // Agrego la clase al campo
            this.classList.add("error")
            // Mostramos el mensaje de error en el "span" con clase feedback
            this.nextElementSibling.innerHTML = `El campo <b> ${this.dataset.name} </b> no puede estar vacio`;
            
        } else {
            // elimino la clase del campo
            this.classList.remove("error")
            // elimino el mensaje de error en el "span" con clase feedback
            this.nextElementSibling.innerHTML = `El campo <b> ${this.dataset.name} </b> no puede estar vacio`; 
        }
        
    });

    // Validando el campo email
    if (oneInput.name == "email"){
        // si al salir del campo hubo cambios en el mismo
        oneInput.addEventListener("blur", function(){          
            //si el campo NO esta vacio y NO es un formato de email valido
            if (!validator.isEmpty(inputValue) && !validator.isEmail(inputValue)){
                // Agrego la clase "error" al campo
                this.classList.add("error")
                // Mostramos el mensaje de error en el "span" con clase feedback
                this.nextElementSibling.innerHTML = `El <b> ${this.dataset.name} </b> debe tener un formato valido`;                
            }
        });
        
    };
    //capturando el valor del campo Password
    // if (oneInput.name === "password"){}

    // //validando el campo rePassword
    // if(oneInput.name === "rePassword"){
    //     oneInput.addEventListener("blur", function (){
    //         if (!validator.isEmpty(inputValue) && !validator.equals(inputValue, password.dataset.value)){
    //             // Agrego la clase "error" al campo
    //             this.classList.add("error")
    //             // Mostramos el mensaje de error en el "span" con clase feedback
    //             this.nextElementSibling.innerHTML = `El <b> ${this.dataset.name} </b> es distinto a la contraseña original`;
    //         }
    //     })
    // };

    //validando la extension de el archivo avatar
    if (oneInput.name === "avatar"){
        oneInput.addEventListener("change", function(){
            // Listado de extensiones permitidas
            let validExtensions = ["jpg", " jpeg", " gif", " png"];
            // Rescatamos la extension del archivo a subir
            let fileExtension = this.value.split(".").pop();
            // chequeo que el archivo a subir este en nuestro array de extensiones
            let isValidExtensions = validExtensions.includes(fileExtension);
            // condicion si la extension no 
            if (!isValidExtensions){
                // Agrego la clase "error" al campo
                this.classList.add("error")
                // Mostramos el mensaje de error en el "span" con clase feedback
                this.nextElementSibling.innerHTML = `Solo archivos con extensión  <b> ${validExtensions} </b> son permitidos`;
            } else {
                // elimino la clase del campo
                this.classList.remove("error")
                // elimino el error que tenga el feedback
                this.nextElementSibling.innerHTML = ``;    
            }
            

        })
    }
});

//si se trata de enviar el formulario antes de hacer el blur de los campos
form.addEventListener("submit", function(e){
    formInputs.forEach(oneInput => {
        let inputValue = oneInput.value; 

        if(validator.isEmpty(inputValue, { ignore_whitespace: true})){
            //Agrego una propiedad al objeto de errores con su nombre de campo
            inputErrors[oneInput.name] = true;
            // Le agregamos la clase error al campo
            oneInput.classList.add("error");
            // Agregamos el codigo de error
            oneInput.nextElementSibling.innerHTML = `Campo <b> ${oneInput.dataset.name} <b/> no puede quedar vacio`
        };
    })

    //Si el objeto de errores tiene almacenado algo
    if (Object.keys(inputErrors).length > 0) {
        //Frena el boton SUBMIT cuando todos los campos estan vacios
        e.preventDefault();
        
    }
});