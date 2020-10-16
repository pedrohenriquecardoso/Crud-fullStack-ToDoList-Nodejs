const mongoose = require("mongoose");

const task = mongoose.model("task", {
    title: String,
    desc: String,
    done: Boolean
});

module.exports = task;