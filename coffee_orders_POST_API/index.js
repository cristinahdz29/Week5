let orders = {};

//retrieving HTML elements from
//HTML elements for placing Order
let emailTextBox = document.getElementById("emailTextBox");
let coffeeNameTextBox = document.getElementById("coffeeNameTextBox");
let placeOrderButton = document.getElementById("placeOrderButton");

//HTML elements for Div containing all orders
let coffeeOrdersDiv = document.getElementById("coffeeOrders");
let coffeeOrdersUl = document.getElementById("coffeeOrdersUl");

//HTML elements for searching for order
let searchOrdersDiv = document.getElementById("searchOrdersDiv");
let emailSearchTextBox = document.getElementById("emailSearchTextBox");
let searchButton = document.getElementById("searchButton");

//HTML elements for deleting orders
let deleteOrdersDiv = document.getElementById("deleteOrdersDiv");
let deleteTextBox = document.getElementById("deleteTextBox");
let deleteButton = document.getElementById("deleteButton");

//Function to load all orders
function loadCoffeeOrders() {
  let request = new XMLHttpRequest();
  request.open("GET", "https://dc-coffeerun.herokuapp.com/api/coffeeorders/");

  request.onload = function () {
    orders = JSON.parse(this.responseText);
    console.log(orders);
    console.log(Object.keys(orders));

    let entries = Object.entries(orders);
    console.log(entries);

    for (let [email, details] of entries) {
      console.log(`${email} and ${details.coffee}`);

      //creating li elements to append to UL
      let li = document.createElement("li");
      li.className = "coffeeOrdersLi";
      // li.innerHTML = `Email: ${email} Order: ${details.coffee}`;
      let pEmail = document.createElement("p");
      pEmail.innerHTML = `Email: ${email}`;
      li.appendChild(pEmail);

      let labelOrder = document.createElement("p");
      labelOrder.innerHTML = `Order: ${details.coffee}`;
      li.appendChild(labelOrder);

      coffeeOrdersUl.appendChild(li);
    }
  };

  request.send();
}

// loadCoffeeOrders()

//adding event listener to button to POST and order
placeOrderButton.addEventListener("click", () => {
  let email = emailTextBox.value;
  let coffee = coffeeNameTextBox.value;

  let requestObject = {
    coffee: coffee,
    emailAddress: email,
  };

  // console.log(requestObject)
  // console.log(JSON.stringify(requestObject)) --> need to make string so can be sent to server
  // console.log(email)
  // console.log(coffee)

  let request = new XMLHttpRequest();

  request.onload = function () {
    let coffeeOrdersLength = coffeeOrdersUl.children.length;

    for (let i = 0; i < coffeeOrdersLength; i++) {
      coffeeOrdersUl.children[0].remove();
    }
    let result = JSON.parse(this.responseText);
    loadCoffeeOrders();
  };

  request.open("POST", "https://dc-coffeerun.herokuapp.com/api/coffeeorders/");

  request.setRequestHeader("Content-Type", "application/json");

  request.send(JSON.stringify(requestObject));
});

loadCoffeeOrders();

//Function to filter by email
searchButton.addEventListener("click", () => {
  let searchOrder = emailSearchTextBox.value;
  let foundOrder = orders[searchOrder];
  console.log(foundOrder);

  if (!foundOrder) {
    console.log("no orders");
  } else {
    //   console.log(foundOrder)
    let coffeeOrdersLength = coffeeOrdersUl.children.length;

    for (let i = 0; i < coffeeOrdersLength; i++) {
      coffeeOrdersUl.children[0].remove();
    }

    let div = document.createElement("div");
    let pEmail = document.createElement("p");
    pEmail.innerHTML = foundOrder.emailAddress;
    console.log(pEmail);
    div.appendChild(pEmail);

    let pCoffeeOrder = document.createElement("p");
    pCoffeeOrder.innerHTML = foundOrder.coffee;
    div.appendChild(pCoffeeOrder);

    searchOrdersDiv.appendChild(div);
  }
});

// adding event listener to button delete order by email
deleteButton.addEventListener("click", function () {
  let deleteOrder = deleteTextBox.value;
  let foundOrder = orders[deleteOrder];

  let deleteUrl =
    "https://dc-coffeerun.herokuapp.com/api/coffeeorders/" +
    foundOrder.emailAddress;

  let request = new XMLHttpRequest();

  //   request.open("DELETE", deleteUrl);
  //   request.send();
  let coffeeOrdersLength = coffeeOrdersUl.children.length;

  for (let i = 0; i < coffeeOrdersLength; i++) {
    const currentDiv = coffeeOrdersUl.children[i];
    const emailP = currentDiv.children[0];

    const isCorrectDivToRemove = emailP.innerHTML.includes(
      foundOrder.emailAddress
    );

    if (isCorrectDivToRemove) {
      currentDiv.remove();
      break;
    }
  }
});
