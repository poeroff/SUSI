const nameInput = document.getElementById("nameInput");
const textInput = document.getElementById("textInput");
const pwdInput = document.getElementById("pwdInput");
const listContainer = document.getElementById("listContainer");
const popup = document.getElementById("popup1");
const pwdRememberInput = document.getElementById("pwdRememberInput");
let movieId = window.location.search;
//버튼을 클릭했을 때 입력한 값 로컬 저장 및 화면에 띄우기
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
// 리뷰이름, 내용, 비밀번호를 로컬에 저장
let userData = getData();
function saveData(name, text, id, pwd) {
  const obj = { name, text, id, pwd };
  userData.push(obj);
  localStorage.setItem(movieId, JSON.stringify(userData));
}
function getData() {
  const getAll = localStorage.getItem(movieId);
  if (getAll === null) {
    return [];
  }
  const getItem = JSON.parse(getAll);
  return getItem;
}
getData();
// 리뷰 화면에 띄우기
function showReview() {
  userData.forEach((data) => {
    showData(data.name, data.text, data.id);
  });
}
showReview();
// 엔터키로 addInfo 입력
function onClick() {
  addInfo();
}
//비밀번호 정규식 체크 함수
function checkPwd(str_pwd) {
  const reg1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/; //비밀번호는 영어/숫자/특수문자를 포함한 8자 이상.
  return reg1.test(str_pwd); //정규식과 매치되면 true, 매치되지않으면 false 반환.
}
// 웹페이지에 보이는 출력값 로직
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
//위에는 리뷰글을 저장하고 나타내는 부분 //////아래는 데이터를 삭제하고 나머지데이터를 다시 로컬에 저장해서 화면에 띄우는 부분 //////////////////////////

// sapn에 포함된 x표시를 누르면 팝업창 열기
listContainer.addEventListener(
  "click",
  function add(e) {
    if (e.target.className === "popupClick") {
      popup.style.display = "block";
      let targetId = e.target.parentElement.getAttribute("id"); // 클릭한 x의 li의 id값
      // 가져온 정보가 배열이라면 // 그리고 li의 id갑과 로컬스토리지의 id 값이 같다는 가정 하에 // extIdInfo는 그 id를 가진 객체1개의 배열
      let extIdInfo = userData.filter((data) => {
        return data.id === targetId;
      });
      let userPwd = extIdInfo[0].pwd; // userPwd는 그 id를 가진 객체의 비밀번호
      const valBtn = document.querySelector(".valBtn");
      // 스코프 체이닝으로 valBtn.addEventListener 안에 있는 userPwd가 위에 있는 userPwd의 데이터를  가져올 수 있다.
      valBtn.addEventListener("click", () => {
        if (pwdRememberInput.value === userPwd) {
          alert("Password matches");
          popup.style.display = "none";
          // 여기서부터 배열에 해당하는 리뷰 제거하고, 다시 화면에 그려주는 로직 넣어야할듯..!
          let filteringData = userData.filter((data) => {
            return data.id !== targetId;
            })
          // 여기서부터는 필터링한 데이터를 로컬스토리지에 넣어주고 화면에 띄우는 로직 넣기
          localStorage.setItem(movieId, JSON.stringify(filteringData));
          window.location.reload();
        } else {
          alert("The password you entered does not match.");
          window.location.reload();
        }
      });
    }
  },
  false
);

// uuid 만드는 함수
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


// localStorage.removeItem(movieId);   //로컬스토리지 초기화