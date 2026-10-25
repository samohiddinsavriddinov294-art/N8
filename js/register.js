const registerForm = document.querySelector("#registerForm");
const usernameInput = document.querySelector("#usernameInput");
const passwordInput = document.querySelector("#passwordInput");
const uploadInput = document.querySelector("#uploadInput");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formdata = new FormData();
  formdata.append("username", usernameInput.value);
  formdata.append("password", passwordInput.value);
  formdata.append("file", uploadInput.files[0]); 

  const res = await axios.post(
    "https://n30-youtube-api-qys5.onrender.com/register",
    formdata,
  );
  if (res.data.status == 200) {
    window.localStorage.setItem('profile', res.data.data.profileImg)
    window.localStorage.setItem('token', res.data.token)

    window.location = "index.html";
  }
});
