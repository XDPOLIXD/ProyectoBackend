const fs = require('node:fs') // Importa el módulo 'fs' para trabajar con el sistema de archivos.

const path = './src/mockDB/Productos.json' // Ruta al archivo JSON que simula una base de datos de productos.

class ProductManagerFile {
    constructor() {
        this.path = path // Se asigna la ruta del archivo a la propiedad 'path' de la instancia.
    }

    // Método para leer el archivo de productos de forma asíncrona.
    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8') // Se lee el archivo en formato UTF-8.
            console.log(data) // Se imprime el contenido del archivo en la consola (solo con fines de depuración).
            return JSON.parse(data) // Se convierte el contenido del archivo JSON a un objeto JavaScript.
        } catch (error) {
            return [] // Si hay un error al leer el archivo, se retorna un array vacío.
        }
    }

    // Método para obtener todos los productos de forma asíncrona.
    getProducts = async () => {
        try {
            return await this.readFile() // Retorna todos los productos obtenidos del archivo.
        } catch (error) {
            return 'No hay productos' // Si hay un error al obtener los productos, se retorna un mensaje.
        }
    }

    // Método para obtener un producto por su ID de forma asíncrona.
    getProduct = async (id) => {
        try {
            const products = await this.readFile() // Se obtienen todos los productos.
            if (!products) return 'No hay productos' // Si no hay productos, se retorna un mensaje.
            return products.find(product => product.id === id) // Se busca el producto con el ID proporcionado.
        } catch (error) {
            return new Error(error) // Si hay un error, se retorna un objeto Error.
        }
    }

    // Método para agregar un nuevo producto de forma asíncrona.
    addProduct = async (newItem) => {
        try {
            let products = await this.readFile() // Se obtienen todos los productos.
            const productDb = products.find(product => product.code === newItem.code) // Se busca un producto con el mismo código.

            if (productDb) {
                return 'Se encuentra el producto' // Si se encuentra un producto con el mismo código, se retorna un mensaje.
            }

            if (products.length === 0) {
                newItem.id = 1 // Si no hay productos, se asigna el ID 1 al nuevo producto.
                products.push(newItem) // Se agrega el nuevo producto al array.
            } else {
                products = [...products, { ...newItem, id: products.length + 1 }] // Se crea un nuevo producto con un ID único y se agrega al array.
            }

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8') // Se escribe el array actualizado en el archivo.

            return 'Producto agregado' // Se retorna un mensaje de éxito.
        } catch (error) {
            return new Error(error) // Si hay un error, se retorna un objeto Error.
        }
    }

    // Método para actualizar un producto por su ID de forma asíncrona.
    async update(pid, updateToProduct) {
        let products = await this.readFile() // Se obtienen todos los productos.

        const productIndex = products.findIndex(product => pid === product.id) // Se encuentra el índice del producto con el ID proporcionado.

        if (productIndex !== -1) {
            products[productIndex] = updateToProduct // Se actualiza el producto en la posición encontrada.
        }

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8') // Se escribe el array actualizado en el archivo.

        return 'Producto actualizado' // Se retorna un mensaje de éxito.
    }
}

module.exports = ProductManagerFile // Se exporta la clase ProductManagerFile.
