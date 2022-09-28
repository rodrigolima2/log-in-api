const app = require("./server");

const port = process.env.PORT || 3333;

app.listen(port, () =>
    console.info(`rodando em: /` + port)
);