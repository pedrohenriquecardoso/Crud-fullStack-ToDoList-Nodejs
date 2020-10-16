class TaskAPI {

    constructor() {
        this.hostAPI = "http://localhost:3000/task/"

    }


    async salvar(task) {

        let res = await fetch(this.hostAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        })

        return await res.json()
        

    }

    put(id, index, task) {
        fetch("http://localhost:3000/task/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task)
        }).then(async (res) => {
            alert("Alterado com sucesso")

        })
        window.location.reload()


    }

    delete(id, index) {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch("http://localhost:3000/task/" + id, options)
            .then(res => {
                if (res.ok) {
                    return Promise.resolve('User deleted.');
                } else {
                    return Promise.reject('An error occurred.');
                }
            })
            .then(res => console.log(res));
        window.location.reload()


    }

    async getAll() {
        let res = await fetch(this.hostAPI + "/all");
        let json = await res.json()
        return json;
    }

    doneTask(objId, index, objDone) {
        fetch("http://localhost:3000/task/" + objId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                done: !objId
            }), 
        })
            .then((res) => {
                

                ele = document.getElementById("d" + index);
                if (objDone != true) {
                    ele.classList.add("done");
                    ele.classList.remove("undone");
                } else {
                    ele.classList.add("undone");
                    ele.classList.remove("done");
                }
            })
            .catch((err) => {
                console.log("Não foi possivel alterar. ERRO:" + err);
            });

    }
}

export {TaskAPI}