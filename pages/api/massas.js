const dbUtils = require('../../utils/db-utils');

/**
 * Retorna dados da apresentação 
 * @param {*} req 
 * @param {*} res 
 */
 export default async function handler(req, res) {
    if( req.method === 'GET' ) {
        const massas = await dbUtils.execSQLQuery('SELECT * FROM massa', res);

        const massasFormatados = massas.map((sabor) => {
            return {
                id: sabor.idMassa,
                nome: sabor.tipo,
            }
        });

        return res.status(200).json(massasFormatados);
    } else {
        return res.status(405).json({ message: 'Método não permitido!' });
    }
}