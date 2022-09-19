const userButton = () => {
  return document.getElementById("users");
};
const postButton = () => {
  return document.getElementById("posts");
};
const todoButton = () => {
  return document.getElementById("todos");
};
const container = () => {
  return document.getElementById("container");
};

///................
const sendAJAX = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      // console.log(xhr.response)
      if (xhr.status === 200) {
        callback(xhr.response);
      }
      if (xhr.status === 404) {
        container().innerHTML = "404! Page not found.";
        container().classList.add("large_font");
      }
    }
  };
  xhr.send(null);
};

sendAJAX("https://jsonplaceholder.typicode.com/users", (x) => {
  const userData = JSON.parse(x);

  userButton().addEventListener("click", () => {
    userButton().classList.add("active");
    postButton().classList.remove("active");
    todoButton().classList.remove("active");

    let content = " ";
    userData.forEach((el) => {
      content += `
            <div class="card">  
                <img src="https://robohash.org/${el.name}.png" id="img" class=${
                 isEven(el.id) ? "bg_blue" : "bg_pink"}>
                <div class= card_body>
                    <p> ${el.name} </p>
                     <p>${el.email}</p>
                    <p>${el.phone}</p>  
                    <p> ${el.address.city} , ${el.address.street} - ${
                    el.address.zipcode}</p>  
                </div>
            </div> 
            `;
    });
    container().innerHTML = content;
  });
});

const isEven = (number) => number % 2;

postButton().addEventListener("click", () => {
  container().innerHTML = `<h1>POST</h1>`;
  postButton().classList.add("active");
  userButton().classList.remove("active");
  todoButton().classList.remove("active");
});

todoButton().addEventListener("click", () => {
  container().innerHTML = `<h1>TODOS</h1>`;
  todoButton().classList.add("active");
  userButton().classList.remove("active");
  postButton().classList.remove("active");
});

// const button= document.querySelectorAll("button");

// const attachEvents= ()=>{

// }
// button.forEach(attachEvents)
