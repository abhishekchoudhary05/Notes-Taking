console.log("welcome to the App's Console.");
ShowAllNotes();

//what will happen when we will click add notes
let button = window.document.getElementById("addButton");
button.addEventListener("click", function(ele){
    let txt = window.document.getElementById("inputTextArea");
    let nodes = window.localStorage.getItem("notes");
    if (nodes == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(nodes);
    }
    console.log(lStorage);
    lStorage.push(txt.value);
    console.log(lStorage);
    window.localStorage.setItem("notes", JSON.stringify(lStorage));
    txt.value = "";
    ShowAllNotes();
});

//function to display all notes
function ShowAllNotes(){
    let nodes = window.localStorage.getItem("notes");
    if (nodes == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(nodes);
    }

    let html = '';
    Array.from(lStorage).forEach(function(element, index){
        html = html + `
            <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index+1}</h5>
                <p class="card-text">${element}</p>
                <a href="#" class="btn btn-primary">Delete Note</a>
            </div>
            </div>        
        `;
    });
    let notes = window.document.getElementById("notes");
    notes.innerHTML = html;
}