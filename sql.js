const { Client } = require('pg')

module.exports.query = async function(query, param = null) {
    try {
        const client = new Client({
            user: 'ttxwvksu',
            host: 'abul.db.elephantsql.com',
            database: 'ttxwvksu',
            password: 'lB1FYYY7AfT-EO-k1ZK4maLDT_nxL522',
            port: 5432,
          })
        client.connect()
        const res = await client.query(query, param);
        client.end()
        return res;
    } catch (error) {
        console.log(error)
        throw {statusCode: 500, msg: "Internal server error"};
    }
    
}