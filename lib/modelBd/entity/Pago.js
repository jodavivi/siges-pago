const Sequelize =  require('sequelize');
const db = require('../../config/db'); 

db.createSchema("ventas").then(() => {
    // esquema para el producto
});

const Pago = db.define('pago', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING(64),
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador : Sequelize.STRING(64),
    TransaccionId       : Sequelize.STRING(64),
    PedidoId            : Sequelize.INTEGER, 
    AperturaId          : Sequelize.INTEGER, 
    FormaPagoCod        : Sequelize.STRING(16), 
    FormaPago           : Sequelize.STRING(64),
    NumReferencia       : Sequelize.STRING(16), 
    Moneda              : Sequelize.STRING(8),
    Importe             : Sequelize.FLOAT,   
    TipoCambio          : Sequelize.FLOAT 
} 
,
{
    schema: "ventas"
});

 
module.exports = Pago;