const inputs = document.querySelectorAll(".input-field");
const toggleButtons = document.querySelectorAll(".toggle");
const main = document.querySelector("main");

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
