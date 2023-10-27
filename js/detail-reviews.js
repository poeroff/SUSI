const nameInput = document.getElementById("nameInput");
const textInput = document.getElementById("textInput");
const pwdInput = document.getElementById("pwdInput");
const listContainer = document.getElementById("listContainer");

//버튼을 클릭했을 때 입력한 값 띄우기 및 저장
function addTask () {
    if(nameInput.value ==='' || textInput.value ==='') {
        alert("All must be filled out.!");
    } else if(checkPwd(pwdInput.value)){
        let li = document.createElement("li");
       
        li.innerHTML = `${nameInput.value}  :  ${textInput.value}`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
       
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        
        saveData();
        alert('Sucess');
    } else {
        alert("Password must be at least 8 characters including English/numbers/special characters");
    }
    nameInput.value = "";
    textInput.value = "";
    pwdInput.value = "";
}

// span에 포함된 x표시를 누르면 댓글 삭제
listContainer.addEventListener("click", function(e){
    if(e.target.tagName ==="SPAN") {
       e.target.parentElement.remove();
    }
    saveData();
}, false);

// 엔터키로 댓글 띄우기 및 저장
function onClick () {
    addTask();
}

// 댓글 로컬에 저장 및 불러오기
function saveData () {
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask () {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


//비밀번호 정규식 체크 함수
function checkPwd(str_pwd){ 
    const reg1 =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;  //비밀번호는 영어/숫자/특수문자를 포함한 8자 이상.
    return (reg1.test(str_pwd));  //정규식과 매치되면 true, 매치되지않으면 false 반환.
};


// localStorage.removeItem("data");