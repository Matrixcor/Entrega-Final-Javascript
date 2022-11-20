
// esta funcion administra todas las alertas 
function Muestra_Alertas(Alert){
    switch(Alert){
        case 1 : 
            Toastify({ text: "Se actualizo la cantidad del producto", duration: 2000, gravity: 'bottom' }).showToast();
            break;
        case 2 : 
            Toastify({ text: "Se ha eliminado el producto", duration: 2000, gravity: 'bottom' }).showToast();
            break;
        case 3 : 
            Toastify({ text: "Se quito el producto del carrito", duration: 2000, gravity: 'bottom' }).showToast();
            break;
        case 4 :
            Swal.fire(' Bienvenido ') ;
            break;
        case 5 :
            Swal.fire(' Complete todos los campos ')
            break;
        case 6 :
            Swal.fire('La contraseña ingresada es incorrecta') 
            break;
        case 7 :
            Swal.fire('El nombre de usuario no esta Registrado') 
            break;
        case 8 :
            Swal.fire('Error de Conexion') 
            break;
        case 9 :
            Swal.fire('Para Finalizar la compra debe Loggearse') 
            break;
        case 10 :
            Swal.fire('El carrito esta vacio') 
            break;
        case 11 :
            Swal.fire('Usted ya se encuentra Logeado, por favor continue con la compra') 
            break;
        case 12 :
            Swal.fire('Muchas Gracias Por realizar la compra. ') 
            break;
        default: 
       
    }
    
}
