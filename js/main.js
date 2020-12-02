let allInputs = Array();
let currentInput;

document.addEventListener("keydown", function (e) {
    if(e.key != "Tab") return;
    allInputs = Array.from(document.getElementsByClassName("woord"));
    currentInput = allInputs[allInputs.indexOf(document.activeElement) + 1];
    let nextInput = allInputs[allInputs.indexOf(document.activeElement) + 2];
    let lastInput = allInputs[allInputs.length - 1];

    if(currentInput == null) {
        e.preventDefault();
        createVraagDiv();
    }
});

const form = document.getElementById("woorden");

function createVraagDiv() {
    const div = document.getElementById("woordendiv").cloneNode();
    let input1 = document.getElementById("woord1").cloneNode();
    input1.value = "";
    let input2 = document.getElementById("woord2").cloneNode();
    input2.value = "";

    form.appendChild(div);
    div.appendChild(input1);
    div.appendChild(input2);

    input1.focus();
}