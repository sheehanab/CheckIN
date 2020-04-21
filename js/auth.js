//listen for auth state change
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('Events').get().then(snapshot => {
            setupEvents(snapshot.docs);
            setupUI(user);
        });

    } else {
        setupUI();
        setupEvents([]);
     
    }
});


//create new event
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {

    e.preventDefault();

    db.collection('Events').add({

        Name: createForm['eventtitle'].value,
        Time: createForm['eventtime'].value,
        Location: createForm['eventlocation'].value
        
    }).then(() => {

        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    });
});


//signup
const signupForm = document.querySelector('#Signup-form');

signupForm.addEventListener('submit', (e) => {

    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {

        return db.collection('users').doc(cred.user.uid).set({

            FirstName: signupForm['FirstName'].value,
            LastName: signupForm['LastName'].value,
            Organization: signupForm['Organization'].value,
            Email: signupForm['signup-email'].value,
            Password: signupForm['signup-password'].value

        });

    }).then(() => {

        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();

        window.alert("Please check your email and verify your email address. Thank You.");
    });

});


//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});




//logIn
const loginForm = document.querySelector('#Login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['Login-email'].value
    const password = loginForm['Login-password'].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {

     const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();      
        loginForm.reset();
            
    })
})