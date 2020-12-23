//Globale variabelen
const urlParameters = new URLSearchParams(window.location.search);
let woordenLijst = {};

//----------------------Lijst editor----------------------

$("#woordenForm input[type='text']").on("keyup", checkEmptyInputs);

function checkEmptyInputs() {
    let anyEmpty = false;
    let emptyAmount = 0;
    $("#woordenForm input[type='text']").filter(function() { return $(this).val() != "" }).each(function() {
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
    } else {
        e.preventDefault();
        $(currentInput).trigger('focus');
    }
});

$(document).on("click", "#verwijderWoord", function() {
    let buttonParent = $(this).parent();
    buttonParent.empty();
    buttonParent.remove();

    updateWoordenNummers();
});

function updateWoordenNummers() {
    $("#woordenForm .woordenDiv").each(function() {
        let vorigNummer = $("p#woordnummer").index($(this).find("p#woordnummer"));
        $(this).find("p#woordnummer").text(vorigNummer + 1);
    });
}

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
        
        let input1 = $('<input class="woord" id="woord1" name="woord1" placeholder="Woord" type="text" value="">');
        let input2 = $('<input class="woord" id="woord2" name="woord2" placeholder="Woord vertaling" type="text" value=""></input>');
        $(woordenDiv).append(input1);
        $(woordenDiv).append(input2);

        let removeButton = document.createElement("input");
        removeButton.type = "button";
        removeButton.value = "X";
        removeButton.id = "verwijderWoord"
        woordenDiv.appendChild(removeButton);

        input1.trigger('focus');
    }
}

