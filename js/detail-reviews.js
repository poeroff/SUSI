const nameInput = document.getElementById("nameInput");
const textInput = document.getElementById("textInput");
const pwdInput = document.getElementById("pwdInput");
const listContainer = document.getElementById("listContainer");
const popup = document.getElementById("popup1");
const pwdRememberInput = document.getElementById("pwdRememberInput");

function addInfo() {
  if (nameInput.value === "" || textInput.value === "") {
    alert("All must be filled out.!");
  } else if (checkPwd(pwdInput.value)) {
    let id = uuidv4();
    showData(nameInput.value, textInput.value, id);
    saveData(nameInput.value, textInput.value, id, pwdInput.value);
    alert("Input success");
  } else {
    alert("Password must be at least 8 characters including English/numbers/special characters");
  }
  nameInput.value = "";
  textInput.value = "";
  pwdInput.value = "";
}

let userData = getData();
function saveData(name, text, id, pwd) {
  const obj = { name, text, id, pwd };
  userData.push(obj);
  localStorage.setItem("saveData", JSON.stringify(userData));
}
function getData() {
  const getAll = localStorage.getItem("saveData");
  if (getAll === null) {
    return [];
  }
  const getItem = JSON.parse(getAll);
  return getItem;
}
getData();

function showReview() {
  userData.forEach((data) => {
    showData(data.name, data.text, data.id);
  });
}
showReview();

function onClick() {
  addInfo();
}

function checkPwd(str_pwd) {
  const reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/; 
  return reg1.test(str_pwd); 
}

function showData(name, review, id) {
  let li = document.createElement("li");
  li.id = id;
  li.style.fontSize = "20px";
  li.innerHTML = `${name} : ${review}`;
  listContainer.appendChild(li);
  let span = document.createElement("span");
  span.className = "popupClick";
  span.style.fontSize = "20px";
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  inputDatacol = [];
}


listContainer.addEventListener(
  "click",
  function add(e) {
    if (e.target.className === "popupClick") {
      popup.style.display = "block";
      let targetId = e.target.parentElement.getAttribute("id");
      
      let extIdInfo = userData.filter((data) => {
        return data.id === targetId;
      });
      let userPwd = extIdInfo[0].pwd; 
      const valBtn = document.querySelector(".valBtn");
     
      valBtn.addEventListener("click", () => {
        if (pwdRememberInput.value === userPwd) {
          alert("Password matches");
          popup.style.display = "none";
          let filteringData = userData.filter((data) => {
            return data.id !== targetId;
            })
          localStorage.setItem("saveData", JSON.stringify(filteringData));
          window.location.reload();
        } else {
          alert("The password you entered does not match.");
        }
      });
      console.log(userPwd);
    }
  },
  false
);
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// localStorage.removeItem("saveData");   //로컬스토리지 초기화