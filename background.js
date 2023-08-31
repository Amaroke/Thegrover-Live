function checkIfTheGroverIsLive() {
    fetch('https://thegrover-live.vercel.app/isThegroverLive', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            if (data === true) {
                chrome.browserAction.setIcon({ path: "images/icon_online.png" });
            } else {
                chrome.browserAction.setIcon({ path: "images/icon_offline.png" });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la vérification de l\'état de The Grover:', error);
        });
}

function getThegroverLive() {
    checkIfTheGroverIsLive();

    setInterval(checkIfTheGroverIsLive, 60000);
}

getThegroverLive();
