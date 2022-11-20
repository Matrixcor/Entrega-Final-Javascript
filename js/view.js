

function Muestra_Producto(ProDesta){ //Muestro los productos destacados, sino en su defecto muestro todos
    const Container = document.querySelector("#Seccion-Contenido")
    Container.innerHTML = "";
    ProDesta.forEach(Prod => {
        let {Cod, Img,Name,Precio} = Prod;
        let BoxDesta = document.createElement('div');
        BoxDesta.setAttribute('class','col');
        BoxDesta.setAttribute('id','card_'+Cod);
        BoxDesta.innerHTML = `
            <div class="card Animacion">
                <img src= "./${Img}"></img>
                <div class="card-body">
                    <h3 class="card__titulo"> ${Name} </h3>
                </div>
                <p class="item-price">$ ${Precio}</p>
                <a href="javascript:IncorporaCarrito(${Cod},carrito)" class="btn card__boton bg-info">Comprar</a>
            </div>           
          `;
        Container.appendChild(BoxDesta);
    });
};

function Muestra_Carrito(carrito,Importe){
    const Container = document.querySelector("#cuerpocarrito");
    Container.innerHTML = "";
    carrito.forEach(Prod => {
        let {Cod,Img,Name,Precio,Cantidad,Total} = Prod;
        let BoxCarrito = document.createElement('div');
        BoxCarrito.setAttribute('class','row w-100 shadow-lg p-3 mb-5 bg-light rounded');
        BoxCarrito.setAttribute('id','card_'+Cod);
        BoxCarrito.innerHTML = `
        <div>
            <div class="col-4 d-flex w-100 align-items-center justify-content-start p-2 border-bottom">
                <img src= "./${Img}"></img>
                <h3 class="card__titulo"> ${Name} </h3>
            </div> 
            <div class="col-4 d-flex w-100 align-items-center justify-content-between p-2 border-bottom">
                <p class="item-price p-2">Precio por unidad: $ ${Precio} </p>
                <p class="item-price p-2"> Cantidad: ${Cantidad}</p>
                <p class="item-price p-2"> <b> Total del Producto: ${Total}</b> </p>
            </div>
            </div class="col-4 d-flex w-25 align-items-center justify-content-start  border-bottom" >
                <a href="javascript:EliminaItems(${Cod},carrito)" class="btn btn-primary w-25 me-md-1 mt-2" type="button"> <b>Quitar</b> </a>                    
            </div>
        </div>
        `;
        Container.appendChild(BoxCarrito);
    });

    const Caja = document.querySelector("#TotalCarro");
    Caja.innerHTML = "Total de la compra: "+Importe;
};

function Muestra_ModIcono(NumCarrito){
    const Icono = document.querySelector("#IconoCarrito");
    Icono.innerHTML =  NumCarrito;
};

function Muestra_Checkout(){
    const Icono = document.querySelector(".Seccion-Titulo"); //cambio el titulo cuando modifico la seccion central
    Icono.innerHTML = "FINALIZAR COMPRA";    
    const Container = document.querySelector("#Seccion-Contenido")
    Container.innerHTML = "";
    let BoxCheckout = document.createElement('div');
    BoxCheckout.setAttribute('class','Seccion-Formulario');
    BoxCheckout.setAttribute('id','Finaliza');
    Dato.forEach(Dato => {
        BoxCheckout.innerHTML =`
                                <form id="FormuCheckout" method="post" href="#">
                                    <div id="DatoFactura" class="shadow-lg p-3 mb-5 bg-light rounded">
                                        <p>Datos de Facturacion</p>
                                        <i class="fa fa-user"></i>
                                        <div id="Nombre">
                                            <label>Datos Personales</label>
                                            <input id="Nombre" type="text" class="form-control mt-3 mb-3" placeholder="Nombre" value="${Dato.Nombre}" > 
                                            <label>Apellido</label>
                                            <input id="Apellido" type="text" class="form-control mt-3 mb-3" placeholder="Apellido" value="${Dato.Apellido}" >
                                            <label>Nº documento</label>
                                            <input id="Documento" type="text" class="form-control mt-3 mb-3" placeholder="Documento" value="${Dato.Documento}" >
                                        </div>
                                    </div>                
                                    <div id="DatoEnvio" class="shadow-lg p-3 mb-5 bg-light rounded">
                                        <p class="jc-left">Envio</p>
                                        <i class="fa fa-user"></i>
                                        <div id="Datos de Envio">
                                            <label>Direccion</label>
                                            <input id="Direcccion" type="text" class="form-control mt-3 mb-3" placeholder="Direcccion" value="${Dato.DirCalle}" >
                                            <label>Localidad</label>
                                            <input id="Localidad" type="text" class="form-control mt-3 mb-3" placeholder="Localidad" value="${Dato.DirLocalidad}">
                                            <label>Provincia</label>
                                            <input id="Provincia" type="text" class="form-control mt-3 mb-3" placeholder="Provincia" value="${Dato.DirProvincia}">
                                        </div>
                                    </div>
                                    <div id="DatoPago" class="shadow-lg p-3 mb-5 bg-light rounded">
                                        <p>Forma de Pago</p>
                                        <div class="d-flex justify-content-evenly">
                                            <input id="Transfer" class="Pago" type="radio" name="status"  value="transferencia"><label for="interesado">Transferencia Bancaria</label>
                                            <input id="Tarj" class="Pago" type="radio" name="status" value="credito"><label for="interesado">Tarjeta de Credito / Debito</label>
                                        </div>
                                        <div id="BoxMetodoPago" class="mt-5">

                                        </div>                
                                    </div>                                                    
                                    <div id="FinCompra">
                                        <button id="TerminaCompra" type="button" class="btn btn-primary w-25 me-md-1 mt-3" >Comprar</button>
                                        <button id="Comprar" type="button" class="btn btn-primary w-25 me-md-1 mt-3" >Cancelar</button>
                                    </div>
                                </form>
                                `;
        Container.appendChild(BoxCheckout);
    });
};

