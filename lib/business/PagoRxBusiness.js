const pagoRxDao = require('../dao/PagoRxDao'); 
const utils 	  = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar Pago
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.consultarPago = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroPago = {};
		 oFiltroPago.iPeriodoId  	= req.query.iPeriodoId;
		 oFiltroPago.iId 	  		= req.query.iId; 
		 var consultarPagoResponse =  await pagoRxDao.consultarPagos(oFiltroPago);
		 if(consultarPagoResponse.iCode !== 1){
			throw new Error(consultarPagoResponse.iCode + "||" + consultarPagoResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarPagoResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 