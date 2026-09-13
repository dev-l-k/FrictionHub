const text = document.getElementById("text");
const count = document.getElementById("count");

function upperCase(){
    text.value = text.value.toUpperCase();
    updateCount();
}
function lowerCase(){
    text.value = text.value.toLowerCase();
    updateCount();
}
function titleCase(){
    let words = text.value.toLowerCase().split(" ");
    for (let i = 0; i< words.length;i++){
        if (words[i]!==""){
            words[i].charAt(0).toUpperCase() + words[i].slice(1);

        }
    }
    text.value= words.join(" ");
    updateCount();
}
function sentenceCase(){
    let value = text.value.toLowerCase();
    let sentences = value.split(/([.!?]\s")/);
    for (let i = 0;i < sentences.length; i+=2){
        sentences[i] = sentences[i].trim();
        if (sentences[i] !== ""){
            sentences[i] = sentences[i].charAt(0).toUpperCase()+ sentences[i].slice(1);
        }
    }
    text.value= sentences.join("");
    updateCount();
}
function toggleCase(){
    let value = text.value;
    let result = "";
    for(let i =0; i<value.length; i++){
        let letter = value[i];
        if(letter === letter.toUpperCase()){
            result+=letter.toLowerCase();

        }else{
            result+= letter.toUpperCase;
        }
    }
    text.value=result;
    updateCount();
}
function copyText(){
    if(text.value.trim()===""){
        alert("Nothing to copy");
        return;
    }
    navigator.clipboard.writeText(text.value);
    alert("Text copied");
}