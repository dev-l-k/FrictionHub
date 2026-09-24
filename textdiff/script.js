const oldText = document.getElementById("oldText");
const newText = document.getElementById("newText");
const result = document.getElementById("result");

function compareText(){
    let oldLines = oldText.value.split("\n");
    let newLines = newText.value.split("\n");
    let changes = getChanges(oldLines,newLines);
    result.innerHTML="";
    for (let change of changes){
        if(change.type === "same"){
            addLine("same","  " + change.text);
        }
        if(change.type === "removed"){
            addLine("removed","- "+ change.text);
        }
        if(change.type === "added"){
            addLine("added", "+ "+ change.text);
        }
    }



}
function getChanges(oldLines, newLines){
    let table = [];
    for(let i=0;i<=oldLines.length; i++){
        table[i]= [];
        for (let j =0; j<=newLines.length;j++){
            table[i][j] = 0;

        }
    }
    for(let i = oldLines.length-1; i>=0; i--){
        for (let j= newLines.length-1; j>=0;j--){
            if (oldLines[i] === newLines[j]){
                table[i][j] = table[i+1][j+1]+1;
            }else{
                table[i][j] = Math.max(table[i+1][j],table[i][j+1]);
            }

        }
    }
let changes = [];
let i=0;
let j=0;
while(i<oldLines.length && j<newLines.length){
    if(oldLines[i] === newLines[j]){
        changes.push({
            type:"same",
            text:oldLines[i]
        });
        i++;
        j++;

    }else if(table[i+1][j] >= table[i][j+1]){
        changes.push({
            type:"removed",
            text: oldLines[i]
        });
        i++;

    }else{
        changes.push({
            type:"added",
            text: newLines[j]
        });
        j++;

    }
}
while(i<oldLines.length){
    changes.push({
        type:"removed",
        text: oldLines[i]
    });
    i++;
}
while(j<newLines.length){
    changes.push({
        type: "added",
        text:newLines[j]
    });
    j++;
}
return changes;
}
function addLine(type, text) {
    let line = document.createElement("div");
    
    line.className = "diff-line " + type;
    line.textContent = text;
    
    result.appendChild(line);
}
  
function copyResult() {
    if (result.innerText.trim() === "") {
      alert("Nothing to copy");
      return;
    }
    
    navigator.clipboard.writeText(result.innerText);
    alert("Result copied!");
}
  
function clearAll() {
    oldText.value = "";
    newText.value = "";
    result.innerHTML = "";
}


