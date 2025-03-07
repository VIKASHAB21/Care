document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Find the appointment button by checking headers
    let addAppointmentBtn = null;
    const headers = document.querySelectorAll('.card-header h2');

    headers.forEach(header => {
        if (header.textContent.includes("Upcoming Appointments")) {
            addAppointmentBtn = header.closest('.card').querySelector('.btn'); // Adjust selector if needed
        }
    });

    console.log("addAppointmentBtn:", addAppointmentBtn);

    // Get the appointment modal
    const appointmentModal = document.getElementById("appointmentModal");
    console.log("appointmentModal:", appointmentModal);

    // Get the close button
    const closeAppointmentBtn = document.getElementById("closeAppointmentModal");
    console.log("closeAppointmentBtn:", closeAppointmentBtn);

    // Get the cancel button
    const cancelAppointmentBtn = document.getElementById("cancelAppointmentBtn");
    console.log("cancelAppointmentBtn:", cancelAppointmentBtn);

    // Get the form
    const appointmentForm = document.getElementById("appointmentForm");
    console.log("appointmentForm:", appointmentForm);

    // Set minimum date for appointment date picker to today
    const appointmentDateInput = document.getElementById("appointmentDate");
    if (appointmentDateInput) {
        const today = new Date().toISOString().split('T')[0];
        appointmentDateInput.min = today;
    } else {
        console.warn("appointmentDate input field not found.");
    }

    // Open modal when clicking the add appointment button
    if (addAppointmentBtn && appointmentModal) {
        addAppointmentBtn.addEventListener("click", function () {
            console.log("Opening appointment modal");
            appointmentModal.style.display = "block";
        });
    } else {
        console.warn("addAppointmentBtn or appointmentModal is missing.");
    }

    // Close modal when clicking close (×) button
    if (closeAppointmentBtn) {
        closeAppointmentBtn.addEventListener("click", function () {
            console.log("Closing appointment modal");
            appointmentModal.style.display = "none";
        });
    }

    // Close modal when clicking cancel button
    if (cancelAppointmentBtn) {
        cancelAppointmentBtn.addEventListener("click", function () {
            console.log("Canceling appointment modal");
            appointmentModal.style.display = "none";
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener("click", function (event) {
        if (event.target === appointmentModal) {
            console.log("Clicked outside the modal, closing it.");
            appointmentModal.style.display = "none";
        }
    });

    // Form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            console.log("Submitting appointment form");

            // Get form data
            const formData = new FormData(appointmentForm);
            const appointmentData = Object.fromEntries(formData.entries());

            // Format time for display
            const timeFormat = new Date(`2000-01-01T${appointmentData.time}`).toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            console.log("New Appointment:", appointmentData);

            // Add the new appointment to the table
            addAppointmentToTable(appointmentData, timeFormat);

            // Update the statistics
            updateAppointmentStats();

            // Reset form and close modal
            appointmentForm.reset();
            appointmentModal.style.display = "none";

            // Show success message
            alert(`Appointment scheduled for ${appointmentData.patient} on ${appointmentData.date} at ${timeFormat}`);
        });
    }

    // Function to add appointment to the appointments table
    function addAppointmentToTable(appointment, formattedTime) {
        let table = null;
        headers.forEach(header => {
            if (header.textContent.includes("Upcoming Appointments")) {
                table = header.closest('.card').querySelector('tbody');
            }
        });

        console.log("Appointments table:", table);

        if (table) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.patient}</td>
                <td>${formattedTime}</td>
                <td>${appointment.type}</td>
                <td><span class="status status-scheduled">Scheduled</span></td>
                <td>
                    <button class="btn btn-secondary">Details</button>
                </td>
            `;

            table.appendChild(row);

            // Also add to today's schedule in the sidebar
            addToSchedule(appointment, formattedTime);
        } else {
            console.warn("Appointments table not found.");
        }
    }

    // Function to add appointment to the schedule sidebar
    function addToSchedule(appointment, formattedTime) {
        let scheduleContainer = null;
        headers.forEach(header => {
            if (header.textContent.includes("Today's Schedule")) {
                scheduleContainer = header.closest('.card').querySelector('.card-body');
            }
        });

        console.log("Schedule container:", scheduleContainer);

        if (scheduleContainer) {
            // Calculate end time
            const startTime = new Date(`2000-01-01T${appointment.time}`);
            const endTime = new Date(startTime.getTime() + parseInt(appointment.duration) * 60000);
            const endTimeFormatted = endTime.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            const scheduleItem = document.createElement('div');
            scheduleItem.className = 'schedule-item';
            scheduleItem.style.borderLeftColor = 'var(--primary)';
            scheduleItem.innerHTML = `
                <div class="time-slot">${formattedTime} - ${endTimeFormatted}</div>
                <div>${appointment.patient} - ${appointment.type}</div>
            `;

            scheduleContainer.appendChild(scheduleItem);
        } else {
            console.warn("Schedule container not found.");
        }
    }

    // Function to update appointment statistics
    function updateAppointmentStats() {
        const appointmentsTodayElement = document.querySelector('.stat-card:nth-child(2) .stat-value');
        console.log("Updating stats", appointmentsTodayElement);

        if (appointmentsTodayElement) {
            let currentCount = parseInt(appointmentsTodayElement.textContent);
            currentCount += 1;
            appointmentsTodayElement.textContent = currentCount;

            // Update the change text
            const changeElement = appointmentsTodayElement.nextElementSibling;
            if (changeElement) {
                changeElement.textContent = `+${currentCount - 24} from yesterday`;
            }
        } else {
            console.warn("Appointments statistics element not found.");
        }
    }

    // Add new patient to the patient dropdown when registering
    const patientForm = document.getElementById("patientForm");
    if (patientForm) {
        patientForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form data for the patient
            const formData = new FormData(patientForm);
            const patientData = Object.fromEntries(formData.entries());

            // Generate a patient ID (simple implementation)
            const patientId = "PT-" + Math.floor(7827 + Math.random() * 1000);

            // Add to appointment dropdown
            const appointmentPatientSelect = document.getElementById("appointmentPatient");
            if (appointmentPatientSelect) {
                const option = document.createElement('option');
                option.value = `${patientData.firstName} ${patientData.lastName}`;
                option.textContent = `${patientData.firstName} ${patientData.lastName} (${patientId})`;
                appointmentPatientSelect.appendChild(option);
            } else {
                console.warn("appointmentPatient select dropdown not found.");
            }
        });
    }
});
