const dbUtils = require('../../../../utils/db-utils');

/**
 * Retorna dados da apresentação 
 * @param {*} req 
 * @param {*} res 
 */
 export default async function handler(req, res) {
    if( req.method === 'GET' ) {
        const { id } = req.query;
        const pizza = await dbUtils.execSQLQuery(`SELECT * FROM pizzas WHERE idPizzas = ${id}`);

        if( !pizza.length ) {
            res.status(404).json({ message: 'Pizza não encontrada!' });
            return;
        }

        const sabores = await dbUtils.execSQLQuery(`SELECT * FROM pizza_sabor WHERE pizza_id = ${id}`);
        const nomesSabores = await dbUtils.execSQLQuery(`SELECT * FROM sabores WHERE idSabores IN (${sabores.map((sabor) => sabor.sabor_id).join(',')})`);
        const massa = await dbUtils.execSQLQuery(`SELECT * FROM massa WHERE idMassa = ${pizza[0].massa_id}`);
        const borda = await dbUtils.execSQLQuery(`SELECT * FROM bordas WHERE idBordas = ${pizza[0].borda_id}`);
        const status = await dbUtils.execSQLQuery(`SELECT * FROM status WHERE idStatus = ${pizza[0].status_id}`);

        const pizzaFormatada = {
            id: pizza[0].idPizzas,
            massa: massa[0].tipo,
            borda: borda[0].tipo,
            status: status[0].tipo,
            sabores: nomesSabores.map((sabor) => sabor.nomeSabor).join(', ')
        }

        res.status(200).json(pizzaFormatada);
    }
}