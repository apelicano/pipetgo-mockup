        document.addEventListener('DOMContentLoaded', () => {
            const navButtons = document.querySelectorAll('.nav-button');
            const contentSections = document.querySelectorAll('.content-section');
            const flowSteps = document.querySelectorAll('.flow-step');
            const flowArrows = document.querySelectorAll('.flow-arrow'); // Should be 6 arrows for 7 steps
            const flowInfo = document.getElementById('flow-info');

            const flowDetails = {
                '1': '<strong>1. Discovery:</strong> Customer searches for or browses available laboratory services. Key pages include Homepage, Service Listing/Search Results. Components: `SearchBar`, `ServiceFilterPanel`, `ServiceCard`.',
                '2': '<strong>2. Quote Request:</strong> Customer finds a suitable service and requests a detailed quote from the laboratory. Pages: Service Detail Page. Lab uses their Dashboard. Components: `QuoteRequestForm`, `ModalDialogs` for interaction.',
                '3': '<strong>3. Order & Payment:</strong> Customer reviews and accepts the quote, then proceeds with payment. This confirms the order. Pages: Customer Dashboard (My Quotes, Order Confirmation). A logistics task for sample pickup is automatically generated.',
                '4': '<strong>4. Sample Pickup (Logistics):</strong> The logistics team receives the pickup task. They schedule and confirm the sample collection from the customer. Pages: Logistics Dashboard. Components: `PickupTaskCard`, `StatusUpdateForm`, `MapView` (for route optimization - future). Customer sees "Awaiting Pickup" then "Sample In Transit".',
                '5': '<strong>5. Sample Delivery (Logistics):</strong> Logistics personnel transport the sample and confirm its delivery to the designated laboratory. Pages: Logistics Dashboard. Lab sees "Incoming Sample" on their dashboard. Customer sees "Sample In Transit" then "Sample Delivered to Lab".',
                '6': '<strong>6. Lab Fulfillment & Report Upload:</strong> The laboratory receives the sample, performs the analysis according to the order, updates the order status (e.g., "In Progress", "Analysis Complete"), and securely uploads the final lab report/results to the platform. Pages: Lab Dashboard (Order Management). Components: `OrderDetailsView`, `ReportUploadControl`, `StatusUpdateDropdown`.',
                '7': '<strong>7. View Report & Review:</strong> The customer is notified that the report is available. They can view or download the lab report from their dashboard. After reviewing the results, the customer can leave a review and rating for the service and the laboratory. Pages: Customer Dashboard (My Orders, Order Detail). Components: `ReportViewer/DownloadLink`, `ReviewForm`, `RatingStars`.'
            };
            
            const flowPathOrder = [1, 2, 3, 4, 5, 6, 7]; 
            const logisticsSteps = [4, 5]; 

            function updateActiveNav(targetId) {
                navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
                contentSections.forEach(sec => sec.classList.toggle('active', sec.id === targetId));
            }

            navButtons.forEach(button => button.addEventListener('click', () => updateActiveNav(button.dataset.target)));

            flowSteps.forEach(step => {
                step.addEventListener('click', () => {
                    const clickedFlowId = parseInt(step.dataset.flow);
                    
                    flowSteps.forEach(s => {
                        s.classList.remove('active-path', 'logistics-path');
                        s.style.borderColor = '#d1d5db'; 
                    });
                    flowArrows.forEach(a => {
                        a.classList.remove('active-path', 'logistics-path');
                        a.style.color = '#d1d5db'; 
                    });

                    let pathIndex = flowPathOrder.indexOf(clickedFlowId);
                    if (pathIndex === -1) return;

                    for (let i = 0; i <= pathIndex; i++) {
                        const currentStepId = flowPathOrder[i];
                        const currentStepElement = document.querySelector(`.flow-step[data-flow="${currentStepId}"]`);
                        if (currentStepElement) {
                            if (logisticsSteps.includes(currentStepId)) {
                                currentStepElement.classList.add('logistics-path');
                            } else {
                                currentStepElement.classList.add('active-path');
                            }
                        }

                        if (i < pathIndex) { 
                            // Arrow IDs are 0 to 5 for 6 transitions between 7 steps
                            // Arrow 0: 1->2
                            // Arrow 1: 2->3
                            // Arrow 2: 3->4 (down)
                            // Arrow 3: 4->5 (down, from row 2 to row 4 in the grid)
                            // Arrow 4: 6->7 (left, this is the arrow with data-arrow-id="6" in HTML)
                            // Arrow 5: 5->6 (left, this is the arrow with data-arrow-id="5" in HTML)
                            
                            let arrowToHighlight;
                            if (i === 0) arrowToHighlight = document.querySelector(`.flow-arrow[data-arrow-id="0"]`); // 1->2
                            else if (i === 1) arrowToHighlight = document.querySelector(`.flow-arrow[data-arrow-id="1"]`); // 2->3
                            else if (i === 2) arrowToHighlight = document.querySelector(`.flow-arrow[data-arrow-id="2"]`); // 3->4
                            else if (i === 3) arrowToHighlight = document.querySelector(`.flow-arrow[data-arrow-id="3"]`); // 4->5
                            else if (i === 4) arrowToHighlight = document.querySelector(`.flow-arrow[data-arrow-id="5"]`); // 5->6 (HTML arrow 5)
                            else if (i === 5) arrowToHighlight = document.querySelector(`.flow-arrow[data-arrow-id="6"]`); // 6->7 (HTML arrow 6)


                            if (arrowToHighlight) {
                                if (logisticsSteps.includes(flowPathOrder[i]) || logisticsSteps.includes(flowPathOrder[i+1])) {
                                     arrowToHighlight.classList.add('logistics-path');
                                } else {
                                     arrowToHighlight.classList.add('active-path');
                                }
                            }
                        }
                    }
                    flowInfo.innerHTML = `<p>${flowDetails[clickedFlowId.toString()] || 'Select a step.'}</p>`;
                });
            });
            
            updateActiveNav('overview'); 

            const ctx = document.getElementById('techStackChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Core (React)', 'Styling (Tailwind)', 'State Management', 'Data Fetching', 'Routing', 'Forms & UI'],
                    datasets: [{
                        label: 'Tech Stack Distribution',
                        data: [30, 20, 15, 15, 10, 10],
                        backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623', '#F8E71C', '#BD10E0', '#7ED321'],
                        borderColor: '#f8f7f4', 
                        borderWidth: 4,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { color: '#4a4a4a', font: { family: 'Inter', size: 12 }, padding: 15 }},
                        tooltip: { bodyFont: { family: 'Inter' }, titleFont: { family: 'Inter' }, callbacks: { label: function(c) { return `${c.label}: ${c.parsed}%`; }}}
                    },
                    cutout: '60%'
                }
            });
        });