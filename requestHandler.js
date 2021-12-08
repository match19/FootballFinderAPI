const sqlCon = require('./sql');

const bcrypt = require('bcryptjs');
const rounds = 10;

const sqlStatements = require('./sql-statements');

module.exports.handleRequest = async function (data){
    switch(data.case){
        case "getfields":
            return await getFields();
        case "getevents":
            return await getEvents();
        case "geteventstoday":
            return await getEventsToday();
        case "geteventsonfieldtoday":
            return await getEventsOnFieldToday(data.field_id);
        case "newevent":
            return await newEvent(data.field_id, data.max_particpants, data.owner, data.desc, data.start, data.end);
        case "newuser":
            return await newUser(data.username, data.password);
        case "userlogin":
            return await userLogin(data.username, data.password);
    }

}

async function getFields(){
    const fields = await sqlCon.query(sqlStatements.getFields);
    return fields.rows;
}

async function getEvents(){
    const events = await sqlCon.query(sqlStatements.getEvents);
    return events.rows;
}

async function getEventsToday(){
    const events = await sqlCon.query(sqlStatements.getEventsToday);
    return events.rows;
}

async function getEventsOnFieldToday(field_id){
    if(!field_id){
        throw {statusCode: 400, msg: "Bad request"};
    }
    const events = await sqlCon.query(sqlStatements.getEventsOnField, [field_id]);
    return events.rows;
}

async function newEvent(field_id, max_particpants, owner, desc, start, end){
    if(!field_id || !max_particpants || !owner || !desc || !start || !end){
        throw {statusCode: 400, msg: "Bad request"};
    }
    const event = await sqlCon.query(sqlStatements.newEvent, [field_id, max_particpants, owner, desc, start, end]);
    return {eventId: event.rows[0].id};
}

async function newUser(username, password){
    if(!username || !password){
        throw {statusCode: 400, msg: "Bad request"};
    }
    const hash = bcrypt.hashSync(password, rounds);
    try {
        const user = await sqlCon.query(sqlStatements.newUser, [username, hash]);
        return {user: user.rows[0]};
    } catch (error) {
        if(error.error.routine === "_bt_check_unique"){
            throw {statusCode: 409, msg: "Username is already taken"};
        }else{
            throw error;
        }
    }
    
}

async function userLogin(username, password){
    if(!username || !password){
        throw {statusCode: 401, msg: "Invalid login"};
    }
    const res = await sqlCon.query(sqlStatements.userLogin, [username]);
    const user = res.rows[0];

    if(user != null && bcrypt.compareSync(password, user.password)){
        return {user: user};
    }else{
        throw {statusCode: 401, msg: "Invalid login"};
    }

}

