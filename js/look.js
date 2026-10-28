const userAdd = document.querySelector("#userAdd")
const usernameInput = document.querySelector("#usernameInput")
const telephoneInput = document.querySelector("#telephoneInput")
const customersList = document.querySelector(".customers-list")

userAdd.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = usernameInput.value
    const telephone = telephoneInput.value


    
    const res = await fetch("https://look-njzu.onrender.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            telephone
        })
    })

    customersList.innerHTML += `
        <li class="customer-item">
            <span class="customer-name">${username}</span>
            <a class="customer-phone" href="tel:${telephone}">${telephone}</a>
        </li>
    `

    userAdd.reset()
})