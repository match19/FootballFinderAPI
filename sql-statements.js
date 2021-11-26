module.exports.getOrdersBySalesman = `SELECT id, address, manager, products_ordered, salesman_id, store_name, packed
                                        FROM public.orders WHERE salesman_id = $1 ORDER BY id ASC;`

module.exports.getAllOrders = `SELECT id, address, manager, products_ordered, salesman_id, store_name, packed
                                        FROM public.orders ORDER BY id ASC;`

module.exports.getAllOrdersBySalesman = `SELECT id, address, manager, products_ordered, salesman_id, store_name, packed
                                        FROM public.orders WHERE salesman_id = $1 ORDER BY id ASC;`

module.exports.userLogin = `SELECT id, username, password, type_id 
                                FROM public.users WHERE username = $1 AND password = $2;`

module.exports.getAllProducts = `SELECT id, name, amount 
                                FROM public.products;`

module.exports.submitOrder = `INSERT INTO public.orders (address, manager, products_ordered, salesman_id, store_name)
                            VALUES($1, $2, $3::json, $4, $5);`
module.exports.getUsers = `SELECT id, username, password, type_id, type_name FROM public.users_vw`

module.exports.getUsersTypes = `SELECT id, type_name FROM public.user_types`

module.exports.createUser = `INSERT INTO public.users (username, password, type_id) VALUES($1, $2, $3);`

module.exports.updateUser = `UPDATE public.users SET username=$1, password=$2, type_id=$3 WHERE id=$4;`

module.exports.packOrder = `UPDATE public.orders SET packed=true WHERE id=$1;`