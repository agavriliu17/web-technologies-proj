const inputs = document.querySelectorAll(".input-field");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.classList.add("active");
  });
  input.addEventListener("blur", () => {
    if (input.value !== "") return;
    input.classList.remove("active");
  });
});
