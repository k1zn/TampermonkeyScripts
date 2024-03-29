// ==UserScript==
// @name         New Game Fix
// @namespace    https://github.com/k1zn/KlavogonkiAddons
// @version      1.0
// @description  Fix for keyboard shortcut " Ctrl + -> "
// @author       kiZzn
// @match        *://klavogonki.ru/g/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const prevEventListener = document.onkeydown || function() {};
    document.onkeydown = (e) => {
        if (e.key === "ArrowRight" && e.ctrlKey) {
            let item = localStorage.getItem("recent_games");
            let parsed = JSON.parse(item);
            if (parsed && parsed.length > 0) {
                let lastGame = parsed[0]?.params || console.error("There is no params in last game!");

                location.href = location.protocol + `//klavogonki.ru/create/?${new URLSearchParams(lastGame)?.toString()?.replace("vocId", "voc") || "error=1"}&submit=1`
            }
        } else if (e.key !== "ArrowRight" && !e.ctrlKey) {
            prevEventListener(e);
        }
    };
})();
