const mongoose = require("mongoose");
// const db_url = "mongodb://localhost:27017/ITI-Project"

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ITI_Project")
  .then(() => {
    console.log("connected to db ♥");
  });
}

main();
