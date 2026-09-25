const json = document.getElementById("json");
const result = document.getElementById('result');
const status = document.getElementById('status');

function formatJSON(){
    if(json.value.trim() === ''){
        status.textContent = "Enter some JSON first ";
        status.className = "status error";
        return;
    }
    try{
        let data = JSON.parse(json.value);
        result.value = JSON.stringify(data,null,4);
        status.textContent = "Valid JSON";
        status.className = "status success";
    }catch(error){
        result.value="";
        status.textContent = "Invalid JSON" + error.message;
        status.className = "status error";
    }
}
function minifyJSON(){
    if(json.value.trim() === ""){
        status.textContent = "Enter some JSON";
        status.className = "status error";
        return;

    }
    try{
        let data = JSON.parse(json.value);
        result.value=JSON.stringify(data);
        status.textContent="Valid JSON";
        status.className = "status success";
    }catch(error){
        result.value="";
        status.textContent="Invalid JSON"+error.message;
        status.className="status error";
    
    }
}
function copyJSON(){
    if (result.value === ""){
        status.textContent="Nothing to copy";
        return;
    }
    navigator.clipboard.writeText(result.value);
    alert("JSON copied");
    
}
function clearJSON(){
    json.value = "";
    result.value = "";
    status.textContent = "";
}
function loadDemo(){
    json.value = `
    {
    "name": "Alex",
    "age": 25,
    "email": "alex@example.com",
    "isActive": true,
    "skills": [
        "JavaScript",
        "HTML",
        "CSS"
    ],
    "address": {
        "city": "London",
        "country": "UK"
    },
    "projects": [
        {
            "name": "FrictionHub",
            "status": "active"
        },
        {
            "name": "My Website",
            "status": "completed"
        }
    ]
}
    `;
}
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);