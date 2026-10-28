const userAdd = document.querySelector("#userAdd");
const usernameInput = document.querySelector("#usernameInput");
const telephoneInput = document.querySelector("#telephoneInput");
const customersList = document.querySelector(".customers-list");
const orderList = document.querySelector(".orders-list");
const foodsSelect = document.getElementById("foodsSelect");
const foodsForm = document.getElementById("foodsForm");
const foodsCount = document.getElementById("foodsCount");
const clientId = document.getElementById("clientId");
const userHeader = document.getElementById("userHeader");



async function getUsers() {
  const response = await axios.get("https://look-njzu.onrender.com/users");
  const users = response.data.data;

  customersList.innerHTML = "";

  for (const user of users) {
    customersList.innerHTML += `
      <li class="customer-item" data-id="${user.userId}" data-name="${user.username}">
        <span class="customer-name">${user.username}</span>
        <span class="customer-phone">${user.telephone}</span>
      </li>
    `;
  }


  const items = document.querySelectorAll(".customer-item");

  for (const item of items) {
    item.addEventListener("click", () => {
      currentUserId = item.dataset.id;
      clientId.textContent = item.dataset.id;
      userHeader.textContent = item.dataset.name;
      getOrders(currentUserId);
    });
  }
}

userAdd.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const telephone = telephoneInput.value;

  await axios.post("https://look-njzu.onrender.com/users", {
    username: username,
    telephone: telephone,
  });

  userAdd.reset();
  getUsers();
});

async function getAllFoods() {
  const res = await axios.get("https://look-njzu.onrender.com/foods");
  const foods = res.data.data;

  foodsSelect.innerHTML = "";

  for (const food of foods) {
    foodsSelect.innerHTML += `<option value="${food.foodId}">${food.food_name}</option>`;
  }
}

async function getOrders(userId) {
  const res = await axios.get("https://look-njzu.onrender.com/orders/" + userId);
  const orders = res.data.data;

  orderList.innerHTML = "";

  for (const order of orders) {
    const food = order.foods[0];

    orderList.innerHTML += `
      <li class="order-item">
        <img src="https://look-njzu.onrender.com${food.food_img}">
        <div>
          <span class="order-name">${food.food_name}</span>
          <span class="order-count">${order.count}</span>
        </div>
      </li>
    `;
  }
}

foodsForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const foodId = foodsSelect.value;
  const count = foodsCount.value;

  await axios.post("https://look-njzu.onrender.com/orders", {
    userId: Number(currentUserId),
    foodId: Number(foodId),
    count: Number(count),
  });

  foodsForm.reset();
  getOrders(currentUserId);
});

getUsers();
getAllFoods();