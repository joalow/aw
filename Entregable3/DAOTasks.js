"use strict";

class DAOTasks {
    constructor(pool) {
        console.log(pool)
        this.pool = pool;
    }

    getAllTasks(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query("SELECT * FROM task WHERE user = ?", [email],
                    function(err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(new Error("No existe el usuario con el mail proporcionado")); //no está el usuario con el mail proporcionado
                            } else {
                                //Creamos un objeto task que tenga un id, text, array de tags y done.
                                let task = {
                                    id: 0,
                                    text: '',
                                    tags: [],
                                    done: 0
                                };
                                //Rellenamos task con  con las filas devueltas de la query
                                let arrayTasks = [];
                                for (let index = 0; index < rows.length; index++) {
                                    task.id = rows[index].id;
                                    task.text = rows[index].text;
                                    task.done = rows[index].done;
                                    for (let index2 = 0; index2 < rows.tags.length; index2++) {
                                        tasks.tags.push(rows.tags[index2]);
                                    }
                                    //lo metemos en un array
                                    arrayTasks.push(task)

                                }
                            }
                        }
                    });
            }
        });
    }

    insertTask(email, task, callback) {
        debugger
        console.log(email + ":::" + task + '::::' + callback)
        this.pool.getConnection(function(err, connection) {
            if (err) callback(new Error('Error de conexion a la base de datos '));
            else {
                connection.query("INSERT INTO task(user, text, done) VALUES (?, ?, ?)", [task.user, task.text, task.done],
                    function(err, result) {
                        connection.release();
                        if (err) callback(new Error("Error de acceso a la base de datos"));
                        else {
                            let values = [];
                            for (let i = 0; i < task.tags.length; i++) {
                                values[i] = {
                                    taskId: result.insertId,
                                    tag: task.tags[i]
                                };
                            }
                            connection.query("INSERT INTO tag(taskId, tag) VALUES ?", [values],
                                function(err) {
                                    if (err) callback(new Error('Error al insertar los tags'));
                                    else callback(null);
                                });
                        }
                    });
            }
        });
    }

    markTaskDone(idTask, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) callback(new Error('Error de conexion a la base de datos '));
            else {
                connection.query("UPDATE task SET done = 1 WHERE id = ?", [idTask],
                    function(err, result) {
                        connection.release();
                        if (err) callback(new Error("Error de acceso a la base de datos"));
                        else callback(null);
                    });
            }
        });
    }

    deleteCompleted(email, callback) {
        this.pool.getConnection(function(err, connection) {
            if (err) callback(new Error('Error de conexion a la base de datos '));
            else {
                connection.query("DELETE FROM task WHERE user = ? AND done = 1", [email],
                    function(err, result) {
                        connection.release();
                        if (err) callback(new Error("Error de acceso a la base de datos"));
                        else callback(null);
                    });
            }
        });
    }

}
module.exports = DAOTasks;