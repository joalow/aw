/*let listaTareas = 
[
    { text: "Preparar práctica AW", tags: ["AW", "practica"] },
    { text: "Mirar fechas congreso", done: true, tags: [] },
    { text: "Ir al supermercado", tags: ["personal"] },
    { text: "Mudanza", done: false, tags: ["personal"] },
];
*/



//1ª Función getToDoTasks(tasks)
//Esta función devuelve un array con los textos de aquellas tareas de la lista de tareas tasks que no estén finalizadas.
function condicionUndone(element){ if(element.done === undefined || element.done === false) return true; }

function getToDoTasks(tasks){
    //creo un array vacio auxiliar para devolver
    let tareasFinalizadas = tasks.filter(element => condicionUndone(element));
    let tareasFinalizadasTexto = tareasFinalizadas.map(element => element.text);
    console.log(tareasFinalizadasTexto)
    return tareasFinalizadasTexto;
}

//getToDoTasks(listaTareas);





//2ª Función findByTag(tasks, tag)
//Esta función devuelve un array que contiene las tareas del array tasks que contengan, en su lista de etiquetas, la etiqueta pasada como segundo parámetro.

function findByTag(tasks,tag){
    //let tareasConTag = tasks.filter(element => (element.tags).some(element2 => element2 === tag) );
    let tareasConTag = tasks.filter(element => element.tags.includes(tag));
    console.log(tareasConTag);
    return tareasConTag;
}

//findByTag(listaTareas,"personal")




//3ª Función findByTag(tasks, tag)
//Esta función devuelve un array que contiene las tareas del array tasks que contengan, en su lista de etiquetas, la etiqueta pasada como segundo parámetro.


function findByTags(tasks,tag){
    let tareasConTag = tasks.filter(element => (element.tags).some(element2 => tag.some(elementTag => element2 === elementTag)  )  );
    
    console.log(tareasConTag);
    return tareasConTag;
}

//findByTags(listaTareas, ["personal", "AW"])





//4ª Función countDone(tasks)
//Esta función devuelve el número de tareas completadas en el array de tareas tasks pasado como parámetro.
function condicionDone(element){ if(element.done === true) return true; }

function countDone(tasks){
    //creo un array vacio auxiliar para devolver
    let tareasCompletas = tasks.filter(element => condicionDone(element));
    console.log(tareasCompletas.length)
    return tareasCompletas;
}

//countDone(listaTareas)



//5ª Función createTask(texto) 
//Esta función recibe un texto intercalado con etiquetas y lo convierte en una tarea

function createTask(texto){
	let tarea = {};
    tarea.text = texto.replace(/\@\w+/g,''); //reemplaza una palabra seguida de un '@' por ''(nada)
    tarea.text = tarea.text.replace(/ +/g,' '); //reemplaza muchos espacios juntos por 1 solo para dejar espacio palabra espacio palabra espacio palabra...
    tarea.text = tarea.text.trim(); //quita espacios por delante y por detras para quitar espacio palabra espacio en palabra
    tarea.tags = texto.match(/\@\w+/g); //las palabras seguidas por un '@' son guardadas en 'tags'
    tarea.tags = (tarea.tags).map(elemento => elemento.replace(/\@/,''));
	return tarea;
}

//console.log(createTask("Ir al medico @personal @salud"));
//console.log(createTask("@AW           Preparar   @practica              práctica AW               "));