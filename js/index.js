const header_right = document.querySelector(".header-right");
const profileImg = window.localStorage.getItem("profile");
const navbarList = document.querySelector(".navbar-list");

header_right.innerHTML += ` 
          <a id="list" href=${profileImg ? "./admin.html" : "./register.html"}>
            <img class="avatar-img" src=${profileImg ? profileImg : "./img/avatar.jpg"} alt="avatar-img" width="32px" height="32px">
          </a>`;

async function getAllUsers() {
  let users = await axios.get(
    "https://n30-youtube-api-qys5.onrender.com/users",
  );
  users = users.data.data;

  for (const user of users) {
    navbarList.innerHTML += `<li class="channel" data-id="1">
              <a href="#">
                <img
                  src="${user.profileImg}"
                  alt="channel-icon"
                  width="30px"
                  height="30px"
                />
                <span>${user.username}</span> 
              </a>
            </li>`;
  }
}

getAllUsers();
