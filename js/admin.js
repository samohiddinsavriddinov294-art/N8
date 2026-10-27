const adminWrapper = document.querySelector(".admin-wrapper");
const videoInput = document.querySelector("#videoInput");
const uploadInput = document.querySelector("#uploadInput");
const videoForm = document.querySelector("#videoForm");

let token = window.localStorage.getItem("token");

async function getMyFiles() {
  let files = await axios.get("https://n30-youtube-api.onrender.com/files/my", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  files = files.data.data;

  adminWrapper.innerHTML = null;
  for (const file of files) {
    adminWrapper.innerHTML += `       
    <ul id="videosList" class="videos-list video-item">
      <video controls="true" src="${file.viewFile}"></video>
      <p class="content" contenteditable="true">${file.videoInput}</p>
      <img
        class="delete-icon"
        src="./img/delete.png"
        width="25"
        onclick="deleteFile(${file.fileId})"
      />
    </ul>`;
  }
}

videoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formdata = new FormData();

  (formdata.append("videoInput", videoInput.value),
    formdata.append("file", uploadInput.files[0]));

  let res = await axios.post(
    "https://n30-youtube-api.onrender.com/files",
    formdata,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );

  if (res.data.status == 200) {
    getMyFiles();
  }
});

function logOut() {
  window.localStorage.clear();
  window.location = "login.html";
}

async function deleteFile(fileId) {
  let res = await axios.delete("https://n30-youtube-api.onrender.com/files", {
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      fileId: fileId,
    },
  });

  if (res.data.status === 200) {
    getMyFiles();
  }
}

getMyFiles();
