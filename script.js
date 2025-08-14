const tasks = [
    { question: "Ich wollte dich fragen, _____ du morgen um 10 Uhr Zeit hast.", answer: "ob" },
    { question: "Weißt du, _____ Miguel ist? - Im Bad.", answer: "wo" },
    { question: "Wissen Sie, _____ er verheiratet ist? - Ja, er ist verheiratet.", answer: "ob" },
    { question: "Könnt ihr mir sagen, _____ die Einsteinstraße ist?", answer: "wo" },
    { question: "Ich wollte fragen, _____ die Ferien dauern. - Zwei Wochen.", answer: "wie lange" },
    { question: "Können Sie mir sagen, _____ ich das Ketchup finde? - Da vorne.", answer: "wo" },
    { question: "Können Sie mir sagen, _____ der Bus nach Köln fährt?", answer: "ob / wann / wo" },
    { question: "Wissen Sie, _____ das Wort 'entwickeln' bedeutet?", answer: "was" },
    { question: "Haben Sie gesehen, _____ Herr Glas schon da ist?", answer: "ob" },
    { question: "Kannst du mir sagen, _____ man den Namen 'Goethe' schreibt?", answer: "wie" },
    { question: "Ich wollte fragen, _____ im nächsten Kurs noch Plätze frei sind.", answer: "ob" },
    { question: "Weißt du, _____ Sabine nicht da ist? - Weil sie krank ist.", answer: "warum" },
    { question: "Hast du gesehen, _____ ich die Fahrkarte gelegt habe?", answer: "wohin" },
    { question: "Wissen Sie, _____ in der Wurst Schweinefleisch ist?", answer: "ob" },
    { question: "Können Sie mir sagen, _____ das so richtig ist?", answer: "ob" },
    { question: "Entschuldigung, können Sie mir sagen, _____ hier eine Toilette ist?", answer: "wo" },
    { question: "Weißt du, _____ die Prüfung ist? - Nächsten Freitag.", answer: "wann" },
    { question: "Ich wollte fragen, _____ die Stelle noch frei ist.", answer: "ob" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
