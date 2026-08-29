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
   SHOP + COIN SYSTEM
===================================================== */

const COIN_KEY = "kingsblitzCoins";
const PURCHASE_KEY = "kingsblitzPurchasedItems";


/* =====================================================
   COINS LADEN
===================================================== */

function getCoins() {

    let coins = Number(
        localStorage.getItem(COIN_KEY)
    );

    if (!Number.isFinite(coins)) {

        coins = 100;

        localStorage.setItem(
            COIN_KEY,
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
        COIN_KEY,
        String(coins)
    );

}


/* =====================================================
   COIN-ANZEIGE
===================================================== */

function updateCoins() {

    const coins = getCoins();


    const elements =
        document.querySelectorAll(
            "[data-coins], .coin-display strong, .shop-coins strong"
        );


    elements.forEach(element => {

        element.textContent = coins;

    });

}


/* =====================================================
   GEKAUFTE ARTIKEL
===================================================== */

function getPurchasedItems() {

    try {

        const saved =
            localStorage.getItem(
                PURCHASE_KEY
            );


        if (!saved) {
            return [];
        }


        const items =
            JSON.parse(saved);


        return Array.isArray(items)
            ? items
            : [];

    } catch (error) {

        console.error(
            "Fehler beim Laden der gekauften Artikel:",
            error
        );

        return [];

    }

}


/* =====================================================
   ARTIKEL SPEICHERN
===================================================== */

function savePurchasedItems(items) {

    localStorage.setItem(
        PURCHASE_KEY,
        JSON.stringify(items)
    );

}


/* =====================================================
   ARTIKEL BEREITS GEKAUFT?
===================================================== */

function hasPurchased(itemName) {

    return getPurchasedItems().includes(
        itemName
    );

}


/* =====================================================
   KAUFEN
===================================================== */

function buyItem(itemName, price) {

    console.log(
        "Kauf gestartet:",
        itemName,
        price
    );


    price = Number(price);


    if (
        !itemName ||
        !Number.isFinite(price) ||
        price <= 0
    ) {

        showMessage(
            "Dieser Artikel ist nicht verfügbar."
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


    /* Coins */

    let coins =
        getCoins();


    /* Zu wenig Coins */

    if (coins < price) {

        showMessage(
            "Nicht genügend Coins! 🪙"
        );

        return;

    }


    /* Preis abziehen */

    coins -= price;


    saveCoins(coins);


    /* Kauf speichern */

    const purchased =
        getPurchasedItems();


    purchased.push(
        itemName
    );


    savePurchasedItems(
        purchased
    );


    /* Anzeige aktualisieren */

    updateCoins();


    /* Erfolg */

    showMessage(
        "✓ " +
        itemName +
        " gekauft!"
    );


    console.log(
        "Kauf erfolgreich:",
        itemName,
        "Restliche Coins:",
        coins
    );

}


/* =====================================================
   ALTE FUNKTION ALS ALIAS
   Damit sowohl buyItem() als auch buyShopItem()
   funktionieren.
===================================================== */

window.buyItem =
    buyItem;


window.buyShopItem =
    buyItem;


/* =====================================================
   COINS ÖFFENTLICH
===================================================== */

window.getCoins = function() {

    return getCoins();

};


window.addCoins = function(amount) {

    amount = Number(amount);


    if (
        !Number.isFinite(amount) ||
        amount <= 0
    ) {
        return;
    }


    const coins =
        getCoins() + amount;


    saveCoins(coins);

    updateCoins();


    showMessage(
        "+" +
        amount +
        " 🪙 Coins erhalten!"
    );

};


/* =====================================================
   SHOP ÖFFNEN
===================================================== */

window.openShop = function() {

    openPage("shop");

    updateCoins();

};


/* =====================================================
   INITIALISIERUNG
===================================================== */

updateCoins();
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
