const adminWrapper = document.querySelector(".admin-wrapper");
let token = window.localStorage.getItem("token");

async function getMyFiles() {
  let files = await axios.get(
    "https://n30-youtube-api-qys5.onrender.com/files/my",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );
  files = files.data.data;

  for (const file of files) {
    adminWrapper.innerHTML += `       
   <ul id="videosList" class="videos-list video-item">
            <video controls="true" src="${file.viewFile}"></video>
            <p class="content" contenteditable="true"></p>
            <img class="delete-icon" src="./img/delete.png" width="25" />
    </ul>`;
  }
}

getMyFiles() 