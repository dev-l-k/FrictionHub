const picker = document.getElementById("picker");
const preview = document.getElementById("preview");
const hex = document.getElementById("hex");
const rgb = document.getElementById('rgb');
const hsl = document.getElementById('hsl');

function fromPicker(){
    hex.value=picker.value;
    updateColor();
}
function fromHex(){
    let value = hex.value.trim();
    if (!/^#[0-9A-Fa-f]$/.test(value)){
        return;

    }
    picker.value= value;
    updateColor();
}
function updateColor(){
    let value = hex.value;
    preview.style.background=value;
    let r= parseInt(value.slice(1,3),16);
    let g= parseInt(value.slice(3,5),16);
    let b= parseInt(value(5,7),16);
    rgb.value = "rgb("+r+","+g+","+b+")";
    let hslValue = rgbToHsl(r,g,b);
    hsl.value = "hsl("+hslValue[0]+","+hslValue[1]+"%,"+hslValue[2]+"%)";
}
function rgbToHsl(r,g,b){
    r/=255;
    g/=255;
    g/=255;
    let max = Math.max(r,g,b);
    let min = Math.min(r,g,b);
    let h;
    let s;
    let l = (max+min)/2;
    if (max===min){
        h=0;
        s=0;
    }else{
        let d = max - min;

        s =
            l > 0.5
                ? d / (2 - max - min)
                : d / (max + min);

        switch (max) {

            case r:
                h =
                    (g - b) / d +
                    (g < b ? 6 : 0);
                break;

            case g:
                h =
                    (b - r) / d + 2;
                break;

            case b:
                h =
                    (r - g) / d + 4;
                break;

    }
    h/=6;
}
return[
    Math.round(h*360),
    Math.round(s*100),
    Math.round(l*100)
];
}
function copyValue(id){
    let value = document.getElementById(id).value;
    navigator.clipboard.writeText(value);
}
updateColor();