var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});



// passport.use(new LocalStrategy(
//   //sails.log.debug();
//   function(email, password, done){
//     sails.log.debug();
//     if (username === "admin" && password === "papayo"){
//       return done(null, returnUser, {
//              message: 'Logged In Successfully'
//            });
//     }
//     return done(null, false, { message: 'Invalid password.' });
//   }
// ));

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    var defaultEmail = "admin";
    var defaultPassword = "papayo";

    //sails.log("In passport.use() "+email+" "+password);

    User.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      // if (!user) {
      //   return done(null, false, { message: 'Incorrect email.' });
      // }
      if (email === defaultEmail && password === defaultPassword ){
        var returnUser = {
                email: email,
                createdAt: "IN THE SUMMER MOTHERFUCKER",
             id: 1
              };
            //return req.redirect('/post');
              return done(null, returnUser, {
                message: 'Logged In Successfully'
              });

            } else {
               return done(null, false, {
              message: 'Invalid username or password'
            });
            }
        });
    })
  
);

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//   },
//   function(email, password, done) {

//     User.findOne({ email: email }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect email.' });
//       }

//       bcrypt.compare(password, user.password, function (err, res) {
//           if (!res)
//             return done(null, false, {
//               message: 'Invalid Password'
//             });
//           var returnUser = {
//             email: user.email,
//             createdAt: user.createdAt,
//             id: user.id
//           };
//           return done(null, returnUser, {
//             message: 'Logged In Successfully'
//           });
//         });
//     });
//   }
// ));