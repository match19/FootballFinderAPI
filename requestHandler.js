const sqlCon = require('./sql');

const bcrypt = require('bcryptjs');
const rounds = 10;

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
            return await updateUser(data.user, data.change_pass);
        case "packorder":
            return await packOrder(data.id);
    }

}

async function getOrdersBySalesman(salesman_id){
    const orders = await sqlCon.query(sqlStatements.getOrdersBySalesman, [salesman_id]);
    return orders.rows;
}

async function getOrders(){
    const orders = await sqlCon.query(sqlStatements.getAllOrders);
    return orders.rows;
}

async function userLogin(username, password){
    const res = await sqlCon.query(sqlStatements.userLogin, [username]);
    const user = res.rows[0];

    if(user != null && bcrypt.compareSync(password, user.password)){
        return user;
    }
}

async function getProducts(){
    const orders = await sqlCon.query(sqlStatements.getAllProducts);
    return orders.rows;
}

async function submitOrder(order){
    await sqlCon.query(sqlStatements.submitOrder, [order.address, order.manager, JSON.stringify(order.products_ordered), order.salesman_id, order.store_name]);
}

async function getUsers(){
    const users = await sqlCon.query(sqlStatements.getUsers, []);
    return users.rows;
}

async function getUsersTypes(){
    const users = await sqlCon.query(sqlStatements.getUsersTypes, []);
    return users.rows;
}

async function createUser(user){
    const hash = bcrypt.hashSync(user.password, rounds);

    await sqlCon.query(sqlStatements.createUser, [user.username, hash, user.type_id]);
}

async function updateUser(user, change_pass){
    if(change_pass === true){
        const hash = bcrypt.hashSync(user.password, rounds);
        await sqlCon.query(sqlStatements.updateUser, [user.username, hash, user.type_id, user.id]);
    }else{
        await sqlCon.query(sqlStatements.updateUserNoPassword, [user.username, user.type_id, user.id]);
    }
}

async function packOrder(id){
    await sqlCon.query(sqlStatements.packOrder, [id]);
}





