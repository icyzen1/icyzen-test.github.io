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

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const fileToLoad = event.target.getAttribute('href');
        changeContent(fileToLoad);
    });
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