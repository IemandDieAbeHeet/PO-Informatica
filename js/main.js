//Globale variabelen
const urlParameters = new URLSearchParams(window.location.search);
let woordenLijst = {};

//----------------------Lijst editor----------------------

$(window).on('load', function() {
    laadEditor();
})

$("#woordenEditorDiv input[type='text']").on("keyup", checkLijstEmptyInputs);

function checkLijstEmptyInputs() {
    let anyEmpty = false;
    let emptyAmount = 0;
    $("#woordenEditorDiv input[type='text']").filter(function() { return $(this).val() != "" }).each(function() {
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
    $("#woordenEditorDiv .woordenDiv").each(function() {
        let vorigNummer = $("p#woordnummer").index($(this).find("p#woordnummer"));
        $(this).find("p#woordnummer").text(vorigNummer + 1);
    });
}

const totaalWoordenDiv = document.getElementById("woordenTotaal");

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
        
        let input1 = $('<input class="woord" id="woord1" placeholder="Woord">');
        let input2 = $('<input class="woord" id="woord2" placeholder="Woord vertaling">');
        $(woordenDiv).append(input1);
        $(woordenDiv).append(input2);

        let removeButton = document.createElement("button");
        removeButton.textContent = "X";
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
        
        let input1 = $('<input class="woord" id="woord1" name="woord1" placeholder="Woord">');
        let input2 = $('<input class="woord" id="woord2" name="woord2" placeholder="Woord vertaling">');
        $(woordenDiv).append(input1);
        $(woordenDiv).append(input2);

        let removeButton = document.createElement("button");
        removeButton.textContent = "X";
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
            woordenLijstId: parseInt(urlParameters.get("woordenLijst"))
        },
        success: function (response) {
            woordenToevoegen(response.woordenAantal-1);
            $('#lijstEditorNaam').val(response.woordenLijstNaam);
            $('#woordenEditorDiv #taal1').val(response.taalOrigineel);
            $('#woordenEditorDiv #taal2').val(response.taalVertaald);
            
            $('.woordenDiv #woord1').each(function(index) {
                $(this).val(response.woordenArray[index][0]);
            });

            $('.woordenDiv #woord2').each(function(index) {
                $(this).val(response.woordenArray[index][1]);
            });

            setInterval(checkLijstEmptyInputs, 10);
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
}

function laadEditor() {
    $('#woordenSubmit').on('click', function (e) {
        e.preventDefault();

        woordenLijst = {
            woordenLijstId: urlParameters.has('woordenLijst') ? parseInt(urlParameters.get('woordenLijst')) : null,
            woordenLijstNaam: $("#lijstEditorNaam").val(),
            woordenAantal: $('#woordenEditorDiv #woord1').filter(function() { return $(this).val() != ""; }).length,
            taalOrigineel: $("#taal1 option:selected").text(),
            taalVertaald: $("#taal2 option:selected").text(),
            woordenArray: {}
        }

        $('#woordenEditorDiv #woord1').each(function(index){
            if(this.value.trim() != "") {
                woordenLijst.woordenArray[index] = {0: $(this).val()};
            }
        });

        $('#woordenEditorDiv #woord2').each(function(index){
            if(this.value.trim() != "") {
                woordenLijst.woordenArray[index][1] = $(this).val();
            }
        });
        
        $.ajax({
        type: 'post',
        url: 'includes/woordenLijstSubmit.inc.php',
        data: woordenLijst,
        success: function () {
            $("#response").attr("class", "success");
            window.location.href = "lijsten.php";
        },
        error: function(xhr) {
            $("#response").attr("class", "error");
            $("#response").text(xhr.statusText);
        }
        });
    });
}

//Lijst importeren

$("#bestandInput").on("change", function() {
    $("#woordenEditorDiv #woord1").each(function(index) {
        $(this).val(CSVToArray());
    });

    let woordenArray;

    this.files[0].text().then(function(text) {
        woordenArray = CSVToArray(text, ";");
        woordenReplace(woordenArray.length);

        let i = 0;
        $("#woordenEditorDiv #woord1").each(function() {
            $(this).val(woordenArray[i][0]);
            i++;
        });


        let j = 0
        $("#woordenEditorDiv #woord2").each(function() {
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

if(window.location.pathname.match("/lijsten")) {
    $(window).on("load", function() {
        laadButtons();
    });
}

function laadButtons() {
    $('.bekijkButton').on('click', function(e) {
        e.preventDefault;
        let woordenLijstId = $(this).siblings('.lijstId').text();
        window.location.href = "lijst.php?woordenLijst=" + woordenLijstId;
    });

    $('.bewerkButton').on('click', function(e) {
        e.preventDefault;
        let woordenLijstId = $(this).siblings('.lijstId').text();
        window.location.href = "lijst-editor.php?woordenLijst=" + woordenLijstId;
    });

    $(".verwijderWoordenlijstButton").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'includes/woordenLijstDelete.inc.php',
            data: { woordenLijstId: $(this).siblings('.lijstId').text() },
            success: function () {
                $("#response").attr("class", "success");
                window.location.href = "lijsten.php";
            },
            error: function(xhr) {
                $("#response").attr("class", "error");
                $("#response").text(xhr.statusText);
            }
        });
    })
}

//--------------------------------------------------------

//----------------------Lijst weergave--------------------

$("#oefenButton").on("click", function(e) {
    e.preventDefault();
    let woordenLijstId = $(this).siblings('.lijstId').text();
    let oefenType = $(this).siblings('#oefenSelection').find('option:selected').text();
    window.location.href = "lijst-oefenen.php?woordenLijst=" + woordenLijstId + "&oefenType=" + oefenType;
});

$("#woordenLijstZoekenInput").on("keyup", function(e) {
    if(e.key != "Enter") return;
    e.preventDefault();

    zoekWoordenlijsten($(this));
})

$("#woordenLijstZoekenButton").on("click", function(e) {
    e.preventDefault();
    zoekWoordenlijsten($(this));
})

let timeout = 0;

function zoekWoordenlijsten(t) {
    let woordenLijstSearchInput = $(t).parent().find('#woordenLijstZoekenInput').val();
    $.ajax({
        type: 'get',
        url: 'includes/woordenLijstSearch.inc.php',
        data: { woordenLijstSearch: woordenLijstSearchInput },
        success: function (res) {
            let lijstenDiv = $('.lijstenDiv');
            lijstenDiv.children().remove();
            res.forEach(function(value) {
                let lijstDiv = `<div><p class='hidden lijstId'>` + value.woordenLijstId + `</p>
                <p>Naam: ` + value.woordenLijstNaam + `</p>
                <p>Aantal woorden: ` + value.woordenAantal + `</p>
                <button class='bewerkButton'>Bewerken</button>
                <button class='bekijkButton'>Bekijken</button>
                <button class='verwijderWoordenlijstButton'>Verwijderen</button>
                </div>`;

                lijstenDiv.append(lijstDiv);
                laadButtons();
            });
        },
        error: function(xhr) {
            $("#searchError").text(xhr.statusText);
            $("#searchError").css("color", "red");
        
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                $("#searchError").text("");
            }, 4000);
        }
    });
}

//--------------------------------------------------------

//----------------------Lijst oefenen---------------------

let woordenArrayTotaal = [];
let woordenArray = [];
let woordenAntwoord;
let woordenVraag;

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
            woordenLijstId: urlParameters.get("woordenLijst")
        },
        success: function (response) {
            woordenLijst = response;
            woordenArrayTotaal = woordenLijst.woordenArray;
            woordenArray = (woordenLijst.woordenArray).slice();

            console.log(urlParameters.get("oefenType"));
            switch(urlParameters.get("oefenType")) {
                case "Toets":
                    $("#oefenDiv").load("toets.php", function() {
                        woordenArray = shuffleArray(woordenArray);
                        woordenAntwoord = woordenArray[0][1];
                        $("#oefenDiv .oefenWoord").text(woordenArray[0][0]);

                        $("#oefenDiv #controleerButton").on("click", function(e) {
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
                            window.location.href = "lijsten.php";
                        });

                        $("#resultaatDiv #foutenImporterenButton").on("click", nieuweWoordenlijstFouten);
                    });
                    break;

                case "Memory":
                    $("#oefenDiv").load("memory.php", function() {
                        startMemory();

                        $("#resultaatDiv #resultaatButton").on("click", function() {
                            window.location.href = "lijsten.php";
                        });

                        $("#resultaatDiv #foutenImporterenButton").on("click", nieuweWoordenlijstFouten);
                    });

                    break;

                case "Galgje":
                    $("#oefenDiv").load("galgje.php", function() {
                        startGalgje();

                        $("#resultaatDiv #resultaatButton").on("click", function() {
                            window.location.href = "lijsten.php";
                        });

                        $("#resultaatDiv #foutenImporterenButton").on("click", nieuweWoordenlijstFouten);
                    });

                    break;
                    
                default:
                    window.location.href = "lijst.php?woordenLijst=" + urlParameters.get("woordenLijst");
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
            window.location.href = "lijst-editor.php?woordenLijst=" + response.woordenLijstId;
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
                cijfer = parseInt(((goedCount/woordenArrayTotaal.length*9)+1).toFixed(1));
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

            alert("Je hebt het fout");
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

let aantalGeopendeKaarten = 0;

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
            laadWoorden(currChunk);
            currChunk++;
        }
    } else {
        clearInterval(interval);
        disableKaarten();
        cijfer = parseInt(((goedCount/woordenArrayTotaal.length*9)+1).toFixed(1));
        verstuurScore(cijfer * 10);
    }
}

