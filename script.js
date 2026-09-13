const search = document.getElementById('search');
const cards = document.querySelectorAll('.app-card');

search.addEventListener('input',function() {
    const value = search.value.toLowerCase();
    cards.forEach(function (card){
        const text = card.textContent.toLowerCase();
        if (text.includes(value)){
            card.style.display = '';
        }else{
            card.style.display = 'none';
        }
    });
});

function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);

