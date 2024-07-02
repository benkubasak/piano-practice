function loadJSONContent() {
    function generateHTML(data) {
        const body = document.body;
        const title = document.createElement('h1');
        title.textContent = data.title;
        body.appendChild(title);

        data.sections.forEach(section => {
            const sectionElement = document.createElement('section');
            sectionElement.setAttribute('style', `background: ${sanitizeColor(section.color)}`);

            const h2 = document.createElement('h2');
            h2.textContent = sanitizeText(section.title);
            sectionElement.appendChild(h2);

            const ul = document.createElement('ul');
            section.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = sanitizeText(item);
                ul.appendChild(li);
            });
            sectionElement.appendChild(ul);

            body.appendChild(sectionElement);
        });
    }

    function sanitizeText(input) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(input));
        return div.innerText;
    }
    
    function sanitizeColor(input) {
        let output = "silver";
        switch(input) {
            case "red":
                output = "red";
                break;
            case "orange":
                output = "darkorange";
                break;
            case "yellow":
                output = "gold";
                break;
            case "green":
                output = "green";
                break;
            case "blue":
                output = "mediumblue";
                break;
            case "indigo":
                output = "indigo";
                break;
            case "violet":
                output = "violet";
                break;
        }
        return output;
    }
  
    fetch("/piano-practice/src/json/piano_practice.json")
        .then(response => response.json())
        .then(data => {
            generateHTML(data);
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
        });
}

function loadPage() {
    loadJSONContent();
}

if (document.readyState != 'loading') {loadPage();}
else if (document.addEventListener) {document.addEventListener('DOMContentLoaded', loadPage);}
else {document.attachEvent('onreadystatechange', function() {if (document.readyState=='complete') {loadPage();}});}