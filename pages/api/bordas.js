const dbUtils = require('../../utils/db-utils');

/**
 * Retorna dados da apresentação 
 * @param {*} req 
 * @param {*} res 
 */
 export default async function handler(req, res) {
    if( req.method === 'GET' ) {
        const bordas = await dbUtils.execSQLQuery('SELECT * FROM bordas', res);

        const bordasFormatados = bordas.map((sabor) => {
            return {
                id: sabor.idBordas,
                nome: sabor.tipo,
            }
        });

        res.status(200).json(bordasFormatados);
    }
}