function Muestra_Credito(){
    const BoxFormaPago = document.querySelector("#BoxMetodoPago")
    BoxFormaPago.innerHTML = "";
    let BoxPago = document.createElement('div');
    BoxPago.setAttribute('id','MetodoCredito');
    BoxPago.innerHTML =`                      
                            <div class="EstiloCredito">
                                <i class="fa fa-lock"></i>
                                <p>Numero de Tarjerta</p>
                                <input name="" id="NumeroTarjeta" type="text" class="form-control" placeholder="XXXX-XXX-XXXX-XXXX" >
                                <p>Nombre del Titular</p>
                                <input name="" id="titular" type="text" class="form-control" placeholder="Nombre Titular" >
                                <div class="EstiloCredito__Reverso">
                                    <div class="EstiloCredito__Reverso--Codigo">
                                        <p>Codigo de Seguridad</p>
                                        <input name="" id="CodigoTarjeta" type="text" class="form-control" placeholder="XXX" >
                                    </div>
                                    <div class="EstiloCredito__Reverso--Vencimiento">
                                        <p>Fecha de vencimiento</p>
                                        <input name="" id="FechaCaducidad" type="text" class="form-control" placeholder="dd/mm/aaaa" >
                                    </div>	
                                </div>	
                            </div>                   
        `;
    BoxFormaPago.appendChild(BoxPago);
};

function Muestra_Tranferencia(){
    const BoxFormaPago = document.querySelector("#BoxMetodoPago")
    BoxFormaPago.innerHTML = "";
    let BoxPago = document.createElement('div');
    BoxPago.setAttribute('id','Metodotransferencia');
    BoxPago.innerHTML =`
                            <div class="Estilotranfer>
                                <i class="fa fa-lock"></i>
                                <p><b>Razon de social:</b></p>
                                <p>No Gravity S.R.L</p>
                                <p><b>Numero de Cuenta:</b></p>
                                <p>055-027307/2</p>
                                <p><b>Numero de CBU:</b></p>
                                <p>0720055780000001730722</p>
                                <p><b>Banco:</b></p>
                                <p>Santander</p>
                                <p><b>Sucursal:</b></p>
                                <p>0/33 Colegiales</p>
                            </div>              
        `;
    BoxFormaPago.appendChild(BoxPago);
};


function Muestra_Formulario(evento){

    const Container = document.querySelector("#BoxFormulario")
    let BoxFormulario = document.createElement('div');
    BoxFormulario.setAttribute('class','modal fade');
    BoxFormulario.setAttribute('id','myModal');
    BoxFormulario.innerHTML =`
                                <div class="modal-dialog modal-dialog-centered ">
                                    <div class="modal-content">
                                        <div class="modal-header">				
                                            <h4 class="modal-title">Acceso / Registro</h4>
                                            <a href="javascript:cerrar_Modal()" class="btn-close bg-info"></a>
                                        </div>
                                        <div class="modal-body">

                                            <form id="FormuLogin" method="post" href="#">
                                                <div class="form-group">
                                                    <i class="fa fa-user"></i>
                                                    <input name="usuario" id="usuario" type="text" class="form-control" placeholder="Usuario" >
                                                </div>
                                                <div class="form-group">
                                                    <i class="fa fa-lock"></i>
                                                    <input name="contrasena" id="contrasena" type="password" class="form-control" placeholder="Contrasena" >					
                                                </div>
                                                <div class="form-group pt-2">
                                                    <a href="javascript:Valida_Datos()" class="btn card__boton bg-info">Acceder</a>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <a href="#">Olvido su Contraseña?</a>
                                        </div>
                                    </div>
                                </div>    
            `;
    Container.appendChild(BoxFormulario);
    $('#myModal').modal('show'); //llamo al modal de bootstrap
};

function Modifico_IconoUsuario(Persona){
    const Icono = document.querySelector("#BoxUsuario");
    Icono.innerHTML =  "";
    let BoxLogo = document.createElement('div');
    BoxLogo.setAttribute('class','Usuario');
    BoxLogo.setAttribute('id','Logo');
    BoxLogo.setAttribute('data-value',''+Persona);
    BoxLogo.innerHTML = `
                        <div>
                            <p> ${Persona}</p>
                        </div>
                        `;
    Icono.appendChild(BoxLogo);
};


