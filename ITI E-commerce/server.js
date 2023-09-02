require("./db");
const express = require("express");
const dotenv = require("dotenv");
const homeRouter = require("./Routes/home-router");
const userRouter = require("./Routes/user-router");
const adminRouter = require("./Routes/admin-router");

const app = express();
const port = 3000;

app.use(express.json());

dotenv.config()
app.use("/", homeRouter);
app.use(["/users", "/user"], userRouter);
app.use("/admin", adminRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// user token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjE5NjNkMmUwM2E3NzQ2ZTIxMGI4OCIsImlzQXV0aCI6dHJ1ZSwiaWF0IjoxNjkzNTU0MjcxLCJleHAiOjE2OTQxNTkwNzF9.xFZ5iXRQiOMUiUDBqOCP9_qiVWZwkBrrWo3iJIhFvjs

// admin token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjE5NjNkMmUwM2E3NzQ2ZTIxMGI4OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MzU1NDY3OSwiZXhwIjoxNjk0MTU5NDc5fQ.-4p8tRVNBupO2mph9gNg2DUHEoKNtA-upOQQKU_PVzk
