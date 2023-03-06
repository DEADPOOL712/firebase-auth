const express = require("express");
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");
app.use(express.json());
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const auth = admin.auth();

app.post("/signup", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(user);
  auth
    .createUser({
      email: user.email,
      password: user.password,
      emailVerified: false,
    })
    .then((UserRecord) => {
      console.log(UserRecord);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Successfully added");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is live ! on port ${PORT}`);
});
