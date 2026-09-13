const password= document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const appName = document.getElementById("appName");
const savedPasswords = document.getElementById("savedPasswords");
const empty = document.getElementById("empty");
let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

function updateLength(){
    lengthValue.textContent=length.value;
}
function generatePassword(){
    let chars = "";
    if (document.getElementById("uppercase").checked){
        chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    }
    if (document.getElementById("lowercase").checked){
        chars += "abcdefghijklmnopqrstuvwxyz";

    }
    if(document.getElementById("numbers").checked){
        chars += "0123456789";

    }
    if (document.getElementById("symbols").checked){
        chars += "!@?#$%-;£()/[{}]";

    }
    if (chars === ""){
        alert("Select at least one option");
        return;
    }
    let result ="";
    for(let i=0;i<length.value;i++){
        let random = Math.floor(Math.random() * chars.length);
        result += chars[random];
        
        
    }
    password.value=result;

}

function copyPassword(){
    if(password.value === ""){
        generatePassword();

    }
    navigator.clipboard.writeText(password.value);
    alert("Password copied");
} 
function savePassword(){
    let name = appName.value.trim();
    let pass = password.value;
    if (name===""||pass===""){
        alert("Enter an app name and generate");
        return;
    }
    let newPassword ={
        id: Date.now(),
        name: name,
        password: pass
    };
    passwords.unshift(newPassword);
    localStorage.setItem("passwords",JSON.stringify(passwords));
    appName.value="";
    showPasswords();
}
function showPasswords(){
    savedPasswords.innerHTML="";
    if (passwords.length===0){
        empty.style.display = "block";
        return;
    }
    empty.style.display="none";
    for (let i = 0; i<passwords.length; i++){
        let item = passwords[i];
        savedPasswords.innerHTML += `
        <div class="list-item">
        <div>
        <h3>${item.name}</h3>
        <p>${item.password}</p>
        </div>

        <div class="actions">
        <button class="btn-primary btn-small" onclick="copySaved(${item.id})">
        Copy
        </button>
        <button class="btn-danger btn-small" onclick="deletePassword(${item.id})">
        Delete
        </button>
        </div>
        </div>
        `;
    }
}
function copySaved(id){
    for(let i = 0; i<passwords.length;i++){
        if(passwords[i].id === id){
            navigator.clipboard.writeText(passwords[i].password);
            alert("Password copied");
            break;
        }
    }
}
function deletePassword(id){
    passwords = passwords.filter(function(item){
        return item.id !== id;

    });
    localStorage.setItem("passwords",JSON.stringify(passwords));
    showPasswords();
}
showPasswords();
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);
