const sqlCon = require('./sql');

const sqlStatements = require('./sql-statements');

module.exports.handleRequest = async function (data){
    switch(data.case){
        case "getorders":
            return await getOrders();
        case "getordersbysalesman":
            return await getOrdersBySalesman(data.salesman_id);
        case "userlogin":
            return await userLogin(data.username, data.password);
        case "getproducts":
            return await getProducts();
        case "submitorder":
            return await submitOrder(data.order);
        case "getusers":
            return await getUsers();
        case "getusertypes":
            return await getUsersTypes();
        case "createuser":
            return await createUser(data.user);
        case "updateuser":
            return await updateUser(data.user);
        case "packorder":
            return await packOrder(data.id);
    }

}

async function getOrdersBySalesman(salesman_id){
    orders = await sqlCon.query(sqlStatements.getOrdersBySalesman, [salesman_id]);
    return orders.rows;
}

async function getOrders(){
    orders = await sqlCon.query(sqlStatements.getAllOrders);
    return orders.rows;
}

async function userLogin(user, pass){
    orders = await sqlCon.query(sqlStatements.userLogin, [user, pass]);
    return orders.rows[0];
}

async function getProducts(){
    orders = await sqlCon.query(sqlStatements.getAllProducts);
    return orders.rows;
}

async function submitOrder(order){
    await sqlCon.query(sqlStatements.submitOrder, [order.address, order.manager, JSON.stringify(order.products_ordered), order.salesman_id, order.store_name]);
}

async function getUsers(){
    users = await sqlCon.query(sqlStatements.getUsers, []);
    return users.rows;
}

async function getUsersTypes(){
    users = await sqlCon.query(sqlStatements.getUsersTypes, []);
    return users.rows;
}

async function createUser(user){
    await sqlCon.query(sqlStatements.createUser, [user.username, user.password, user.type_id]);
}

async function updateUser(user){
    await sqlCon.query(sqlStatements.updateUser, [user.username, user.password, user.type_id, user.id]);
}

async function packOrder(id){
    await sqlCon.query(sqlStatements.packOrder, [id]);
}





