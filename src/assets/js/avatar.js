//Declarando los elementos del HTML
/*
const imgDiv = document.querySelector('.profile-pic-div');
const img = document.querySelector('#photo');
const file = document.querySelector('#file');
const uploadBtn = document.querySelector('#uploadBtn');

//Hover en el div img

imgDiv.addEventListener('mouseenter', function(){
    uploadBtn.style.display = "block";
});

//Si el hover no está en el div de la img

imgDiv.addEventListener('mouseleave', function(){
    uploadBtn.style.display = "none";
});

//Funcionalidad cuando se sube una imagen para subir.

//Cuando seleccionamos una foto para subir

file.addEventListener('change', function(){
    //Hacemos referencia al archivo subido
    const choosedFile = this.files[0];

    if (choosedFile) {

        const reader = new FileReader(); //FileReader es una función predefinida de JS

        reader.addEventListener('load', function(){
            img.setAttribute('src', reader.result);
        });

        reader.readAsDataURL(choosedFile);
    }
});*/