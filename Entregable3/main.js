"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks

// /*** DAO USERS ***/
// daoUser.isUserCorrect()
// daoUser.getUserImageName()

// /*** DAO TASKS **/
// daoTask.insertTask()
// daoTask.getAllTasks()
// daoTask.markTaskDone()
// daoTask.deleteCompleted()



// daoUsers.isUserCorrect("usuario@ucm.es", "mipass", cb_isUserCorrect);

// function cb_isUserCorrect(err, result) {
//     if (err) console.log(err.message);
//     else if (result) {
//         console.log("Usuario y contraseña correctos");
//         daoUsers.getUserImageName("usuario@ucm.es", cb_getUserImageName);
//     } else console.log("Usuario y/o contraseña incorrectos");
// }

// function cb_getUserImageName(err, result) {
//     if (err) console.log(err.message);
//     else console.log(result);
// }

// daoTasks.getAllTasks("usuario@ucm.es", cb_getAllTask);

// function cb_getAllTask(err, result) {
//     if (err) console.log(err.message);
//     else console.log(result);
// }

let task = {
    user: "usuario@ucm.es",
    text: "Nueva tarea",
    tags: ["practica", "personal"],
    done: 0
};

function cb_insertTask(err) {
    if (err) console.log(err.message);
    else console.log("Tarea agregada");
}


daoTask.insertTask("usuario@ucm.es", task, cb_insertTask);

// daoTasks.markTaskDone(31, cb_markTaskDone);

// function cb_markTaskDone(err) {
//     if (err) console.log(err.message);
//     else console.log("Tarea completada marcada");
// }

// daoTasks.deleteCompleted("usuario@ucm.es", cb_deleteCompleted);

// function cb_deleteCompleted(err) {
//     if (err) console.log(err.message);
//     else console.log("Tareas completadas eliminadas");
// }