const express = require('express');
const userRouter = require("./data/user/usersPosts");

const server = express();

const port = 4000;

server.use(express.json());
server.use(userRouter);

server.get('/', (req, res) => {
    res.json({
        message: "Welcome to Express Routing"
    })
})

server.listen(port, () => {
    console.log(`server runing at http://localhost: ${port}`);
});
