const passages= [
    "Small steps everyday can lead to big changes over time.",
    "Practice makes progress, so keep going even when things feel difficult.",
    "A good idea becomes useful when you turn it into action.",
    "Technology helps peoples solve problems and share knowledge around the world.",
    "Stay curious ask questions and learn something new whenever you can.",
    "The secret to getting better is to keep practicing with patience and focus.",
];
let passage = "";
let remaining = 30; 
let timer= null;
let started = false;
let finished=false;
let bestWpm = 0;
const input = document.getElementById("typingInput");
const quote = document.getElementById("quote");

function choosePassage(){
    passage = passages[Math.floor(Math.random()*passages.length)];
    quote.innerHTML="";
    [...passage].forEach((char,i)=>{
        const span = document.createElement("span");
        span.textContent=char;
        if(i===0) span.classList.add("current");
        quote.appendChild(span);
    });
}
function resetGame(){
    clearInterval(timer);
    timer= null;
    started=false;
    finished=false;
    remaining=Number(document.getElementById("duration").value);
    document.getElementById("timeLeft").textContent=remaining;
    document.getElementById("accuracy").textContent = "100%";
    document.getElementById("result").hidden = true;
    input.disabled= false;
    input.value = "";
    choosePassage();
    input.focus();
}
function startTimer(){
    started = true;
    document.getElementById("message").textContent = "Keep typing";
    timer=setInterval(()=>{
        remaining--;
        document.getElementById("timeLeft").textContent=remaining;
        updateStats();
        if(remaining<=0) endGame();
    },1000);
}
function updateStats(){
    const typed = input.value;
    let correct = 0;
    [...typed].forEach((char,i) => {
        if(char===passage[i]) correct++
    });
    const elapsed = Number(document.getElementById("duration").value)-remaining;
    const minutes = Math.max(elapsed/60,1/60);
    const wpm = Math.round((correct/5)/minutes);
    const accuracy = typed.length?Math.round((correct/typed.length)*100):100;
    document.getElementById("accuracy").textContent = `${accuracy}%`;
    document.getElementById("wpm").textContent=wpm;
    [...quote.children].forEach((span,i)=>{
        span.className="";
        if(i<typed.length){
            span.classList.add(typed[i]===passage[i]?"correct":"wrong");

        }else if(i===typed.length){
            span.classList.add("current");
        }
    });
    if(typed.length>=passage.length)endGame();

}

function endGame(){
    if(finished)return;
    finished=true;
    clearInterval(timer);
    input.disabled=true;
    document.getElementById("message").textContent="Nice work";
    const finalWpm= Number(document.getElementById("wpm").textContent);
    bestWpm= Math.max(bestWpm,finalWpm);
    document.getElementById("result").hidden=false;
    document.getElementById("finalStats").textContent=`Speed: ${finalWpm} WPM • Accuracy: ${document.getElementById("accuracy").textContent} • Best: ${bestWpm}`;
}
input.addEventListener("input", () => {
    if (finished) return;
    if (!started && input.value.length) startTimer();
    updateStats();
});
updateTime();
setInterval(updateTime,1000);
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
resetGame();