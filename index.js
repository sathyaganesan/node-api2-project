const express = require('express');

const server = express();

const port = 4000;

server.listen(port, () => {
    console.log(`server runing at http://localhost: ${port}`);
});
