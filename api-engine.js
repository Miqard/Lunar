const Database      = require('./mockup_db'); // Assuming db.js is in the same directory
const credentData   = new Database('data/credentials.json');
const postingData   = new Database("data/postings.json");
const notifData     = new Database('data/notifications.json');
const messageData   = new Database('data/messages.json');
const imagen        = require('./imagen');
const moment        = require('moment');
const path          = require('path');


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// user sessions
let userSessions   = {}


function getCurrentUser(ip_address) {
    return userSessions[ip_address]
}


function createOrContinueSession(ip_address) {
    let us;
    if (userSessions.hasOwnProperty(ip_address)) {
        us = userSessions[ip_address]
        return us
    } else {
        us = new UserSession(ip_address);
        return us
    }
}


// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// HELPER FUNCTION

// Random string generator for naming
function generateRandomString(length = 7) {
    let result = 'post-';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


function calculateTimeDifference(startDate, endDate) {
    // Create moment objects from the Date objects
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    // Calculate the duration between the two moments
    const duration = moment.duration(endMoment.diff(startMoment));

    // Extract days, hours, and minutes
    const weeks     = duration.weeks(); 
    const days      = duration.days();
    const hours     = duration.hours();
    const minutes   = duration.minutes();
    const seconds   = duration.seconds();
    
    // let formattedString = `${days}d${hours}h${minutes}m`;
    
    let secondString    = `${seconds}s`;
    let minuteString    = `${minutes}m`;
    let hourString      = `${hours}h`;
    let dayString       = `${days}d`;
    let weekString      = `${weeks}w`;
    // Construct the formatted string

    let stringSet = {}
    let countSet  = {}

    stringSet["week"]       = weekString;
    stringSet["day"]        = dayString;
    stringSet["hour"]       = hourString;
    stringSet["minute"]     = minuteString;
    stringSet["second"]     = secondString;

    countSet["week"]       = weeks;
    countSet["day"]        = days;
    countSet["hour"]       = hours;
    countSet["minute"]     = minutes;
    countSet["second"]     = seconds;

    for (key in countSet) {
        let count   = countSet[key];
        let tstring = stringSet[key];
        if (count == 0) {
            delete stringSet[key];
        }
    }
    
    newStringSet = {};
    for (key in countSet) {
        let count   = countSet[key];
        let tstring = stringSet[key];
        if (count > 0) {
            newStringSet[key] = tstring;
            break;
        }
    }
    
    let formattedString = "";
    for (key in newStringSet) {
        let tstring = stringSet[key];
        formattedString += tstring;
    }

    return formattedString;
}


function formatDatetime(date) {
    // Check if the input is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        throw new Error('Invalid Date object');
    }

    // Format the date as "YYYY-MM-DD HH:MM:SS"
    const year    = date.getFullYear();
    const month   = String(date.getMonth() + 1).padStart(2, '0');
    const day     = String(date.getDate()).padStart(2, '0');
    const hours   = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedString;
}


function parseDatetimeString(datetimeString) {
    // Create a Date object from the datetime string
    const parsedDate = new Date(datetimeString);

    // Check if the parsed date is valid
    if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid datetime string');
    }

    return parsedDate;
}


function isImageOrVideo(filename) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'];
    const videoExtensions = ['.mp4', '.webm', '.mov', '.avi'];

    const extension = path.extname(filename.toLowerCase());
    if (imageExtensions.includes(extension)) {
        return 'image';
    } else if (videoExtensions.includes(extension)) {
        return 'video';
    } else {
        return 'unknown';
    }
}


function getCredential(username) {
    return credentData.get(username); 
}


function getAllCredentials() {
    return credentData.getAll();
}


function getFeeds() {
    let postings        = postingData.getAll();
    let userFeeds       = {};
    
    for (var key in postings) {
        const post       = postings[key];
        const username   = post["username"];
        const profile    = credentData.get(username);
        let postTimeStr  = "";
        if (post.hasOwnProperty("post_time")) {
            postTimeStr  = post["post_time"]
        }
    
        let postTime     = parseDatetimeString(postTimeStr);
        let deltaTimeStr = calculateTimeDifference(postTime, new Date());
        const filepath   = post["post_img"];
        const filetype   = isImageOrVideo(filepath);
        userFeeds[key]   = {
            username            : username,
            user_img            : profile["userImage"],
            name                : profile["name"],
            post_description    : post["post_description"],
            post_img            : post["post_img"],
            filetype            : filetype,
            post_time           : deltaTimeStr
        }
    }
    
    return userFeeds;
}


function getPostComments(postKey) {
    let post = postingData.get(postKey);
    let comments = post.comments;
    return comments;
}


function getProfilePicture(username) {
    let cred    = credentData.get(username);
    let profpic = cred.userImage;
    return profpic;
}


function getMessageThreads(user_a, user_b) {
    let neons = messageData.getAll();

    let res = {};
    for (let key in neons){
        let msg = neons[key];
        if (msg.sender == user_a && msg.recipient == user_b) {
            res[key] = msg;
            continue;
        }
        if (msg.sender == user_b && msg.recipient == user_a){
            res[key] = msg;
            continue;
        }
    }
    return res;
}


function getCurrentUserNames(){
    let users       = credentData.getAll();
    var usernames   = [];
    for (let key in users) {
        let user  = users[key];
        let username = user.username;
        usernames.push(username);
    }
    return usernames;
}


function aggregateMessageByPair(selfname) {
    let usernames       = getCurrentUserNames();
    let pairmessages    = {}
    for (let name of usernames) {
        if (name == selfname) {
            continue;
        }
        let results = getMessageThreads(selfname, name);
        if (Object.keys(results).length != 0) {
            pairmessages[name] = results
        }
    }
    return pairmessages;
}


