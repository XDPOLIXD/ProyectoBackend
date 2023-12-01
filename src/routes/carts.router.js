const { Router } = require('express') // Importa el módulo Router de Express para manejar las rutas.
const CartsManagerFile = require('../managers/cartsManager') // Importa la clase CartsManagerFile que gestiona los carritos.
const cartsService = new CartsManagerFile() // Crea una instancia de CartsManagerFile para utilizar sus métodos.
const router = Router() // Crea una instancia de Router para definir las rutas.

// Ruta para obtener un carrito por su ID de forma asíncrona.
router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params // Obtiene el ID del carrito de los parámetros de la solicitud.
        const cart = await cartsService.getCartById(parseInt(cid)) // Obtiene el carrito utilizando el servicio de gestión de carritos.

        // Valida si se encontró el carrito.
        res.send({
            status: 'success',
            payload: cart,
        })
    } catch (error) {
        console.log(error) // Imprime cualquier error en la consola (puedes considerar manejar los errores de manera más robusta).
    }
});

module.exports = router // Exporta el enrutador para su uso en otras partes de la aplicación.

// Async/Await es una sintaxis que permite trabajar con promesas de manera más legible y similar al estilo síncrono.
// Se utiliza para manejar funciones asíncronas y esperar que las promesas se resuelvan antes de continuar la ejecución del código.
