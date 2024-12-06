import jwtoken from "jsonwebtoken";

//whenever user makes any request in the home page we'll simply use this 
// function to verify if he's login
const requireAuth = (req, res, next) => {

    const token = req.cookies.jwtoken;
    console.log('line7-', token);
    
    if(token){
        jwtoken.verify(token, "chickiwikichicki", () =>{ 
        })
        next();
    }else{
      return res.status(401).redirect('/login');
    }
  
}

export default requireAuth;
