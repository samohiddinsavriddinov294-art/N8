
const header_right = document.querySelector(".header-right");
const profileImg = window.localStorage.getItem("profile");
const navbarList = document.querySelector(".navbar-list");
const list1 = document.querySelector("#list1");
const inputSearch = document.querySelector("#inputSearch");

let publicFiles = [];

header_right.innerHTML += `
  <a id="list" href="${profileImg ? "./admin.html" : "./register.html"}">
    <img
      class="avatar-img"
      src="${profileImg ? profileImg : "./img/avatar.jpg"}"
      alt="avatar-img"
      width="32"
      height="32"
    >
  </a>
`;

async function getAllUsers() {
  let users = await axios.get("https://n30-youtube-api.onrender.com/users");

  users = users.data.data;

  for (const user of users) {
    navbarList.innerHTML += `
      <li onclick='clickUser(${user.userId})' class="channel">
        <a href="#">
          <img
            src="${user.profileImg}"
            alt="channel-icon"
            width="30"
            height="30"
          >
          <span>${user.username}</span>
        </a>
      </li>
    `;
  }
}

async function getAllFiles(findFiles) {
  if (!findFiles) {
    let files = await axios.get(
      "https://n30-youtube-api.onrender.com/files"
    );

    publicFiles = files.data.data;
    findFiles = publicFiles;
  }

  list1.innerHTML = null;

  for (const file of findFiles) {
    list1.innerHTML += `
      <li class="iframe">
        <video
          src="${file.viewFile}"
          controls
        ></video>

        <div class="iframe-footer">
          <img
            src="${file.user.profileImg}"
            alt="channel-icon"
          >

          <div class="iframe-footer-text">
            <h2 class="channel-name">${file.user.username}</h2>
            <h3 class="iframe-title">${file.videoInput}</h3>
            <time class="uploaded-time">${file.data}</time>

            <a class="download" href="${file.downloadLink}">
              <span>${file.size} MB</span>
              <img src="./img/download.png" alt="download">
            </a>
          </div>
        </div>
      </li>
    `;
  }
}

inputSearch.addEventListener("input", (e) => {
  let search = e.target.value.toLowerCase();

  let findFiles = publicFiles.filter((file) =>
    file.videoInput.toLowerCase().includes(search)
  );

  getAllFiles(findFiles);
});


function clickUser(userId) {

  let findFiles = publicFiles.filter(
    (file) => file.user.userId === userId
  );

  getAllFiles(findFiles);
}


getAllFiles();
getAllUsers();
