# Burger Queen (API Client)
Proyecto creado según las necesidades de una empresa, bajo las tecnologías de React, React Router y hooks, React testing library. se puede ingrsar al 
sistema:

* Administrador:  grace.hopper@systers.xyz contraseña: 123456
* Mesero: alan@falso.com contraseña: 123456
* Cocinero: maria@falso.com contraseña: 123456

***

### Definición del producto
Un pequeño restaurante de hamburguesas, que está creciendo, necesita un sistema a través del cual puedan tomar pedidos usando una tablet, 
y enviarlos a la cocina para que se preparen ordenada y eficientemente.
Este proyecto tiene dos áreas: interfaz (cliente) y API (servidor). Nuestra clienta nos ha solicitado desarrollar la interfaz que se 
integre con una API. La interfaz debe mostrar los dos menús (desayuno y resto del día), cada uno con todos sus productos. La usuaria debe 
poder ir eligiendo qué productos agregar y la interfaz debe ir mostrando el resumen del pedido con el costo total. Además la clienta nos 
ha dado un link a la documentación que especifica el comportamiento esperado de la API HTTP que deberás consumir. Ahí puedes encontrar todos 
los detalles de los endpoints, como por ejemplo qué parámetros esperan, qué deben responder, etc.

El Product Owner nos presenta este backlog que es el resultado de su trabajo con el clientx hasta hoy.

### [Historia de usuario 1] Mesero/a debe poder ingresar al sistema, si el admin ya le ha asignado credenciales
Yo como meserx quiero poder ingresar al sistema de pedidos.

Acceder a una pantalla de login. 
Ingresar email y contraseña.
Recibir mensajes de error comprensibles, dependiendo de cuál es el error con la información ingresada.
Ingresar al sistema de pedidos si las crendenciales son correctas.

### [Historia de usuario 2] Mesero/a debe poder tomar pedido de cliente/a
Yo como meserx quiero tomar el pedido de unx clientx para no depender de mi mala memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y que se puedan ir preparando en orden.

Anotar nombre de clientx.
Agregar productos al pedido.
Eliminar productos.
Ver resumen y el total de la compra.
Enviar pedido a cocina (guardar en alguna base de datos).

### [Historia de usuario 3] Jefe de cocina debe ver los pedidos
Yo como jefx de cocina quiero ver los pedidos de lxs clientxs en orden y marcar cuáles están listos para saber qué se debe cocinar y avisar a lxs meserxs que un pedido está listo para servirlo a un clientx.

Ver los pedidos ordenados según se van haciendo.
Marcar los pedidos que se han preparado y están listos para servirse.
Ver el tiempo que tomó prepara el pedido desde que llegó hasta que se marcó como completado.

### [Historia de usuario 4] Meserx debe ver pedidos listos para servir
Yo como meserx quiero ver los pedidos que están preparados para entregarlos rápidamente a lxs clientxs que las hicieron.

Ver listado de pedido listos para servir.
Marcar pedidos que han sido entregados.

### [Historia de usuario 5] Administrador(a) de tienda debe administrar a sus trabajadorxs
Yo como administrador(a) de tienda quiero gestionar a los usuarios de la plataforma para mantener actualizado la informacion de mis trabajadorxs.

Ver listado de trabajadorxs.
Agregar trabajadorxs.
Eliminar trabajadoxs.
Actualizar datos de trabajadorxs.

### [Historia de usuario 6] Administrador(a) de tienda debe administrar a sus productos
Yo como administrador(a) de tienda quiero gestionar los productos para mantener actualizado el menú.

Ver listado de productos.
Agregar productos.
Eliminar productos.
Actualizar datos de productos.
