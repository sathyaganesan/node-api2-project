const express = require('express');
const postRouter = require("./data/user/usersPosts");

const server = express();

const port = 4000;

server.use(express.json());
server.use(postRouter);

server.get('/', (req, res) => {
    res.json({
        message: "Welcome to Express Routing"
    })
})

server.listen(port, () => {
    console.log(`server runing at http://localhost: ${port}`);
});
