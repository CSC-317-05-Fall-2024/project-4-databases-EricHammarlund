const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // extract form values by their input field ids - same as fetch in class demo
    const name = document.getElementById('restName').value;
    const address = document.getElementById('restAddress').value;
    const phone = document.getElementById('restPhone').value;
    const image = document.getElementById('restPhoto').value;

    // make a POST request to create a new restaurant
    try {
        const response = await fetch('/api/restaurants', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify({ name, address, phone, image }), });

        if (response.ok) {
            console.log(response);
            window.location.href = '/restaurants';
        } else {
            console.error('Failed to post new restaurant. Status:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    };
};

document.addEventListener('DOMContentLoaded', () => {
    // get the form element and attach the submit event listener
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
});
