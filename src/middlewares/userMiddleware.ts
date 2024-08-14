const { jwtConfig } = require("../../mongo/config");
var jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const validator = async (req : any, res : any, next :any) => {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    let verifiedData = jwt.verify(token, jwtConfig.JWT_PRIVATE_KEY);
    req.user = verifiedData;
    next();
  } catch (err) {
    res.status(400).send({ success: false, msg: "Not Verify!", error: err });
  }
};

module.exports = {validator}