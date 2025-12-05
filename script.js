window.addEventListener('load', () => {
    const stage = document.getElementById('stage');

    // Επιβεβαίωση ότι οι χαρακτήρες είναι μέσα στο stage
    const heroes = [
        document.getElementById('hero1'), // Spider-Man
        document.getElementById('hero2'), // Wolverine
        document.getElementById('hero3'), // Cyclops
        document.getElementById('hero4')  // Venom
    ];

    heroes.forEach(hero => {
        if (!hero) {
            console.warn('Missing hero element in stage:', hero);
        }
    });
});
