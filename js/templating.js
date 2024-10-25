function loadHTMLContent(fileName, containerId) {
    fetch(fileName)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => {
            console.error("Failed to load content:", error);
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadHTMLContent('templates/about_me.html', 'about_me');
    loadHTMLContent('templates/experience.html', 'experience');
    loadHTMLContent('templates/education.html', 'education');
    loadHTMLContent('templates/projects.html', 'projects');
});
