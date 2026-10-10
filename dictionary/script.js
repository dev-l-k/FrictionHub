const $ = id => document.getElementById(id);
const form = $("searchForm");
const input = $("wordInput");
const message = $("message");
const result = $("result");
const favoriteList = $("favoriteList");
let requestId = 0;
function saveFavorites(favorites){
    localStorage.setItem("frictionhubDictionaryFavorites",JSON.stringify(favorites));
}
function getFavorites(){
    try{
        return JSOM.parse(localStorage.getItem("frictionhubDictionaryFavorites"))||[];

    }catch{
        return [];
    }

}
function escapeHTML(text = "") {
    return String(text).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}
function renderFavorites(){
    const favorites = getFavorites();
    $("emptyFavorites").hidden = favorites.length > 0;
    favoriteList.innerHTML = favorites.map(word => `
                <div class="favorite-item">
                    <span class="favorite-word" data-search="${escapeHTML(word)}">
                        ${escapeHTML(word)}
                    </span>
                    <button class="btn-small" data-remove="${escapeHTML(word)}">
                        Remove
                    </button>
                </div>
    `).join("");
}
async function searchWord(word){
    word = word.trim();
    if (!word) return;
    const thisRequest = ++requestId;
    result.hidden = true;
    message.hidden = false;
    message.textContent="Searching...";
    try{
        const url = `https://api.datamuse.com/words?sp=${encodeURIComponent(word)}&md=d&max=1`;
        const response = await fetch(url);
        const data = await response.json();
        if(!data.length||!data[0].defs?.length){
            throw new Error("No Word found...");
        }
        if (thisRequest === requestId){
            showResult(data[0].word,data[0].defs.map(d=>d.replace(/^[a-z]+\t/,"")));

        }
    }catch(error){
        if (thisRequest !== requestId) return;
        message.textContent= error instanceof TypeError?"Could not connect to the dictionary. Check your internet connection.":(error.message||"Something went wrong.");

    }
}
function showResult(word,definitions){
    message.hidden = true;
    result.hidden = false;
    const defsHtml = definitions.map((def,i)=>`
        <div class="definition">
            <strong>${i + 1}.</strong> ${escapeHTML(def)}
        </div>
    `).join("");
    result.innerHTML = `
    <div class="word-heading">
                    <h2>${escapeHTML(word)}</h2>
                </div>
                <div class="meaning">
                    ${defsHtml}
                </div>
                <div class="result-actions">
                    <button class="btn-primary" id="copyDefinition">Copy Definition</button>
                    <button class="btn-small" id="toggleFavorite">
                        ${getFavorites().includes(word.toLowerCase()) ? "Remove Favorite" : "Save Favorite"}
                    </button>
                </div>`;
    $("copyDefinition").onclick = async () => {
        const text = `${word}\n\n`+definitions.map((d,i) => `${i+1}. ${d}`).join("\n");
        try{
            await navigator.clipboard.writeText(text);
            $("copyDefinition").textContent = "Copied";
        } catch{
            alert("Could not copy definition");
        }
    };
    $("toggleFavorite").onclick = () => {
        const favorites = getFavorites();
        const key = word.toLowerCase();
        const index = favorites.indexOf(key);
        if (index>=0){
            favorites.splice(index,1);

        }else{
            favorites.unshift(key);
        }
        saveFavorites(favorites);
        renderFavorites();
        $("toggleFavorite").textContent = favorites.includes(key)?"Remove Favorite":"Save Favorite";

    };

}
form.addEventListener("submit",event =>{
    event.preventDefault();
    searchWord(input.value);
});
document.addEventListener("click",event=>{
    const searchBtn = event.target.closest("[data-search]");
    const removeBtn = event.target.closest("[data-remove]");
    if(searchBtn){
        input.value = searchBtn.dataset.search;
        searchWord(searchBtn.dataset.search);

    }
    if(removeBtn){
        saveFavorites(getFavorites().filter(item=>item!==removeBtn.dataset.remove));
        renderFavorites();
    }
});
renderFavorites();