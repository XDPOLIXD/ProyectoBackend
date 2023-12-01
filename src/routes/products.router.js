const { Router } = require('express') // Importa el módulo Router de Express para manejar las rutas.
const ProductManagerFile = require('../managers/productsManagerFile') // Importa la clase ProductManagerFile que gestiona los productos.
const router = Router() // Crea una instancia de Router para definir las rutas.
const productsService = new ProductManagerFile() // Crea una instancia de ProductManagerFile para utilizar sus métodos.

// Rutas para operaciones CRUD en productos.
router
    .get('/', async (req, res) => {
        // Ruta para obtener todos los productos de forma asíncrona.
        const products = await productsService.getProducts()
        res.send({
            status: 'success',
            payload: products,
        })
    })
    .get('/:pid', async (req, res) => {
        // Ruta para obtener un producto por su ID de forma asíncrona.
        const { pid } = req.params
        const product = await productsService.getProduct(parseInt(pid))
        
        // Valida si se encontró el producto.
        if (!product) {
            return res.status(400).send({
                status: 'error',
                message: 'No se encuentra el producto',
            })
        }

        res.send({
            status: 'success',
            payload: product,
        })
    })
    .post('/', async (req, res) => {
        // Ruta para agregar un nuevo producto de forma asíncrona (cuerpo de la solicitud en req.body).
        const product = req.body
        res.send('post product ') // Aquí deberías llamar al método adecuado para agregar el producto.
    })
    .put('/:pid', async (req, res) => {
        // Ruta para actualizar un producto por su ID de forma asíncrona.
        const { pid } = req.params
        res.send('put product ' + pid) // Aquí deberías llamar al método adecuado para actualizar el producto.
    })
    .delete('/:pid', async (req, res) => {
        // Ruta para eliminar un producto por su ID de forma asíncrona.
        const { pid } = req.params
        res.send('delete product ' + pid) // Aquí deberías llamar al método adecuado para eliminar el producto.
    })

module.exports = router // Exporta el enrutador para su uso en otras partes de la aplicación.
