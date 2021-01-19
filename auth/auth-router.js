const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

const Users = require("../users/users-model.js");

router.post("/register", authReg, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  const token = genToken(user);

  Users.add(user)
    .then((saved) => {
      res.status(201).json({
        message: "User saved",
        saved,
        token: token
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.post("/login", authLogin, (req, res) => {
  let { email, password } = req.body;

  Users.findBy({
    email,
  })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);
        res.status(200).json({
          message: "Welcome!",
          user: {
            userid: user.id,
            email: user.email,
            token: token,
          },
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

function genToken(user) {
  const payload = {
    userid: user.id,
    email: user.email,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}

function authReg(req, res, next) {
  const { email, password } = req.body;
  email && typeof email == "string"
    ? password && typeof password == "string"
      ? next()
      : res.status(400).json({ message: "Missing password" })
    : res.status(400).json({ message: "request is missing email" });
}

function authLogin(req, res, next) {
  const { email, password } = req.body;

  email && typeof email == "string"
    ? password && typeof password == "string"
      ? next()
      : res.status(400).json({
          message: "Missing password, or password is not a string",
        })
    : res.status(400).json({
        message: " Request is missing email or email is not a string.",
      });
}

function dupeEmailCheck(req, res, next) {
    const { email } = req.body;
    Users.findBy({ email })
      .then((user) => {
        if (user) {
          res.status(409).json({ message: "Username already in use" });
        } else {
          next();
        }
      })
      .catch((err) => {
        res
          .status(500)
          .json({ message: "Error checking for duplicate username" });
      });
  }


module.exports = router;
