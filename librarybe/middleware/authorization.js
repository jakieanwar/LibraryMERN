const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ status: "Access Denied", message: "Token missing" });

  try {
    const tokenPayload = jwt.verify(token, process.env.JWT_PK);
    req.user = tokenPayload;
    next();
  } catch (e) {
    res.status(400).json({ status: "Access Denied", message: "Invalid Token" });
  }
}

module.exports = authorization;
