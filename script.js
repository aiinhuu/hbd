const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');

let currentPage = 0; // Startet bei der ersten Seite
let isScrolling = false;

// Funktion zum Wechseln der Seite
function changePage(index) {
    currentPage = index;
    pages[index].scrollIntoView({ behavior: 'smooth' });
    updateDots();
}

// Funktion zum Aktualisieren der aktiven Punkte
function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPage);
    });
}

// Scroll-Event für automatische Navigation
window.addEventListener('wheel', (e) => {
    if (isScrolling) return; // Verhindert mehrfaches Auslösen während des Scrollens

    isScrolling = true;

    if (e.deltaY > 0) {
        // Nach unten scrollen
        if (currentPage < pages.length - 1) {
            changePage(currentPage + 1);
        }
    } else {
        // Nach oben scrollen
        if (currentPage > 0) {
            changePage(currentPage - 1);
        }
    }

    // Verzögerung, um das Scrollen abzuschließen, bevor eine neue Eingabe erlaubt wird
    setTimeout(() => {
        isScrolling = false;
    }, 800); // Die Dauer sollte der Scroll-Animation entsprechen
});

// Event-Listener für die Punkte
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => changePage(index));
});
