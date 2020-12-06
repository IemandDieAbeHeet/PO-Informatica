$(window).on("load", function() {
    checkForEmptyInputs();
})

$("#woordenForm input[type='text']").on("keyup", function() {
    checkForEmptyInputs();
});

function checkForEmptyInputs() {
    let anyEmpty = false;
    let emptyAmount = 0;
    $("#woordenForm input[type='text']").each(function() {
        if(this.value.trim() == "") {
            anyEmpty = true;
        }
    });

    if(anyEmpty) {
        $("#woordenSubmit").prop("disabled", true);
    } else {
        $("#woordenSubmit").prop("disabled", false);
    }
}

$(document).on("keydown", ".woord", function (e) {
    if(e.key != "Tab") return;
    let allInputs = Array.from(document.getElementsByClassName("woord"));
    let currentInput = allInputs[allInputs.indexOf(document.activeElement) + 1];

    if(currentInput == null) {
        e.preventDefault();
        woordenToevoegen(1);
    }
});

$(document).on("click", "#verwijderWoord", function() {
    let buttonParent = $(this).parent();
    buttonParent.empty();
    buttonParent.remove();
});

let totaalWoordenDiv = document.getElementById("woordentotaal");

function woordenToevoegen(hoeveelheid) {
    if(hoeveelheid == null) hoeveelheid = document.getElementById("hoeveelheid").value;
    for(let i = 1; i <= hoeveelheid; i++) {
        let woordenDiv = document.createElement("div");
        woordenDiv.className = "woordendiv";
        totaalWoordenDiv.appendChild(woordenDiv);
        
        let vorigNummer = parseInt($("p#woordnummer").last().text());
        let woordNummerElement = document.createElement("p");
        woordNummerElement.id = "woordnummer";
        let woordNummerNode = document.createTextNode(vorigNummer + 1);
        woordNummerElement.appendChild(woordNummerNode);
        woordenDiv.appendChild(woordNummerElement);
        
        let input1 = document.getElementById("woord1").cloneNode();
        input1.value = "";
        let input2 = document.getElementById("woord2").cloneNode();
        input2.value = "";
        woordenDiv.appendChild(input1);
        woordenDiv.appendChild(input2);

        let removeButton = document.createElement("input");
        removeButton.type = "button";
        removeButton.value = "X";
        removeButton.id = "verwijderWoord"
        woordenDiv.appendChild(removeButton);

        input1.focus();
    }
}

$('#woordenForm').on('submit', function (e) {
    e.preventDefault();

    let woordenLijst = {
        title: $("#lijstNaam").val(),
        woordenArray: {
            0: [],
            1: []
        }
    }

    $('#woordenForm #woord1').each(function(index){
        if(this.value.trim() != "") {
            let woord = {};
            woord[index] = $(this).val();
            woordenLijst.woordenArray[0].push($(this).val());
        }
    });

    $('#woordenForm #woord2').each(function(index){
        if(this.value.trim() != "") {
            let woord = {};
            woord[index] = $(this).val();
            woordenLijst.woordenArray[1].push($(this).val());
        }
    });

    console.log(woordenLijst);

    $.ajax({
      type: 'post',
      url: 'includes/woordenLijstSubmit.inc.php',
      data: woordenLijst,
      success: function (xhr) {
        $("#response").attr("class", "success");
        $("#response").text(xhr.statusText);
      },
      error: function(xhr) {
        $("#response").attr("class", "error");
        $("#response").text(xhr.statusText);
      }
    });
});