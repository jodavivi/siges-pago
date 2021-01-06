const pago  = require('../modelBd/entity/Pago');   

/**
 * @description Función que permite consultar las pagos
 * @creation David Villanueva 05/01/2021
 * @update
 */
exports.consultarPagos = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.iPedidoId !== undefined){
            oFiltroLista.where.PedidoId  = oFiltro.iPedidoId; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        }  
        oFiltroLista.where.EstadoId     = 1;  
        const consultarListaResponse = await  pago.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información de pagos'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: pago, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}