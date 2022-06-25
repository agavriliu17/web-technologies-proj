const inputs = document.querySelectorAll(".input-field");
const toggleButtons = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const submitSignIn = document.querySelector(".sign-btn");
const submitSignUp = document.querySelector(".sign-up-btn");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("active");
  });
  input.addEventListener("blur", () => {
    if (input.value !== "") return;
    input.classList.remove("active");
  });
});

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

const nameSignIn = document.getElementById("input-wrap-text");
const passwordSignIn = document.getElementById("input-wrap-password");

const getDataFromInputSignIn = async function () {
  submitSignIn.addEventListener("click", async (ev) => {
    ev.preventDefault();
    const nameSignInValue = nameSignIn.value;
    const passwordSignInValue = passwordSignIn.value;

    try {
      const jwt = await fetch("http://localhost:3010/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          password: passwordSignInValue,
          email: nameSignInValue,
        }),
      }).then((res) => res.text());

      localStorage.setItem("token", `Bearer ${JSON.parse(jwt)}`);
      window.location.href = "/frontend/pages/homepage/Services/index.html";
    } catch (e) {
      console.log(e);
    }
  });
};

getDataFromInputSignIn();

const nameSignUp = document.getElementById("input-wrap-text-up");
const emailSignUp = document.getElementById("input-wrap-email-up");
const passwordSignUp = document.getElementById("input-wrap-password-up");

const getDataFromInputSignUp = function () {
  submitSignUp.addEventListener("click", (ev) => {
    ev.preventDefault();
    let nameSignUpValue = nameSignUp.value;
    let emailSignUpValue = emailSignUp.value;
    let passwordSignUpValue = passwordSignUp.value;

    console.log(nameSignUpValue, emailSignUpValue, passwordSignUpValue);
    registerUser();
    main.classList.toggle("sign-up-mode");
  });
};
getDataFromInputSignUp();

// const redirectPage = function () {
//   submitSignIn.addEventListener("click", function (ev) {
//     ev.preventDefault();
//     if (nameSignIn.value !== "") {
//       window.location.href = "/frontend/pages/homepage/";
//     } else {
//       window.alert("Name or password is empty! Please complete all fields.");
//     }
//     console.log(nameSignIn.value);
//   });

//   submitSignUp.addEventListener("click", function (ev) {
//     ev.preventDefault();
//     if (nameSignUp.value !== "") {
//       window.location.href = "/frontend/pages/homepage/";
//     } else {
//       window.alert(
//         "Name, password or email is empty! Please complete all fields."
//       );
//     }
//   });
// };

// redirectPage();

function registerUser() {
  const name = document.getElementById("input-wrap-text-up").value;
  const nickname = document.getElementById("input-wrap-nickname-up").value;
  const email = document.getElementById("input-wrap-email-up").value;
  const password = document.getElementById("input-wrap-password-up").value;
  const body = {
    name,
    nickname,
    email,
    password,
    role: "client",
  };
  const registerURL = "http://localhost:3010/api/v1/register";
  fetch(registerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    console.log(res.json());
  });
}
