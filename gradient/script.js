const $ = id => document.getElementById(id);
const presets=[
["#7c3aed","#06b6d4"],
["#f43f5e","#f97316"],
["#22c55e","#14b8a6"],
["#3b82f6","#9333ea"],
["#f59e0b","#ef4444"],
["#111827","#4b5563"],
["#ec4899","#8b5cf6"],
["#0f766e","#a3e635"]
];
function gradient(){
    let a = $("color1").value,b=$("color2").value;
    let deg = $("angle").value;
    let css = $("type").value === "linear"?`linear-gradient(${deg}deg, ${a}, ${b})`: `radial-gradient(circle, ${a}, ${b})`;
    $("preview").style.background=css;
    $("css").textContent = `background: ${css};`;
    $("angleValue").textContent=deg+"°";
}
$("presets").innerHTML=presets.map((p,i)=>`
<button class="preset" aria-label="Gradient preset ${i+1}"
style="background:linear-gradient(135deg,${p[0]},${p[1]})"
onclick="setPreset(${i})"></button>`).join("");

function setPreset(i){
    $("color1").value=presets[i][0];
    $("color2").value=presets[i][1];
    gradient();
}
async function copyCSS(){
    try{
        await navigator.clipboard.writeText($("css").textContent);
        document.querySelector(".output .btn-primary").textContent="Copied!";
        setTimeout(()=>document.querySelector(".output .btn-primary").textContent="Copy CSS",1500);
    }catch{
        alert("Copy failed. Please copy the CSS manually.");
    }
}
["color1","color2","angle","type"].forEach(id=>
$(id).addEventListener("input",gradient)
);
gradient();
function updateClock() {
    $("time").textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();