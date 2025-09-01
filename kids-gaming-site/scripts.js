document.addEventListener('DOMContentLoaded', () => {
    // Fetch and apply branding
    fetch('data/branding.json')
        .then(response => response.json())
        .then(data => {
            const branding = data.brand;
            // Apply theme colors
            const root = document.documentElement;
            root.style.setProperty('--primary-color', branding.colors.primary);
            root.style.setProperty('--secondary-color', branding.colors.secondary);

            // Set favicon
            document.getElementById('favicon').href = branding.logo.favicon;

            // Set logo
            document.getElementById('logo').src = branding.logo.title;

            // Set slogan
            document.getElementById('slogan').textContent = branding.slogan;

            // Populate social media links
            const socialMediaContainer = document.getElementById('social-media');
            for (const [key, value] of Object.entries(branding.socialMedia)) {
                const link = document.createElement('a');
                link.href = value;
                link.target = '_blank';
                link.innerHTML = `<img src="assets/icons/${key}.svg" alt="${key}">`; // Assuming you have icons
                socialMediaContainer.appendChild(link);
            }

            // Populate contact info
            const contactInfoContainer = document.getElementById('contact-info');
            contactInfoContainer.innerHTML = `
                <p>Email: <a href="mailto:${branding.email}">${branding.email}</a></p>
                <p>Mobile: ${branding.mobile}</p>
            `;
        });

    // Fetch and display games and other content
    fetch('data/games.json')
        .then(response => response.json())
        .then(data => {
            const gamesContainer = document.getElementById('games-container');
            data.games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.innerHTML = `
                    <img src="${game.thumb}" alt="${game.name}">
                    <h3>${game.name}</h3>
                    <p>${game.description}</p>
                    <p><strong>Difficulty:</strong> ${game.difficulty}</p>
                    <a href="${game.url}" class="button">Play Now</a>
                `;
                gamesContainer.appendChild(gameCard);
            });

            // Countdown timer
            const countdownElement = document.getElementById('countdown');
            const countdownTarget = new Date(data.countdownTarget).getTime();

            const interval = setInterval(() => {
                const now = new Date().getTime();
                const distance = countdownTarget - now;

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

                if (distance < 0) {
                    clearInterval(interval);
                    countdownElement.innerHTML = "EXPIRED";
                }
            }, 1000);
        });

    // TODO: student exercise - Implement search/filter for games
});
