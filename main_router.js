const express               = require('express');
const router                = express.Router();
const bodyParser            = require('body-parser');
const controller            = require('./controller.js')

// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 

// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// SESSION STARTER
router.get('/', controller.startSession);
router.get('/home', controller.startSession);
router.get('/login', controller.login);
router.post('/user-login', controller.userLogin);
router.get('/search', controller.searchUser);
router.get('/get-profiles', controller.getUserProfiles);

router.get('/message', controller.messageUser); //messageController
router.get('/notification', controller.notificationUser);

router.get('/profile', controller.userDetails);

router.post('/get-post-comments', controller.getPostComments);
router.post('/get-chat-threads', controller.getChatThreads);

router.post('/post', controller.upload.single('image'), controller.addPost);

router.get('/register', controller.register);
router.post('/signup', controller.userSignUp);


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 

// router.post('/register', userController.register);






module.exports = router;