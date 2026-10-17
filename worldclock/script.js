const $=id=>document.getElementById(id);
const cities={
    "New York":"America/New_York",
    "London":"Europe/London",
    "Tokyo":"Asia/Tokyo",
    "Dubai":"Asia/Dubai",
    "Singapore":"Asia/Singapore",
    "Delhi":"Asia/Kolkata",
    "Sydney": "Australia/Sydney",
    "Los Angeles":"America/Los_Angeles",
    "Paris":"Europe/Paris",
    "Berlin":"Europe/Berlin",
    "Toronto":"America/Toronto",
    "Bangkok":"Asia/Bangkok",
    "Seoul":"Asia/Seoul",
    "Honolulu":"Pacific/Honolulu",
    "Cairo":"Africa/Cairo",
    "Johannesburg":"Africa/Johannesburg",
    "Auckland":"Pacific/Auckland",
    "Kathamandu":"Asia/Kathmandu",
    "Karachi":"Asia/Karachi",
    "Dhaka":"Asia/Dhaka",
    "Jakarta":"Asia/Jakarta",
    "Hong Kong":"Asia/Hong_Kong",
    "Rome": "Europe/Rome",
    "Vancouver":"America/Vancouver"

};
let selected = [
    {name:"New York",zone:cities["New York"]},
    {name:"London",zone:cities.London},
    {name:"Tokyo",zone:cities.Tokyo},
    {name:"Delhi",zone:cities.Delhi}

];

$("cities").innerHTML=Object.keys(cities).map(c=>`<option value="${c}">`).join("");

function esc(s){
    return String(s).replace(/[&<>"']/g,c=>({
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
}
function addCity(){
    let name = $("search").value.trim();
    let match = Object.keys(cities).find(c=>c.toLowerCase()===name.toLowerCase());
    if(!match){
        alert("Choose a city from the suggestions.");return;
    }
    if(selected.some(c=>c.zone===cities[match])){
        alert("This time zone is already added.");return;
    }
    selected.push({
        name:match,zone:cities[match]
    });
    $("search").value="";
    render();
}
function removeCity(index){
    selected.splice(index,1);
    render();
}
function render(){
    $("clocks").innerHTML = selected.map((c,i)=>`
    <div class="clock-card">
    <button class="remove" onclick="removedCity(${i})" aria-label="Remove ${esc(c.name)}">×</button>
    <h3>${esc(c.name)}</h3>
    <div class="time-display" id="time${i}">--:--:--</div>
    <p class="date" id="date${i}">--</p>
    <p class="zone">${esc(c.zone)}</p>
    </div>
    `).join("");
    updateClocks();
}
function updateClocks(){
    const format = $("format").value === "12";
    const now = new Date();
    $("headerTime").textContent = now.toLocaleTimeString([],{
        hour:"2-digit",minute:"2-digit"});
        selected.forEach((c,i)=>{
            try{
                $("time"+i).textContent = now.toLocaleTimeString("en-GB",{
                    timeZone:c.zone,hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:format
                });
                $("date"+i).textContent=now.toLocaleDateString("en-US",{
                    timeZone:c.zone,
                    weekday:"long",year:"numeric",month:"short",day:"numeric"
                });
            }catch{}
        });
    }
$("format").addEventListener("change",updateClocks);
render();
setInterval(updateClocks,1000);

