
const themeToggleBtn = document.getElementById('theme-toggle');
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
} else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
}

themeToggleBtn.addEventListener('click', function () {
    darkIcon.classList.toggle('hidden');
    lightIcon.classList.toggle('hidden');

    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
});

// Contenidos simplificados, menos técnicos y más amigables
const contentStates = {
    vecinos: {
        title: "¡Volvió la yapa al barrio!",
        desc: "Comprá en los locales de siempre, sumá puntos y canjealos por premios. ¡Ayudá a crecer a los comercios de tu zona mientras ahorrás en tus gastos de todos los días!",
        checks: [
            "Ruleta de premios semanales",
            "Yapas válidas en todos lados",
            "Descubrí promos cerca tuyo",
            "Puntos por local"
        ],
        floatTitle: "+1.000 Puntos Ganados",
        floatDesc: "¡Canjeables en tu café de San Justo o tu verdulería amiga!",
        floatIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
        floatBgClass: "bg-orange-100 dark:bg-orange-500/20",
        floatTextClass: "text-yapas-orange",
        buttonBg: "bg-yapas-orange",
        buttonHover: "hover:bg-[#e67a16]",
        shadowColor: "shadow-orange-500"
    },
    comercios: {
        title: "Fidelizá a tus clientes sin vueltas",
        desc: "Conocé mejor a tus vecinos, armá promociones con otros locales y hacé que te elijan todos los días. Simple, rápido y pensado exclusivamente para el comercio de barrio.",
        checks: [
            "Estadísticas fáciles de entender",
            "Promos junto a otros locales",
            "Sistema gratuito para empezar",
            "Atraé nuevos vecinos"
        ],
        floatTitle: "📈 +35% Retención",
        floatDesc: "Más clientes que volvieron a comprar en tu local esta semana.",
        floatIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
        floatBgClass: "bg-green-100 dark:bg-green-500/20",
        floatTextClass: "text-yapas-green",
        buttonBg: "bg-yapas-blue",
        buttonHover: "hover:bg-blue-500",
        shadowColor: "shadow-blue-500"
    }
};

const btnVecinos = document.getElementById('btn-vecinos');
const btnComercios = document.getElementById('btn-comercios');

const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');
const heroChecks = document.getElementById('hero-checks');
const heroContent = document.getElementById('hero-content');
const floatingCard = document.getElementById('floating-card');
const actionButton = document.querySelector('#hero-content + a');

const floatTitle = document.getElementById('float-title');
const floatDesc = document.getElementById('float-desc');
const floatIconContainer = document.getElementById('float-icon-bg');

function generateChecklistHTML(checksArray, state) {
    const iconColor = state === 'vecinos' ? 'bg-yapas-orange' : 'bg-yapas-blue';
    return checksArray.map(item => `
                <li class="flex items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200 fade-in">
                    <div class="${iconColor} text-white rounded-full p-1 shadow-sm">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    ${item}
                </li>
            `).join('');
}

function updateHeroContent(state) {
    const data = contentStates[state];

    heroContent.classList.remove('fade-in');
    floatingCard.classList.remove('fade-in');
    void heroContent.offsetWidth;

    heroTitle.textContent = data.title;
    heroDesc.textContent = data.desc;
    heroChecks.innerHTML = generateChecklistHTML(data.checks, state);

    floatTitle.textContent = data.floatTitle;
    floatDesc.textContent = data.floatDesc;
    floatIconContainer.innerHTML = data.floatIcon;

    floatIconContainer.className = `p-3.5 rounded-xl ${data.floatBgClass} ${data.floatTextClass}`;

    // Update main action button colors
    actionButton.className = `${data.buttonBg} ${data.buttonHover} text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-${data.shadowColor}/30 hover:shadow-${data.shadowColor}/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-lg`;
    actionButton.innerHTML = state === 'vecinos' ?
        'Descargar App <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>' :
        'Registrar mi Local <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

    heroContent.classList.add('fade-in');
    floatingCard.classList.add('fade-in');

    if (state === 'vecinos') {
        btnVecinos.className = 'toggle-btn flex items-center gap-2 py-2.5 px-6 rounded-full text-base font-semibold transition-all duration-300 bg-yapas-orange text-white shadow-md';
        btnComercios.className = 'toggle-btn flex items-center gap-2 py-2.5 px-6 rounded-full text-base font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-300';
    } else {
        btnComercios.className = 'toggle-btn flex items-center gap-2 py-2.5 px-6 rounded-full text-base font-semibold transition-all duration-300 bg-yapas-blue text-white shadow-md';
        btnVecinos.className = 'toggle-btn flex items-center gap-2 py-2.5 px-6 rounded-full text-base font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all duration-300';
    }
}

updateHeroContent('vecinos');

btnVecinos.addEventListener('click', () => updateHeroContent('vecinos'));
btnComercios.addEventListener('click', () => updateHeroContent('comercios'));
