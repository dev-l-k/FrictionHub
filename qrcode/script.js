const text = document.getElementById("text");
const qr = document.getElementById("qrcode");
function generateQR(){
    let value = text.value.trim();
    if (value === ""){
        alert("Enter some text first");
        return;
    }
    qr.innerHTML="";
    new QRCode(qr,{
        text:value,
        width: 220,
        height:220,
        colorDark: #000000,
        colorLight: #ffffff,
        correctLevel: QRCode.CorrectLevel.H
    });
}
function downloadQR(){
    let canvas = qr.querySelector("canvas");
    if(!canvas){
        alert("No QR Found");
        return;

    }
    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "frictionhub-qr.png";
    link.click();

}
function clearQR(){
    text.value="";
    qr.innerHTML="";
}