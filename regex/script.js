let pattern = document.getElementById('pattern');
let text = document.getElementById('testText');
let out = document.getElementById('out');
let stat= document.getElementById('status');
let gBox = document.getElementById('groupsBox');
let gList = document.getElementById('groupList');
let g = document.getElementById("flagG");
let i = document.getElementById("flagI");
let m = document.getElementById("flagM");
let s = document.getElementById('flagS');

pattern.oninput = run;
text.oninput = run;
g.onchange = run;
i.onchange = run;
m.onchange = run;
s.onchange = run;

function esc(x){
    let out = x;
    out = out.split("&").join("&amp;");
    out = out.split("<").join("&lt;");
    out = out.split(">").join("&gt;");
    return out;
}

function run(){
    let pat = pattern.value;
    let txt = text.value;
    let fl = "";

    gBox.style.display = "none";
    gList.innerHTML = "";

    if (pat == ""){
        out.innerHTML = "";
        stat.innerHTML = "Waiting for a pattern...";
        return;
    }

    if (g.checked) fl = fl + "g";
    if (i.checked) fl = fl + "i";
    if (m.checked) fl = fl + "m";
    if (s.checked) fl = fl + "s";

    let re;
    try {
        re = new RegExp(pat, fl);
    } catch(e){
        out.innerHTML = "";
        stat.innerHTML = '<span class="err">Bad regex: ' + esc(e.message) + '</span>';
        return;
    }

    if (txt == ""){
        out.innerHTML = "";
        stat.innerHTML = "Pattern ok. Add some text.";
        return;
    }
    let hits = [];
    let mm;
    let guard = 0;

    while ((mm = re.exec(txt)) != null){
        hits.push(mm);
        if (!g.checked) break;
        if (guard++ > 5000) break;          // just in case, dont freeze the tab
        if (mm[0] == "") re.lastIndex++;    // empty match, step forward
    }

    if (hits.length == 0){
        out.innerHTML = esc(txt);
        stat.innerHTML = "No matches";
        return;
    }

    let html = "";
    let pos = 0;

    for (let k = 0; k < hits.length; k++){
        let h = hits[k];
        html += esc(txt.substring(pos, h.index));

        let cls = "match";
        if (k % 2 == 1) cls = "match odd";
        html += '<span class="' + cls + '">' + esc(h[0]) + '</span>';

        pos = h.index + h[0].length;
    }
    html += esc(txt.substring(pos));
    out.innerHTML = html;

    if (hits.length == 1){
        stat.innerHTML = "1 match";
    } else {
        stat.innerHTML = hits.length + " matches";
    }

    showGroups(hits[0]);
}
function showGroups(a){
    if(a.length<=1) return;
    gBox.style.display="block";
    for(let k = 1; k<a.length;k++){
        let row = document.createElement('div');
        row.className = "grow";
        let lbl = document.createElement("b");
        lbl.innerHTML="$"+k;
        let v = document.createElement('span');
        if(a[k] === undefined){
            v.className="none";
            v.innerHTML="not matched";
        }else{
            v.innerHTML = a[k];
        }
        row.appendChild(lbl);
        row.appendChild(v);
        gList.appendChild(row);


    }
}

function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);