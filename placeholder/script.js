let wIn = document.getElementById("w");
let hIn = document.getElementById("h");
let bgIn = document.getElementById("bg");
let fgIn = document.getElementById("fg");
let txtIn = document.getElementById("txt");
let img = document.getElementById("preview");
let urlBox = document.getElementById("urlBox");
let okMsg = document.getElementById("okMsg");

let currentUrl = "";
function buildUrl(){
    let w = parseInt(wIn.value);
    let h = parseInt(hIn.value);

    if(isNaN(w) || w<10){
        w=10;

    }
    if(isNaN(h)||h<10){
        h=10;

    }
    if (w>4000){
        w= 4000;

    }
    if(h>4000){
        h=4000;
    }

    let bg = bgIn.value.replace("#","");
    let fg = fgIn.value.replace("#","");

    let label = txtIn.value.trim();
    if(label===""){
        label = w+" x "+h;

    }
    let url = "https://placehold.co/"+w+"x"+h+"/"+bg+"/"+fg;
    url += "?text="+encodeURIComponent(label);
    return url;
}
function make(){
    currentUrl=buildUrl();
    img.src = currentUrl;
    urlBox.innerHTML=currentUrl;

}
function copyUrl(){
    if(currentUrl !== ""){
        navigator.clipboard.writeText(currentUrl);
        okMsg.innerHTML="Copied";
        setTimeout(function (){
            okMsg.innerHTML="";

        },1500);
    }
}

function openImg(){
    if(currentUrl!==""){
        let anchor = document.getElementById("open");
        anchor.href = currentUrl;
        anchor.click();
    }
}
function resetAll() {
    wIn.value = 600;
    hIn.value = 400;
    bgIn.value = "#242435";
    fgIn.value = "#ffd866";
    txtIn.value = "";
    okMsg.innerHTML = "";
    make();
}
make()