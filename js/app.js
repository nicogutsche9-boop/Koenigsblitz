/* =========================================================
   KÖNIGSBLITZ
   APP.JS
   Navigation + Übersicht + Spielen
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTE
    ===================================================== */

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");

    const toast = document.getElementById("kb-toast");


    /* =====================================================
       HILFSFUNKTION – MELDUNG
    ===================================================== */

    window.showMessage = function(message) {

        if (!toast) {
            alert(message);
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.kbToastTimer);

        window.kbToastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);

    };


    /* =====================================================
       NAVIGATION
    ===================================================== */

    function openPage(pageName) {

        pages.forEach(page => {

            page.classList.remove("active-page");

        });


        const selectedPage =
            document.getElementById("page-" + pageName);


        if (selectedPage) {

            selectedPage.classList.add("active-page");

        }


        navItems.forEach(item => {

            item.classList.remove("active");


            if (
                item.dataset.page === pageName
            ) {

                item.classList.add("active");

            }

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const page =
                item.dataset.page;


            if (!page) {
                return;
            }


            openPage(page);

        });

    });


    /* =====================================================
       ÖFFENTLICHE NAVIGATION
       Damit Buttons aus der HTML-Datei ebenfalls
       Seiten öffnen können.
    ===================================================== */

    window.openPage = openPage;


    window.goToOverview = function() {

        openPage("overview");

    };


    window.goToPlay = function() {

        openPage("play");

    };


    window.goToFriends = function() {

        openPage("friends");

    };


    window.goToRanking = function() {

        openPage("ranking");

    };


    window.goToMessages = function() {

        openPage("messages");

    };


    window.goToSettings = function() {

        openPage("settings");

    };


    window.goToShop = function() {

        openPage("shop");

    };


    /* =====================================================
       SCHNELL SPIELEN
    ===================================================== */

    window.startQuickGame = function() {

        showMessage(
            "Gegnersuche wird gestartet …"
        );


        /*
         * Später wird hier deine echte
         * Chess-/Online-Spiel-Logik verbunden.
         *
         * Beispiel:
         *
         * if (typeof quickJoin === "function") {
         *     quickJoin();
         * }
         */

    };


    /* =====================================================
       MIT FREUNDEN SPIELEN
    ===================================================== */

    window.playWithFriends = function() {

        showMessage(
            "Freunde-Bereich wird geöffnet …"
        );

        setTimeout(() => {

            openPage("friends");

        }, 250);

    };


    /* =====================================================
       SPIEL BEITRETEN
    ===================================================== */

    window.joinGame = function() {

        const input =
            document.getElementById("room-code");


        if (!input) {

            showMessage(
                "Raumcode-Feld wurde nicht gefunden."
            );

            return;

        }


        const code =
            input.value.trim();


        if (!code) {

            input.focus();

            input.classList.add("input-error");


            setTimeout(() => {

                input.classList.remove(
                    "input-error"
                );

            }, 700);


            showMessage(
                "Bitte gib einen Raumcode ein."
            );

            return;

        }


        showMessage(
            "Raum " + code +
            " wird geöffnet …"
        );


        /*
         * Später:
         *
         * if (typeof joinRoom === "function") {
         *     joinRoom(code);
         * }
         */

    };


    /* =====================================================
       ENTER IM RAUMCODE-FELD
    ===================================================== */

    const roomInput =
        document.getElementById("room-code");


    if (roomInput) {

        roomInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {

                    joinGame();

                }

            }
        );

    }


    /* =====================================================
       RAUM ERSTELLEN
    ===================================================== */

    window.createGameRoom = function() {

        showMessage(
            "Ein neuer Spielraum wird erstellt …"
        );


        /*
         * Später:
         *
         * if (typeof createRoom === "function") {
         *     createRoom();
         * }
         */

    };


    /* =====================================================
       FREUNDE
    ===================================================== */

    window.addFriend = function() {

        const name =
            prompt(
                "Spielername eingeben:"
            );


        if (!name) {
            return;
        }


        showMessage(
            "Freundschaftsanfrage an " +
            name +
            " vorbereitet."
        );

    };


    /* =========================================================
   NACHRICHTEN
========================================================= */

function openMessage(messageId) {

    if (messageId === "koenigsblitz") {

        showMessage(
            "Königsblitz: Willkommen bei Königsblitz!"
        );

        return;
    }

    if (messageId === "chessmaster") {

        showMessage(
            "ChessMaster: Lust auf eine Partie?"
        );

        return;
    }

    if (messageId === "blitzking") {

        showMessage(
            "BlitzKing: Danke für die Partie!"
        );

        return;
    }

}


