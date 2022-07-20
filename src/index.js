const app = require("./server");

app.listen(process.env.PORT || 3333, () =>
    console.log(`Running http://localhost:${process.env.PORT}`)
);