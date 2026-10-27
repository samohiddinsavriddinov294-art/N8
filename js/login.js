const submitButton = document.querySelector("#submitButton");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  let res = await axios.post("https://n30-youtube-api.onrender.com/login", {
    username: usernameInput.value,
    password: passwordInput.value,
  });

  if (res.data.status == 200) {
    window.localStorage.setItem("profile", res.data.data.profileImg);
    window.localStorage.setItem("token", res.data.token);

    window.location = "index.html";
  }
});