function addPost(post) {
    let new_post = {
        username: post.username,
        post_description: post.post_description,
        post_img: post.post_img,
        post_time: formatDatetime(new Date()),
        likes: 0,
        comments: [],
        reposts: 7
    }

    console.log("+ + + + + + + + + + + ");
    console.log(post);
    console.log(new_post);

    let postKey = generateRandomString(10);

    postingData.set(postKey, new_post);
}


function isUserExist(username) {
    let user = credentData.get(username);
    if (user) {
        return true;
    } else {
        return false;
    }
}


function userSignUp(profile) {
    let key = profile.username;
    let us  = getCurrentUser(profile.ip_address);
    us.signUp(profile);
}





// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + 
// USER SESSION CLASS

class UserSession {
    constructor(ip_address) {
        this.userName        = ""
        this.userLoggedIn    = false;
        this.ip_address      = ip_address;
        userSessions[ip_address] = this;
    }


    getUserImage() {
        let cred = credentData.get(this.userName);
        if (cred) {
            return cred.userImage
        } else {
            return ""
        }

    }

    
    getMessages() {
        let messagePairs = aggregateMessageByPair(this.userName);
        return messagePairs;
    }


    getNotifications() {
        let notifs = notifData.get(this.userName);
        if (notifs) {
            return notifs;
        }
        else {
            return {}
        }
    }


    getUserFeeds() {
        let postings        = postingData.getAll();
        let userFeeds       = {};
        for (var key in postings) {
            const post       = postings[key];
            const username   = post["username"];
            const profile    = credentData.get(username);
            let postTimeStr  = "";
            if (post.hasOwnProperty("post_time")) {
                postTimeStr  = post["post_time"]
            }
        
            let postTime     = parseDatetimeString(postTimeStr);
            let deltaTimeStr = calculateTimeDifference(postTime, new Date());
            const filepath   = post["post_img"];
            const filetype   = isImageOrVideo(filepath);
            userFeeds[key]   = {
                username            : username,
                user_img            : profile["userImage"],
                name                : profile["name"],
                post_description    : post["post_description"],
                post_img            : post["post_img"],
                filetype            : filetype,
                post_time           : deltaTimeStr
            }
        }
        
        return userFeeds;
    }


    getUserPostings() {
        let postings        = postingData.getAll();
        let userPostings    = {};
        
        for (var key in postings) {
            const post       = postings[key];
            const username   = post["username"];
            if (username != this.userName) {
                continue;
            }
            const profile    = credentData.get(username);
            let postTimeStr  = "";
            if (post.hasOwnProperty("post_time")) {
                postTimeStr  = post["post_time"]
            }
        
            let postTime     = parseDatetimeString(postTimeStr);
            let deltaTimeStr = calculateTimeDifference(postTime, new Date());
            const filepath   = post["post_img"];
            const filetype   = isImageOrVideo(filepath);
            userPostings[key]   = {
                username            : username,
                user_img            : profile["userImage"],
                name                : profile["name"],
                post_description    : post["post_description"],
                post_img            : post["post_img"],
                filetype            : filetype,
                post_time           : deltaTimeStr
            }
        }
        
        return userPostings;
    }


    signUp(credentials) {
        // TODO: need to assess the existence of the credentials input
        const userName  = credentials.userName;
        const regisName = credentials.regisName;
        const password  = credentials.password;

        if (credentData.get(userName)) {
            let conflictMessage = 'User already signed up. Please login.';        
            res.status(409).json({message: conflictMessage}); 
            return {
                status  : 409,
                message : conflictMessage
            }
        } else {
            let userImagePath   = imagen.generateProfilePicture(regisName);
            let profileTemplate = {
                name      : regisName,
                username  : userName,
                password  : password,
                age       : 0,
                gender    : "",
                location  : "",
                bio       : "Hi, I'm new to lunar",
                followers : 0,
                following : 0,
                posts     : 0,
                userImage : userImagePath
            }
            
            credentData.set(userName, profileTemplate);
            notifData.set(userName, []);
            this.userName        = userName;
            this.userLoggedIn    = true;
        }
    }
    
    
    signIn(credentials) {
        const userName  = credentials.userName;
        const password  = credentials.password;

        let userCredent = credentData.get(userName);
        if (userCredent) {
            let storedPassword = userCredent.password;
            if (password == storedPassword) {
                let approveMessage  = 'Password Accepted';        
                this.userLoggedIn   = true;
                this.userName       = userName;
                return {
                    status      : 200,
                    message     : approveMessage,
                    userName    : this.userName
                }

            }
            else {
                let rejectMessage = 'Wrong username/password. Try again.';        
                return {
                    status: 409,
                    message: rejectMessage
                }
            }
        } else {
            let signupMessage = 'Username does not exist. Please sign up';        
            return {
                status: 409,
                message: signupMessage
            }
        }
    }


    getCredential() {
        return credentData.get(this.userName);
    }


    signOut() {
        console.log("signed out");
        this.userName       = "";
        this.userLoggedIn   = false;       
    }


    getNotification() {
        if (!this.userLoggedIn) {
            return {
                status: 409,
                message: "user not logged in"
            }
        }
        return {
            status: 200,
            results: notifData.get(this.userName)
        }
    }

    getAllPost() {
        let postings = postingData.getAll();
        return {
            status : 200, 
            results: postings
        }
    }

}
  

module.exports = {
    UserSession,
    getCurrentUser,
    createOrContinueSession,
    generateRandomString,
    calculateTimeDifference,
    formatDatetime,
    parseDatetimeString,
    isImageOrVideo,
    getCredential,
    getAllCredentials,
    getFeeds,
    getPostComments,
    getMessageThreads,
    getProfilePicture,
    addPost,
    isUserExist,
    userSignUp
}



