document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const flowSteps = document.querySelectorAll('.flow-step');
    const flowArrows = document.querySelectorAll('.flow-arrow');
    const flowInfo = document.getElementById('flow-info');

    const flowDetails = {
        '1': '<strong>1. Discovery:</strong> Customer searches/browses services. Pages: Homepage, Service Listings. Components: `SearchBar`, `ServiceCard`.',
        '2': '<strong>2. Quote Request:</strong> Customer requests quote from Lab. Pages: Service Detail. Lab uses Dashboard. Components: `QuoteForm`, `Modal`.',
        '3': '<strong>3. Order & Payment:</strong> Customer accepts quote, makes payment. Pages: Customer Dashboard (Quotes, Orders). Logistics task created.',
        '4': '<strong>4. Sample Pickup (Logistics):</strong> Logistics team receives pickup task for the order. They schedule and confirm sample collection from the customer. Pages: Logistics Dashboard. Components: `PickupTaskCard`, `StatusUpdateForm`. Customer sees "Awaiting Pickup" then "Sample In Transit".',
        '5': '<strong>5. Sample Delivery (Logistics):</strong> Logistics transports and confirms sample delivery to the designated Lab. Pages: Logistics Dashboard. Lab sees "Incoming Sample". Customer sees "Sample In Transit" then "Sample Delivered".',
        '6': '<strong>6. Lab Fulfillment:</strong> Lab receives sample, performs analysis, updates order status. Pages: Lab Dashboard (Orders). Components: `OrderManagement`, `ReportUpload`. Customer tracks progress.',
        '7': '<strong>7. Review:</strong> Customer receives results, leaves review for service/lab. Pages: Customer Dashboard (Orders). Components: `ReviewForm`.'
    };

    function updateActiveNav(targetId) {
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === targetId);
        });
        contentSections.forEach(sec => {
            sec.classList.toggle('active', sec.id === targetId);
        });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            updateActiveNav(button.dataset.target);
        });
    });

    flowSteps.forEach(step => {
        step.addEventListener('click', () => {
            const flowId = step.dataset.flow;
            
            flowSteps.forEach(s => {
                s.classList.remove('active-path');
                s.classList.remove('logistics-path'); // Ensure old logistics path is cleared
                // Re-apply default border if not logistics step by default
                if (!s.classList.contains('logistics-path-default')) { // Assuming you might add a default logistics class
                        s.style.borderColor = '#d1d5db'; // Default border
                }
            });
            flowArrows.forEach(a => {
                a.classList.remove('active-path');
                a.classList.remove('logistics-path');
                a.style.color = '#d1d5db'; // Default arrow color
            });

            step.classList.add('active-path');
            if (step.classList.contains('logistics-path')) { // Check if the clicked step is a logistics step
                step.classList.remove('active-path'); // Remove general active if it's logistics
                step.classList.add('logistics-path'); // Ensure logistics path style is applied
            }


            const currentFlowPath = [];
            if (flowId === '1') currentFlowPath.push(0);
            if (flowId === '2') currentFlowPath.push(0,1);
            if (flowId === '3') currentFlowPath.push(0,1,2);
            if (flowId === '4') currentFlowPath.push(0,1,2,3); // Arrow to logistics
            if (flowId === '5') currentFlowPath.push(0,1,2,3,4); // Arrow from pickup to delivery
            if (flowId === '6') currentFlowPath.push(0,1,2,3,4,5); // Arrow from delivery to fulfillment
            if (flowId === '7') currentFlowPath.push(0,1,2,3,4,5,6); // Arrow from fulfillment to review
            
            currentFlowPath.forEach(arrowIndex => {
                flowArrows[arrowIndex].classList.add('active-path');
                // If the arrow leads to or from a logistics step, style it as logistics
                const fromStep = flowSteps[arrowIndex]; // Step before this arrow
                const toStep = flowSteps[arrowIndex+1]; // Step after this arrow
                if ((fromStep && fromStep.dataset.flow >= 4 && fromStep.dataset.flow <=5) || (toStep && toStep.dataset.flow >=4 && toStep.dataset.flow <=5) ){
                        flowArrows[arrowIndex].classList.add('logistics-path');
                        flowArrows[arrowIndex].classList.remove('active-path');
                }
            });
                // Special styling for logistics steps themselves
            flowSteps.forEach(s_el => {
                if (s_el.dataset.flow === '4' || s_el.dataset.flow === '5') {
                    if (s_el === step || currentFlowPath.includes(parseInt(s_el.dataset.flow)-1) || currentFlowPath.includes(parseInt(s_el.dataset.flow)-2) && parseInt(s_el.dataset.flow) <= parseInt(flowId) ) { // Highlight if part of active path up to current step
                        s_el.classList.add('logistics-path');
                        s_el.classList.remove('active-path');
                    }
                }
            });


            flowInfo.innerHTML = `<p>${flowDetails[flowId]}</p>`;
        });
    });
    
    updateActiveNav('overview'); // Set initial active tab

    // Initialize Chart.js
    const ctx = document.getElementById('techStackChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Core (React)', 'Styling (Tailwind)', 'State Management', 'Data Fetching', 'Routing', 'Forms & UI'],
            datasets: [{
                label: 'Tech Stack Distribution',
                data: [30, 20, 15, 15, 10, 10],
                backgroundColor: [
                    '#4A90E2', // Blue
                    '#50E3C2', // Teal
                    '#F5A623', // Orange
                    '#F8E71C', // Yellow
                    '#BD10E0', // Purple
                    '#7ED321'  // Green
                ],
                borderColor: '#f8f7f4', // Match body background
                borderWidth: 4,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#4a4a4a', // Match body text
                        font: {
                            family: 'Inter',
                            size: 12
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    bodyFont: { family: 'Inter' },
                    titleFont: { family: 'Inter' },
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
});