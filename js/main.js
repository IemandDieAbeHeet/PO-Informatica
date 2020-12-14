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

if(urlParameters.has("woordenLijst") && window.location.pathname.match('/lijst-editor')) {
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
    window.location.href = "lijst?woordenLijst=" + woordenLijstId;
});

$('.bewerkButton').on('click', function(e) {
    e.preventDefault;
    let woordenLijstId = $(this).siblings('.lijstId').text();
    window.location.href = "lijst-editor?woordenLijst=" + woordenLijstId;
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
    window.location.href = "lijst-oefenen?woordenLijst=" + woordenLijstId + "&oefenType=" + oefenType;
});

//--------------------------------------------------------

//----------------------Lijst oefenen---------------------

let woordenTotaalArray = [];
let woordenOrigineelArray = [];
let woordenVertaaldArray = [];
let woordenAntwoord;

if(urlParameters.has("woordenLijst") && window.location.pathname.match("/lijst-oefenen")) {
    $.ajax({
        type: 'get',
        url: 'includes/woordenLijstGet.inc.php',
        data: {
            id: urlParameters.get("woordenLijst")
        },
        success: function (response) {
            woordenOrigineelArray = response.woordenOrigineel;
            woordenVertaaldArray = response.woordenVertaald;
            woordenTotaalArray = woordenOrigineelArray.concat(woordenVertaaldArray);

            switch(urlParameters.get("oefenType")) {
                case "Toets":
                    $("#oefenDiv").load("toets.php", function() {
                        
                        woordenAntwoord = woordenVertaaldArray[0];
                        $("#oefenDiv .oefenWoord").text(woordenOrigineelArray[0]);

                        $("#oefenDiv #oefenButton").on("click", function(e) {
                            antwoordCheck();
                        })
                        
                        $("#oefenDiv #oefenInput").on("keyup", function(e) {
                            if(e.key != "Enter") return;
                            antwoordCheck();
                        })
                    });
                    break;
                case "Memory":
                    $("#oefenDiv").load("memory.php", function() {
                        laadMemory();
                    })
                    break;
                default:
                    window.location.href = "lijst?woordenLijst=" + urlParameters.get("woordenLijst");
            }
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

let random = 0;
function antwoordCheck() {
    if($("#oefenDiv #oefenInput").val() == woordenAntwoord) {
        let iframe = $("<iframe src='audio.php' style='display:none'></iframe>");
        $("body").append(iframe);
        $(iframe).on("load", function() {
            $(iframe).contents().find("audio").on("ended", function() {
                $(iframe).remove();
            })

            woordenOrigineelArray.splice(random, 1);
            woordenVertaaldArray.splice(random, 1);

            if(woordenOrigineelArray.length > 0 && woordenVertaaldArray.length > 0) {
                console.log(woordenOrigineelArray.length);
                random = Math.floor(Math.random() * woordenVertaaldArray.length-1) + 1;
                woordenAntwoord = woordenVertaaldArray[random];
                $("#oefenDiv .oefenWoord").text(woordenOrigineelArray[random]);
            } else {
                window.location.href = "lijst?woordenLijst=" + urlParameters.get("woordenLijst");
            }
        })
    } else {
        alert("Hahahahahahahahahahahahahaha");
    }
}

let kaartenGrid = $("#oefenDiv #kaarten");
let kaarten;
let geopendeKaarten = [];
let matchedKaarten = [];
let woordenOrigineelAssoc = {};
let woordenVertaaldAssoc = {};

function laadMemory() {
    shuffleArray(woordenTotaalArray);
    
    for(var i = 0, ii = woordenOrigineelArray.length; i<ii; i++) {
        woordenOrigineelAssoc[woordenOrigineelArray[i]] = woordenVertaaldArray[i];
        woordenVertaaldAssoc[woordenVertaaldArray[i]] = woordenOrigineelArray[i];
    }

    for(let i = 0; i < woordenTotaalArray.length; i++) {
        kaarten = $("<li class='kaart'><p>" + woordenTotaalArray[i] + "</p></li>");
        $("#oefenDiv #kaarten").append(kaarten);
    }

    $('#oefenDiv .kaart').each(function(index) {
        $(this).find("p").text(woordenTotaalArray[index]);
    });
    
    $("#oefenDiv #kaarten").css("grid", "repeat(" + Math.ceil(Math.sqrt(woordenTotaalArray.length)) + ", 100px) / repeat(" + Math.ceil(Math.sqrt(woordenTotaalArray.length)) + ", 100px)");
    
    $("#oefenDiv .kaart").on("click", function() {
        toggleKaart(this);
        openKaart(this);
    });
}

function openKaart(kaart) {
    geopendeKaarten.push($(kaart));
    let len = geopendeKaarten.length;
    if(len === 2) {
        let matching = false;
        let num1;
        let num2;
        for(let i = 0; i < 2; i++) {
            temp1 = (woordenVertaaldArray.indexOf(geopendeKaarten[i].find("p").text()));
            temp2 = (woordenOrigineelArray.indexOf(geopendeKaarten[i].find("p").text()));
            
            if((temp1 != -1)) {
                num1 = temp1;
            } else if(temp2 != -1) {
                num2 = temp2;
            }
        }

        if(num1 === num2) {
            matching = true;
        }

        if(matching) {
            geopendeKaarten[0].addClass("disabled show matching");
            geopendeKaarten[1].addClass("disabled show matching");
            matchedKaarten.push(geopendeKaarten[0], geopendeKaarten[1]);
            geopendeKaarten = [];
        } else {
            disableKaarten();
            setTimeout(function(){
                geopendeKaarten[0].removeClass("show disabled");
                geopendeKaarten[1].removeClass("show disabled");
                enableKaarten();
                geopendeKaarten = [];
            }, 1200);
        }
    }
}

function disableKaarten(){
    $("#kaarten .kaart").each(function() {
        $(this).addClass('disabled');
    });
}

function enableKaarten(){
    $("#kaarten .kaart").each(function() {
        $(this).removeClass('disabled');
        for(var i = 0; i < matchedKaarten.length; i++){
            matchedKaarten[i].removeClass("disabled");
        }
    });
}

function toggleKaart(kaart) {
    $(kaart).toggleClass("show");
    $(kaart).toggleClass("disabled");
}

function shuffleArray(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//--------------------------------------------------------