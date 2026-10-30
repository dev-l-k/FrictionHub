const numIn = document.getElementById('numInput');
const romanIn = document.getElementById('romanInput');
const numOut = document.getElementById('numResult');
const romOut = document.getElementById('romanResult');
const numNote = document.getElementById('numHint');
const romNote = document.getElementById('romanHint');
const copyMsg = document.getElementById('copyMsg');

let romanVals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
let romanSyms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
function toRoman(num){
    let str = "";
    let i = 0;
    while(i<romanVals.length){
        if (num >= romanVals[i]){
            str += romanSyms[i];
            num -= romanVals[i];
        }else{
            i++;
        }
    }
    return str;
}
function fromRoman(str){
    let map = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    let total = 0;
    for(let i=0; i<str.length; i++){
        let c = map[str[i]];
        let nxt = map[str[i+1]];
        if (nxt && c<nxt){
            total = total-c;
        }else{
            total = total+c;
        }

    }
    return total;
}
function checkRoman(str){
    for(let i=0;i<str.length;i++){
        let ch = str[i];
        if(ch !== "I" && ch !== "V" && ch!== "X" && ch !== "L" && ch !== "C" && ch !== "D" && ch !== "M"){
            return false;

        }
    }
    if (str.length === 0){
        return false;

    }
    let n = fromRoman(str);
    if (n<1||n>3999){
        return false;

    }
    if (toRoman(n)!== str){
        return false;
    }
    return true;
}
function noteNum(msg, bad) {
    numNote.innerHTML = msg;
    if (bad) {
        numNote.className = "hint err";
    } else {
        numNote.className = "hint";
    }
}

function noteRom(msg, bad) {
    romNote.innerHTML = msg;
    if (bad) {
        romNote.className = "hint err";
    } else {
        romNote.className = "hint";
    }
}
numIn.oninput = function(){
    let val = numIn.value.trim();
    if (val === ""){
        numOut.innerHTML="----";
        noteNum("Enter a number between 1 and 3999");
        return;
    }
    let n = Number(val);
    if(isNaN(n)){
        numOut.innerHTML="----"
        noteNum("That is not a number",true);
        return;


    }
    if(val.indexOf(".")!=-1){
        numOut.innerHTML="----";
        noteNum("Whole numbers only",true);
        return;
    }
    if(n<1||n>3999){
        numOut.innerHTML="----";
        noteNum("Must be between 1 to 3999",true);
        return;
    }
    numOut.innerHTML=toRoman(n);
    noteNum("Valid Number",false);

};

romanIn.oninput=function(){
    let val = romanIn.value.trim();
    romanIn.value = val.toUpperCase();
    val = romanIn.value;
    if (val===""){
        romOut.innerHTML="----";
        noteRom("Use I,V,L,C,D,M",false);
        return;
    }
    if (checkRoman(val)===false){
        romOut.innerHTML = "----";
        noteRom("Not a valid Roman number",true);
        return;
    }
    romOut.innerHTML=fromRoman(val);
    noteRom("Valid numeral",false);
};

function copy(){
    let a= numOut.innerHTML;
    let b= romOut.innerHTML;
    let text = "";
    if(a!=="----"&&b!=="----"){
        text = a+" / "+b;

    }else if(a!== "----"){
        text = a;
    }else if(b!=="----"){
        text = b;
    }
    if(text!==""){
        navigator.clipboard.writeText(text);
        copyMsg.innerHTML="Copied";
        setTimeout(function(){
            copyMsg.innerHTML="";
        },1500);
    }
}
function clear(){
    numIn.value = "";
    romanIn.value = "";
    numOut.innerHTML = "----";
    romOut.innerHTML = "----";
    noteNum("Enter a number between 1 and 3999", false);
    noteRom("Use I,V,X,L,C,D,M", false);
    copyMsg.innerHTML = "";
}
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);