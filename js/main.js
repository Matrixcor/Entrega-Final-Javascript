/* 
EL SIGUIENTE PROGRAMA PERMITE OBTENER DATOS DE LOGIN DE UN ARCHIVO JSON

*/


let carrito = [];
let ProDesta = [];
let datausuario = [];
let Dato = [];
let urlProd = 'data/productos.json';
let urlUser = 'data/usuarios.json';

document.addEventListener('DOMContentLoaded', () => {
    const ArrayGuardado = JSON.parse(localStorage.getItem("ArrayJson")) || [];  // Cargar el carrito con el localstorage, si no hay nada asignarle un array vacio
    carrito = ArrayGuardado; //deberia retornar el array recuperado para utilizarlo en la funcion muestra carrito. 
    Modifico_IconoCarro(carrito);
    Modifico_IconoUsuario("Ingrese");
    Genera_Destacados();
   
});



    //un manejador de eventos que active las funciones

    document.getElementById("Buscador_Boton").addEventListener('click', Busca_Productos);
    document.getElementById("BotonCarro").addEventListener('click', Genera_Carrito);
    document.getElementById("FinCompra").addEventListener('click', Genera_Checkout);
    document.getElementById("BotonLog").addEventListener('click', Genera_FormularioLogin);
    
    function Genera_Destacados() { 
        fetch(urlProd)  //consumo datos de productos
        .then ((response) =>{
            if(response.ok) {
                return response.json() //si es correcta la respuesta, devuelve el archivo en formato json
            } else {
                throw "Error en la llamada Ajax";
            }
        }).then(function(data) {             
            let ProDesta = []; //paso el objeto recuperado a la funcion muestra productos
            ProDesta = data.filter(data => data.Status == 1); //cargo los productos destacados al entrar en la pagina
            
            Muestra_Producto(ProDesta);

        }).catch(function(err) {
            Muestra_Alertas(8);
        });
    };

    function Busca_Productos() {  //ingreso el producto buscado capturando el valor de la barra de nusqueda
        let Deseado = document.getElementById("Buscador").value; //en este caso capturo el valor de un input, pero  podria  crearlo
        fetch(urlProd)
        .then ((resp) => resp.json())
        .then ((data) =>{
            //deberia asignar el objeto a muetra productos
            let Prod = data;
            let resultado = [];  //parsear para incluir mayusculas o minusculas
            Deseado != "" ? resultado = data.filter( data => data.Name.includes(Deseado)) : resultado = data
            Muestra_Producto(resultado,Prod);
        })
    };

    // seccion de carrito

    function Genera_Carrito(){
        let Importe = 0 ;
        carrito.forEach((carrito)=>{ 
            Importe += carrito.Total;
        });
        Muestra_Carrito(carrito,Importe);
    };

    function IncorporaCarrito(Cod,carrito){ // si no hay nada en local Storage, agrego a un arreglo de objetos "carrito", si existe el producto, modifico sus elementos.
        fetch(urlProd)
        .then ((resp) => resp.json())
        .then ((data) =>{

            let Prod = [];

            Prod = data;
            carrito.some(Prod => Prod.Cod === Cod ) ? Modifica_Item() : Agrega_Item()
            
            function Modifica_Item(){
                carrito.forEach((Prod) => {
                    if( Prod.Cod == Cod){
                        Prod.Cantidad ++;
                        Prod.Total += Prod.Precio;
                    }else{
                        return Prod;
                    }
                });
                Muestra_Alertas(1);
            };
        
            function Agrega_Item(){
                let mod = Prod.find(Prod => Prod.Cod == Cod);
                mod.Total = mod.Precio;
                carrito.push( mod );
                Muestra_Alertas(1);
            };
            Muestra_Carrito(carrito); //muestro los productos al abrir la pestaña del carrito
            GuardaCarrito(carrito); //guardo en local storage cada vez que agregue o modifique un producto
            Modifico_IconoCarro(carrito); //modifico el contador del icono del carrito
        })
    };
    
    function EliminaItems(Cod,carrito){
        let Produc = carrito.find(Prod => Prod.Cod == Cod);
        Produc.Cantidad > 1 ? Modifica_Cantidad() : Quita_Producto()
        function Modifica_Cantidad(){
            carrito.forEach( Prod => {
                if(Prod.Cod === Cod ){
                    Prod.Cantidad--;
                    Prod.Total -= Prod.Precio;
                    return Prod;
                } 
            });
            Muestra_Alertas(2);
        };
        function Quita_Producto(){
            for(var k=0; k < carrito.length; k++){
                if(carrito[k].Cod === Produc.Cod){
                    carrito.splice(k,1)
                }
            } 
            Muestra_Alertas(3);
        };
        GuardaCarrito(carrito);
        Muestra_Alertas(2);
        Muestra_Carrito(carrito);
        Modifico_IconoCarro(carrito);
    };
    
    function Modifico_IconoCarro(carrito){
        let NumCarrito = 0;
        carrito.length == 0 ? NumCarrito = 0 :  Suma_Items()
        function Suma_Items(){
            for (var i = 0 ; i< carrito.length ; i++){ 
                NumCarrito += carrito[i].Cantidad ;
            };
        };
        Muestra_ModIcono(NumCarrito);
    };

    function GuardaCarrito(carrito){ //almaceno en local storage lo que tengo dentro del carrito
        let ArrayCarro = [];
        ArrayCarro = JSON.stringify(carrito);
        localStorage.setItem("ArrayJson",ArrayCarro);
    };

    // seccion checkout

    function Genera_Checkout(){ //se ejecuta con un delay de 0,5 segundos para dar tiempo que se oculte el carrito lateral
    
        let user = document.getElementById("Logo").dataset.value; //con esto pretendo captar en Usuario.user para luego 
        let Estadocarrito = carrito.length;
        if((Estadocarrito !=0)){  //pregunto, si carrito esta vacio, muestro un aviso de carrito vacio, de ese modo no cargo el formulario para finalizar la compra
            user != "Ingrese" ? Proceso_Checkout() : Muestra_Alertas(9)
            
            function  Proceso_Checkout(){

                fetch('data/usuarios.json')  //consumo datos json de los usuarios
                .then ((resp) =>{
                    if(resp.ok) {
                        return resp.json() //si es correcta la respuesta, devuelve el archivo en formato json
                    } else {
                        throw "Error en la llamada Ajax";
                    }
                }).then(function(data) {             
                    Dato = data.filter( data => data.User.includes(user)) //paso el objeto recuperado a la funcion muestra productos
                    Muestra_Checkout(carrito);
                }).catch(function(err) {
                    Muestra_Alertas(8);
                });

                setTimeout(() => {
                    document.getElementById("DatoPago").addEventListener('click', Genera_Pago );
                    document.getElementById("TerminaCompra").addEventListener('click', Vacia_Carrito ); // esto evita que se ejecute el manejador de eventos antes que se cargue el formulario de checkout
                },500)
            }
        }else{
            Muestra_Alertas(10);
        };
    };
    function Finaliza_Compra(){
        Muestra_Alertas(12);
        Vacia_Carrito();
    }
    function Vacia_Carrito(){
        carrito = [];
        localStorage.clear();
        Modifico_IconoCarro(0);
        GuardaCarrito(carrito);
    };

    function Genera_Pago(){
        document.getElementsByName('status').forEach((elements)=>{
            if (elements.checked) {
                elements.value == "credito"? Muestra_Credito() :  Muestra_Tranferencia()
            }
        })    
    };
    
    //seccion loggin

    function Genera_FormularioLogin(){
        let user = document.getElementById("Logo").dataset.value;
        user == "Ingrese" ? Muestra_Formulario() : Habilita_OpcionLog()
    };
     
    //realizo un a comprobacion de los datos ingresados en los campos del formulario
    function Valida_Datos(evento) { 
        let usuario = document.getElementById('usuario').value; //capturo valores del formulario
        let contrasena = document.getElementById('contrasena').value;

        if( usuario || false ? (contrasena || false ? true : false) : false){ //si los datos son correctos se los paso a la funcion que comprueba si los datos corresponden a un usuario registrado
            Valida_Usuario(usuario,contrasena);
        } else{
            Muestra_Alertas(5);
        }
    };

    function Valida_Usuario(usuario,contrasena){
        fetch('data/usuarios.json') //consumo datos del JSON para encontrar el usuario y poder comparar los datos ingresados con la base de datos
        .then(function(response) {
            if(response.ok) {
                return response.json() //si es correcta la respuesta, devuelve el archivo en formato json
            } else {
                throw "Error en la llamada Ajax";
            }
        })
        .then(function(datausuario) { //ahora ejecuto el cuerpo de validacion de los datos
            
            let Persona = datausuario.find((datausuario) => datausuario.User === usuario); //busco si existe el usuario, me deberia servir para el check out
            if(typeof Persona === 'undefined' ){ // valido la contraseña y los datos del falso backend
                Muestra_Alertas(7);
            }else{
                if (Persona.User === usuario) {
                    if(Persona.Contrasena === contrasena){
                        $('#myModal').modal('hide'); 
        
                         //mensaje de loggin exitoso 
                        Modifico_IconoUsuario(Persona.User);
                        Muestra_Alertas(4);
                        
                    } else{
                        Muestra_Alertas(6);
                    };
                }else{
                    Muestra_Alertas(7);
                    $('#myModal').modal('show'); //despliego el toogle del formulario bootstrap
                };
            };
        })
        .catch(function(err) {
            Muestra_Alertas(8);
        });
        
    };
    function cerrar_Modal(){
        $('#myModal').modal('hide'); 
    };