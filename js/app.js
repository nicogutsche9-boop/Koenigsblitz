/* =========================================================
   KÖNIGSBLITZ
   APP.JS – GRUNDNAVIGATION
   Version 1.0
========================================================= */

"use strict";


/* =========================================================
   APP START
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Königsblitz gestartet");

    initNavigation();

});


/* =========================================================
   NAVIGATION
========================================================= */

function initNavigation() {

    const navigationButtons =
        document.querySelectorAll(".nav-item");

    const pages =
        document.querySelectorAll(".page");


    /*
        Falls noch keine Navigation vorhanden ist,
        brechen wir sauber ab.
    */

    if (!navigationButtons.length) {

        console.warn(
            "Keine .nav-item Elemente gefunden."
        );

        return;
    }


    navigationButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const target =
                button.getAttribute("data-page");


            if (!target) {

                console.warn(
                    "Navigationspunkt besitzt kein data-page:",
                    button
                );

                return;
            }


            showPage(target);


            /*
                Aktiven Menüpunkt markieren
            */

            navigationButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            button.classList.add("active");

        });

    });


    /*
        Beim Start Übersicht anzeigen
    */

    const activeButton =
        document.querySelector(
            ".nav-item.active"
        );


    if (activeButton) {

        const startPage =
            activeButton.getAttribute("data-page");


        if (startPage) {

            showPage(startPage);

        }

    } else {

        showPage("overview");

    }

}


/* =========================================================
   SEITE ANZEIGEN
========================================================= */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");


    let pageFound = false;


    pages.forEach(function (page) {

        const pageId =
            page.getAttribute("data-page");


        if (pageId === pageName) {

            page.classList.add("active-page");

            pageFound = true;

        } else {

            page.classList.remove("active-page");

        }

    });


    /*
        Falls die gewünschte Seite noch nicht existiert,
        zeigen wir eine verständliche Meldung in der
        Entwicklerkonsole.
    */

    if (!pageFound) {

        console.warn(
            "Seite nicht gefunden:",
            pageName
        );

    }

}


/* =========================================================
   HILFSFUNKTION:
   NAVIGATION PROGRAMMATISCH ÖFFNEN
========================================================= */

function navigateTo(pageName) {

    const button =
        document.querySelector(
            '.nav-item[data-page="' +
            pageName +
            '"]'
        );


    if (button) {

        button.click();

        return;

    }


    showPage(pageName);

}


/* =========================================================
   ÖFFENTLICH VERFÜGBARE FUNKTION
========================================================= */

window.Koenigsblitz = {

    navigateTo: navigateTo,

    showPage: showPage

};
