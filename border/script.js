const box = document.getElementById('box');
const css = document.getElementById('css');
const ok = document.getElementById('ok');
const timeEl = document.getElementById('time');


const inputs = ['x','y','blur','spread','opacity','radius','color'];
const fields = {};
inputs.forEach(id => fields[id] = document.getElementById(id));

function hexToRgba(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function update() {
    const x = Number(fields.x.value);
    const y = Number(fields.y.value);
    const blur = Number(fields.blur.value);
    const spread = Number(fields.spread.value);
    const radius = Number(fields.radius.value);
    const opacity = Number(fields.opacity.value) / 100;

    const color = hexToRgba(fields.color.value, opacity);
    const shadow = `${x}px ${y}px ${blur}px ${spread}px ${color}`;

    box.style.boxShadow = shadow;
    box.style.borderRadius = radius + 'px';

    document.getElementById('xLbl').textContent = x + 'px';
    document.getElementById('yLbl').textContent = y + 'px';
    document.getElementById('blurLbl').textContent = blur + 'px';
    document.getElementById('spreadLbl').textContent = spread + 'px';
    document.getElementById('opacityLbl').textContent = opacity.toFixed(2);
    document.getElementById('radiusLbl').textContent = radius + 'px';

    css.textContent = `box-shadow: ${shadow};\nborder-radius: ${radius}px;`;
}

inputs.forEach(id => {
    fields[id].addEventListener('input', update);
});
document.getElementById('copy').addEventListener('click',()=>{
    navigator.clipboard.writeText(css.textContent).then(()=>{
        ok.textContent="Copied";
        setTimeout(()=>{
            ok.textContent='';
        },2500)
    });
});
function reset(){
    fields.x.value=10;
    fields.y.value = 10;
    fields.spread.value = 0;
    fields.opacity.value = 30;
    fields.radius.value = 16;
    fields.color.value='#000000';
    fields.blur.value = '20';
    update();
}
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);