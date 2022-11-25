const express = require("express");

const app = express();

app.use("/health", (req: any, res: any, next: any) => {
  console.log("Time: ", Date.now());
  next();
});

app.get("/health", (req: any, res: any) => {
  res.send("Api is healthy \n");
});

app.listen(3000, () => console.log("listening on :3000"));
