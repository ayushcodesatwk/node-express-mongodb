# Authentication patterns are of 2 types:-
    
    Statefull authentication- are those in which username, password is managed by the server. if it is a valid login, server provides a UID, 
                            and user needs to provide this UID to the server for every request they make to the server. 
                            user can get this UID in response, in cookies, or in response headers.( mostly in headers )

    Stateless authentication- 


# bcrypt module: used to securely store password in apps.
# ejs module: used to render html on server side in node apps, we can create them in views folder.

----------------------------------------------------------------
steps I took--

first created server with express
connected with mongodb using mongoose.connect(url)
connected server using server.listen(port)
inside views folder created login and signup html page with .ejs extension.
connected ejs using app.set('view engine', 'ejs');

provided the ejs file in index.js using- app.set('express)

created route using- app.get('/', (req, res) => {
    return res.render('login');
})

used bcrypt to hash the password when new user signs in, used bcrypt.compare(pass, user.pass) which returns a boolean value, 

FEATURES--
user can signin to new account, 
user can login to existing account, bcrypt for password security
handled cases- 
          In login page- if user enters wrong password, if user not found, if user enters correct password
          In signin page- if user's password mismatch in confirm password, if user already exists in the db,

we can delete user with id


