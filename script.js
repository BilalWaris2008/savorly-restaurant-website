const r = document.documentElement,
    t = document.querySelector('#theme'),
    n = document.querySelector('#nav'),
    m = document.querySelector('#hamburger'),
    b = document.querySelector('#top-btn');
let savedTheme = 'light';
try {
    savedTheme = localStorage.getItem('theme') || 'light';
} catch {
    // The page still works when browser storage is unavailable.
}
r.dataset.theme = savedTheme;

function i() {
    t.textContent = r.dataset.theme === 'dark' ? '☾' : '☼'
}
i();
t.onclick = () => {
    r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
        localStorage.setItem('theme', r.dataset.theme);
    } catch {
        // Keep the selected theme for this page even if it cannot persist.
    }
    i()
};
m.onclick = () => n.classList.toggle('open');
addEventListener('scroll', () => b.classList.toggle('show', scrollY > 400));
b.onclick = () => scrollTo({
    top: 0,
    behavior: 'smooth'
});
const glow = document.querySelector('.cursor-glow');
addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    glow.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    glow.classList.add('is-visible');
});
const revealItems = document.querySelectorAll('main > section');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
    }
}), {
    threshold: .12
});
revealItems.forEach(item => observer.observe(item));