const api = "https://api.frankfurter.dev/v1";
const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const error = document.getElementById("error");
const timeDisplay = document.getElementById("time");

function updateTime() {
    if (timeDisplay) {
        timeDisplay.textContent = new Date().toLocaleTimeString();
    }
}
setInterval(updateTime, 1000);
updateTime();

async function load() {
    try {
        let response = await fetch(`${api}/currencies`);
        if (!response.ok) throw new Error("Failed to fetch currencies");
        
        let currencies = await response.json(); 
        let options = "";
        for (const [code, name] of Object.entries(currencies)) {
            options += `<option value="${code}">${code} - ${name}</option>`;
        }

        from.innerHTML = options;
        to.innerHTML = options;

    
        from.value = "USD";
        to.value = "INR";

        convert();
    } catch (err) {
        error.textContent = "Could not load currency list.";
        console.error(err);
    }
}

async function convert() {
    let value = Number(amount.value);

    if (value <= 0 || isNaN(value)) {
        error.textContent = "Enter a valid amount.";
        result.innerHTML = "";
        return;
    }
    
    error.textContent = "";

    if (from.value === to.value) {
        show(value, 1, new Date().toISOString().split("T")[0]);
        return;
    }

    result.innerHTML = `<p class="muted">Converting...</p>`;

    try {
        let response = await fetch(`${api}/latest?amount=${value}&from=${from.value}&to=${to.value}`);
        if (!response.ok) throw new Error("Conversion failed");
        
        let data = await response.json();
        let rate = data.rates[to.value] / value;
        let convertedAmount = data.rates[to.value];

        show(convertedAmount, rate, data.date);
    } catch {
        error.textContent = "Could not retrieve exchange rates.";
        result.innerHTML = "";
    }
}

function show(value, rate, date) {
    result.innerHTML = `
        <div class="result">
            <div class="amount">
                ${value.toFixed(2)} ${to.value}
            </div>
            <p class="muted">
                1 ${from.value} = ${rate.toFixed(4)} ${to.value}
            </p>
            <small class="muted">
                Rate date: ${date}
            </small>
        </div>
    `;
}

function swap() {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    convert();
}

load();


