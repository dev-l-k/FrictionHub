let numIn = document.getElementById("num");
let out = document.getElementById("out");
let okMsg = document.getElementById("okMsg");
let result = "";

let ones = ["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
let tens = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

function under100(n){
    if (n < 20) return ones[n];
    let t = Math.floor(n / 10);
    let o = n % 10;
    if (o == 0) return tens[t];
    return tens[t] + "-" + ones[o];
}

function under1000(n){
    let s = "";
    let h = Math.floor(n / 100);
    let rest = n % 100;

    if (h > 0) s = ones[h] + " hundred";
    if (rest > 0){
        if (s != "") s += " ";
        s += under100(rest);
    }
    return s;
}

function toIndian(n){
    if(n===0) return "zero";
    let s= String(n);
    let out = [];
    let last3 = parseInt(s.slice(-3));
    let rest = s.slice(0,-3);
    if(last3>0){
        out.unshift(under1000(last3));
    }
    let units =["thousand","lakh","crore"];
    let u = 0;
    while (rest.length >0){
        let chunk = rest.slice(-2);
        rest = rest.slice(0,-2);
        let v = parseInt(chunk);
        if(v>0){
            let w = under100(v);
            if(units[u] != undefined)w+=" "+units[u];
            out.unshift(w);
        }
        u++;
    }
    return out.join(" ");

}

function toWestern(n){
    if(n===0){
        return "zero";
        let units = ["","thousand","million","billion","trillion"];
    }
        let parts = [];
        let u = 0;
        while(n>0){
            let chunk = n%1000;
            if(chunk>0){
                let w = under1000(chunk);
                if(units[u]!== ""){
                    w+= " "+units[u];
                }
                parts.unshift(w);


            }

            n= Math.floor(n/1000);
            u++;

        }
        return parts.join(" ");
    
}

function convert(){
    let raw = numIn.value.trim();
    if(raw === ''){
        out.innerHTML='<span class="empty">Your result will appear here.</span>';
        result='';
        return;
    }
    let clean = "";
    for(let k=0; k<raw.length;k++){
        let c= raw[k];
        if(c>="0"&&c<="9"||c==="."||c==="-"){
            clean = clean+c;
        }
    }
    if(clean === ""|| clean === "-" || clean === "."){
        out.innerHTML='<span class="err">Not a valid number</span>';
        result = "";
        return;
    }
    let neg = false;
    if(clean[0]==="-"){
        neg = true;
        clean = clean.slice(1);

    }
    let dot = clean.indexOf(".");
    let intPart = clean;
    let decPart = "";
    if(dot!== -1){
        intPart = clean.slice(0,dot);
        decPart = clean.slice(dot+1);
    }
    if(intPart == ""){
        intPart="0";
        
    }
    if (intPart.length>15){
        out.innerHTML = '<span class="err">Too big</span>';
        result = "";
        return;


    }
    let n = parseInt(intPart);
    let mode = document.querySelector('input[name="mode"]:checked').value;
    let words = "";
    if(n===0){
        words = "zero";
    }else if(mode === "indian"){
        words = toIndian(n);

    }else{
        words = toWestern(n);

    }
    if (neg) words = "minus "+words;
    if (decPart !== ""){
    let d = "";
    for (let k = 0; k < decPart.length; k++){
        if (d !== "") d += " ";
        let digit = parseInt(decPart[k]);
        if (digit === 0) d += "zero";
        else d += ones[digit];
    }
    words += " point " + d;
}
    result = words;
    out.innerHTML= words.charAt(0).toUpperCase()+words.slice(1);


}
function copyResult(){
    if(result === "")return;
    navigator.clipboard.writeText(result);
    okMsg.innerHTML="Copied";
    setTimeout(function (){okMsg.innerHTML = "";},1500);

}
function clearAll(){
    numIn.value = "";
    out.innerHTML="<span class = 'empty'>Your result will appear here</span>";
    result = "";
    okMsg.innerHTML="";
}

let radios = document.querySelectorAll('input[name="mode"]');
for (let k = 0; k<radios.length;k++){
    radios[k].onchange = convert;

}

function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);

