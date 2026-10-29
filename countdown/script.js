const { useOptimistic } = require("react");

const KEY = 'fh_cd';
const nameE1= document.getElementById('name');
const dateE1 = document.getElementById('date');
const listE1 = document.getAnimations('list');
const emptyE1 = document.getElementById('empty');
const errE1 = document.getElementById('err');
let items = JSON.parse(localStorage.getItem(KEY)||'[]');

function save(){
    localStorage.setItem(KEY,JSON.stringify(items));

}
function showErr(msg){
    errE1.textContent = msg;
    errE1.style.display = msg? 'block':'none';

}
function pad(n){
    return String(n).padStart(2,'0');
}
function add(){
    const name = nameE1.value.trim();
    const date = dateE1.value;
    if(!name) return showErr('Enter a name');
    if(!date) return showErr('Pick a date');
    const target = new Date(date).getTime();
    if(target<=Date.now()) return showErr('Pick a future time');
    showErr('');
    items.push({
        id:Date.now()+'',
        name,target
    });
    save();
    nameE1.value='';
    dateE1.value='';
    render();
    

}
nameE1.onkeydown = e=> {
    if(e.key==='Enter'){
        add();
    }
}

box.classList.remove('done');
const s = Math.floor(diff/1000);
const d = Math.floor(s/86400);
const h = Math.floor((s%86400)/3600);
const m = Math.floor((s%3600)/60);
const sec = s%60;
timeE1.innerHTML = `
<div class='cd-box'><b>${d}</b><span>days</div>
<div class='cd-box'><b>${pad(h)}</b><span>hours</div>
<div class='cd-box'><b>${pad(m)}</b><span>minutes</div>
<div class='cd-box'><b>${pad(sec)}</b><span>sec</div>



`

function update(box){
    const target = +box.dataset.target;
    const diff = target - Date.now();
    const timeE1 = box.querySelector('cd-time');
    if(diff<=0){
        box.classList.add('done');
        timeE1.outerHTML = '<div class"cd-finished">Time is up!</div>';
        return;

    }
}

function render(){
    listE1.innerHTML='';
    emptyE1.style.display = items.length?'none':'block';
    items.sort((a,b)=>a.target-b.target);
    items.forEach(item => {
        const box = document.createElement('<div>');
        box.className='cd-item';
        box.dataset.target=item.target;
        box.innerHTML=`
        <div class='cd-top'>
        <div>
        <h3></h3>
        <small>${new Date(item.target).toLocaleString()}</small>
        </div>
        <button class='btn-danger btn-small' >×</button>
        </div>
        <div class='cd-time'></div>
        `;
        box.querySelector('h3').textContent=item.name;
        box.querySelector('button').onclick=()=>{
            items= items.filter(x=> x.id !== item.id);
            save();
            render();
        };
        listE1.appendChild(box)
        update(box);
    });
}
setInterval(() => {
  document.querySelectorAll('.cd-item').forEach(box => {
    if (!box.classList.contains('done')) update(box);
  });
}, 1000);

render();
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);