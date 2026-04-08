const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysecretkey";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "No token, access denied" });
  }

  try {
    const actualToken = token.split(" ")[1];
    const verified = jwt.verify(actualToken, SECRET_KEY);

    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
