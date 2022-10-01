class Persona{
    id = 0;
    nombre = "";
    apellido = "";
    edad = 0;

    constructor(id,nombre,apellido,edad)
    {
        this.id = id || -1;
        this.nombre = nombre || "name";
        this.apellido = apellido || "lastname";
        this.edad = edad || -1;
    }

    
}

class Heroe extends Persona{
    alterEgo = "";
    ciudad = "";
    publicado = 0;

    constructor(id,nombre,apellido,edad,alterEgo,ciudad,publicado)
    {
        super(id,nombre,apellido,edad);
        this.alterEgo = alterEgo || "vacio";
        this.ciudad = ciudad || "Gotham";
        if(publicado >= 1940 && publicado!=null)
        {
            this.publicado = publicado;
        }else{
            this.publicado = 1940;
        }
    }    
}

class Villano extends Persona{
    enemigo = "";
    robos= 0;
    asesinatos=0;

    constructor(id,nombre,apellido,edad,enemigo,robos,asesinatos)
    {
        super(id,nombre,apellido,edad);
        this.enemigo = enemigo || "Batman";
        
        if(robos > 0 && robos != null)
        {
            this.robos = robos;
        }else this.robos = 1;

        if(asesinatos > 0 && robos!=null)
        {
            this.asesinatos = asesinatos;
        }else this.asesinatos = 1;
    }

}

var arrayPersonas= [];

function Inicializar(){
    const cadena= '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis","publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica","publicado":2001},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":6, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';

    for(objeto of JSON.parse(cadena)){
        if(objeto.hasOwnProperty("id") && objeto.hasOwnProperty("nombre") && objeto.hasOwnProperty("apellido") && objeto.hasOwnProperty("edad"))
        {
            if(objeto.hasOwnProperty("alterego") && objeto.hasOwnProperty("ciudad") && objeto.hasOwnProperty("publicado"))
            {
                let heroe = new Heroe(objeto.id,objeto.nombre,objeto.apellido,objeto.edad,objeto.alterego,objeto.ciudad,objeto.publicado);
                arrayPersonas.push(heroe);
            }
            else if(objeto.hasOwnProperty("enemigo") && objeto.hasOwnProperty("robos") && objeto.hasOwnProperty("asesinatos"))
            {
                let villano = new Villano(objeto.id,objeto.nombre,objeto.apellido,objeto.edad,objeto.enemigo,objeto.robos,objeto.asesinatos);
                arrayPersonas.push(villano);
            }
        }
    }
    
}

Inicializar();

//console.log(arrayPersonas);

let txtId = document.getElementById("txtId");
let txtNombre = document.getElementById("txtNombre");
let txtApellido = document.getElementById("txtApellido");
let txtEdad = document.getElementById("txtEdad");
let SelectTipo = document.getElementById("SelectTipo");

//funcion para rellenar tabla
function mostrarPersonas()
{
    document.getElementById("persona-container").innerHTML = "";
    arrayPersonas.forEach(el => {
        let tr = document.createElement("tr");

        tr.classList.add("trPersonas");
        tr.innerHTML = `
        <td>${el.id}</td>
        <td>${el.nombre}</td>
        <td>${el.apellido}</td>
        <td>${el.edad}</td>
        <td>${el.alterEgo || "-"}</td>
        <td>${el.ciudad || "-"}</td>
        <td>${el.publicado || "-" }</td>
        <td>${el.enemigo || "-"}</td>
        <td>${el.robos || "-"}</td>
        <td>${el.asesinatos || "-"}</td>
        
        `;
        document.getElementById("persona-container").appendChild(tr);
    }) 
}

mostrarPersonas();



function mostrarCorrespondiente()
{
    if(document.getElementById("SelectTipo").value == "tHeroe")
    {
        document.getElementById("txtAE").style.visibility="visible";
        document.getElementById("txtCiudad").style.visibility="visible";
        document.getElementById("txtPublicado").style.visibility="visible";
        document.getElementById("txtEnemigo").style.visibility="hidden";
        document.getElementById("txtRobos").style.visibility="hidden";
        document.getElementById("txtKills").style.visibility="hidden";

        
    }else if(document.getElementById("SelectTipo").value == "tVillano")
    {
        document.getElementById("txtAE").style.visibility="hidden";
        document.getElementById("txtCiudad").style.visibility="hidden";
        document.getElementById("txtPublicado").style.visibility="hidden";
        document.getElementById("txtEnemigo").style.visibility="visible";
        document.getElementById("txtRobos").style.visibility="visible";
        document.getElementById("txtKills").style.visibility="visible";
    }



}

