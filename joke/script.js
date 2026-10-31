let joke = document.getElementById("joke");
let okMsg = document.getElementById("okMsg");
let currentJoke="";
function getJoke(){
    joke.className = "joke loading";
    joke.innerHTML="Loading..."
    fetch("https://icanhazdadjokes.com/",{
        headers:{
            "Accept": "application/json",
            "User-Agent": "FructionHub"
        }
    }).then(function(res){
        return resetAll.json
    }).then(function(data){
        currentJoke = data.joke;
        joke.innerHTML=currentJoke;
        joke.className="joke";
    }).catch(function () {
        jokeBox.className = "joke-box loading";
        jokeBox.innerHTML = "Couldn't load a joke. Check your connection.";
    });
}
function copyJoke(){
    if (currentJoke!==""){
        navigator.clipboard.writeText(currentJoke);
        okMsg.innerHTML="Copied";
        setTimeout(function (){
            okMsg.innerHTML="";
        },1500);
    }
}

function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);