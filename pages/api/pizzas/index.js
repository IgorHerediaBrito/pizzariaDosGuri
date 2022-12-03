const dbUtils = require('../../../utils/db-utils');

/**
 * Retorna dados da apresentação 
 * @param {*} req 
 * @param {*} res 
 */
 export default async function handler(req, res) {
    if( req.method === 'POST' ) {
        const { pizza } = req.body;

        const { massa, borda, sabores } = pizza;

        const getUltimoId = await dbUtils.execSQLQuery('SELECT MAX(idPizzas) AS idPizzas FROM pizzas');

        const idPizzas = getUltimoId[0].idPizzas + 1;

        //insere a pizza
        const pizzaInserida = await dbUtils.execSQLQuery(`INSERT INTO pizzas (idPizzas, borda_id, massa_id, status_id) VALUES (${idPizzas}, ${borda}, ${massa}, 1)`);

        //insere os sabores
        sabores.forEach(async (sabor) => {
            await dbUtils.execSQLQuery(`INSERT INTO pizza_sabor (pizza_id, sabor_id) VALUES (${idPizzas}, ${sabor})`);
        });

        return res.status(200).json({
            id: idPizzas
        });
    } else if ( req.method === 'GET' ) {
        const pizzas = await dbUtils.execSQLQuery('SELECT * FROM pizzas', res);

        const pizzasFormatadas = [];

        for( let i = 0; i < pizzas.length; i++ ) {
            const pizza = pizzas[i];
            const sabores = await dbUtils.execSQLQuery(`SELECT * FROM pizza_sabor WHERE pizza_id = ${pizza.idPizzas}`);

            const nomesSabores = await dbUtils.execSQLQuery(`SELECT * FROM sabores WHERE idSabores IN (${sabores.map((sabor) => sabor.sabor_id).join(',')})`);
            const massa = await dbUtils.execSQLQuery(`SELECT * FROM massa WHERE idMassa = ${pizza.massa_id}`);
            const borda = await dbUtils.execSQLQuery(`SELECT * FROM bordas WHERE idBordas = ${pizza.borda_id}`);
            const status = await dbUtils.execSQLQuery(`SELECT * FROM status WHERE idStatus = ${pizza.status_id}`);

            pizzasFormatadas.push({
                id: pizza.idPizzas,
                massa: massa[0].tipo,
                borda: borda[0].tipo,
                status: status[0].tipo,
                sabores: nomesSabores.map((sabor) => sabor.nomeSabor).join(', ')
            })
        }

        return res.status(200).json(pizzasFormatadas);
    } else {
        return res.status(405).json({ message: 'Método não permitido!' });
    }
}