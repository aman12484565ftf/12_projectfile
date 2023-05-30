let title_input = document.getElementById("title");
let text_input = document.getElementById("notes");
let text_submit = document.getElementById("submit-btn");
let text_output = document.getElementById("all-notes");

let notes = localStorage.getItem("notes");
if (notes !== null) {
    note_HTML = JSON.parse(notes);
    text_output.innerHTML = note_HTML;
}

text_submit.addEventListener("click", function (e) {
    e.preventDefault();
    let text = text_input.value;
    let title = title_input.value;
    if (text) {
        let first = document.getElementById("first");
        first.innerText = "";

        out_text = document.createTextNode("");
        let text_div = document.createElement("div");
        text_div.appendChild(out_text);
        text_div.setAttribute("class", "text_div");

        text_output.insertBefore(text_div, first);
        let currentDate = new Date();
        let html = `<div id="notes-box"><div id="notes-content"><strong>${title}</strong><hr>${currentDate.toLocaleString()}<br>${text}</div><button type="button" class="text-del" id="text-del"> Delete Note</button></div>`;
        text_div.innerHTML = html;
    }
    text_input.value = "";
    title_input.value = "";

    let local_node = JSON.stringify(text_output.innerHTML);
    localStorage.setItem("notes", local_node);
});

text_output.addEventListener("click", function (event) {
    if (event.target.className.includes("text-del")) {
        ele = event.target.parentElement.parentElement;
        ele.remove();
    }
    if (text_output.children.length === 1) {
        text_output.innerHTML = `<p id="first">Use "Add a Note" section to add notes</p>`;
    }

    let local_node = JSON.stringify(text_output.innerHTML);
    localStorage.setItem("notes", local_node);
});

let search_text = document.getElementById("search_notes");
search_text.addEventListener("input", function (e) {
    if (search_text.value !== "") {
        let text_div = document.getElementsByClassName("text_div");
        let check_rem_notes = 0;

        Object.keys(text_div).forEach(function (key) {
            let txt = text_div[key].innerText.toLowerCase();
            txt = txt.replace("delete note", "");
            if (txt.includes(search_text.value.toLowerCase())) {
                text_div[key].style.display = "flex";
                check_rem_notes--;
            } else {
                text_div[key].style.display = "none";
                check_rem_notes++;
                if (check_rem_notes === text_div.length) {
                    document.getElementById(
                        "first"
                    ).innerText = `Nothing to show here. Use "Add a Note" section to add notes`;
                } else {
                    document.getElementById("first").innerText = ``;
                }
            }
        });
    } else {
        document.getElementById("first").innerText = ``;
        let text_div = document.getElementsByClassName("text_div");
        Object.keys(text_div).forEach(function (key) {
            text_div[key].style.display = "flex";
        });
    }
});