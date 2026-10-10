const $ = id => document.getElementById(id);
const modes = document.querySelectorAll(".mode");
const durations = {focus:25,short:5,long:15};
let mode = "focus",remaining = 1500,total = 1500;
let timer = null,endTime=null, sessions=0;
function clock(){
    $("clock").textContent=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});
}
function render(){
    const min = Math.floor(remaining/60);
    const sec = remaining%60;
    $("display").textContent=`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
    $("bar").style.width = `${remaining/total*100}`;
}
function stop(){
    clearInterval(timer);
    timer = endTime = null;
    $("start").textContent="Start";
}
function setMode(next){
    stop();
    mode = next;
    total= remaining = durations[mode]*60;
    modes.forEach(b=>b.classList.toggle("active",b.dataset.mode === mode));
    $("status").textContent = mode === "focus"?"Ready to focus":"Time to recharge";
    render();

}
function tick(){
    remaining = Math.max(0,Math.ceil((endTime-Date.now())/1000));
    render();
    if(!remaining){
        stop();
    }
    if (mode === "focus"){
        sessions++;
        $("sessions").textContent = sessions;
        const next = mode==="focus"?(sessions%4===0?"long":"short"):"focus";
        setMode(next);
        $("status").textContent = "Session complete!";
    }
}
$("start").onclick = () => {
    if(timer){
        stop();
        $("status").textContent = "Timer paused";
        return;
    }
    endTime = Date.now + remaining*1000;
    $("start").textContent = "Pause";
    $("status").textContent = "Timer running";
    timer = setInterval(tick,250);

};