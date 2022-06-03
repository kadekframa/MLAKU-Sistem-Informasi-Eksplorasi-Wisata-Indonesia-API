const express = require("express");
const PORT = 4000;

const app = express();

app.use(() => {
  console.info(`Server telah berjalan di port: ${PORT} !`);
})

app.listen(PORT);