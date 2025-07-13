const jwt = require("jsonwebtoken");

const JWT_SECRET = "Akash_Akash_123";

const validateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("akash ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized : No Token Provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log({ decoded });
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Invalid Token authorization failed!" });
  }
};

module.exports = validateJWT;
