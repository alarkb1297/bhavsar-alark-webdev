var app = require("../../express");
var userModel = require("../model/user/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);
var googleConfig = {
    clientID     : "482063836315-k8e1hh65v10klcm0sp2288bcu7h8cefg.apps.googleusercontent.com",
    clientSecret : "q-KDENx4uuyTO7-CrEO_hPVF",
    callbackURL  : "/auth/google/callback"
};
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

//html handlers
app.get("/api/user", findUser);
app.post("/api/login", passport.authenticate('local'), login);
app.post("/api/user", registerUser);
app.put("/api/user/:userID", updateUser);
app.delete("/api/user/:userID", deleteUser);
app.get("/api/users/:userID", findUserById); //path parameter
app.post("/api/logout", logout);
app.get("/api/checkLogin", checkLogin);
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function authorized(req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};

function login(req, response) {
    var user = req.user;
    response.json(user);
}

function localStrategy(username, password, done) {
    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            if (!user) {
                return done(null, false);
            }

            return done(null, user);

        }, function (err) {
            if (err) {
                return done(err);
            }
        });
}

function findUserById(req, response) {

    userModel
        .findUserById(req.params.userID)
        .then(function (user) {
            response.json(user);
            return;
        })
}
function findUser(req, response) {

    var body = req.body;

    var username = req.query.username;
    var password = req.query.password;


    if (username && password) {

        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.send("0");
                return;
            });

        return;

    } else if (username) {

        userModel.findUserByUsername(username)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.send("0");
                return;
            });

        return;
    }

}

function registerUser(req, response) {

    var user = req.body;

    userModel
        .createUser(user)
        .then(function (user) {
            response.json(user);
            return;
        })

}

function updateUser(req, response) {

    var userID = req.params.userID;
    var user = req.body;

    userModel
        .updateUser(userID, user)
        .then(function (status) {
            response.json(status);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function deleteUser(req, response) {

    var userID = req.params.userID;

    req.logout();

    userModel
        .deleteUser(userID)
        .then(function (status) {
            response.json(status);
            return;
        }, function (err) {
            response.sendStatus(404).send(err);
            return;
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}



