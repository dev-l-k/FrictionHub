const text = document.getElementById("text");
const find = document.getElementById("find");
const replace = document.getElementById("replace");
const count = document.getElementById("count");

function findText(){
    let value = find.value;
    if(value===""){
        count.textContent="Enter something to find";
        return;
    }
    let matches = text.value.split(value).length - 1;
    count.textContent = matches + " match" + (matches === 1?"":"es")+" found";
    
}
function replaceAll(){
    let value = find.value;
    if (value === ""){
        count.textContent = "Enter something to find";
        return;
    }
    let matches = text.value.split(value).length -1;
    text.value = text.value.split(value).join(replace.value);
    count.textContent = matches + " replacement";
}
function copyText(){
    if(text.value === ""){
        alert("Nothing to copy")
        return
    }
    navigator.clipboard.writeText(text.value);
    alert("Text copied");
}
function clearAll(){
    text.value = "";
    find.value = "";
    replace.value = "";
    count.textContent = "";
}