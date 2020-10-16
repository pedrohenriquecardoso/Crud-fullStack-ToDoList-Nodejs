const express = require("express");
const Task = require("../models/task");
const router = express.Router();

router.get("/done", async (req, res) => {
  await Task.find({
    done: true
  }, (err, arrDone = []) => {
    if (err) res.send("ERRO PARA BUSCAR");
    res.json(arrDone);
  });
});

router.get("/undone", async (req, res) => {
  await Task.find({
    done: false
  }, (err, arrUndone = []) => {
    if (err) res.send("ERRO PARA BUSCAR");
    res.json(arrUndone);
  });
});

router.get("/all", async (req, res) => {
  await Task.find((err, all = []) => {
    if (err) res.send("ERRO PARA BUSCAR");
    res.json(all);
  });
});

router.post("/", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((savedTask) => res.json(savedTask))
    .catch(() => res.send("ERRO AO CADASTRAR"));
});

router.put("/:id", (req, res) => {
  console.log("ID:" + req.params.id);
  console.log("BODY:" + JSON.stringify(req.body));
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.send("ATUALIZADO COM SUCESSO"))
    .catch(() => res.send("ERRO AO ATUALIZAR"));
});

router.delete("/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.send("REMOVIDO COM SUCESSO"))
    .catch(() => res.send("ERRO AO REMOVER"));
});

module.exports = router;