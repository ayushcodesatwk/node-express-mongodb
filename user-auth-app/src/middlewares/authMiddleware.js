import jwt from "jsonwebtoken";

//next method to move on further
const requireAuth = (req, res, next) => {
  //get the token from cookies;
  const token = req.cookies.jwtoken;
  const secret = "chickiwikichicki";

  //check if jwt exists & it is verified
  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);

        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    return res.status(401).redirect("/login");
  }
};

export default requireAuth;
