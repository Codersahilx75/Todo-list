 // Fetch the component and inject it into the main page
 document.addEventListener("DOMContentLoaded", function () {
    fetch('Components/todu.html') // Replace with the path to your component file
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load component");
            }
            return response.text(); // Get the HTML as text
        })
        .then(html => {
            // Inject the component HTML into the page
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error("Error loading component:", error);
        });
});





  // Load the header dynamically
  fetch('layouts/header.html')
  .then(response => response.text())
  .then(data => document.getElementById('header-container').innerHTML = data);


function loadFooter() {
    fetch('layouts/footer.html')  // Path to the footer.html file
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Load the footer when the page is ready
document.addEventListener('DOMContentLoaded', loadFooter);

