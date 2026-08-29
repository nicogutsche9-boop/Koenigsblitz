/* =========================================================
   KÖNIGSBLITZ
   APP.JS
   Navigation + Übersicht + Spielen + Shop
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTE
    ===================================================== */

    const navItems = document.querySelectorAll(".nav-item");
    const pages = document.querySelectorAll(".page");
    const toast = document.getElementById("kb-toast");


    /* =====================================================
       MELDUNGEN
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
            document.querySelector(
                '.page[data-page="' + pageName + '"]'
            );


        if (selectedPage) {
            selectedPage.classList.add("active-page");
        }


        navItems.forEach(item => {

            item.classList.remove("active");

            if (item.dataset.page === pageName) {
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

            const page = item.dataset.page;

            if (!page) {
                return;
            }

            openPage(page);

        });

    });


    /* =====================================================
       ÖFFENTLICHE NAVIGATION
    ===================================================== */

    window.openPage = openPage;

    window.navigateTo = openPage;


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

    };


    /* =====================================================
       MIT FREUNDEN SPIELEN
    ===================================================== */

    window.playWithFriends = function() {

        openPage("friends");

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

    };


    /* =====================================================
       ENTER IM RAUMCODE
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


    /* =====================================================
       NACHRICHTEN
    ===================================================== */

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
       =====================================================
       COIN-SYSTEM
       =====================================================
    ====================================================== */

    const COIN_STORAGE_KEY =
        "kingsblitzCoins";


    const PURCHASE_STORAGE_KEY =
        "kingsblitzPurchasedItems";


    /* =====================================================
       COINS LADEN
    ===================================================== */

    function getCoins() {

        let coins =
            parseInt(
                localStorage.getItem(
                    COIN_STORAGE_KEY
                ),
                10
            );


        if (isNaN(coins)) {

            coins = 100;

            localStorage.setItem(
                COIN_STORAGE_KEY,
                String(coins)
            );

        }


        return coins;

    }


    /* =====================================================
       COINS SPEICHERN
    ===================================================== */

    function saveCoins(coins) {

        localStorage.setItem(
            COIN_STORAGE_KEY,
            String(coins)
        );

    }


    /* =====================================================
       COIN-ANZEIGE AKTUALISIEREN
    ===================================================== */

    function updateCoins() {

        const coins =
            getCoins();


        /*
         * Unterstützt sowohl:
         *
         * data-coins="true"
         *
         * als auch
         *
         * .coin-display strong
         */

        const coinElements =
            document.querySelectorAll(
                "[data-coins], .coin-display strong, .shop-coins strong"
            );


        coinElements.forEach(element => {

            element.textContent =
                coins;

        });

    }


    /* =====================================================
       COINS ÖFFENTLICH ZUGÄNGLICH
    ===================================================== */

    window.getCoins = function() {

        return getCoins();

    };


    /* =====================================================
       COINS HINZUFÜGEN
       Wird später für Belohnungen / Siege verwendet.
    ===================================================== */

    window.addCoins = function(amount) {

        amount =
            Number(amount);


        if (
            isNaN(amount) ||
            amount <= 0
        ) {
            return;
        }


        let coins =
            getCoins();


        coins += amount;


        saveCoins(coins);

        updateCoins();


        showMessage(
            "+" + amount +
            " 🪙 Coins erhalten!"
        );

    };


    /* =====================================================
       GEKAUFTE ARTIKEL LADEN
    ===================================================== */

    function getPurchasedItems() {

        try {

            const saved =
                localStorage.getItem(
                    PURCHASE_STORAGE_KEY
                );


            if (!saved) {
                return [];
            }


            const items =
                JSON.parse(saved);


            if (!Array.isArray(items)) {
                return [];
            }


            return items;

        } catch (error) {

            console.error(
                "Fehler beim Laden der gekauften Artikel:",
                error
            );


            return [];

        }

    }


    /* =====================================================
       GEKAUFTE ARTIKEL SPEICHERN
    ===================================================== */

    function savePurchasedItems(items) {

        localStorage.setItem(
            PURCHASE_STORAGE_KEY,
            JSON.stringify(items)
        );

    }


    /* =====================================================
       PRÜFEN OB ARTIKEL GEKAUFT
    ===================================================== */

    function hasPurchased(itemName) {

        const items =
            getPurchasedItems();


        return items.includes(
            itemName
        );

    }


    /* =====================================================
       SHOP-ARTIKEL KAUFEN
    ===================================================== */

    window.buyShopItem = function(
        itemName,
        price
    ) {

        price =
            Number(price);


        if (
            !itemName ||
            isNaN(price) ||
            price <= 0
        ) {

            showMessage(
                "Dieser Artikel ist momentan nicht verfügbar."
            );

            return;

        }


        /*
         * Prüfen, ob bereits gekauft
         */

        if (hasPurchased(itemName)) {

            showMessage(
                "Du besitzt diesen Artikel bereits."
            );

            return;

        }


        /*
         * Aktuellen Kontostand holen
         */

        let coins =
            getCoins();


        /*
         * Zu wenig Coins
         */

        if (coins < price) {

            showMessage(
                "Du hast nicht genügend Coins. 🪙"
            );

            return;

        }


        /*
         * Preis abziehen
         */

        coins -= price;


        /*
         * Neuen Kontostand speichern
         */

        saveCoins(coins);


        /*
         * Artikel speichern
         */

        const purchasedItems =
            getPurchasedItems();


        purchasedItems.push(
            itemName
        );


        savePurchasedItems(
            purchasedItems
        );


        /*
         * Anzeigen aktualisieren
         */

        updateCoins();

        updateShopButtons();


        /*
         * Erfolg
         */

        showMessage(
            "✓ " +
            itemName +
            " wurde gekauft!"
        );

    };


    /* =====================================================
       SHOP-BUTTONS AKTUALISIEREN
    ===================================================== */

    function updateShopButtons() {

        const buttons =
            document.querySelectorAll(
                ".shop-item-large button"
            );


        buttons.forEach(button => {

            const item =
                button.closest(
                    ".shop-item-large"
                );


            if (!item) {
                return;
            }


            const itemName =
                item.dataset.item;


            const price =
                Number(
                    item.dataset.price
                );


            if (!itemName || isNaN(price)) {
                return;
            }


            if (hasPurchased(itemName)) {

                button.textContent =
                    "✓ Besitzt du";


                button.disabled =
                    true;


                button.classList.add(
                    "purchased"
                );


            } else {

                button.textContent =
                    price +
                    " 🪙 kaufen";


                button.disabled =
                    false;


                button.classList.remove(
                    "purchased"
                );

            }

        });

    }


    /* =====================================================
       SHOP ÖFFNEN
    ===================================================== */

    window.openShop = function() {

        openPage("shop");

        updateCoins();

        updateShopButtons();

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
       LOGOUT
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
       ERSTE SEITE
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


    /* =====================================================
       ÜBERSICHT AKTIVIEREN
    ===================================================== */

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


    /* =====================================================
       COINS INITIALISIEREN
    ===================================================== */

    updateCoins();

    updateShopButtons();


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

    if (!button) {
        return;
    }

    button.classList.toggle(
        "active"
    );

}


window.editProfile =
    editProfile;

window.toggleSetting =
    toggleSetting;


/* =========================================================
   SHOP-KATEGORIEN
========================================================= */

function filterShop(category, button) {

    const items =
        document.querySelectorAll(
            ".shop-item-large"
        );


    const buttons =
        document.querySelectorAll(
            ".shop-category"
        );


    buttons.forEach(function(item) {

        item.classList.remove(
            "active"
        );

    });


    if (button) {

        button.classList.add(
            "active"
        );

    }


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
