import express from 'express';
import Account from '../models/account';

const router = express.Router();

router.post('/signup', (req, res) => {
  let usernameRegx = /[^a-zA-Z0-9]+$/;


  console.log("1. username check - id [" + req.body.username + "] pw[" + req.body.password + "]");

// Check Username
  if (usernameRegx.test(req.body.username)) {
    return res.status(401).json({
      error: 'BAD USERNAME',
      code: 1
    });
  }

// Check Password
console.log("2. password check - id [" + req.body.username + "] pw[" + req.body.password + "]");

  if (req.body.password.length < 8 || typeof req.body.password !== 'string') {
    return res.status(402).json({
            error: 'BAD PASSWORD',
            code: 2
    });
  }

  // check username exist
  Account.findOne({username : req.body.username}, (err, exists) => {
      if (err) {
        throw err;
      }

      if (exists) {
        return res.status(409).json({
            error: 'EXIST USERNAME`',
            code: 3
        });
      }

      let account = new Account({
        username: req.body.username,
        password: req.body.password
      });


      console.log("3. save id [" + account.username + "] pw[" + account.password + "]");
      account.password = account.generateHash(account.password);


      // SAVE USERANME AND password
      account.save(err => {
        if (err) {
          throw err;
        }

        return res.json({success: true});
      });
  });

});

/*
    ACCOUNT SIGNIN: POST /api/account/signin
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: LOGIN FAILED
*/
router.post('/signin', (req, res) => {

    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    Account.findOne({ username: req.body.username}, (err, account) => {
        if(err) throw err;

        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if(!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            username: account.username
        };

        // RETURN SUCCESS
        return res.json({
            success: true
        });
    });
});

/*
    GET CURRENT USER INFO GET /api/account/getInfo
*/
router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

/*
    LOGOUT: POST /api/account/logout
*/
router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});
export default router;