function woordenReplace(hoeveelheid) {
    if(hoeveelheid == null) hoeveelheid = document.getElementById("hoeveelheid").value;
    $(".woordenDiv").remove();
    for(let i = 1; i <= hoeveelheid; i++) {
        let woordenDiv = document.createElement("div");
        woordenDiv.className = "woordenDiv";
        totaalWoordenDiv.appendChild(woordenDiv);
        
        let vorigNummer = i-1;
        let woordNummerElement = document.createElement("p");
        woordNummerElement.id = "woordnummer";
        let woordNummerNode = document.createTextNode(vorigNummer + 1);
        woordNummerElement.appendChild(woordNummerNode);
        woordenDiv.appendChild(woordNummerElement);
        
        let input1 = $('<input class="woord" id="woord1" name="woord1" placeholder="Woord" type="text" value="">');
        let input2 = $('<input class="woord" id="woord2" name="woord2" placeholder="Woord vertaling" type="text" value=""></input>');
        $(woordenDiv).append(input1);
        $(woordenDiv).append(input2);

        let removeButton = document.createElement("input");
        removeButton.type = "button";
        removeButton.value = "X";
        removeButton.id = "verwijderWoord";

        woordenDiv.appendChild(removeButton);

        input1.trigger('focus');
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
            $('#woordenForm #taal1').val(response.taalOrigineel);
            $('#woordenForm #taal2').val(response.taalVertaald);
            
            $('.woordenDiv #woord1').each(function(index) {
                $(this).val(response.woordenArray[index][0]);
            });
            $('.woordenDiv #woord2').each(function(index) {
                $(this).val(response.woordenArray[index][1]);
            });

            setInterval(checkEmptyInputs, 10);
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
}

$('#woordenForm').on('submit', function (e) {
    e.preventDefault();

    woordenLijst = {
        woordenLijstId: urlParameters.has('woordenLijst') ? parseInt(urlParameters.get('woordenLijst')) : null,
        woordenLijstNaam: $("#lijstNaam").val(),
        woordenAantal: $('#woordenForm #woord1').filter(function() { return $(this).val() != ""; }).length,
        taalOrigineel: $("#taal1 option:selected").text(),
        taalVertaald: $("#taal2 option:selected").text(),
        woordenArray: {}
    }

    $('#woordenForm #woord1').each(function(index){
        if(this.value.trim() != "") {
            woordenLijst.woordenArray[index] = {0: $(this).val()};
        }
    });

    $('#woordenForm #woord2').each(function(index){
        if(this.value.trim() != "") {
            woordenLijst.woordenArray[index][1] = $(this).val();
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

//Lijst importeren

$("#bestandInput").on("change", function() {
    $("#woordenForm #woord1").each(function(index) {
        $(this).val(CSVToArray());
    });

    let woordenArray;

    this.files[0].text().then(function(text) {
        woordenArray = CSVToArray(text, ";");
        woordenReplace(woordenArray.length);

        let i = 0;
        $("#woordenForm #woord1").each(function() {
            $(this).val(woordenArray[i][0]);
            i++;
        });


        let j = 0
        $("#woordenForm #woord2").each(function() {
            $(this).val(woordenArray[j][1]);
            j++;
        });
    });
});

$("#bestandButton").on("click", function() {
    $("#bestandInput").trigger("click");
});

function CSVToArray( strData, strDelimiter ){
    
    
    strDelimiter = (strDelimiter || ",");
    
    var objPattern = new RegExp(
        (
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );

    var arrData = [[]];
    var arrMatches = null;

    while (arrMatches = objPattern.exec( strData )){
        var strMatchedDelimiter = arrMatches[ 1 ];

        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){
            arrData.push( [] );
        }

        if (arrMatches[ 2 ]){
            var strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            var strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push( strMatchedValue );

        arrFiltered = arrData.filter(el => {
            return el != null && el != '';
          });
        arrData = arrFiltered;
    }
    
    return( arrData );
}

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

$(".verwijderWoordenlijstButton").on("click", function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: 'includes/woordenLijstDelete.inc.php',
        data: { woordenLijstId: $(this).siblings('.lijstId').text() },
        success: function () {
            $("#response").attr("class", "success");
            window.location.href = "lijsten";
        },
        error: function(xhr) {
            $("#response").attr("class", "error");
            $("#response").text(xhr.statusText);
        }
    });
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

let woordenArray = [];
let woordenAntwoord;

let volgendeWoordenOrigineel = [];
let volgendeWoordenVertaald = [];

let fouteAntwoorden = [];

let disabled = false;

let goedCount = 0;
let foutCount = 0;
let cijfer = 0;

//Toets

if(urlParameters.has("woordenLijst") && window.location.pathname.match("/lijst-oefenen")) {
    $.ajax({
        type: 'get',
        url: 'includes/woordenLijstGet.inc.php',
        data: {
            id: urlParameters.get("woordenLijst")
        },
        success: function (response) {
            woordenLijst = response;
            woordenArray = woordenLijst.woordenArray;

            switch(urlParameters.get("oefenType")) {
                case "Toets":
                    $("#oefenDiv").load("toets.php", function() {
                        woordenArray = shuffleArray(woordenArray);
                        woordenAntwoord = woordenArray[0][1];
                        $("#oefenDiv .oefenWoord").text(woordenArray[0][0]);

                        $("#oefenDiv #oefenButton").on("click", function(e) {
                            e.preventDefault();
                            if(disabled === true) return;
                            antwoordCheck();
                        });

                        $("#oefenDiv #oefenInput").on("keyup", function(e) {
                            e.preventDefault();
                            if(e.key != "Enter") return;
                            if(disabled === true) return;
                            antwoordCheck();
                        });

                        $("#resultaatDiv #resultaatButton").on("click", function() {
                            window.location.href = "lijsten";
                        });

                        $("#resultaatDiv #foutenImporterenButton").on("click", nieuweWoordenlijstFouten);
                    });
                    break;
                case "Memory":
                    $("#oefenDiv").load("memory.php", function() {
                        startMemory();

                        $("#resultaatDiv #resultaatButton").on("click", function() {
                            window.location.href = "lijsten";
                        });

                        $("#resultaatDiv #foutenImporterenButton").on("click", nieuweWoordenlijstFouten);
                    });

                    break;
                default:
                    window.location.href = "lijst?woordenLijst=" + urlParameters.get("woordenLijst");
            }
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
}

function nieuweWoordenlijstFouten() {
    let nieuweWoordenLijst = woordenLijst;
    nieuweWoordenLijst.woordenLijstId = null;
    nieuweWoordenLijst.woordenLijstNaam =  woordenLijst.woordenLijstNaam + " (fouten)";
    nieuweWoordenLijst.woordenAantal = fouteAntwoorden.length;
    nieuweWoordenLijst.woordenArray = fouteAntwoorden;
    $.ajax({
        type: 'post',
        url: 'includes/woordenLijstSubmit.inc.php',
        data: nieuweWoordenLijst,
        success: function (response) {
            $("#response").attr("class", "success");
            window.location.href = "lijst-editor?woordenLijst=" + response.woordenLijstId;
        },
        error: function(xhr) {
            $("#response").attr("class", "error");
            $("#response").text(xhr.statusText);
        }
    });
}

function antwoordCheck() {
    if($("#oefenDiv #oefenInput").val() == woordenAntwoord) {
        let iframe = $("<iframe src='audio.php' style='display:none'></iframe>");
        $("body").append(iframe);
        $(iframe).on("load", function() {
            $(iframe).contents().find("audio").on("ended", function() {
                $(iframe).remove();
            })

            goedCount++;
            woordenArray.splice(0, 1);

            if(woordenArray.length > 0) {
                woordenAntwoord = woordenArray[0][1];
                $("#oefenDiv #oefenInput").val("");
                $("#oefenDiv .oefenWoord").text(woordenArray[0][0]);
            } else {
                cijfer = parseInt(((goedCount/woordenArray.length*9)+1).toFixed(1));
                verstuurScore(cijfer * 10);
            }
        });
    } else {
        disabled = true;
        $(".oefenWoord").addClass("foutAntwoord");
        setTimeout(function() {
            $(".oefenWoord").removeClass("foutAntwoord");
            disabled = false;
            foutCount++;
            let temp = woordenArray.splice(0, 1)[0];
            
            if(!fouteAntwoorden.includes(temp[0]) && !fouteAntwoorden.includes(temp[1])) {
                fouteAntwoorden.push(temp);
            }

            woordenArray.splice(2, 0, temp);

            alert("Hahahahahahahahahahahahahaha");
            woordenAntwoord = woordenArray[0][1];
            $("#oefenDiv #oefenInput").val("");
            $("#oefenDiv .oefenWoord").text(woordenArray[0][0]);
        }, 1200);
    }
}

function shuffleArrays(obj1, obj2) {
    var index = obj1.length;
    var rnd, tmp1, tmp2;

    while (index) {
        rnd = Math.floor(Math.random() * index);
        index -= 1;
        tmp1 = obj1[index];
        tmp2 = obj2[index];
        obj1[index] = obj1[rnd];
        obj2[index] = obj2[rnd];
        obj1[rnd] = tmp1;
        obj2[rnd] = tmp2;
    }
}

//Memory

let kaartenGrid = $("#oefenDiv #kaarten");
let kaarten;
let geopendeKaarten = [];
let matchedKaarten = [];

let arrayChunks = [];
let currChunk = 0;

let interval;

function startMemory() {
    let chunkGrootte = 8;

    for(let i = 0, j = woordenArray.length; i < j; i += chunkGrootte) {
        let chunk = woordenArray.slice(i, i+chunkGrootte);
        let temp = shuffleArray(chunk);
        arrayChunks.push(temp);
    }

    laadWoorden(0);

    interval = setInterval(updateMemory, 10)
}

function updateMemory() {
    if(arrayChunks.length > currChunk) {
        if(goedCount >= arrayChunks[currChunk].length/2) {
            laadWoorden(currChunk+1);
            currChunk++;
        }
    } else {
        clearInterval(interval);
        disableKaarten();
        cijfer = parseInt(((goedCount/woordenVertaaldArray.length*9)+1).toFixed(1));
        verstuurScore(cijfer * 10);
    }
}

function laadWoorden(woordenIndex) {
    $('#oefenDiv .kaart').remove();

    arrayChunks[woordenIndex].forEach(function(item, index) {
        for(let z = 0; z <= item.length-1; z++) {
            kaarten = $("<li class='kaart' id=" + index + "><p type=" + z + ">" + item[z] + "</p></li>");
            $("#oefenDiv #kaarten").append(kaarten);
        }
    });
    
    $("#oefenDiv .kaart").shuffle();

    $("#oefenDiv .kaart").on("click", function() {
        toggleKaart($(this));
        openKaart($(this));
    });
}

(function($){
 
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
 
        return $(shuffled);
 
    };
 
})(jQuery);

function openKaart(kaart) {
    geopendeKaarten.push(kaart);
    let len = geopendeKaarten.length;
    if(len === 2) {

        if($(geopendeKaarten[0]).attr("id") === $(geopendeKaarten[1]).attr("id")) {
            geopendeKaarten[0].addClass("disabled show matching");
            geopendeKaarten[1].addClass("disabled show matching");
            matchedKaarten.push(geopendeKaarten[0], geopendeKaarten[1]);
            geopendeKaarten = [];
            goedCount++;
        } else {
            disableKaarten();
            foutCount++;
            if(!fouteAntwoorden.includes(geopendeKaarten[0].find("p").text())) {
                for(let i = 0; i < 2; i++) {
                    let woordenIndex = woordenArray.findIndex(function(currentValue) {
                        if(currentValue[i] === geopendeKaarten[i].find("p").text() || currentValue[1] === geopendeKaarten[i].find("p").text()) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    if(woordenIndex >= 0) {
                        if(!fouteAntwoorden.includes(woordenArray[woordenIndex])) {
                            fouteAntwoorden.push(woordenArray[woordenIndex]);
                        }
                    }
                }
            }
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
    kaart.toggleClass("show");
    kaart.toggleClass("disabled");
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

function verstuurScore(score) {
    $.ajax({
        type: 'post',
        url: 'includes/scoreUpdate.inc.php',
        data: {
            score: score
        },
        success: function (response) {
            disabled = true;
            $("#resultaatDiv").css("visibility", "visible");
            $("#cijferText").text("Cijfer: " + ((goedCount/woordenArray.length*9)+1).toFixed(1));
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
}

//--------------------------------------------------------

//----------------------Klassen lijst---------------------

$(".klasDiv").on({
    mouseenter: function () {
        $(this).find(".klasJoinButton").css("visibility", "visible");
    },
    mouseleave: function () {
        $(this).find(".klasJoinButton").css("visibility", "hidden");
    }
});

$(".klasBekijkButton").on("click", function() {
    window.location.href = "klas?klasId=" + parseInt($(this).siblings(".klasId").text());
});

$(".klasJoinButton").on("click", function() {
    $.ajax({
        type: 'post',
        url: 'includes/klasSubmit.inc.php',
        data: {
            klasId: parseInt($(this).siblings(".klasId").text())
        },
        success: function (response) {
            window.location.href = "klas?klasId=" + klasId;
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
});

//--------------------------------------------------------

//----------------------Klas informatie-------------------

$

//--------------------------------------------------------