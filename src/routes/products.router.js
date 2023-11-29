const { Router } = require('express')

const router = Router()

router
    .get('/', (req, res)=>{
        res.send('get products')
    })
    .get('/:pid', (req, res)=>{
        const {pid} = req.params
        res.send('get product '+ pid)
    })

module.exports = router