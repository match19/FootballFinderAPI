module.exports.getFields = `SELECT * FROM fields;`

module.exports.getEvents = `SELECT * FROM events;`

module.exports.getEventsToday = `SELECT * FROM events WHERE DATE(start_time) = DATE(NOW())` 

module.exports.getEventsOnField = `SELECT * FROM events WHERE field = $1` 

module.exports.newEvent = `INSERT INTO events (field, max_participants, owner, description, start_time, end_time)
VALUES($1,$2,$3,$4,$5,$6) RETURNING id;` 

module.exports.newUser = `INSERT INTO users (username, password) VALUES($1, $2) RETURNING id, username, password;`

module.exports.userLogin = `SELECT id, username, password 
                                FROM users WHERE username = $1;`