"use strict";
// (function () {
var stream = false;
var codeForm = document.querySelector("#connectionCodeSelector");
var codeInput = document.querySelector("#connectionCodeSelector > input");
var previewFrame = document.querySelector("#preview");

//add events
codeForm.addEventListener("submit", evt => {
    evt.preventDefault();
    let code = codeInput.value;
    updateMedia();
});

function updateMedia() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(userStream => {
        console.log(userStream);
        stream = userStream;
        previewFrame.srcObject = stream;
    });
}

function connectToRoom() {

}
// })();