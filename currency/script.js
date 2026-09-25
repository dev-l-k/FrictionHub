const api = "https://api.frankfurthur.dev/v2";
const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const error = document.getElementById("error");
let currencies =[];
async function load() {
    try{
        let response = await fetch(api+"/currencies");
        currencies = await response.json();
        for(let currency of currencies){
            let text = currency.iso_code+"_"+currency.name;
            from.innerHTML += `<option value="${currency.iso_code}">${text}</option>`;
            to.innerHTML += `<option value="${currency.iso_code}">${text}</option>`;
            from.value = "USD";
            to.value = "INR";
            convert();
            
        }
    }catch{
            error.textContent="Could not load datas";

        
    }
}
async function convert() {
    let value = Number(amount.value);
    if(value<0||isNaN(value)){
        error.textContent = "Enter a valid amount.";
        return;
    }
    error.textContent="";
    if(from.value === to.value){
        showWeather(value,1,"Today");
        return;
    }
    result.innerHTML=`
    <p>Converting</p>`;
    try{
        let response = await fetch(api+'/rate/'+from.value.toLowerCase()+'/'+to.value.toLowerCase());
        let data = await response.json();
        showWeather(value*data.rate,data.rate,data.date);

    }catch{
        error.textContent = "Could not get rates";
        result.innerHTML=""; 
    }
    
}

function show(value, rate, date) {

    result.innerHTML = `
        <div class="result">
            <div class="amount">
                ${value.toFixed(2)} ${to.value}
            </div>

            <p class="muted">
                1 ${from.value} =
                ${rate.toFixed(4)} ${to.value}
            </p>

            <small class="muted">
                Rate date: ${date}
            </small>
        </div>
    `;
}


function swap() {

    let old = from.value;

    from.value = to.value;
    to.value = old;

    convert();
}


load();

