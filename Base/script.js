const textMode = document.getElementById("textMode");
const imageMode = document.getElementById("imageMode");
const input = document.getElementById("input");
const result = document.getElementById('result');
const imageInput = document.getElementById("imageBase64");
const preview = document.getElementById("preview");
const status = document.getElementById("status");
function showText(){
    textMode.classList.remove("hidden");
    imageMode.classList.add("remove");
    status.textContent = "";
}
function showImage(){
    textMode.classList.add("hidden");
    imageMode.classList.remove("hidden");
    status.textContent ="";

}
function encodeBase64(){
    if(input.value === ""){
        status.textContent = "Enter some text first.";
        status.className = "status error";
        return;

    }
    try{
        result.value = btoa(unescape(encodeURIComponent(input.value)));
        status.textContent = "Text Encoded Successfully";
        status.textContent = "status success";
    }catch{
        status.textContent="Could not encode to base 64";
        status.className="status error";
    }
}
function decodeBase64(){
    if(input.value === ""){
        status.textContent = "Enter some Base64 first.";
        status.className = "status error";
        return;

    }
    try{
        result.value = decodeURIComponent(escape(atob(input.value.trim())));
        status.textContent="Base64 decoded Sucessfully ";
        status.className="status success";
    }catch{
        result.value="";
        status.textContent="Invalid Base64";
        status.className="status error";

    }
}
function copyResult(){
    if(result.value === ""){
        alert("Nothing to copy");
        return;
    }
    navigator.clipboard.writeText(result.value);
    alert("Result copied");
}
function clearAll(){
    input.value = "";
    result.value = "";
    status.textContent = "";

}

function imageToBase64(){
    let file  = imageInput.files[0];
    if (!file){
        status.textContent = "Select an image first";
        status.className="status error";
        return;
    }
    let reader = new FileReader();
    reader.onload = function(){
        imageToBase64.value = reader.result;
        preview.src = reader.result;
        preview.style.display="block";
        status.textContent = "Image converted to Base64";
        status.className="status success";
    };
    reader.readAsDataURL(file);

}
function base64ToImage(){
    let value = imageToBase64.value.trim();

}
function base64ToImage() {

    let value = imageBase64.value.trim();

    if (value === "") {
        status.textContent =
            "Paste Base64 image data first.";

        status.className = "status error";

        return;
    }

    try {

        if (!value.startsWith("data:image/")) {
            value = "data:image/png;base64," + value;
        }

        preview.src = value;
        preview.style.display = "block";

        status.textContent =
            "Base64 converted to image.";

        status.className = "status success";

    } catch {

        status.textContent =
            "Invalid image Base64.";

        status.className = "status error";

    }

}


function copyImageBase64() {

    if (imageBase64.value === "") {
        alert("Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(
        imageBase64.value
    );

    alert("Base64 copied!");

}


function clearImage() {

    imageInput.value = "";
    imageBase64.value = "";
    preview.src = "";
    preview.style.display = "none";
    status.textContent = "";

}


