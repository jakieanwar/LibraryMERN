function admin(req, res, next) {
  if (req.user.role != "admin")
    return res
      .status(403)
      .json({ status: "Unauthorized", message: "Access Denied" });
  next();
}

module.exports = admin;
