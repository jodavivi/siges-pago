const express = require('express');
const router = express.Router();

const pagoRxBusiness        = require('../business/PagoRxBusiness');  
const pagoTxBusiness        = require('../business/PagoTxBusiness');  

module.exports = function(){

    //pago
    router.post('/', pagoTxBusiness.registrarPago); 
    router.put('/:id', pagoTxBusiness.actualizarPago); 
    router.delete('/', pagoTxBusiness.eliminarPago);  
    router.get('/', pagoRxBusiness.consultarPago); 
 
    return router;
}

