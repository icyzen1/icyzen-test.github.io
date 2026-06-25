async function changeContent(fileName) {
    const main = document.getElementById('content-area');
    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error('File not found');
        const htmlText = await response.text();
        main.innerHTML = htmlText;

    } catch (error) {
        main.innerHTML = `<p style="color: red; padding: 20px;">Error: ${error.message}</p>`;
    }
}

document.addEventListener('click', (event) => {
    const linkElement = event.target.closest('.nav-link');
    if (!linkElement) return;
    event.preventDefault(); 
    const fileToLoad = linkElement.getAttribute('href');
    changeContent(fileToLoad);
});

const options = {
    root: null,
    threshold: 0.05
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, options);

const elementsToAnimate = document.querySelectorAll(".animate-box, .animate-text");
elementsToAnimate.forEach(el => observer.observe(el));