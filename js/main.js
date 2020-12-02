let allInputs = Array();
let currentInput;

$(document).on("keydown", "input", function (e) {
    if(e.key != "Tab") return;
    allInputs = Array.from(document.getElementsByClassName("woord"));
    currentInput = allInputs[allInputs.indexOf(document.activeElement) + 1];

    if(currentInput == null) {
        e.preventDefault();
        woordenToevoegen(1);
    }
});

let totaalWoordenDiv = document.getElementById("woordentotaal");

function woordenToevoegen(hoeveelheid) {
    if(hoeveelheid == null) hoeveelheid = document.getElementById("hoeveelheid").value;
    for(let i = 1; i <= hoeveelheid; i++) {
        let woordenDiv = document.createElement("div");
        woordenDiv.id = "woordendiv";
        let input1 = document.getElementById("woord1").cloneNode();
        input1.value = "";
        let input2 = document.getElementById("woord2").cloneNode();
        input2.value = "";
        totaalWoordenDiv.appendChild(woordenDiv);
        woordenDiv.appendChild(input1);
        woordenDiv.appendChild(input2);
        input1.focus();
    }
}