let items = JSON.parse(localStorage.getItem('shoppingList')) || [];
const itemInput = document.getElementById("itemInput");
const quantityInput = document.getElementById("quantityInput");
const shoppingList = document.getElementById("shoppingList");
const empty = document.getElementById("empty");
const itemCount = document.getElementById("itemCount");

function saveItems(){
    localStorage.setItem("shoppingList",JSON.stringify(items));
}
function addItem(){
    let name = itemInput.value.trim();
    let quantity = quantityInput.value.trim()||"1";
    if (name==="") return;
    items.unshift({
        id:Date.now(),
        name:name,
        quatity:quantity,
        bought:false
    });
    itemInput.value="";
    quantityInput.value = "";
    saveItems();
    showItems();
    itemInput.focus();
}
function showItems(){
    shoppingList.innerHTML="";
    if (items.length === 0){
        empty.style.display="block";
        itemCount.textContent="0 items";
        return;
    }
    empty.style.display= "none";
    for(let item of items){
        shoppingList.innerHTML += `
        <div class="list-item shopping-item">
        <input type="checkbox" ${item.bought?"checked":""} onchange="toggleItem(${item.id})">
        <span class = "item-name ${item.bought?"bought":""}">${item.name} × ${item.quatity} </span>
        <button class = "btn-danger btn-small" onclick="deleteItem(${item.id})">Delete</button>
        </div>

        `;
    }
    let bought = items.filter(item => item.bought).length;
    itemCount.textContent = `${items.length} items • ${bought}`;
}
function toggleItem(id){
    let item = items.find(item=>item.id === id);
    if(item){
        item.bought = !item.bought;

    }
    saveItems();
    showItems();

}
function deleteItem(id){
    items = items.filter(item => item.id !== id);
    saveItems();
    showItems();

}
function clearBought(){
    items = items.filter(item => !item.bought);
    saveItems();
    showItems();

}
function clearAll(){
    if (confirm("Clear the shopping list")){
        items = [];
        saveItems();
        showItems();
    }
}
function checkEnter(event){
    if (event.key === "Enter"){
        addItem();
    }
}
function downloadPDF(){
    if(items.length === 0){
        alert("Your list is empty");
        return;
    }
    window.print();
}
showItems();