const dbUtils = require('../../../../utils/db-utils');

/**
 * Retorna dados da apresentação 
 * @param {*} req 
 * @param {*} res 
 */
 export default async function handler(req, res) {
    if( req.method === 'PUT' ) {
        const { id, status } = req.query;
        const pizza = await dbUtils.execSQLQuery(`SELECT * FROM pizzas WHERE idPizzas = ${id}`);

        if( !pizza.length ) {
            res.status(404).json({ message: 'Pizza não encontrada!' });
            return;
        }

        const statusPizza = await dbUtils.execSQLQuery(`SELECT * FROM status WHERE tipo = '${status}'`);

        if( !statusPizza.length ) {
            res.status(404).json({ message: 'Status não encontrado!' });
            return;
        }

        await dbUtils.execSQLQuery(`UPDATE pizzas SET status_id = ${statusPizza[0].idStatus} WHERE idPizzas = ${id}`);

        res.status(200).json({ message: 'Status atualizado com sucesso!' });
    }
}