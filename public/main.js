requestAnimationFrame(() => setTimeout(() => document.body.classList.add('loaded'), 80));

// About paragraph: split into words that rise in with a short stagger
const about = document.getElementById('aboutBody');
const words = about.textContent.trim().split(/\s+/);
const step = Math.min(18, 900 / words.length);
about.innerHTML = words.map((w, i) => `<span class="w" style="transition-delay:${(i * step).toFixed(0)}ms">${w}</span>`).join(' ');

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.25, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.fade-up, .event, #aboutBody').forEach(el => io.observe(el));

const timeline = document.getElementById('timeline');
const railFill = document.getElementById('railFill');
const links = document.querySelectorAll('#nav a');
function onScroll() {
  const vh = window.innerHeight;
  const t = timeline.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (vh * 0.6 - t.top) / t.height));
  railFill.style.height = (p * 100) + '%';
  let activeId = 'home';
  document.querySelectorAll('header[id], section[id]').forEach(sec => { if (sec.getBoundingClientRect().top <= vh * 0.4) activeId = sec.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + activeId));
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

// Transparency sliders (mockup only)
document.querySelectorAll('.tuner input').forEach(inp => inp.addEventListener('input', () => {
  const v = inp.value / 100;
  document.documentElement.style.setProperty(inp.dataset.var, v);
  document.querySelectorAll(`.tuner input[data-var="${inp.dataset.var}"]`).forEach(o => { o.value = inp.value; o.nextElementSibling.textContent = inp.value + '%'; });
}));


// "Say hello": opens the visitor's email app (if they have one) and also copies the address
const EMAIL = 'lilianyenlinhle@gmail.com';
const copied = document.getElementById('copied');
let copiedTimer;
document.getElementById('sayHello').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copied.textContent = 'Email copied!';
  } catch {
    copied.textContent = '';
    return;
  }
  copied.classList.add('show');
  clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => copied.classList.remove('show'), 2500);
});
