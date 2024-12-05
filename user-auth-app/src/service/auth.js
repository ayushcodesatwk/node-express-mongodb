import jwt from "jsonwebtoken";
const secret = "chickiwikichicki";

const maxAge = 60 * 60;

//we'll create a token for 
function createToken(id) {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
}

export { createToken };
