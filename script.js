const url = 'https://tink.fly.dev/chat/martinikalkulaator'

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    var expression = document.getElementById('display').value;

    if (expression) {
        var result = eval(expression);
        document.getElementById('display').value = result;

        var data = {
            calculation: expression + ' = ' + result
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            loadHistory();
        })
        .catch(error => {
            console.log('Veebipäringu viga:', error);
        });
    }
}
async function download() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); 

        const element = document.querySelector('.history');  
        element.innerHTML = '<h3>Viimased arvutused:</h3>';  

        data.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.textContent = item.calculation;  
            element.appendChild(historyItem);  
        });
    } catch (error) {
        console.log('Andmed ei laadinud ara', error);  
    }
}

window.onload = download;
