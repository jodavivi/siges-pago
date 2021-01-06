const pago = require('../modelBd/entity/Pago'); 
const utilsDao = require('./utils/utils'); 
const utilsGen = require('../utils/utils'); 
const config = require('../config/config.json');  

/**
 * @description Función que permite crear una pago
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.crearPago = async function (oParam) { 
    const oResponse = {};
    try {
        var seqPago = "'" +config.seqPago +"'";
        var seq = await utilsDao.obtenetSequencia(seqPago);
        if(seq.iCode !== 1){
            throw new Error(seq.iCode + "||" + seq.sMessage);
        }
        var oRegistro = {};
        oRegistro.Id                = parseInt(seq.oData, 10);
        oRegistro.EstadoId          = 1;
        oRegistro.UsuarioCreador    = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaCreacion     = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalCreacion  = oParam.oAuditRequest.sTerminal;

        oRegistro.PedidoId      = oParam.oData.iPedidoId;
        oRegistro.PedidoCod     = oParam.oData.sPedidoCod;
        oRegistro.AperturaId    = oParam.oData.iAperturaId;
        oRegistro.FormaPagoCod  = oParam.oData.sFormaPagoCod;
        oRegistro.FormaPago     = oParam.oData.sFormaPago;
        oRegistro.NumReferencia = oParam.oData.sNumReferencia;
        oRegistro.Moneda        = oParam.oData.sMoneda;
        oRegistro.Importe       = oParam.oData.fImporte;
        oRegistro.TipoCambio    = oParam.oData.fTipoCambio;
        const crearRegistroPromise = await pago.create(oRegistro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pago, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}


/**
 * @description Función que permite actualizar Pago 
 * @creation David Villanueva 04/01/2020
 * @update
 */
exports.actualizarPago = async function (oParam) { 
    const oResponse = {};
    try {
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        
        if(oParam.oData.iPedidoId !== undefined){
            oRegistro.PedidoId     = oParam.oData.iPedidoId; 
        }
        if(oParam.oData.sPedidoCod !== undefined){
            oRegistro.PedidoCod     = oParam.oData.sPedidoCod; 
        }
        if(oParam.oData.iAperturaId !== undefined){
            oRegistro.AperturaId     = oParam.oData.iAperturaId; 
        }
        if(oParam.oData.sFormaPagoCod !== undefined){
            oRegistro.FormaPagoCod     = oParam.oData.sFormaPagoCod; 
        }
        if(oParam.oData.sFormaPago !== undefined){
            oRegistro.FormaPago     = oParam.oData.sFormaPago; 
        }
        if(oParam.oData.sNumReferencia !== undefined){
            oRegistro.NumReferencia     = oParam.oData.sNumReferencia; 
        }
        if(oParam.oData.sMoneda !== undefined){
            oRegistro.Moneda     = oParam.oData.sMoneda; 
        }
        if(oParam.oData.fImporte !== undefined){
            oRegistro.Importe     = oParam.oData.fImporte; 
        }
        if(oParam.oData.fTipoCambio !== undefined){
            oRegistro.TipoCambio     = oParam.oData.fTipoCambio; 
        }
         
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await pago.update(oRegistro, oFiltro);

        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pago, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}

/**
 * @description Función que permite eliminar Pago 
 * @creation David Villanueva 05/01/2020
 * @update
 */
exports.eliminarPago = async function (oParam) { 
    const oResponse = {};
    try {
 
        var oRegistro = {}; 
        oRegistro.UsuarioModificador   = oParam.oAuditRequest.sUsuario;
        oRegistro.FechaModificacion    = new Date(oParam.oAuditRequest.dFecha);
        oRegistro.TerminalModificador  = oParam.oAuditRequest.sTerminal;
        oRegistro.EstadoId             = 0;
        var oFiltro      = {};
        oFiltro.where    = {};
        oFiltro.where.Id = oParam.oData.iId;
        const acrualizarRegistroPromise = await pago.update(oRegistro, oFiltro);
        oResponse.iCode     = 1;
        oResponse.sMessage  = 'OK';
        oResponse.oData     = oRegistro;
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pago, error: '+ e.message;
        oResponse.oData     = oParam;
    }  
     
    return oResponse;
}