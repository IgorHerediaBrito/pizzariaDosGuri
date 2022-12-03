const dbUtils = require('../../utils/db-utils');

/**
 * Retorna dados da apresentação 
 * @param {*} req 
 * @param {*} res 
 */
 export default async function handler(req, res) {
    if( req.method === 'GET' ) {
        const sabores = await dbUtils.execSQLQuery('SELECT * FROM sabores', res);

        const saboresFormatados = sabores.map((sabor) => {
            return {
                id: sabor.idSabores,
                nome: sabor.nomeSabor,
            }
        });

        res.status(200).json(saboresFormatados);
    }
}