// ==UserScript==
// @name         Amazon Rücksende
// @namespace    https://olschewsky.eu/
// @version      1.0
// @description  Extrahiert das Amazon Retourenlabel passen auf ein DIN A5 Format 
// @author       ruediger@olschewsky.eu
// @match        https://www.amazon.de/spr/returns/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.de
// @require      https://code.jquery.com/jquery-3.7.0.min.js
// @grant        none
// ==/UserScript==
const $ = window.$;

function parent(element, n = 1) {
    let {parentNode} = element;
    for (let i = 1; parentNode && i < n; i++) {
        ({parentNode} = parentNode);
    }
    return parentNode;
}

function cleanupPage() {
    $('body').contents().contents().each(function() {
        $(this).hide()
    });

    let contentContainer = $("#pageContentContainer");
    contentContainer.css("padding", "0");

    let containerRoot = document.querySelector("#pageContentContainer");
    do {
        let root = $(containerRoot);
        root.show();
        containerRoot = parent(containerRoot);
    } while(document.body != containerRoot)



        const label = $('img.cut-line-sign');


    // Drucken & Weiterleiten Buttons verstecken
    let buttonRow = $(".print-label-button");
    while(!buttonRow.parent().is(contentContainer)) {
        buttonRow = buttonRow.parent()
    }
    buttonRow.hide();
    // rücksende-Info verstecken
    $("#return-deadline-display").hide();


    // alles über den Label entfernen
    label.parent().parent().prevAll().each(function() {
        $(this).hide();
    });
    label.removeAttr('class');
    label.removeAttr('height');
    label.removeAttr('width');

    // etwas abstand nach dem Label für druck
    label.css("margin-bottom", "50px");


    // unnötige Textpassagen entfernen
    contentContainer
        .find(".a-text-left")
        .filter(function() {
        const text = $(this).text().trim();
        console.log(text);
        return text === "Rücksendungsübersicht" ||
            text === "Schneide  diesen Teil aus und lege ihn deiner Sendung bei."
    })
        .hide();

    // unnötige trennlinie entfernen
    contentContainer.find("hr").hide();

    const table = $('#pageContentContainer table');
    table.find("span, td, tr, th").each(function() {
        $(this).removeAttr('class');
        $(this).css('font-size', "12px");
        $(this).css('line-height', "");
        $(this).css('padding', "2px");
    });

    table.find("td:last-child").each(function() {
        $(this).css('text-align', "center");
        $(this).css('font-weight', "700");
    });
}

(function() {
    'use strict';

    $(document).ready(function() {
        var button = $("<button>DHL-Vordruck verwenden!</button>");
        button.on("click", function() {
            cleanupPage();
            window.print();
        });

        button.insertBefore(".print-label-button");

    });
})();
