let input = document.getElementById("ib-input");
let output = document.getElementById("output");
let addBtn = document.getElementById("add-btn");
let appendAlert = document.getElementById("append-alert");
let search = document.getElementById("searchBtn");

// To show all the element at the starting
showNotes();


addBtn.addEventListener('click', () => {

    if (input.value == "") {
        appendAlert.innerHTML = `<div class="alert alert-secondary alert-dismissible fade show" role="alert">
                                <strong>Sorry! </strong> You can not append an empty note.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>`;
    }
    else {
        // Taking all the notes out from local storage at the starting
        noteLocal = localStorage.getItem('notes');
        if (noteLocal == null) {
            // When local storage is empty
            noteCollect = [];
        }
        else {
            // When at least one note is present
            noteCollect = JSON.parse(noteLocal);
        }
        // Pushing note into the array
        noteCollect.push(input.value);
        // Setting the array in which note has been added
        localStorage.setItem('notes', JSON.stringify(noteCollect));
        // Clearing the text area
        input.value = "";
        showNotes();

    }
});


function showNotes() {

    noteLocal = localStorage.getItem('notes');
    if (noteLocal == null) {
        noteCollect = [];
    }
    else {
        noteCollect = JSON.parse(noteLocal);
    }

    let cardOutput = "";
    // itterating all the elements and index of the local storage array
    noteCollect.forEach((element, index) => {
        // setting all the notes in a variable
        cardOutput += `<div class="card ms-3 mb-3">
                                <div class="card-body">
                                    <h5 class="card-title">Note ${index + 1}</h5>
                                    <p class="card-text"> ${element} </p>
                                    <button id=${index + 1} class="btn btn-primary delBtn" onclick="deleteNotes(this.id);">Delete</button>
                                </div>
                            </div>`
    });

    if (noteCollect.length != 0) {
        // showing all the cards in the output box
        output.innerHTML = cardOutput;
    }
    else {
        output.innerHTML = `<div class="alert alert-success" role="alert">
                                Nothing to show here, add a note!
                            </div>`;
    }

}


function deleteNotes(indexId) {

    noteLocal = localStorage.getItem('notes');

    if (noteLocal == null) {
        noteCollect = [];
    }
    else {
        noteCollect = JSON.parse(noteLocal);
    }
    // To remove the item we are using splice method of array
    noteCollect.splice(indexId - 1, 1);
    console.log(noteCollect);
    localStorage.setItem('notes', JSON.stringify(noteCollect));
    showNotes();
}

// Function to search note from input box
search.addEventListener('input', () => {
    // converting the search text into lower case
    let searchValue = search.value.toLowerCase();
    // fetching all the cards present in here
    let allCard = document.getElementsByClassName("card");
    // Iterating all the cards fetched
    Array.from(allCard).forEach((cardElement) => {
        // Taking paragraph tag from the card
        let cardTxt = cardElement.getElementsByTagName("p")[0].innerText;

        cardTxtLower = cardTxt.toLowerCase();

        if (cardTxtLower.includes(searchValue)) {
            cardElement.style.display = "block";
        }
        else {
            cardElement.style.display = "none";
        }

    })

})