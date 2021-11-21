const { Client } = require('pg')
const client = new Client({
    user: 'ttxwvksu',
    host: 'abul.db.elephantsql.com',
    database: 'ttxwvksu',
    password: 'lB1FYYY7AfT-EO-k1ZK4maLDT_nxL522',
    port: 5432,
  })
client.connect()

module.exports.query = async function(query, param = null) {
    try {
        const res = await client.query(query, param);
        return res;
    } catch (error) {
        throw {statusCode: 500, msg: "Internal server error"};
    }
    
}
