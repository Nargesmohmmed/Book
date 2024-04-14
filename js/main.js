var nameInput = document.getElementById('name');
var urlInput = document.getElementById('url');
var btn = document.getElementById('btn');

// raf the add
var urlName = [];

var mainIndex = 0;

if (localStorage.getItem('urlName') != null) {

    urlName = JSON.parse(localStorage.getItem('urlName'));
    displayData(urlName);

}

var nameRegex = /^[A-Za-z_]{1,}$/
function isNameValid() {
    if (nameRegex.test(nameInput.value)) {

        return true;

    } else {

        return false;

    }
}

var urlRegex = /^(https:\/\/)?(www\.)?[A-za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid() {
    if (urlRegex.test(urlInput.value)) {

        return true;

    } else {

        return false;

    }
}

nameInput.onkeyup = function() {

    if (isUrlValid() && isNameValid()) {
        btn.removeAttribute("disabled");
    } else {
        btn.disabled = true;
    }

}

urlInput.onkeyup = function() {

    if (isUrlValid() && isNameValid()) {
        btn.removeAttribute("disabled");
    } else {
        btn.disabled = true;
    }

}

function Add () {
    if (btn.innerHTML == 'Update') {
        btn.innerHTML = 'Submit'
        var emailUser = {
            nameBook : nameInput.value,
            url : urlInput.value
        }

        urlName.splice(mainIndex, 1 , emailUser);
        localStorage.setItem('urlName' , JSON.stringify(urlName));
        displayData(urlName);
        Remove();
    } else {

        var emailUser = {
            nameBook : nameInput.value,
            url : urlInput.value
        }
    
        // console.log(emailUser);
        urlName.push(emailUser);
        localStorage.setItem('urlName' , JSON.stringify(urlName));
    
        displayData(urlName);
        Remove();

    }
 
}

function Remove () {
    nameInput.value = '';
    urlInput.value = '';
}

function displayData(serch) {
    var cartone = "";

    for ( var i = 0; i < serch.length; i++ ) {

        cartone += `
        
        <tr>

            <td>${i + 1}</td>
           <td> ${ serch[i].nameBook } </td>
            <td><a class="btn btn-primary" href=" ${ serch[i].url }">Visit</a></td>
            <td><button onclick="updateBook(${i})" class="btn btn-info">Update</button></td>
            <td><button onclick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
        </tr>    

        `

    }

    document.getElementById("tableBody").innerHTML = cartone;
}

function deleteBook (i) {
    urlName.splice(i, 1);
    localStorage.setItem('urlName' , JSON.stringify(urlName));
    displayData(urlName);
}

function updateBook(i) {
    nameInput.value = urlName[i].nameBook;
    urlInput.value = urlName[i].url;
    btn.innerHTML = "Update"
    mainIndex = i;
}

function search(trem) {

    var wantedBook = [];
    for (var i = 0; i < urlName.length; i++) {

        if (urlName[i].nameBook.toLowerCase().includes(trem)) {
            wantedBook.push(urlName[i]);
        }

    }

    displayData(wantedBook);

}



