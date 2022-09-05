/*
// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName(){
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSurnameError").style.display = "block";
    }else{
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}

// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
      firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
            var firebaseRef = firebase.database().ref();
            var userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userFb: "https://www.facebook.com/",
                userTw: "https://twitter.com/",
                userGp: "https://plus.google.com/",
                userBio: "User biography",
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            )
            .then((value) => {
                setTimeout(function(){
                    window.location.replace("../index.html");
                }, 1000)
            });
        }.catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
       firebase.auth().signInWithEmailAndPassword(email, password)
       .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// xxxxxxxxxx Show edit profile form with detail xxxxxxxxxx

/*function showEditProfileForm(){
    document.getElementById("profileSection").style.display = "none"
    document.getElementById("editProfileForm").style.display = "block"
    var userPfFullName = document.getElementById("userPfFullName").innerHTML;
    var userPfSurname = document.getElementById("userPfSurname").innerHTML;
    var userPfFb = document.getElementById("userPfFb").getAttribute("href");
    var userPfTw = document.getElementById("userPfTw").getAttribute("href");
    var userPfGp = document.getElementById("userPfGp").getAttribute("href");
    var userPfBio = document.getElementById("userPfBio").innerHTML;
    document.getElementById("userFullName").value = userPfFullName;
    document.getElementById("userSurname").value = userPfSurname;
    document.getElementById("userFacebook").value = userPfFb;
    document.getElementById("userTwitter").value = userPfTw;
    document.getElementById("userGooglePlus").value = userPfGp;
    document.getElementById("userBio").value = userPfBio;
}
// xxxxxxxxxx Hide edit profile form xxxxxxxxxx
function hideEditProfileForm(){
    document.getElementById("profileSection").style.display = "block";
    document.getElementById("editProfileForm").style.display = "none";
}
// xxxxxxxxxx Save profile and update database xxxxxxxxxx
function saveProfile(){
    let userFullName = document.getElementById("userFullName").value
    let userSurname = document.getElementById("userSurname").value
    let userFacebook = document.getElementById("userFacebook").value
    let userTwitter = document.getElementById("userTwitter").value
    let userGooglePlus = document.getElementById("userGooglePlus").value
    let userBio = document.getElementById("userBio").value
    var userFullNameFormate = /^([A-Za-z.\s_-])/;
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userFullName: userFullName,
            userSurname: userSurname,
            userFb: userFacebook,
            userTw: userTwitter,
            userGp: userGooglePlus,
            userBio: userBio,
        }
        firebaseRef.child(uid).set(userData);
        swal({
            type: 'successfull',
            title: 'Update successfull',
            text: 'Profile updated.',
        }).then((value) => {
            setTimeout(function(){
                document.getElementById("profileSection").style.display = "block";

                document.getElementById("editProfileForm").style.display = "none";
            }, 1000)
        });
    }
}
*/
// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
/*function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        swal({
            type: 'successfull',
            title: 'Signed Out',
        }).then((value) => {
            setTimeout(function(){
                window.location.replace("../index.html");
            }, 1000)
        });
    }).catch(function(error) {
        // An error happened.
        let errorMessage = error.message;
        swal({
            type: 'error',
            title: 'Error',
            text: "Error",
        })
    });
}*/

/*const signUpForm=document.querySelector('#signUpForm');
//signUpForm.addEventListener('submit',(e) => {
e.preventDefault() ;

const email=signUpForm['signup-email'].value;
const password=signUpForm['signup-password'].value;
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    console.log(userCredential)
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  })
//})*/






/*var admin = require("firebase-admin");

var serviceAccount = require("C:/Users/me/PycharmProjects/dummy/dummy-4763f-firebase-adminsdk-wx396-10a2525eac.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://dummy-4763f-default-rtdb.asia-southeast1.firebasedatabase.app"
});
*/

const signupForm = document.querySelector('#signup-form');
if(signupForm){
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  //  function signUpForm(){
    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;
    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return db.collection('users').doc(userCredential.user.uid).set({
      name: signupForm['signup-full-name'].value
    });
    console.log(userCredential);

  });
  }).then(() => {
    signupForm.reset();
  });
};


function loginButton(){
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  console.log('login sucessfully');
  


firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
  console.log(userCredential);
   document.location.href="dash.html";
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  })
  });
  }

  //logout
 function logOut(){
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.logOut().then(() => {
    console.log('user signed out');
    window.location.href="index.html";
  })
 });
};

function onSignIn(googleUser) {
      window.location.href="dash.html";
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());getEmail

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
    }



/*
 function BtnReset(){
 const ResetPass = document.querySelector('#Reset-pass');
 ResetPass.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log("button clicked");
  const email = ResetPass['email-new'].value;
  console.log('password reset');
firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
  console.log("reset password")
     window.alert("email sent sucessfully")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("message"+errorMessage);
  })
});
}*/

$("#reset").click (function(){
var email=$("#email-new").val();
if(email !=""){
firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
  console.log("reset password")
     window.alert("email sent sucessfully")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("message"+errorMessage);
  });
}
});

firebase.auth().onAuthStateChanged((user) => {
     var user = firebase.auth().currentUser;
    if (user) {
        var profile= User.getBasicProfile();
  var displayName = user.displayName;
  var email = user.email;
  $("#login-email").text(profile.getEmail());
    } else {
      // User is signed out
      // ...
    }
  });

  //verification
 function send_verification(){
    var user=firebase.auth().currentUser;
    user.sendEmailVerification().then(function(){
        window.alert("Verification Mail Sent");
    });
        
    
  }

//show user details
  const guideList = document.querySelector('.guides');
  const loggedOutLinks = document.querySelectorAll('.logged-out');
  const loggedInLinks = document.querySelectorAll('.logged-in');
  const accountDetails = document.querySelector('.account-details');

const setupUI=(user)=>{
    if(user){
        db.collection('users').doc(user.uid).get().then(doc =>{
            const html= `
            <div>Logged in as ${user.email}</div>
            `;
            accountDetails.innerHTML=html;
        })
        loggedInLinks.forEach(item => item.style.display='block');
        loggedOutLinks.forEach(item => item.style.display='none');
    }else{
        accountDetails.innerHTML='';
        loggedInLinks.forEach(item => item.style.display='none');
        loggedOutLinks.forEach(item => item.style.display='block');
    }

}