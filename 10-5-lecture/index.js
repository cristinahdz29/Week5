//built into JS language; fetching data
//creating instance of object of XMLHTTPrequest --> a function is open
//SENDING REQUEST
//let request = new XMLHttpRequest()

//request.open("GET","place url here")
//request.send()

//GETTING RESPONSE OR DATA
//  request.addEventListener("load", function() {
//console.log(this.responseText) -->this is the request
//let result = JSON.parse(this.responseText)
//})

//ACTIVITY 1

//creating & sending request

// let catFactsUl = document.getElementById("catFactsUl")

// let request = new XMLHttpRequest();
// request.open("GET", "https://cat-fact.herokuapp.com/facts");
// request.send();

// //getting response; now got information MOVE THIS IN BETWEEN LET REQUEST AND REQUEST OPEN
// request.addEventListener("load", function () {
//   console.log(this.responseText);
//   let result = JSON.parse(this.responseText);
//   //want to loop through array and get text, FN, and LN
//   result.all.forEach(function (fact) {
//     console.log(fact.text);
//     if (fact.user) { //checking that user is not undefined, it must have a value
//       console.log(fact.user.name.first);
//       console.log(fact.user.name.first);
//     }
//   });
// });

// CAT FACTS PT 2

let catFactsUl = document.getElementById("catFactsUl")

let request = new XMLHttpRequest();
request.open("GET", "https://cat-fact.herokuapp.com/facts");
request.send();

//getting response; now got information MOVE THIS IN BETWEEN LET REQUEST AND REQUEST OPEN
request.addEventListener("load", function () {
    console.log(this.responseText);
    let result = JSON.parse(this.responseText);
    //result.all gives you the array
    //want to loop through array and get text, FN, and LN
    result.all.forEach(function (fact) {
        if (fact.user) {
        let li = document.createElement("li")

        let pText = document.createElement("p")
        pText.innerHTML = fact.text
        li.appendChild(pText)

        let pFirstName = document.createElement("p")
        pFirstName.innerHTML = fact.user.name.first
        li.appendChild(pFirstName)

        let pLastName = document.createElement("p")
        pLastName.innerHTML = fact.user.name.last
        li.appendChild(pLastName)
        
        catFactsUl.appendChild(li)
    }
    
    });
});
