const btnClick = document.getElementById('btnIn');
const showSignUp = document.getElementById('sign-up');
const showSignIn = document.getElementById('sign-in');
const btnClick1 = document.getElementById('btnUp');
 let btnSignUp = document.getElementById('signUpForm');
 btnSignUp.addEventListener("submit", signUp);
let btnLogin = document.getElementById('signInForm');
btnLogin.addEventListener("submit", signIn);
const msg = document.getElementById('msg');
let usersArr = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [];
window.onload = function () {
    document.getElementById('sign-up').style.display = 'none';
}
function addNewUser(newUser) {
    usersArr.push(newUser);
    localStorage.setItem('user', JSON.stringify(usersArr));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
}
function signUp(event) {
    event.preventDefault();
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const finduser = usersArr.find(element => element.user == user);
    if (finduser&&finduser.password == password) {
        msg.innerHTML = "You are registered in the system, you must sign in";
        return;
    }
    else if (finduser) {
        msg.innerHTML = "The username is taken, you must choose another name";
        return;
    }
    let newUser = new User(user, email, password);
    addNewUser(newUser);
    msg.innerHTML = "You have successfully registered!";
    window.location = '../html/home.html'
}



function signIn(event) {
     event.preventDefault();
    const user = document.getElementById('user1').value;
    const password = document.getElementById('password1').value;
    const finduser = usersArr.find(element => element.user == user);
    if (!finduser) {
        msg.innerHTML = "You are not registered in the system, you must register";
        return;
    }

    if (finduser.password == password) {
          localStorage.setItem('currentUser', JSON.stringify(finduser));
        msg.innerHTML = "You've logged in successfully!";
        window.location = '../html/home.html'
    }
    else {
        msg.innerHTML = "wrong password. please try again";
    }

}

function showFormSignIn() {
    btnClick.style.backgroundColor = " rgba(255,255,255,0.13)";
    showSignIn.style.display = 'block';
    showSignUp.style.display = 'none';
    btnClick1.style.backgroundColor = "rgba(102, 79, 79, 0)";
    msg.innerHTML=" ";

}
function showFormSignUp() {
    btnClick1.style.backgroundColor = "rgba(255,255,255,0.13)";
    btnClick.style.backgroundColor = "rgba(102, 79, 79, 0)";
    showSignUp.style.display = 'block';
    showSignIn.style.display = 'none';
    msg.innerHTML=" ";
}

