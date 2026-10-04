const search = document.getElementById("search");
const books = document.getElementById("books");
const status = document.getElementById("status");

function checkEnter(event){
    if (event.key === "Enter"){
        searchBooks();
    }
}
 async function searchBooks() {
    let query = search.value.trim();
    if(query === ""){
        status.textContent = "Enter a book or author";
        status.className = "status error";
        return;
    }
    books.innerHTML = "";
    status.textContent = "Searching...";
    status.className = "status";

    try{
        let response = await fetch("https://openlibrary.org/search.json?q="+encodeURIComponent(query)+"&limit=12");
        if(!response.ok){
            throw new Error();
        }
        let data = await response.json();
        showBooks(data.docs);
    }catch{
        status.textContent = "Could not search for books";
        status.className = "status error";
    }
}
function showBooks(results){
    books.innerHTML = "";
    if(results.length === 0){
        status.textContent = "No books found.";
        return;
    }
    status.textContent = "Found "+results.length+" results";
    for(let book of results){
        let title = book.title || "Unknown title";
        let author = book.author_name?book.author_name.slice(0,2).join(","):"Unknown Author";
        let year = book.first_publish_year || "Unknown";
        let cover = "https://covers.openlibrary.org/b/id/"+book.cover_i+"-M.jpg";

        let link = "https://openlibrary.org"+book.key;
        books.innerHTML += `

            <div class="book">

                <img
                    class="book-cover"
                    src="${cover}"
                    alt="Book cover"
                    loading="lazy"
                >

                <h3>
                    ${title}
                </h3>

                <p class="author">
                    ${author}
                </p>

                <p class="year">
                    First published: ${year}
                </p>

                <a
                    href="${link}"
                    target="_blank"
                    class="btn-small"
                >
                    View Book
                </a>

            </div>

        `;

    }
}
updateTime();
setInterval(updateTime,1000);
    
function updateTime(){
    const clock = document.getElementById('time');
    const time = new Date().toLocaleTimeString();
    
    clock.textContent = time;

}