function newMessage() {

    showMessage(
        "Neue Nachricht kommt als Nächstes."
    );

}


window.openMessage =
    openMessage;

window.newMessage =
    newMessage;

    /* =====================================================
       SHOP
    ===================================================== */

    window.buyShopItem = function(
        itemName,
        price
    ) {

        let coins =
            parseInt(
                localStorage.getItem(
                    "kingsblitzCoins"
                )
            );


        if (isNaN(coins)) {

            coins = 100;

        }


        if (coins < price) {

            showMessage(
                "Du hast nicht genügend Coins."
            );

            return;

        }


        coins -= price;


        localStorage.setItem(
            "kingsblitzCoins",
            coins
        );


        updateCoins();


        showMessage(
            itemName +
            " wurde gekauft! 🎉"
        );

    };


    /* =====================================================
       COINS ANZEIGEN
    ===================================================== */

    function updateCoins() {

        let coins =
            parseInt(
                localStorage.getItem(
                    "kingsblitzCoins"
                )
            );


        if (isNaN(coins)) {

            coins = 100;

            localStorage.setItem(
                "kingsblitzCoins",
                coins
            );

        }


        const coinElements =
            document.querySelectorAll(
                "[data-coins]"
            );


        coinElements.forEach(element => {

            element.textContent =
                coins;

        });

    }


    updateCoins();


    /* =====================================================
       SHOP ÖFFNEN
    ===================================================== */

    window.openShop = function() {

        openPage("shop");

    };


    /* =====================================================
       BELOHNUNGEN
    ===================================================== */

    window.openRewards = function() {

        showMessage(
            "Deine Belohnungen werden geöffnet …"
        );

    };


    /* =====================================================
       LETZTE PARTIE
    ===================================================== */

    window.openLastGame = function() {

        showMessage(
            "Die letzte Partie wird geöffnet …"
        );

    };


    /* =====================================================
       PROFIL
    ===================================================== */

    window.openProfile = function() {

        showMessage(
            "Profil wird geöffnet …"
        );

    };


    /* =====================================================
       LOGOUT / ACCOUNT
    ===================================================== */

    window.logout = function() {

        const confirmed =
            confirm(
                "Möchtest du dich wirklich abmelden?"
            );


        if (!confirmed) {
            return;
        }


        showMessage(
            "Du wurdest abgemeldet."
        );

    };


    /* =====================================================
       INITIALER STATUS
    ===================================================== */

    const firstPage =
        document.querySelector(
            ".page.active-page"
        );


    if (!firstPage && pages.length > 0) {

        pages[0].classList.add(
            "active-page"
        );

    }


    /*
     * Falls noch kein Navigationspunkt
     * aktiv ist, Übersicht aktivieren.
     */

    const activeNavigation =
        document.querySelector(
            ".nav-item.active"
        );


    if (!activeNavigation) {

        const overview =
            document.querySelector(
                '.nav-item[data-page="overview"]'
            );


        if (overview) {

            overview.classList.add(
                "active"
            );

        }

    }


    console.log(
        "Königsblitz App erfolgreich geladen."
    );

});

/* =========================================================
   EINSTELLUNGEN
========================================================= */

function editProfile() {

    showMessage(
        "Profil bearbeiten kommt als Nächstes."
    );

}


function toggleSetting(button) {

    button.classList.toggle("active");

}


window.editProfile =
    editProfile;

window.toggleSetting =
    toggleSetting;

/* =========================================================
   SHOP KATEGORIEN
========================================================= */

function filterShop(category, button) {

    const items =
        document.querySelectorAll(".shop-item-large");

    const buttons =
        document.querySelectorAll(".shop-category");


    buttons.forEach(function(item) {

        item.classList.remove("active");

    });


    button.classList.add("active");


    items.forEach(function(item) {

        const itemCategory =
            item.dataset.category;


        if (
            category === "all" ||
            itemCategory === category
        ) {

            item.style.display = "";

        } else {

            item.style.display = "none";

        }

    });

}


window.filterShop =
    filterShop;

/* =========================================================
   KÖNIGSBLITZ – COIN SYSTEM
========================================================= */

