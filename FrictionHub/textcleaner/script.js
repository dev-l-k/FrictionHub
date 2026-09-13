const text = document.getElementById("text");
const spaces = document.getElementById("spaces");
const emptyLines = document.getElementById("emptyLines");
const trimLines = document.getElementById("trimLines");
const duplicateLines = document.getElementById("duplicateLines");
const lineBreaks = document.getElementById("lineBreaks");

function cleanText(){
    let value = text.value;
    if (trimLines.checked){
        let lines=value.split("\n");
        for(let i=0;i<lines.length;i++){
            lines[i]=lines[i].trim();

        }
        value= lines.join("\n");

    }
    if(spaces.checked){
        value = value.replace(/[ \t]+/g," ");
    }
    if (emptyLines.checked){
        let lines = value.split("\n");
        let newLines = [];
        for(let i=0;i<lines.length;i++){
            if(lines[i].trim() !== ""){
                newLines.push(lines[i]);

            }

        }
        value= newLines.join("\n");

    }
    if (duplicateLines.checked){
        let lines = value.split("\n");
        let newLines = [];
        for (let i=0; i<lines.length; i++){
            if(!newLines.includes(lines[i])){
                newLines.push(lines[i]);
            }
        }
        value=newLines.join("\n");
    }
    if(lineBreaks.checked){
        value = value.replace(/\n+/g," ");
    }
    text.value=value;
    
}
function copyText(){
    if(text.value.trim()===""){
        alert("Nothing to copy");
        return;

    }
    navigator.clipboard.writeText(text.value);
    alert("Text copied");
    

}
function clearText(){
    text.value="";
}