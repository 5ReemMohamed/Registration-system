

document.addEventListener("DOMContentLoaded", function () {
 
    var loginFormElem = document.querySelector("#loginForm");
    var signupFormElem = document.querySelector("#signupForm");
    var userNameInput = document.getElementById("userInput");
    var emailInput = document.getElementById("emailInput");
    var loginEmailInput = document.getElementById("loginEmailInput");
    var loginPasswordInput = document.getElementById("loginPasswordInput");
    var passwordInput = document.getElementById("passwordInput");
    var nameError = document.getElementById("usernameError");
    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");
    var logoutBtn = document.getElementById("logout");
    var users=[]
    if (localStorage.getItem("users") != null) {
        users = JSON.parse(localStorage.getItem("users"));
    } else {
        users = [];
    }



    signupFormElem?.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!userNameInput.value.trim()) {
            nameError.innerHTML = "Please enter your name";
            nameError.classList.remove("d-none");
            userNameInput.style.border = "1px solid #F14E2E";
            userNameInput.style.outline = "1px solid #F14E2E";

            return;
        }
        if (!emailInput.value.trim()) {
            emailError.innerHTML = "Please enter your email";
            emailError.classList.remove("d-none");
            emailInput.style.border = "1px solid #F14E2E";
            emailInput.style.outline = "1px solid #F14E2E";
            return;
        }
        if (!passwordInput.value.trim()) {
            passwordError.innerHTML = "Please enter your password";
            passwordError.classList.remove("d-none");
            passwordInput.style.border = "1px solid #F14E2E";
            passwordInput.style.outline = "1px solid #F14E2E";
            return;
        }

       
        var user = {
            userName: userNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value,
        };

        
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            emailError.innerHTML = "Invalid email format, please try again.";
            emailError.classList.remove("d-none");
            emailInput.style.border = "1px solid #F14E2E";
            emailInput.style.outline = "1px solid #F14E2E";
            return;
        }

        
        var passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;
        if (!passRegex.test(user.password)) {
            passwordError.innerHTML = "Password must contain at least 1 number or special character.";
            passwordError.classList.remove("d-none");
            passwordInput.style.border = "1px solid #F14E2E";
            passwordInput.style.outline = "1px solid #F14E2E";
            return;
        }

       
        if (users.some(u => u.email === user.email)) {
            emailError.innerHTML = "Email already exists, please enter another one.";
            emailError.classList.remove("d-none");
            emailInput.style.border = "1px solid #F14E2E";
            emailInput.style.outline = "1px solid #F14E2E";
            return;
        }

        
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "index.html";
    });

    loginFormElem?.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!loginEmailInput.value.trim()) {
            emailError.innerHTML = "Please enter your email";
            emailError.classList.remove("d-none");
            loginEmailInput.style.border = "1px solid #F14E2E";
            loginEmailInput.style.outline = "1px solid #F14E2E";
            return;
        }
        if (!loginPasswordInput.value.trim()) {
            passwordError.innerHTML = "Please enter your password";
            passwordError.classList.remove("d-none");
            loginPasswordInput.style.border = "1px solid #F14E2E";
            loginPasswordInput.style.outline = "1px solid #F14E2E";
            return;
        }

        var user = users.find(u => u.email === loginEmailInput.value.trim());

    
        if (!user) {
            emailError.innerHTML = "Email not found, please try again or register first";
            emailError.classList.remove("d-none");
            loginEmailInput.style.border = "1px solid #F14E2E";
            loginEmailInput.style.outline = "1px solid #F14E2E";
            return;
        }

        if (user.password !== loginPasswordInput.value) {
            passwordError.innerHTML = "Password is incorrect, please try again";
            passwordError.classList.remove("d-none");
            loginPasswordInput.style.border = "1px solid #F14E2E";
            loginPasswordInput.style.outline = "1px solid #F14E2E";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "home.html";
    });

   
    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
     if (document.querySelector(".home")) {
      
        var message = document.getElementById("welcomMessage");
        message.innerHTML = `Welcome, ${loggedInUser.userName}!`;
    }

    
    logoutBtn?.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
});


