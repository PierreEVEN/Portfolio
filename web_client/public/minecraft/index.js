const serverIP = 'mc.evenpierre.fr'; // Replace with your server IP
const startServerAPI = '/minecraft/start'; // Replace with your API endpoint
let WOL_SENT = false;

async function fetchServerStatus() {
    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIP}`);
        const data = await response.json();
        //console.log(data)

        const allDiv = document.getElementById('all');
        const statusDiv = document.getElementById('status');
        const playersDiv = document.getElementById('players');
        const versionDiv = document.getElementById('version');

        if (data.online) {
            statusDiv.textContent = `🟢 En ligne`;
            versionDiv.textContent = `Version du serveur : ${data.version.name_clean}`;
            playersDiv.textContent = `${data.players.online} joueurs en ligne`;
            document.getElementById('startBtn').style.display = 'none';
            allDiv.style.display = 'unset';

        } else {
            statusDiv.textContent = WOL_SENT ? '🟠 Démarrage en cours...' : '🔴 Offline';
            playersDiv.textContent = '-';
            versionDiv.textContent = '🔴 Serveur éteint';
            allDiv.style.display = 'none';
            if (!WOL_SENT) {
                document.getElementById('startBtn').style.display = 'flex';
                document.getElementById('startBtn').onclick = () => {
                    console.log("ah")
                    startServer()
                };
            }
        }
    } catch (error) {
        document.getElementById('status').textContent = 'Error fetching server status';
        console.error(error);
    }
}

async function startServer() {
    try {
        const response = await fetch(startServerAPI);
        console.log(response)

        if (response.ok) {
            WOL_SENT = true;
            document.getElementById('startBtn').style.display = 'none';
        } else {
            alert('Failed to send server start request.');
        }
    } catch (error) {
        alert('Error sending request.');
        console.error(error);
    }
}

// Initial fetch
fetchServerStatus();

// Refresh every 10 seconds
setInterval(fetchServerStatus, 10000);