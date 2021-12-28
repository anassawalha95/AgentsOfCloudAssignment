const jwt = require("jsonwebtoken");
function authenticationToken(req, res, next) {
  const token = req.cookies.access;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticationToken;
