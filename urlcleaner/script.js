
const url = document.getElementById("url");
const result = document.getElementById("result");
function cleanURL(){
    let value = url.value.trim();
    if(value===""){
        alert("Paste a URL first");
        return;
    }
    try{
        let link= new URL(value);
        let remove = [
            "utm_source",
            "utm_medium",
            "utm_campaign",
            "utm_term",
            "utm_content",
            "utm_id",
            "fbclid",
            "gblid",
            "dclid",
            "msclkid",
            "mc_cid",
            "mc_eid"
        ];
        for(let name of remove){
            link.searchParams.delete(name);

        }
        result.value = link.toString();

    }catch(error){
        alert("Please Enter a valid URL");
    }
}
function copyURL(){
    if(result.value === ""){
        alert("Clean a URL first");
        return;
    }
    navigator.clipboard.writeText(result.value);
    alert("URL copied");
}
function clearURL(){
    url.value = "";
    result.value = "";
}
function loadDemo(){
    url.value ="https://example.com/products/shoes?utm_source=google&utm_medium=cpc&utm_campaign=sale&fbclid=abc123&color=black";
}