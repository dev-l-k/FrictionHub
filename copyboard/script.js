const title = document.getElementById("title");
const content = document.getElementById("content");
const search = document.getElementById("search");
const board = document.getElementById("board");
const empty = document.getElementById("empty");

let items = JSON.parse(localStorage.getItem("copyboard")) || [];

function saveNote(){
    if (!title.value.trim() || !content.value.trim()){
        alert("Enter title and text");
        return;
    }
    items.unshift({
        id:Date.now(),
        title:title.value,
        content:content.value
    });
    localStorage.setItem("copyboard",JSON.stringify(items));
    title.value="";
    content.value="";
    showNotes();
}
function showNotes(){
    let searchText = search.value.toLowerCase();
    board.innerHTML = "";
    let found = false;
    for (let i = 0; i<items.length;i++){
        let item = items[i];
        if (item.title.toLowerCase().includes(searchText)||item.content.toLowerCase().includes(searchText)){
            found = true;
            board.innerHTML += `
            <div class="list-item">
            <div>
            <h2>${item.title}</h3>
            <p>${item.content}</p>
            </div>
            <div class="actions">
            <button class="btn-primary btn-small" onclick="copyNote(${item.id})">Copy</button>
            <button class="btn-danger btn-small" onclick="deleteNote(${item.id})">Delete</button>
            </div>
            </div>
            `;
        }
    }
    if(found){
        empty.style.display='none';
    }else{
        empty.style.display='block';
    }
}

function copyNote(id){
    for (let i =0;i<items.length;i++){
        if (items[i].id === id){
            navigator.clipboard.writeText(items[i].content);
            alert("Text copied to clipboard");
            break;
        }
    }
}
function deleteNote(id){
    items = items.filter(function(item){
        return item.id !== id;
    });
    localStorage.setItem("copyboard",JSON.stringify(items));
    showNotes();
}
search.oninput = showNotes;
showNotes();
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);
