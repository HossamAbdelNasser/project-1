const express = require('express');
const router = express.Router();

router
.get('/', (req, res)=> {
    res.render('users')
})

.get('/:id', (req, res)=>{
    res.send(`User Get Id ${req.params.id}`)
})

.delete('/:id', (req, res)=>{
    res.send(`Delete user with id ${req.params.id}`)
})

module.exports = router