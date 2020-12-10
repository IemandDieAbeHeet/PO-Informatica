//Globale variabelen

const urlParameters = new URLSearchParams(window.location.search);

//----------------------Lijst editor----------------------

$("#woordenForm input[type='text']").on("keyup", checkEmptyInputs);

function checkEmptyInputs() {
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

const totaalWoordenDiv = document.getElementById("woordentotaal");

function woordenToevoegen(hoeveelheid) {
    if(hoeveelheid == null) hoeveelheid = document.getElementById("hoeveelheid").value;
    for(let i = 1; i <= hoeveelheid; i++) {
        let woordenDiv = document.createElement("div");
        woordenDiv.className = "woordenDiv";
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

if(urlParameters.has("woordenLijst") && window.location.pathname == '/PO-Informatica/lijst-editor') {
    $.ajax({
        type: 'get',
        url: 'includes/woordenLijstGet.inc.php',
        data: {
            id: urlParameters.get("woordenLijst")
        },
        success: function (response) {
            woordenToevoegen(response.woordenAantal-1);
            $('#lijstNaam').val(response.woordenLijstNaam);
            $('#taal1').val(response.taalOrigineel);
            $('#taal2').val(response.taalVertaald);
            
            $('.woordenDiv #woord1').each(function(index) {
                $(this).val(response.woordenOrigineel[index]);
            });
            $('.woordenDiv #woord2').each(function(index) {
                $(this).val(response.woordenVertaald[index]);
            });

            checkEmptyInputs();
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
}

$('#woordenForm').on('submit', function (e) {
    e.preventDefault();

    let woordenLijst = {
        id: urlParameters.has('woordenLijst') ? parseInt(urlParameters.get('woordenLijst')) : null,
        title: $("#lijstNaam").val(),
        woordenAantal: $("#woordenForm #woord1").length,
        taalOrigineel: $("#taal1 option:selected").text(),
        taalVertaald: $("#taal2 option:selected").text(),
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
    
    $.ajax({
      type: 'post',
      url: 'includes/woordenLijstSubmit.inc.php',
      data: woordenLijst,
      success: function (xhr) {
        $("#response").attr("class", "success");
        window.location.href = "lijsten";
      },
      error: function(xhr) {
        $("#response").attr("class", "error");
        $("#response").text(xhr.statusText);
      }
    });
});

//--------------------------------------------------------

//----------------------Lijst menu------------------------

$('.bekijkButton').on('click', function(e) {
    e.preventDefault;
    let woordenLijstId = $(this).siblings('.lijstId').text();
    window.location.href = window.location.protocol + "//" + window.location.host + "/lijst" + "?woordenLijst=" + woordenLijstId;
});

$('.bewerkButton').on('click', function(e) {
    e.preventDefault;
    let woordenLijstId = $(this).siblings('.lijstId').text();
    window.location.href = window.location.protocol + "//" + window.location.host + "/lijst-editor" + "?woordenLijst=" + woordenLijstId;
});

$(".lijstMakenButton").on("click", function(e) {
    e.preventDefault;
    window.location.href="lijst-editor";
})

//--------------------------------------------------------

//----------------------Lijst weergave--------------------

$("#oefenButton").on("click", function(e) {
    e.preventDefault();
    let woordenLijstId = $(this).siblings('.lijstId').text();
    let oefenType = $(this).siblings('#oefenSelection').find('option:selected').text()
    window.location.href = window.location.protocol + "//" + window.location.host + "/PO-Informatica/lijst-oefenen" + "?woordenLijst=" + woordenLijstId + "&oefenType=" + oefenType;
});

//--------------------------------------------------------

//----------------------Lijst oefenen---------------------

let woordenOrigineelArray;

if(urlParameters.has("woordenLijst") && window.location.pathname == ("/PO-Informatica/lijst-oefenen")) {
    $.ajax({
        type: 'get',
        url: 'includes/woordenLijstGet.inc.php',
        data: {
            id: urlParameters.get("woordenLijst")
        },
        success: function (response) {
            $("#oefenDiv").load("toets.php");
            woordenOrigineelArray = response.woordenOrigineel;
            $("#oefenWoord").val(woordenOrigineelArray[0]);
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });

    $("#nakijkButton").on('click', function(e) {
        e.preventDefault();
        $("#oefenWoord").text(woordenOrigineelArray[0]);
    });
}

//--------------------------------------------------------