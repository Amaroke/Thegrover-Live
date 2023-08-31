function checkIfTheGroverIsLive() {
    fetch('https://thegrover-live.vercel.app/isThegroverLive', {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            console.log('The Grover est-il en direct ?', data);
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

    setInterval(checkIfTheGroverIsLive, 60000);
}

getThegroverLive();
