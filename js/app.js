console.log("welcome to the App's Console.");
ShowAllNotes();

let note = {
    title : "",
    text : ""
};

function AddNote(title, txt){
    this.title = title;
    this.text = txt;
}

//what will happen when we will click add notes
let button = window.document.getElementById("addButton");
button.addEventListener("click", function(ele){
    //fetching and creting new object for new note
    let txt = window.document.getElementById("inputTextArea");
    let title = window.document.getElementById("titleNote");
    newNote = new AddNote(title.value, txt.value);
    // console.log(JSON.stringify(newNote));

    let nodes = window.localStorage.getItem("notes");
    if (nodes == null){
        lStorage = [];
    }
    else{
        lStorage = JSON.parse(nodes);
    }

    lStorage.push(JSON.stringify(newNote)); //add to array
    window.localStorage.setItem("notes", JSON.stringify(lStorage)); //add array to local storage
    title.value = "";
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
        element = JSON.parse(element);
        html = html + `
            <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <a index="${index}" onclick="deleteNote(this.index)" class="btn btn-primary">Delete Note</a>
            </div>
            </div>        
        `;
    });
    
    let notes = window.document.getElementById("notes");
    if(lStorage != 0 ){
        notes.innerHTML = html;
    }
    else{
        notes.innerHTML = `<b>There is no any notes to display. please add one.</b>`;
    }
}

// function to delete note from localstorage
function deleteNote(index){
    // console.log("Deleting this note.");
    let notes = window.localStorage.getItem('notes');
    if(notes == null){
        allNotes = [];
    }
    else{
        allNotes = JSON.parse(notes);
    }
    allNotes.splice(index, 1);
    window.localStorage.setItem('notes', JSON.stringify(allNotes));
    ShowAllNotes();
}

let search = window.document.getElementById('searchTxt');
search.addEventListener('input', function(){
    // getting all cards
    let allElement = window.document.getElementsByClassName('noteCard');
    
    // for each card check weather inserted text is there in it or not    
    Array.from(allElement).forEach(function(element){
        let text = element.getElementsByTagName('p')[0].innerText;
        if(text.includes(search.value)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";            
        }
    });
});