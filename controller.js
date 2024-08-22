const engine = require("./api-engine");
const imagen        = require('./imagen');
const multer        = require("multer");
const fs            = require('fs');
const path          = require('path');

// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 

// Set up storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/'); // Create an 'uploads' directory for storing images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
  

// Initialize multer upload
const upload = multer({ storage: storage });


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// start user session
async function startSession(req, res) {
    let us = engine.createOrContinueSession(req.ip);
    console.log("controller.js::startSession ---", "is logged in", us.userLoggedIn);
    viewAllPost(req, res);
}

async function checkLogin(req, res) {
    let isLoggedIn = engine.checkLogin(req.ip);
    if (isLoggedIn) {
        state = "IN";
    } else {
        state = "OUT";
    }
    res.end(state);
}


async function userDetails(req, res) {
    console.log("controller.js::userDetails --- ");
    let us = engine.getCurrentUser(req.ip)
    console.log(us);
    if (!us) {
        return viewAllPost(req, res);
    }

    if (!us.userLoggedIn) {
        return viewAllPost(req, res);
    }

    const userData          = us.getCredential();
    const userPostings      = us.getUserPostings();

    userData.title          = "Profile • Lunar"
    userData.postings       = userPostings;
    if (Object.keys(userPostings).length == 0) {
      userData.isPostEmpty = true;
    } else {
      userData.isPostEmpty = false;
    }
    res.render("profile", userData);
}


async function login(req, res) {
    const locals = {
        title: "Login • Lunar"
    }
    res.render('login', { locals });
}


async function register(req, res) {
    const locals = {
        title: "Register • Lunar"
    }
  
    res.render('register', { locals });
}

async function userLogin(req, res) {
    // POST
    const receivedData = req.body;

    // Process the received data (e.g., save to database)
    let username    = receivedData.username;
    let password    = receivedData.password;
    let userSession = engine.getCurrentUser(req.ip);
    console.log("controller.js::userLogin --- ", "Received data:", receivedData); 
    console.log("controller.js::userLogin --- ", "userSession", userSession); 

    if (userSession) {
        const signRes = userSession.signIn({
            userName: username,
            password: password
        })

         if (signRes.status == 200) {
            let approveMessage = 'Password Accepted';                    
            res.status(200).json({message: approveMessage}); 
        }
        else {
            let rejectMessage = 'Wrong username/password. Try again.';        
            res.status(409).json({message: rejectMessage}); 
        }
    } else {
        let signupMessage = 'Username does not exist. Please sign up';        
        // Send a response back to the client
        res.status(409).json({ message: signupMessage}); 
    }
}


async function userSignUp(req, res) {
    // POST
    const receivedData = req.body;
    console.log("signUp called");
    console.log('Received data:', receivedData); 
    let username = receivedData.username;

    if (engine.isUserExist(username)) {
        let conflictMessage = 'User already signed up. Please login.';        
        res.status(409).json({message: conflictMessage}); 
    } 
    else {
        let userImagePath   = imagen.generateProfilePicture(receivedData.name);
        let profileTemplate = {
            ip_address: req.ip,
            regisName : receivedData.name,
            userName  : receivedData.username,
            password  : receivedData.password
        }

        engine.userSignUp(profileTemplate);

        // Send a response back to the client
        // viewAllPost(req, res);
        res.status(201).json({message: "ok"}); 
    }
}



async function getUserProfiles(req, res) {
    console.log("controller.js::getUserProfiles")
    res.setHeader('Content-Type', 'application/json');
    let data = engine.getAllCredentials();
    res.end(JSON.stringify(data));
}


async function notificationUser(req, res) {
    console.log("controller.js::notificationUser ---");
    let us              = engine.getCurrentUser(req.ip);
    if (!us) {
        return viewAllPost(req, res);        
    }
    if (us.userLoggedIn) {
        const locals = {
            title: "Notification • Lunar",
            data: us.getNotifications()
        }
        res.render('notification', locals);
    } else {
        return viewAllPost(req, res);
    }

}


async function messageUser(req, res) {
    console.log("controller.js::messageUser ---");
    let us              = engine.getCurrentUser(req.ip);
    if (!us) {
        return viewAllPost(req, res);        
    }
    if (us.userLoggedIn) {
        const locals = {
            title   : "Messages • Threads",
            current_user: us.userName,
            data    : us.getMessages()
        }    
        
        console.log("+ + + + + + + + + + + + ");
        console.log(us.userName);
        console.log(us.getMessages());
        res.render('message', locals);
    } else {
        viewAllPost(req, res);
    }
}


async function searchUser(req, res) {
    console.log("search user is called");
    const locals = {
        title: "Search • Lunar",
        data : {}
    }
    res.render('search', locals);
}


const viewAllPost       = async (req, res) => {
    console.log("controller.js::ViewAllPost ---");
    let us              = engine.getCurrentUser(req.ip);

    if(!us) {
        const locals = {
            title           : "Lunar",
            activeUserImage : "",
            data            : engine.getFeeds() 
        }
        console.log("controller.js::ViewAllPost --- not signed in");
        return res.render('guesthome', locals);        
    }

    let userFeeds       = us.getUserFeeds();

    const locals = {
        title           : "Lunar",
        activeUserImage : us.getUserImage(),
        data            : userFeeds 
    }

    if (us.userLoggedIn) {
        console.log("controller.js::ViewAllPost --- should render home");
        res.render('home', locals);
    } else {
        console.log("controller.js::ViewAllPost --- should render guesthome");
        res.render('guesthome', locals);
    }

}


async function getPostComments(req, res) {
    const receivedData  = req.body;
    let postKey         = receivedData.postkey;
    let comments        = engine.getPostComments(postKey);
    let resJson         = JSON.stringify(comments);
    res.end(resJson);
}


async function getChatThreads(req, res) {
    console.log("controller.js::getChatThreads ---");
    const receivedData  = req.body;
    let current_user    = receivedData.current_user;
    let chat_mate       = receivedData.chat_mate;
    let threads         = engine.getMessageThreads(current_user, chat_mate);
    res.end(JSON.stringify(threads));
}


async function addPost(req, res) {
    console.log("addPost called!");
    let threadText      = req.body.threadText;
    let current_user    = engine.getCurrentUser(req.ip); 
    const imageData     = req.file;

    let post_img_path = "";
    if (imageData){
        post_img_path = "/img/" + imageData.filename;
    } 

    const post = {
        username : current_user.userName,
        post_description: threadText,
        post_img: post_img_path
    }

    console.log(post);
    engine.addPost(post);
    res.redirect("/home");
}



module.exports = {
    startSession,
    viewAllPost,
    messageUser,
    checkLogin,
    login,
    userLogin,
    searchUser,
    getUserProfiles,
    notificationUser,
    userDetails,
    getPostComments,
    getChatThreads,
    upload,
    addPost,
    userSignUp,
    register
}