function laadWoorden(woordenIndex) {
    $('#oefenDiv .kaart').remove();

    arrayChunks[woordenIndex].forEach(function(item, index) {
        for(let z = 0; z <= item.length-1; z++) {
            kaarten = $("<div class='kaart' id=" + index + "><img src='img/Logo.png'><p type=" + z + ">" + item[z] + "</p></div>");
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
    aantalGeopendeKaarten++;
    $('#aantalGeopendeKaarten').text(aantalGeopendeKaarten);
    geopendeKaarten.push(kaart);
    let len = geopendeKaarten.length;
    if(len === 2) {

        if($(geopendeKaarten[0]).attr("id") === $(geopendeKaarten[1]).attr("id")) {
            geopendeKaarten[0].addClass("disabled flip matching");
            geopendeKaarten[1].addClass("disabled flip matching");
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
                geopendeKaarten[0].removeClass("flip disabled");
                geopendeKaarten[1].removeClass("flip disabled");
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
    kaart.toggleClass("flip");
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
            $("#cijferText").text("Cijfer: " + (score/10));
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
}

//Galgje

let totaalGoedeLetters = 0;
let totaalFouteLetters = 0;

let goedeLetters = 0;
let fouteLetters = 0;

function startGalgje() {
    woordenArray = shuffleArray(woordenArray);

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for(let i = 0; i < alphabet.length; i++) {
        $("#letters").append("<li class='letter'><button class='galgjeButton'>" + alphabet[i] + "</button></li>");
    }

    laadAntwoord();

    $("#letters li button").on("click", function() {
        let letter = $(this).text().toLowerCase();
        if(woordenAntwoord.toLowerCase().includes(letter)) { 
            let indices = [];
            
            for(let i = 0; i < woordenAntwoord.length; i++) {
                if(woordenAntwoord[i].toLowerCase() === letter) {
                    indices.push(i);
                }
            }

            if(indices.length > 0) {
                for(let i = 0; i < indices.length; i++) {
                    $($("#galgjeGuess").children()[indices[i]]).text(woordenAntwoord[indices[i]]);
                }
            }

            $(this).attr('disabled', true);

            goedeLetters += indices.length;
            totaalGoedeLetters += indices.length;

            if(goedeLetters >= woordenAntwoord.length) {
                laadAntwoord();
            }
        } else {
            $($("#galgjePoppetjeDiv").children()[fouteLetters]).show();
            
            fouteLetters++;
            totaalFouteLetters++;

            $(this).attr('disabled', true);

            if(fouteLetters > $("#galgjePoppetjeDiv").children().length) {
                window.location.href = "lijst.php?woordenLijst=" + parseInt(urlParameters.get("woordenLijst"));

                //Evt nog verlies scherm toevoegen
            }
        }
    });
}

function laadAntwoord() {
    if(woordenArray.length - 1 < 0) {
        verstuurScore(100);
        return;
    }

    goedeLetters = 0;
    fouteLetters = 0;
    nieuweWoorden = woordenArray.pop();
    woordenVraag = nieuweWoorden[0];
    woordenAntwoord = nieuweWoorden[1];

    $("#galgjePoppetjeDiv").children().hide();

    $("#galgjeWoord").text(woordenVraag);

    $("#letters li button").attr('disabled', false);

    $("#galgjeGuess > *").remove();
    
    for(let i = 0; i < woordenAntwoord.length; i++) {
        $("#galgjeGuess").append("<p></p>");
    }
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
    window.location.href = "klas.php?klasId=" + parseInt($(this).siblings(".klasId").text());
});

$(".klasJoinButton").on("click", function() {
    $.ajax({
        type: 'post',
        url: 'includes/klasSubmit.inc.php',
        data: {
            klasId: parseInt($(this).siblings(".klasId").text())
        },
        success: function (response) {
            window.location.href = "klas.php?klasId=" + klasId;
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
});

//--------------------------------------------------------

//----------------------Klas informatie-------------------

let boundsElement;
let targetElement;
let deleteElement;

let characterData = [];
let allItems = [];
let defaultData = [];
let unlockItems = [];
let selectItems = [];
let currentItems = [];
let currentIndex = 0;
let currentItem;

if(urlParameters.has("klasId") && window.location.pathname.match("/klas")) {
    let characterGetData;
    $(window).on("load", function() {
        boundsElement = $(".character");
        $.when(
        $.ajax({
            type: 'post',
            url: "./includes/itemsData.json",
            success: function (response) {
                allItems = response;
            }
        }),

        $.ajax({
            type: 'post',
            url: "./includes/itemsDefaultData.json",
            success: function (response) {
                defaultData = response;
            }
        }),
        
        $.ajax({
            type: 'get',
            url: "./includes/characterGetUnlocks.inc.php",
            data: {
                klasId: urlParameters.get("klasId")
            },
            success: function (response) {
                unlockItems = response;
                allItems.forEach(function(value, index) {
                    unlockItems.forEach(function(value2) {
                        if(index === parseInt(value2.id)) {
                            if(value2.unlocked) {
                                allItems[index].itemUnlocked = true;
                            } else {
                                allItems[index].itemUnlocked = false;
                            }
                        }
                    });
                });

                selectItems = [...allItems];
                currentItem = allItems[currentIndex];
                currentItems = selectItems.slice(0, 4);
                updateItem();
                updateItems();
            }
        }),

        $.ajax({
            type: 'get',
            url: 'includes/characterGet.inc.php',
            data: {
                klasId: parseInt(urlParameters.get("klasId"))
            },
            success: function (response) {
                characterGetData = response;
            },
            error: function(xhr) {
                $('#response').text(xhr.statusText);
            }
        }),).done(function() {
            laadCharacter(characterGetData);
        })
    });
}

let currentX;
let currentY;
let initialX;
let initialY;

let dragging = false;
let deleting = false;

function laadCharacter(res) {
    characterData = res;
    characterData.forEach(function(item) {
        let newElement;
        let display = false;

        if(unlockItems[parseInt(item.id)].unlocked) {
            if(item.deleted === 'false') {
                display = true;
            } else {
                display = false;
            }
        } else {
            display = false;
        }

        if(display) {
            newElement = $("<div draggable='true' id='" + item.type + "'></div>");
            newElement.attr("deleted", 'false');
            newElement.attr("itemId", item.id);
            newElement.css("transform", "translate(" + item.x + "px, " + item.y + "px)");
            newElement.css("background-image", "url(" + allItems[item.id].itemImage + ")");
            boundsElement.append(newElement);
        } else {
            newElement = $("<div draggable='false' id='" + item.type + "'></div>");
            newElement.attr("itemId", item.id);
            newElement.attr("deleted", 'true');
            newElement.css("transform", "translate(" + defaultData[item.type].itemDefaultPos.x + "px, " + defaultData[item.type].itemDefaultPos.y + "px)");
            newElement.css("background-image", "url()");
            boundsElement.append(newElement);
        }
    });

    deleteElement = $('#delete');
    let preloadImg = new Image();
    preloadImg.src = './img/character/delete/trashopen.png';

    $(".character > *").on({
        mousedown: dragStart,
    });

    $(".character > *").each(function() {
        let img = $("<img>");
        let el = $(this);
        img.on("load", function() {
            $(el).width(this.width);
            $(el).height(this.height);
        });
        img.attr('src', $(this).css("background-image").replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]);
    });

    $(document).on({
        mousemove: function(e) {
            drag(e);
        },
        mouseup: function(e) {
            dragEnd(e);
        }
    });
}

$("#characterResetButton").on("click", function() {
    let elements = $(".character > *");
    characterData.forEach(function(item, index) {
        $(elements[index]).css("transform", "translate(" + item.x + "px, " + item.y + "px)");
    });
});

$("#characterOpslaanButton").on("click", function() {
    let newCharacterData = [];
    $(".character > *").each(function() {
        if($(this).attr("itemId")) {
            let transformMatrix = $(this).css("-webkit-transform") ||
            $(this).css("-moz-transform")    ||
            $(this).css("-ms-transform")     ||
            $(this).css("-o-transform")      ||
            $(this).css("transform");
            let matrix = transformMatrix.replace(/[^0-9\-.,]/g, '').split(',');
            let x = matrix[12] || matrix[4];
            let y = matrix[13] || matrix[5];
            newCharacterData.push({
                id: $(this).attr("itemId"),
                type: $(this).attr("id"),
                deleted: $(this).attr('deleted'),
                x: x,
                y: y
            });
        }
    });

    $.ajax({
        type: 'post',
        url: 'includes/characterUpdate.inc.php',
        data: {
            characterData: newCharacterData,
            klasId: parseInt(urlParameters.get("klasId"))
        },
        success: function (response) {
            $("#response").text("Poppetje opgeslagen!");
        },
        error: function(xhr) {
            $('#response').text(xhr.statusText);
        }
    });
});

function dragStart(e) {
    if(!dragging) {
        e.preventDefault();
        targetElement = e.target;
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX ;
            initialY = e.touches[0].clientY;
        } else {
            previousX = $(targetElement).position().left;
            previousY = $(targetElement).position().top;
            initialX = ($(targetElement).offset().left + $(targetElement).width() / 2) - e.clientX;
            initialY = ($(targetElement).offset().top + $(targetElement).height() / 2) - e.clientY;
        }

        dragging = true;
    }
}

function dragEnd(e) {
    e.preventDefault();

    if(deleting) {
        let type = $(targetElement).attr('id');
        $(targetElement).css("background-image", "url()");
        $(targetElement).attr('deleted', 'true');
        $(targetElement).attr("draggable", "false");
        $(targetElement).css("transform", "translate(" + defaultData[type].itemDefaultPos.x + "px, " + defaultData[type].itemDefaultPos.y + "px)");
    }

    deleteElement.css('background-image', 'url(./img/character/delete/trash.png)');
    deleteElement.height(67);
    deleting = false;
    dragging = false;
    targetElement = null;
}

let xAllowed;
let yAllowed;

function drag(e) {
    e.preventDefault();
    if($(targetElement).attr('draggable') === 'true') {
        if(dragging) {
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - boundsElement.position().left - $(targetElement).width()/2;
                currentY = e.touches[0].clientY - boundsElement.position().top - $(targetElement).height()/2;
            } else {
                currentX = e.clientX - boundsElement.position().left - $(targetElement).width()/2 + initialX;
                currentY = e.clientY - boundsElement.position().top - $(targetElement).height()/2 + initialY;

                diffX = currentX - previousX;
                diffY = currentY - previousY;
            }

            boundsLeft = 0;
            boundsRight = boundsElement.width();
            boundsTop = 0;
            boundsBottom = boundsElement.height();

            xMinAllowed = currentX >= boundsLeft;
            xMaxAllowed = currentX + $(targetElement).width() <= boundsRight
            yMinAllowed = currentY >= boundsTop;
            yMaxAllowed = currentY + $(targetElement).height() <= boundsBottom;

            let boundRight = boundsElement.width() - $(targetElement).width();
            let boundBottom = boundsElement.height() - $(targetElement).height();
            if(xMaxAllowed && xMinAllowed && yMinAllowed && yMaxAllowed) {
                $(targetElement).css("transform", "translate(" + currentX + "px, " + currentY + "px)");
            } else if(!xMinAllowed && yMaxAllowed && yMinAllowed) {
                $(targetElement).css("transform", "translate(" + 0 + "px, " + currentY + "px)");
            } else if(!xMaxAllowed && yMaxAllowed && yMinAllowed) {
                $(targetElement).css("transform", "translate(" + boundRight + "px, " + currentY + "px)");
            } else if(!yMinAllowed && xMaxAllowed && xMinAllowed) {
                $(targetElement).css("transform", "translate(" + currentX + "px, " + 0 + "px)");
            } else if(!yMaxAllowed && xMaxAllowed && xMinAllowed) {
                $(targetElement).css("transform", "translate(" + currentX + "px, " + boundBottom + "px)");
            }

            previousX = currentX;
            previousY = currentY;

            if(deleteElement.length) {
                deleteLeft = deleteElement.position().left;
                deleteRight = deleteElement.position().left + deleteElement.width();
                deleteTop = deleteElement.position().top;
                deleteBottom = deleteElement.position().top + deleteElement.height();

                deleteXAllowed = $(targetElement).position().left <= deleteRight && $(targetElement).position().left + $(targetElement).width() >= deleteLeft;
                deleteYAllowed = $(targetElement).position().top + $(targetElement).height() >= deleteTop && $(targetElement).position().top <= deleteBottom;
                if(deleteXAllowed && deleteYAllowed) {
                    deleting = true;
                    deleteElement.css('background-image', 'url(./img/character/delete/trashopen.png)');
                    deleteElement.height(81);
                } else {
                    deleting = false;
                    deleteElement.css('background-image', 'url(./img/character/delete/trash.png)');
                    deleteElement.height(67);
                }
            }
        }
    }
}

$("#shopPreviousItem").on("click", function() {
    if(currentIndex-1 < 0) {
        currentIndex = allItems.length-1;
        currentItem = allItems[currentIndex];
        updateItem();
    } else {
        currentIndex--;
        currentItem = allItems[currentIndex];
        updateItem();
    }
});

$("#shopNextItem").on("click", function() {
    if(currentIndex+1 >= allItems.length) {
        currentIndex = 0;
        currentItem = allItems[currentIndex];
        updateItem();
    } else {
        currentIndex++;
        currentItem = allItems[currentIndex];
        updateItem();
    }
});

$("#selectionPreviousItem").on("click", function() {
    let shiftedItem = selectItems.pop();
    selectItems.unshift(shiftedItem);
    currentItems = selectItems.slice(0, 4);
    updateItems();
});

$("#selectionNextItem").on("click", function() {
    let shiftedItem = selectItems.shift();
    selectItems.push(shiftedItem);
    currentItems = selectItems.slice(0, 4);
    updateItems();
});

function updateItem() {
    $("#itemId").text(allItems.indexOf(currentItem));
    $("#selectItemType").text(currentItem.itemType);
    $("#itemImg").attr("src", currentItem.itemImage);
    $("#itemPrice").text(currentItem.itemPrice);

    if(!currentItem.itemUnlocked) {
        $('.shop .shopItem').addClass("itemDisabled");
    } else {
        $('.shop .shopItem').removeClass("itemDisabled");
    }
}

function updateItems() {
    for(let i = 0; i < 4; i++) {
        let selectionDivs = $(".itemSelect").toArray();
        $(selectionDivs[i]).find("#selectItemId").text(allItems.indexOf(currentItems[i]));
        $(selectionDivs[i]).find("#selectItemType").text(currentItems[i].itemType);
        $(selectionDivs[i]).find("#selectItemName").text(currentItems[i].itemName);
        $(selectionDivs[i]).find("#selectItemImg").attr("src", currentItems[i].itemImage);

        if(!currentItems[i].itemUnlocked) {
            $(selectionDivs[i]).addClass("itemDisabled");
        } else {
            $(selectionDivs[i]).removeClass("itemDisabled");
        }
    }
}

$(".itemSelect").on("click", function(e) {
    if(unlockItems[parseInt($(this).find("#selectItemId").text())].unlocked) {
        let item = allItems[parseInt($(this).find("#selectItemId").text())];
        $("#" + item.itemType).css("background-image", "url(" + item.itemImage + ")");
        $("#" + item.itemType).attr("itemId", allItems.indexOf(item));
        $("#" + item.itemType).attr("draggable", "true");
        let img = new Image();
        img.src = item.itemImage;
        $("#" + item.itemType).width(img.width);
        $("#" + item.itemType).attr('deleted', 'false');
        $("#" + item.itemType).height(img.height);
    } else {
        e.preventDefault();
    }
});

$("#itemUnlockButton").on("click", function() {
    $('#response').text('');
    $.ajax({
        type: 'post',
        url: 'includes/characterUpdateUnlocks.inc.php',
        data: {
            unlockData: unlockItems[allItems.indexOf(currentItem)],
            klasId: urlParameters.get("klasId")
        },
        success: function (response) {
            $('.self .leerlingScore').text(parseInt($('.self .leerlingScore').text()) - currentItem.itemPrice);
            $('#klasScore').text(parseInt($('#klasScore').text()) - currentItem.itemPrice);
            unlockItems[allItems.indexOf(currentItem)].unlocked = true;
            $('.shop .shopItem').removeClass('itemDisabled');
            $('#response').text(response.statusText);
        },
        error: function(response) {
            $('#response').text(response.statusText);
        }
    });
});

//--------------------------------------------------------

//----------------------Leraar dashboard-------------------

if(window.location.pathname.match("/leraarDashboard")) {
    laadKlassen();
}

$("#addKlasSubmit").on("click", function(e) {
    e.preventDefault();
    $.ajax({
        type: 'post',
        url: 'includes/klasAdd.inc.php',
        data: {
            klasNaam: $("#addKlasDiv #klasNaam").val(),
            klasNiveau: $("#addKlasDiv #klasNiveau option:selected").val(),
            klasJaar: $("#addKlasDiv #klasJaar").val(),
        },
        success: function () {
            laadKlassen();
        },
        error: function(xhr) {
            $('#response').show();
            $('#response').text(xhr.statusText);
        }
    });
});

function laadKlassen() {
    $("#leraarDashboardKlassenLijst ul > *").remove();
    $("#leraarDashboardKlassenLijst ul").load("klassenLijst.php", function() {
        $(".klasBekijkButton").on("click", function() {
            window.location.href = "klas.php?klasId=" + parseInt($(this).siblings(".klasId").text());
        });

        $(".editKlasOpenButton").on("click", function(e) {
            $(this).siblings(".editKlasDiv").css("display", "block");
        });
        
        $(".editKlasCollapseButton").on("click", function(e) {
            $(this).parent().css("display", "none");
        });

        $(".klasDeleteButton").on("click", function() {
            if(confirm("Zeker?")) {
                $.ajax({
                    type: 'post',
                    url: 'includes/klasDelete.inc.php',
                    data: {
                        klasId: parseInt($(this).siblings(".klasId").text()),
                    },
                    success: function () {
                        laadKlassen();
                    },
                    error: function(xhr) {
                        $('#response').text(xhr.statusText);
                    }
                });
            }
        });
    });
}

//--------------------------------------------------------

//----------------------Signup----------------------------

if(window.location.pathname.match("/signup")) {
    $(window).on('load', function() {
        checkSignupEmptyInputs();
    });

    $(".signup form input[type='text']").on("keyup", checkSignupEmptyInputs);
    $("#algemeneVoorwaarden").on("change", checkSignupEmptyInputs);

    function checkSignupEmptyInputs() {
        let noneEmpty = true;
        $(".signup form input[type='text']").each(function() {
            if(this.value.trim() == "") {
                noneEmpty = false;
            }
        });

        $(".signup form input[type='password']").each(function() {
            if(this.value.trim() == "") {
                noneEmpty = false;
            }
        });
        
        if(!$("#algemeneVoorwaarden").is(":checked")) {
            noneEmpty = false;
        }

        if(noneEmpty) {
            $("#signupSubmit").prop("disabled", false);
        } else {
            $("#signupSubmit").prop("disabled", true);
        }
    }
}

//--------------------------------------------------------