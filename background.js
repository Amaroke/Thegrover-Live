function checkIfTheGroverIsLive() {
    fetch('https://thegrover-live.vercel.app/isThegroverLive', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log("Thegrover is live ? " + data.isLive);
            if (data.isLive === true) {
                chrome.action.setIcon({ path: "images/icon_online.png" });
            } else {
                chrome.action.setIcon({ path: "images/icon_offline.png" });
            }
        })
        .catch(error => {
            console.error('Erreur lors de la vérification de l\'état de The Grover:', error);
        });
}

function getThegroverLive() {
    checkIfTheGroverIsLive();
    setInterval(checkIfTheGroverIsLive, 120000);
}

getThegroverLive();
