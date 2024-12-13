// Arvutuse tegemine ja kuvatud väärtuse lisamine ekraanile
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Kustuta ekraan
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Arvutuse tegemine ja serverisse saatmine
function calculate() {
    var expression = document.getElementById('display').value;

    if (expression) {
        var result = eval(expression); // Kasutame eval() funktsiooni arvutuse tegemiseks
        document.getElementById('display').value = result;

        // Arvutus salvestatakse serverisse
        var data = {
            calculation: expression + ' = ' + result
        };

        // Saatmine serverisse
        fetch('https://kool.krister.ee/chat/martinikalkulaator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            loadHistory(); // Laadi ajalugu pärast salvestamist
        })
        .catch(error => {
            console.log('Veebipäringu viga:', error);
        });
    }
}

// Async funktsioon, et laadida viimased arvutused serverist
async function download() {
    const url = 'https://kool.krister.ee/chat/martinikalkulaator';  // Serveri URL
    try {
        // Fetch päring, et saada andmed serverilt
        const response = await fetch(url);
        const data = await response.json();  // Oota, kuni andmed saabuvad

        console.log(data);  // Kontrolli saadud andmeid konsolis

        // Oletame, et server tagastab arvutuste ajalugu
        const element = document.querySelector('.history');  // Elemendi valimine, kuhu andmed kuvada
        element.innerHTML = '<h3>Viimased arvutused:</h3>';  // Algväärtustame ajalugu

        // Läbime kõik andmed ja kuvame need
        data.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.textContent = item.calculation;  // Kuvame arvutuse
            element.appendChild(historyItem);  // Lisame elemendi ajaloosse
        });
    } catch (error) {
        console.log('Tekkis viga andmete laadimisel:', error);  // Kui tekib viga, kuvatakse konsolis
    }
}

// Laadi andmed kohe kui leht avaneb
window.onload = download;
