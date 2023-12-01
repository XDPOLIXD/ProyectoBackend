const fs = require('node:fs') // Se importa el módulo 'fs' para trabajar con el sistema de archivos.

class CartsManagerFile {
    constructor() {
        this.path = './src/mockDB/Carts.json' // Ruta al archivo JSON que simula una base de datos de carritos.
    }

    // Método para leer el archivo de carritos de forma asíncrona.
    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8') // Se lee el archivo en formato UTF-8.
            console.log(data) // Se imprime el contenido del archivo en la consola (solo con fines de depuración).
            return JSON.parse(data) // Se convierte el contenido del archivo JSON a un objeto JavaScript.
        } catch (error) {
            return [] // Si hay un error al leer el archivo, se retorna un array vacío.
        }
    }

    // Método para obtener un carrito por su ID de forma asíncrona.
    getCartById = async (cid) => {
        const carts = await this.readFile() // Se obtienen todos los carritos.
        const cart = carts.find(cart => cart.id === cid) // Se busca el carrito con el ID proporcionado.
        if (!cart) {
            return 'No se encuentra el carrito' // Si no se encuentra el carrito, se retorna un mensaje.
        }

        return cart // Se retorna el carrito encontrado.
    }
    
    // Método para crear un nuevo carrito de forma asíncrona.
    createCart = async () => {
        const carts = await this.readFile() // Se obtienen todos los carritos.
        let newCart
        if (carts.length === 0) {
            newCart = { id: 1, products: [] } // Si no hay carritos, se crea uno con ID 1.
        } else {
            newCart = { id: carts.length + 1, products: [] } // Se crea un carrito con un ID único.
        }
        carts.push(newCart) // Se agrega el nuevo carrito al array.
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8') // Se escribe el array actualizado en el archivo.

        return results // Se retorna el resultado de la operación de escritura en el archivo.
    }

    // Método para agregar un producto a un carrito de forma asíncrona.
    addProductToCart = async (cid, pid) => {
        const carts = await this.readFile() // Se obtienen todos los carritos.
        const cartIndex = carts.findIndex(cart => cart.id === cid) // Se encuentra el índice del carrito con el ID proporcionado.
        if (cartIndex === -1) {
            return 'No se encuentra el carrito' // Si no se encuentra el carrito, se retorna un mensaje.
        }
        carts[cartIndex].products = { productId: pid } // Se agrega el producto al carrito.
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8') // Se escribe el array actualizado en el archivo.

        return results // Se retorna el resultado de la operación de escritura en el archivo.
    }
}

module.exports = CartsManagerFile // Se exporta la clase CartsManagerFile.
