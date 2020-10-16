import {TaskManager} from "./task-manager.js"
import {TaskAPI} from "./task-api.js"
import {Task} from "./task.js"

class TaskDOM {

    constructor() {
        this.idAlterar = "";
        this.indexAlterar = -1
        this.taskAPI = new TaskAPI()
        this.taskManager = new TaskManager()
    }

    formToObject() {
        let title = document.getElementById("title").value
        let desc = document.getElementById("desc").value

        return new Task(undefined, title, desc, false)

    }

    async aoClicarNoSalvar() {
        let task = this.formToObject()

        if (this.idAlterar == "") {
            this.taskAPI.salvar(task).then((json) => console.log(json))

            this.taskManager.cadastrar(task)
            this.renderizarLista(list)

        } else {
            let id = this.idAlterar
            let index = this.indexAlterar
            this.taskAPI.put(id, index, task)

        }



    }

    aoClicarNoExcluir(id, index) {
        this.taskAPI.delete(id, index)


    }

    aoClicarNoEditar(id, index) {

        let obj = this.taskManager.list[index];

        document.getElementById("title").value = obj.title
        document.getElementById("desc").value = obj.desc

        this.idAlterar = obj._id
        this.indexAlterar = index

        this.taskManager.alterar(obj)

        /* this.taskAPI.put(obj._id, obj) */

    }

    aoClicarNaTask(index) {
        let objId = this.taskManager.list[index]._id;

        let objDone = this.taskManager.list[index].done;

        this.taskAPI.doneTask(objId, index, objDone)

    }

    aoCarregarTela() {

        //Instanciando um manager
        let taskManager;

        //Consumindo as Task e passando pro Manager
        this.taskAPI.getAll().then((list) => {
            taskManager = new TaskManager(list);
            this.renderizarLista(taskManager.list)
            this.taskManager.buscarTodos(taskManager.list)
        })

    }

    renderizarLista(list) {

        //monta a tela
        let html = "";
        list.forEach((element, index) => {
            let classDone = element.done ? "done" : "undone";

            html += `<li class="list-group-item">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div id="d${index}" class="${classDone}" onclick="taskDOM.aoClicarNaTask(${index})">
                                        ${element.title} (${element.desc})
                                    </div>
                                </div>
                                <div class="col text-right ">
                                    <div class="btn" onclick="taskDOM.aoClicarNoExcluir('${element._id}', ${index} )">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash " fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd"
                                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </div>
                                    <div class="btn" onclick="taskDOM.aoClicarNoEditar('${element._id}', ${index} )">
                                        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </container>
                    </li>`;
        });

        document.querySelector(".list-group").innerHTML = html;
    }

}

export {TaskDOM}