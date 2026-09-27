const code = document.getElementById("code");
const language = document.getElementById("language");
const indent = document.getElementById("indent");
const status = document.getElementById("status");

function formatCode() {
  if (code.value.trim() === "") {
    status.textContent = "Enter some code first.";
    status.className = "status error";
    return;
  }

  try {
    let type = language.value;
    if (type === "json") {
      formatJSON();
    } else if (type === "javascript") {
      formatJavaScript();
    } else if (type === "html") {
      formatHTML();
    } else if (type === "css") {
      formatCSS();
    }
    status.textContent = " Code formatted";
    status.className = "status success";
  } catch (error) {
    status.textContent = " Could not format code.";
    status.className = "status error";
  }
}

function formatJSON() {
  let data = JSON.parse(code.value);
  code.value = JSON.stringify(data, null, Number(indent.value));
}

function formatJavaScript() {
  let value = code.value;
  value = value
    .replace(/\s*\{\s*/g, " {\n")
    .replace(/\s*\}\s*/g, "\n}")
    .replace(/;\s*/g, ";\n")
    .replace(/,\s*/g, ", ")
    .replace(/\n\s*\n/g, "\n");
  code.value = addIndent(value);
}

function formatCSS() {
  let value = code.value;
  value = value
    .replace(/\s*\{\s*/g, " {\n")
    .replace(/;\s*/g, ";\n")
    .replace(/\s*\}\s*/g, "\n}\n")
    .replace(/\s*:\s*/g, ": ");
  code.value = addIndent(value);
}

function formatHTML() {
  let value = code.value;
  value = value.replace(/>\s*</g, ">\n<").trim();
  let lines = value.split("\n");
  let result = [];
  let level = 0;

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("</")) {
      level--;
    }
    result.push(" ".repeat(Math.max(0, level) * Number(indent.value)) + line);
    if (
      line.startsWith("<") &&
      !line.startsWith("</") &&
      !line.startsWith("<!") &&
      !line.endsWith("/>") &&
      !line.includes("</")
    ) {
      level++;
    }
  }
  code.value = result.join("\n");
}

function addIndent(value) {
  let lines = value.split("\n");
  let level = 0;
  let result = [];

  for (let line of lines) {
    line = line.trim();
    if (line.startsWith("}")) {
      level--;
    }
    result.push(" ".repeat(Math.max(0, level) * Number(indent.value)) + line);
    if (line.endsWith("{")) {
      level++;
    }
  }
  return result.join("\n");
}

function minifyCode() {
  if (code.value.trim() === "") {
    status.textContent = "Enter some code first.";
    status.className = "status error";
    return;
  }

  try {
    if (language.value === "json") {
      let data = JSON.parse(code.value);
      code.value = JSON.stringify(data);
    } else {
      code.value = code.value
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .replace(/\s+/g, " ")
        .replace(/\s*([{}();,:])\s*/g, "$1")
        .trim();
    }
    status.textContent = " Code minified";
    status.className = "status success";
  } catch (error) {
    status.textContent = "✕ Could not minify code.";
    status.className = "status error";
  }
}

function copyCode() {
  if (code.value.trim() === "") {
    alert("Nothing to copy");
    return;
  }
  navigator.clipboard.writeText(code.value);
  alert("Code copied!");
}

function clearCode() {
  code.value = "";
  status.textContent = "";
}
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    clock.textContent = time;
}
updateTime();
setInterval(updateTime,1000);l

