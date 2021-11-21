const sql = require('./sql');

module.exports.handleRequest = async function (data){
    switch(data.case){
        case "getorders":
            return await getOrders();
        case "lol2":
            break;
    }

    throw {statusCode: 400, msg: ""};
}

async function getOrders(){
    orders = await sql.query('SELECT * FROM ttxwvksu.public.orders o');
    return orders.rows;
}