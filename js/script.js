// Array to store guide data
const guides = [];

// DOM elements
const guideForm = document.getElementById('guideForm');
const guideList = document.getElementById('guideList');
const activeCount = document.getElementById('activeCount');
const inTransitCount = document.getElementById('inTransitCount');
const deliveredCount = document.getElementById('deliveredCount');

// Function to handle form submission
guideForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const guideNumber = document.getElementById('guideNumber').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const recipient = document.getElementById('recipient').value;
    const status = document.getElementById('status').value;
    const date = document.getElementById('date').value;

    // Basic validation
    if (!guideNumber || !origin || !destination || !recipient || !status || !date) {
        alert("Please fill in all fields.");
        return;
    }

    // Check if guide number already exists
    if (guides.find(guide => guide.number === guideNumber)) {
        alert("Guide number already exists!");
        return;
    }

    // Create a new guide object
    const newGuide = {
        number: guideNumber,
        origin,
        destination,
        recipient,
        status,
        date,
        history: [{ status, date }]
    };

    // Add the new guide to the array
    guides.push(newGuide);

    // Clear the form
    guideForm.reset();

    // Update the guide list and general status
    updateGuideList();
    updateStatusPanel();
});

// Function to update the guide list
function updateGuideList() {
    guideList.innerHTML = '';

    guides.forEach(guide => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>Guía: ${guide.number}</strong>
            <p>Estado: ${guide.status}</p>
            <p>Origen: ${guide.origin}</p>
            <p>Destino: ${guide.destination}</p>
            <p>Destinatario: ${guide.recipient}</p>
            <p>Fecha: ${guide.date}</p>
            <button onclick="updateGuideStatus('${guide.number}')">Actualizar Estado</button>
            <button onclick="showGuideHistory('${guide.number}')">Ver Historial</button>
        `;
        guideList.appendChild(listItem);
    });
}

// Function to update the status of a guide
function updateGuideStatus(guideNumber) {
    const guide = guides.find(g => g.number === guideNumber);
    const statuses = ['Pendiente', 'En tránsito', 'Entregado'];

    // Get the index of the current status
    const currentIndex = statuses.indexOf(guide.status);
    if (currentIndex < statuses.length - 1) {
        // Move to the next status
        guide.status = statuses[currentIndex + 1];
        guide.history.push({
            status: guide.status,
            date: new Date().toLocaleString()
        });
    }

    // Update the guide list and status panel
    updateGuideList();
    updateStatusPanel();
}

// Function to show guide history
function showGuideHistory(guideNumber) {
    const guide = guides.find(g => g.number === guideNumber);
    alert("Historial de cambios:\n" + guide.history.map(entry => `${entry.status} - ${entry.date}`).join('\n'));
}

// Function to update the status panel
function updateStatusPanel() {
    const activeGuides = guides.filter(guide => guide.status === 'Pendiente').length;
    const inTransitGuides = guides.filter(guide => guide.status === 'En tránsito').length;
    const deliveredGuides = guides.filter(guide => guide.status === 'Entregado').length;

    activeCount.textContent = activeGuides;
    inTransitCount.textContent = inTransitGuides;
    deliveredCount.textContent = deliveredGuides;
}