SelectTipo.addEventListener("change",mostrarCorrespondiente);

function generarId()
{
    let lastId=0;

    for(let i=0;i<arrayPersonas.length;i++)
    {
        lastId = parseInt(arrayPersonas[arrayPersonas.length-1].id);
    }

    return lastId + 1;

} 

function darDeAlta()
{
    txtId.value = generarId();

    if(document.getElementById("SelectTipo").value == "tHeroe")
    {
        //txtId.value = generarId()
        let heroe = new Heroe(txtId.value,txtNombre.value,txtApellido.value,txtEdad.value,document.getElementById("txtAE").value,document.getElementById("txtCiudad").value,document.getElementById("txtPublicado").value);
        arrayPersonas.push(heroe);
        document.getElementById("txtAE").value = ""
        document.getElementById("txtCiudad").value = ""
        document.getElementById("txtPublicado").value = ""
        SelectTipo.value = "tVacio";
    }else if(document.getElementById("SelectTipo").value == "tVillano")
    {
        let villano = new Villano(generarId(),txtNombre.value,txtApellido.value,txtEdad.value,document.getElementById("txtEnemigo").value,document.getElementById("txtRobos").value,document.getElementById("txtKills").value);
        arrayPersonas.push(villano);
        document.getElementById("txtEnemigo").value = ""
        document.getElementById("txtRobos").value =""
        document.getElementById("txtKills").value=""
        SelectTipo.value = "tVacio";
        
    }

    console.log(arrayPersonas);
    txtId.value = 0;
    mostrarPersonas(); //llamo a la funcion para actualizar la tabla
}

document.getElementById("FrmABM").addEventListener("submit",e=> {
e.preventDefault();
})//DESVINCULACION DE LA FUNCION SUBMIT DE LOS BOTONES DEL FORM ABM
document.getElementById("btnAlta").addEventListener("click",darDeAlta);

function initConfig()
{
    document.getElementById("FrmABM").style.visibility="hidden";
    document.getElementById("txtAE").style.visibility="hidden";
    document.getElementById("txtCiudad").style.visibility="hidden";
    document.getElementById("txtPublicado").style.visibility="hidden";
    document.getElementById("txtEnemigo").style.visibility="hidden";
    document.getElementById("txtRobos").style.visibility="hidden";
    document.getElementById("txtKills").style.visibility="hidden";
}

initConfig();

function MostrarABM()
{
    document.getElementById("FrmABM").style.visibility="visible";
    
}

document.getElementById("FrmDatos").addEventListener("submit",e=> {
    e.preventDefault();
    });

document.getElementById("btnAgregar").addEventListener("click",MostrarABM);


function filtradoElementos()
{
    filtro = document.getElementById("filtroTipo");

    document.getElementById("persona-container").innerHTML = "";
    arrayPersonas.forEach(el => {
        let tr = document.createElement("tr");

        if(el == Heroe)
        {

        }

        tr.classList.add("trPersonas");
        tr.innerHTML = `
        <td>${el.id}</td>
        <td>${el.nombre}</td>
        <td>${el.apellido}</td>
        <td>${el.edad}</td>
        <td>${el.alterEgo || "-"}</td>
        <td>${el.ciudad || "-"}</td>
        <td>${el.publicado >=0?el.publicado:"-" }</td>
        <td>${el.enemigo || "-"}</td>
        <td>${el.robos || "-"}</td>
        <td>${el.asesinatos || "-"}</td>
        
        `;
        document.getElementById("persona-container").appendChild(tr);
    }) 
}


document.getElementById("btnCancelar").addEventListener("click",initConfig)


document.getElementById("btnPromedioEdad").addEventListener("click",()=>{
    let edad = 0;
    for(let i=0;i<arrayPersonas.length;i++)
    {
        edad += parseInt(arrayPersonas[i].edad);
    }

    let promedio = edad / arrayPersonas.length;

    document.getElementById("mostrarPromedio").value = promedio.toString();
})


  