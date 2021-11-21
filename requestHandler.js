const sql = require('./sql');

module.exports.handleRequest = async function (data){
    switch(data.case){
        case "getorders":
            return await getOrders();
    }

}

async function getOrders(){
    orders = await sql.query('SELECT * FROM ttxwvksu.public.orders o');
    return orders.rows;
}