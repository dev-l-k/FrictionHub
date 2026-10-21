const $ = id => document.getElementById(id);
const STORAGE_KEY="frictionhub-planner";
let allTasks ={};
let tasks = [];
function localeDateString(date=new Date()){
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime()-offset*60000).toISOString().slice(0,10);

}

function loadTasks(){
    try{
        allTasks = JSON.parse(localStorage.getItem(STORAGE_KEY))|| {};
        if(!allTasks||typeof allTasks !== "object"||Array.isArray(allTasks)){
            allTasks={};
        }
    }catch{
        allTasks={};
    }
}

function saveTasks(){
    try{
        allTasks[$("planDate").value]=tasks;
        localStorage.setItem(STORAGE_KEY,JSON.stringify(allTasks));
    }catch{
        alert("Could not save tasks");

    }
    
}

function loadDay(){
    tasks=Array.isArray(allTasks[$("planDate").value])?allTasks[$("planDate").value]:[];
    render();
}
function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}
function render() {
    const completed = tasks.filter(task => task.done).length;
    const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;

    $("totalTasks").textContent = tasks.length;
    $("completedTasks").textContent = completed;
    $("progressText").textContent = percent + "%";
    $("progressFill").style.width = percent + "%";

    const status = $("filterStatus").value;
    const priority = $("filterPriority").value;

    const visible = tasks
        .filter(task => status === "all" ||
            (status === "active" && !task.done) ||
            (status === "done" && task.done))
        .filter(task => priority === "all" || task.priority === priority)
        .slice()
        .sort((a, b) => {
            if (a.done !== b.done) return Number(a.done) - Number(b.done);
            if (!a.time) return b.time ? 1 : 0;
            if (!b.time) return -1;
            return a.time.localeCompare(b.time);
        });

    if (!visible.length) {
        $("taskList").innerHTML =
            '<div class="empty">No tasks here yet. Add a task to plan your day.</div>';
        return;
    }
    $("taskList").innerHTML = visible.map(task => `
        <div class="task ${task.done ? "done" : ""}">
            <input class="task-check" type="checkbox"
                aria-label="Mark ${escapeHTML(task.title)} completed"
                ${task.done ? "checked" : ""}
                onchange="toggleTask('${task.id}')">
            <div class="task-info">
                <div class="task-title">${escapeHTML(task.title)}</div>
                <div class="task-meta">${task.time ? escapeHTML(task.time) + " · " : ""}Daily task</div>
            </div>
            <span class="priority ${escapeHTML(task.priority)}">${escapeHTML(task.priority)}</span>
            <button class="delete-btn" type="button"
                aria-label="Delete ${escapeHTML(task.title)}"
                onclick="deleteTask('${task.id}')">Delete</button>
        </div>
    `).join("");
}
$("taskForm").addEventListener("submit",event=>{
    event.preventDefault();
    const title = $("taskTitle").value.trim();
    if(!title)return;
    tasks.push({
        id:Date.now().toString(36)+Math.random().toString(36).slice(2,8),title,
        time:$("taskTime").value,
        priority:$("taskPriority").value,
        done:false
    });
    saveTasks();
    $("taskTitle").value = "";
    $("taskTime").value = "";
    $("taskPriority").value = "Medium";
    render();
    $("taskTitle").focus();

});

function toggleTask(id){
    const task = tasks.find(task=>task.id===id);
    if(!task)return;
    task.done=!task.done;
    saveTasks();
    render();
    
}
function deleteTask(id){
    tasks=tasks.filter(task=>task.id!==id);
    saveTasks();
    render();
}
function clearCompleted() {
    if (!tasks.some(task => task.done)) return;
    tasks = tasks.filter(task => !task.done);
    saveTasks();
    render();
}

$("planDate").value = localeDateString();
$("planDate").addEventListener("change", loadDay);
$("filterStatus").addEventListener("change", render);
$("filterPriority").addEventListener("change", render);
loadTasks();
loadDay();
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);