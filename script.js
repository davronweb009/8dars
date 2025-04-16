const countriesElement = document.getElementById('countries');
const searchInput = document.getElementById('search');
const toggleDark = document.getElementById('toggle-dark');

async function fetchCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all'); 
    const countries = await res.json();
    displayCountries(countries);

    searchInput.addEventListener('input', () => {
        const filtered = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayCountries(filtered);
    });
}

function displayCountries(countries) {
    countriesElement.innerHTML = "";
    countries.forEach((country) => {
        const card = document.createElement("div");
        card.classList.add("country-card");

        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" />
            <p>${country.name.common}</p>
        `;
    
        countriesElement.appendChild(card);
    });
}

// Dark mode toggle functionality
toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    
});

// Check the saved theme preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

fetchCountries();