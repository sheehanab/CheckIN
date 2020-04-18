//listen for auth state change
auth.onAuthStateChanged(user => {
    if (user) {
       
        db.collection('Events').get().then(snapshot => {
            findEvents(snapshot.docs);
           setupUI(user);

        });  
    } else {
        setupUI();
        findEvents([]);
    }
});

//signup
const SignUpForm = document.querySelector('#Signup-form');
SignUpForm.addEventListener('submit',(e) => {
    e.preventDefault();

    //get user info
    const email = SignUpForm['signup-email'].value;
    const password = SignUpForm['signup-password'].value;
    
    
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred =>{
          const modal = document.querySelector('#modal-signup');
          
          SignUpForm.reset();
        
    });
  


});


//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});





const loginForm = document.querySelector('#Login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();


    //get user info
    const email = loginForm['Login-email'].value
    const password = loginForm['Login-password'].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
           
            loginForm.reset();
            
    })
})