(function () {

    /* -----------------------------------------------------
       GRUNDWERTE
    ----------------------------------------------------- */

    const DEFAULT_COINS = 100;

    let coins = parseInt(
        localStorage.getItem("koenigsblitzCoins"),
        10
    );

    if (isNaN(coins)) {
        coins = DEFAULT_COINS;

        localStorage.setItem(
            "koenigsblitzCoins",
            coins
        );
    }


    /* -----------------------------------------------------
       COIN-ANZEIGEN AKTUALISIEREN
    ----------------------------------------------------- */

    function updateCoinDisplay() {

        const coinElements =
            document.querySelectorAll(
                "#shop-coins, .coin-display strong"
            );


        coinElements.forEach(function (element) {

            element.textContent = coins;

        });

    }


    /* -----------------------------------------------------
       COINS ABFRAGEN
    ----------------------------------------------------- */

    function getCoins() {

        return coins;

    }


    /* -----------------------------------------------------
       COINS SPEICHERN
    ----------------------------------------------------- */

    function saveCoins() {

        localStorage.setItem(
            "koenigsblitzCoins",
            coins
        );

    }


    /* -----------------------------------------------------
       COINS HINZUFÜGEN
       Wird später z.B. für Siege verwendet.
    ----------------------------------------------------- */

    function addCoins(amount) {

        amount = Number(amount);

        if (
            isNaN(amount) ||
            amount <= 0
        ) {
            return;
        }


        coins += amount;

        saveCoins();

        updateCoinDisplay();


        if (typeof showMessage === "function") {

            showMessage(
                "+" + amount + " 🪙 Coins erhalten!"
            );

        }

    }


    /* -----------------------------------------------------
       ARTIKEL BESITZEN
    ----------------------------------------------------- */

    function getPurchasedItems() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "koenigsblitzPurchasedItems"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    /* -----------------------------------------------------
       ARTIKEL SPEICHERN
    ----------------------------------------------------- */

    function savePurchasedItems(items) {

        localStorage.setItem(
            "koenigsblitzPurchasedItems",
            JSON.stringify(items)
        );

    }


    /* -----------------------------------------------------
       PRÜFEN, OB ARTIKEL BEREITS GEKAUFT
    ----------------------------------------------------- */

    function hasPurchased(itemName) {

        const items =
            getPurchasedItems();

        return items.includes(itemName);

    }


    /* -----------------------------------------------------
       ARTIKEL KAUFEN
    ----------------------------------------------------- */

    function buyItem(itemName, price) {

        price = Number(price);


        /* Ungültiger Preis */

        if (
            isNaN(price) ||
            price <= 0
        ) {

            showMessage(
                "Dieser Artikel ist momentan nicht verfügbar."
            );

            return;

        }


        /* Bereits gekauft */

        if (hasPurchased(itemName)) {

            showMessage(
                "Du besitzt diesen Artikel bereits."
            );

            return;

        }


        /* Nicht genügend Coins */

        if (coins < price) {

            showMessage(
                "Nicht genügend Coins! 🪙"
            );

            return;

        }


        /* Coins abziehen */

        coins -= price;


        /* Coins speichern */

        saveCoins();


        /* Artikel speichern */

        const purchasedItems =
            getPurchasedItems();


        purchasedItems.push(
            itemName
        );


        savePurchasedItems(
            purchasedItems
        );


        /* Anzeige aktualisieren */

        updateCoinDisplay();


        /* Button aktualisieren */

        updateShopButtons();


        /* Erfolgsmeldung */

        showMessage(
            "✓ " +
            itemName +
            " erfolgreich gekauft!"
        );

    }


    /* -----------------------------------------------------
       SHOP-BUTTONS AKTUALISIEREN
    ----------------------------------------------------- */

    function updateShopButtons() {

        const buttons =
            document.querySelectorAll(
                ".shop-item-large .primary-button"
            );


        buttons.forEach(function (button) {

            const onclick =
                button.getAttribute(
                    "onclick"
                );


            if (!onclick) {
                return;
            }


            const match =
                onclick.match(
                    /buyItem\(['"](.+?)['"],\s*(\d+)\)/
                );


            if (!match) {
                return;
            }


            const itemName =
                match[1];


            const price =
                Number(match[2]);


            if (hasPurchased(itemName)) {

                button.textContent =
                    "✓ Besitzt du";


                button.disabled = true;

                button.classList.add(
                    "purchased"
                );

            } else {

                button.textContent =
                    "Kaufen";


                button.disabled = false;

                button.classList.remove(
                    "purchased"
                );

            }

        });

    }


    /* -----------------------------------------------------
       INITIALISIERUNG
    ----------------------------------------------------- */

    function initializeCoins() {

        updateCoinDisplay();

        updateShopButtons();

    }


    /* -----------------------------------------------------
       GLOBALE FUNKTIONEN
    ----------------------------------------------------- */

    window.getCoins =
        getCoins;

    window.addCoins =
        addCoins;

    window.buyItem =
        buyItem;


    /* -----------------------------------------------------
       WARTEN BIS HTML GELADEN IST
    ----------------------------------------------------- */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeCoins
        );

    } else {

        initializeCoins();

    }

})();
