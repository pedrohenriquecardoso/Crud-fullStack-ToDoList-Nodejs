class TaskManager {

    constructor(list) {
        this.list = list
    }

    cadastrar(task) {
        this.list.push(task)

    }

    buscarTodos(list) {
        this.list = list
        return this.list
    }

    excluir(index) {
        this.list.splice(index, 1)

    }

    alterar(obj) {
        this.list.push(obj)

    }

}

export {TaskManager}