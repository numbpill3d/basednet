document.addEventListener('DOMContentLoaded', () => {
    const getStartedButton = document.querySelector('button:nth-of-type(1)');
    const learnMoreButton = document.querySelector('button:nth-of-type(2)');
    const createSiteButton = document.querySelector('button:nth-of-type(3)');

    getStartedButton.addEventListener('click', () => {
        alert('Get Started button clicked!');
        // Add functionality to navigate to the getting started section or modal
    });

    learnMoreButton.addEventListener('click', () => {
        alert('Learn More button clicked!');
        // Add functionality to show more information or navigate to a different page
    });

    createSiteButton.addEventListener('click', () => {
        alert('Create Your Site button clicked!');
        // Add functionality to navigate to the site creation page
    });
});
