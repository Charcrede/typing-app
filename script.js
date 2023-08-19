document.addEventListener("DOMContentLoaded", function () {
    sentence = document.getElementById("sentence");
    es = document.getElementById("es");
    temps = document.getElementById("temps");
    pourcent = document.getElementById("pourcent");
    score = document.querySelector(".score")
    errors = document.getElementById("errors");
    input = document.getElementById("input");
    let phrase = "La clé du succès pour taper rapidement et avec précision consiste à utiliser tous ses doigts! Pour apprendre la bonne technique de frappe, utilisez une méthode adaptée à votre clavier.";
    let entered = "";
    let i = 0;
    let tab = phrase.split(" ");
    let u = 0;
    let tabs = [];
    let space;
    let errorsCount = 0;
    let time;
    let sens;
    firstTap = 0;
    let span;
    let div;
    let spans;
    let precis;
    let count = 0;
    tabs = phrase.split("");
    input.addEventListener("input", function (key) {
        firstTap++;
        if (firstTap === 1) {
            timing();
        }
        if (key.data) {
            entered = input.value;
            typing();
        }
    });
    input.addEventListener("keydown", function (key) {
        if (key.key === 'Backspace' && i > 0) {
            u--;
            i--;
            spans[u].classList.add("currency");
            spans[u + 1].classList.remove("currency");
            spans[i].classList.remove("success");
            spans[i].classList.remove("lose");
        }
    });
    function diplayLetters() {
        for (let i = 0; i < tab.length; i++) {
            div = document.createElement("div");
            space = document.createElement("span")
            space.innerHTML = "&nbsp;";
            for (let u = 0; u < tab[i].length; u++) {
                span = document.createElement("span");
                span.textContent = tab[i][u];
                div.appendChild(span)
            }
            sentence.appendChild(div)
            sentence.appendChild(space)
        }
    };
    function typing() {
        sens = phrase.split("")
        let newTabSentence = entered.split("");
        spans = document.querySelectorAll("span");
        if (i <= sens.length) {
            if (sens[i] === newTabSentence[i]) {
                spans[i].classList.add("success")
                spans[i].classList.remove("lose")
            } else {
                spans[i].classList.add("lose", "retry")
                spans[i].classList.remove("success")
                errorsCount++;
            }

            if (u > 0) {
                spans[u].classList.remove("currency");
            }
            i++;
            u++;
        }
        spans[u].classList.add("currency");
    }
    function timing() {
        let min;
        let sec;
        time = setInterval(() => {
            count++;
            sec = count - min * 60;
            min = Math.floor(count / 60);
            temps.innerText = `${min} min: ${sec} secondes`
            if (i === sens.length) {
                clearInterval(time)
                score.style.display = "block";
                vitesse = Math.ceil(tab.length / ((count - (errorsCount * 0.5)) / 60));
                let precis = Math.floor(((sens.length - errorsCount) / sens.length) * 100);
                pourcent.innerText = `${precis}%`
                es.innerText = `${vitesse}`;
                errors.innerText = `${errorsCount}`;
                console.log(tab.length);
            }
        }, 1000);
    }
    diplayLetters();
    console.dir(input);
});
