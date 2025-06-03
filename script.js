let currentRole = null;
let currentView = null;

const mockData = {
  services: [
    {
      id: 's1',
      name: 'Fatty Acid Composition Analysis',
      category: 'Composition Analysis',
      lab: 'Alpha Labs',
      priceEst: '₱250',
      turnaround: '5-7 days',
      description:
        'Comprehensive analysis of fatty acid profiles in various sample types using GC-FID.'
    },
    {
      id: 's2',
      name: 'Gas Chromatography Screening (Basic)',
      category: 'Chromatography',
      lab: 'Beta Diagnostics',
      priceEst: '₱150',
      turnaround: '3-5 days',
      description:
        'Screening for volatile and semi-volatile organic compounds via GC-MS.'
    },
    {
      id: 's3',
      name: 'HPLC Analysis - Custom Method',
      category: 'Chromatography',
      lab: 'Gamma Analytics',
      priceEst: 'Quote',
      turnaround: '7-10 days',
      description:
        'High-Performance Liquid Chromatography analysis tailored to specific client needs.'
    },
    {
      id: 's4',
      name: 'Protein Sequencing',
      category: 'Biochemical Analysis',
      lab: 'Alpha Labs',
      priceEst: '₱500',
      turnaround: '10-14 days',
      description: 'N-terminal sequencing of purified proteins.'
    },
    {
      id: 's5',
      name: 'Trace Elements Analysis',
      category: 'Elemental Analysis',
      lab: 'Beta Diagnostics',
      priceEst: '₱250',
      turnaround: '4 days',
      description:
        'Measurement of trace elements and heavy metals in samples with high sensitivity using ICP-MS/ICP-OES.'
    },
    {
      id: 's6',
      name: 'Acid Value Determination',
      category: 'Chemical Analysis',
      lab: 'Alpha Labs',
      priceEst: '₱100',
      turnaround: '2 days',
      description:
        'Evaluation of acid value to measure free fatty acids in oils and fats using titrimetric analysis.'
    },
    {
      id: 's7',
      name: 'HPLC Analysis',
      category: 'Chromatography',
      lab: 'Gamma Analytics',
      priceEst: '₱220',
      turnaround: '3 days',
      description:
        'Separation and quantification of compounds using High-Performance Liquid Chromatography techniques.'
    },
    {
      id: 's8',
      name: 'Glass Transition Temperature Measurement',
      category: 'Thermal Analysis',
      lab: 'Gamma Analytics',
      priceEst: '₱180',
      turnaround: '5 days',
      description:
        'Analysis of polymer properties by determining the glass transition temperature (Tg) using Differential Scanning Calorimetry (DSC).'
    },
    {
      id: 's9',
      name: 'Total Fatty Acids (TFA) Analysis',
      category: 'Composition Analysis',
      lab: 'Alpha Labs',
      priceEst: '₱170',
      turnaround: '3 days',
      description:
        'Comprehensive evaluation of all fatty acids present in a sample using a combination of GC and pre-treatment methods.'
    },
    {
      id: 's10',
      name: 'Combined HPLC & GC Analysis Package',
      category: 'Chromatography',
      lab: 'Gamma Analytics',
      priceEst: '₱350',
      turnaround: '5 days',
      description:
        'A bundled service leveraging both HPLC and GC for complex organic compound profiling through dual-technique analysis.'
    },
    {
      id: 's11',
      name: 'Acid Value & Fatty Acid Composite Package',
      category: 'Composite Analysis',
      lab: 'Alpha Labs',
      priceEst: '₱280',
      turnaround: '4 days',
      description:
        'Simultaneous determination of acid value and fatty acid profiles in lipid samples by combining titration with GC analysis.'
    }
  ],
  labs: [
    {
      id: 'l1',
      name: 'Alpha Labs',
      location: 'Quezon City, Metro Manila',
      rating: 4.8,
      specialties: ['Composition Analysis', 'Biochemical Analysis'],
      certifications: ['ISO 17025', 'GLP Compliant']
    },
    {
      id: 'l2',
      name: 'Beta Diagnostics',
      location: 'Makati City, Metro Manila',
      rating: 4.5,
      specialties: ['Chromatography', 'Toxicology'],
      certifications: ['CLIA Certified']
    },
    {
      id: 'l3',
      name: 'Gamma Analytics',
      location: 'Cebu City, Cebu',
      rating: 4.2,
      specialties: ['Chromatography', 'Pharmaceutical Analysis'],
      certifications: ['GMP Certified']
    }
  ],
  orders: {
    customer: [
      {
        id: 'o101',
        serviceName: 'Fatty Acid Analysis',
        labName: 'Alpha Labs',
        date: '2024-05-15',
        status: 'Completed',
        total: '₱250',
        logisticsStatus: 'Sample Delivered to Lab',
        reportId: 'r001'
      },
      {
        id: 'o102',
        serviceName: 'GC Screening',
        labName: 'Beta Diagnostics',
        date: '2024-05-28',
        status: 'Report Sent',
        total: '₱150',
        logisticsStatus: 'Sample Delivered to Lab',
        reportId: 'r002'
      },
      {
        id: 'o103',
        serviceName: 'HPLC Analysis',
        labName: 'Gamma Analytics',
        date: '2024-06-01',
        status: 'In Progress',
        total: 'Pending Quote',
        logisticsStatus: 'Awaiting Pickup',
        reportId: null
      }
    ],
    laboratory: [
      {
        id: 'o201',
        serviceName: 'Protein Sequencing',
        clientName: 'Client X Inc.',
        date: '2024-05-20',
        status: 'Completed',
        total: '₱500',
        logisticsStatus: 'Sample Delivered to Lab',
        reportId: 'r003'
      },
      {
        id: 'o202',
        serviceName: 'GC Screening',
        clientName: 'Client Y Co.',
        date: '2024-05-29',
        status: 'Analysis Complete',
        total: '₱150',
        logisticsStatus: 'Sample Delivered to Lab',
        reportId: null
      }
    ]
  },
  quotes: {
    customer: [
      {
        id: 'q101',
        serviceName: 'HPLC Analysis',
        labName: 'Gamma Analytics',
        dateSubmitted: '2024-05-30',
        status: 'Received - ₱450',
        details:
          'Quote for custom HPLC method development and analysis of 10 samples.'
      },
      {
        id: 'q102',
        serviceName: 'Advanced Microscopy',
        labName: 'Delta Imaging',
        dateSubmitted: '2024-06-01',
        status: 'Submitted',
        details: 'Request for high-resolution SEM imaging.'
      }
    ],
    laboratory: [
      {
        id: 'q201',
        serviceName: 'HPLC Analysis',
        clientName: 'Client Z Ltd.',
        dateReceived: '2024-05-30',
        status: 'Responded - ₱450'
      },
      {
        id: 'q202',
        serviceName: 'Soil Contaminant Testing',
        clientName: 'AgriCorp',
        dateReceived: '2024-06-02',
        status: 'New Request'
      }
    ]
  },
  pickups: [
    {
      id: 'p001',
      orderId: 'o103',
      clientName: 'Client for HPLC',
      clientAddress: '123 Sampaguita St, Quezon City, Metro Manila',
      labName: 'Gamma Analytics',
      labAddress: '789 Lab Ave, Cebu City, Cebu',
      status: 'Awaiting Pickup',
      pickupBy: 'Logistics Team A',
      notes: 'Fragile samples'
    },
    {
      id: 'p002',
      orderId: 'o102',
      clientName: 'Client for GC',
      clientAddress: '456 Rizal Ave, Makati City, Metro Manila',
      labName: 'Beta Diagnostics',
      labAddress: '321 Diagnostic Dr, Makati City, Metro Manila',
      status: 'Sample Delivered to Lab',
      pickupBy: 'Logistics Team B',
      notes: 'Temperature sensitive'
    },
    {
      id: 'p003',
      orderId: 'o201',
      clientName: 'Client X Inc.',
      clientAddress: '101 Protein Plaza, Pasig City, Metro Manila',
      labName: 'Alpha Labs',
      labAddress: '202 Enzyme Esplanade, Quezon City, Metro Manila',
      status: 'Sample Delivered to Lab',
      pickupBy: 'Logistics Team A',
      notes: ''
    }
  ],
  reports: [
    {
      reportId: 'r001',
      orderId: 'o101',
      fileName: 'FA_Analysis_Report_O101.pdf',
      fileSize: '1.2MB',
      uploadDate: '2024-05-20',
      uploadedBy: 'Dr. Smith (Alpha Labs)',
      url: '#'
    },
    {
      reportId: 'r002',
      orderId: 'o102',
      fileName: 'GC_Screening_Results_O102.pdf',
      fileSize: '850KB',
      uploadDate: '2024-06-01',
      uploadedBy: 'Tech Lead (Beta Diagnostics)',
      url: '#'
    },
    {
      reportId: 'r003',
      orderId: 'o201',
      fileName: 'ProteinSeq_O201_Final.pdf',
      fileSize: '2.1MB',
      uploadDate: '2024-05-28',
      uploadedBy: 'Dr. Ray (Alpha Labs)',
      url: '#'
    }
  ],
  users: [
    {
      id: 'u1',
      name: 'John Doe (Client)',
      email: 'john@example.com',
      role: 'Customer',
      joined: '2024-01-15',
      status: 'Active'
    },
    {
      id: 'u2',
      name: 'Alpha Labs (Lab)',
      email: 'contact@alphalabs.com',
      role: 'Laboratory',
      joined: '2024-02-01',
      status: 'Active'
    },
    {
      id: 'u3',
      name: 'Jane Smith (Admin)',
      email: 'admin@marketplace.com',
      role: 'Administrator',
      joined: '2024-01-01',
      status: 'Active'
    },
    {
      id: 'u4',
      name: 'Beta Diagnostics (Lab)',
      email: 'info@betadiag.com',
      role: 'Laboratory',
      joined: '2024-03-10',
      status: 'Suspended'
    },
    {
      id: 'u5',
      name: 'Logistics Team Lead',
      email: 'logistics@marketplace.com',
      role: 'Logistics',
      joined: '2024-01-05',
      status: 'Active'
    }
  ],
  transactions: [
    {
      id: 't1',
      date: '2024-05-15',
      type: 'Service Payment',
      amount: '₱250',
      client: 'John Doe',
      lab: 'Alpha Labs',
      status: 'Completed'
    },
    {
      id: 't2',
      date: '2024-05-20',
      type: 'Lab Payout',
      amount: '₱400',
      lab: 'Beta Diagnostics',
      status: 'Processed'
    },
    {
      id: 't3',
      date: '2024-05-28',
      type: 'Service Payment',
      amount: '₱150',
      client: 'Alice Brown',
      lab: 'Beta Diagnostics',
      status: 'Completed'
    }
  ]
};


const views = {
    customer: {
        title: 'Customer Dashboard',
        links: [ /* ... same ... */ { label: 'Dashboard', viewId: 'customer_dashboard' }, { label: 'Find Services', viewId: 'customer_find_services' }, { label: 'My Orders', viewId: 'customer_my_orders' }, { label: 'My Quotes', viewId: 'customer_my_quotes' }, { label: 'Service History', viewId: 'customer_service_history' }, { label: 'My Profile', viewId: 'customer_my_profile' } ],
        defaultView: 'customer_dashboard'
    },
    laboratory: {
        title: 'Laboratory Dashboard',
        links: [ /* ... same ... */ { label: 'Dashboard', viewId: 'lab_dashboard' }, { label: 'Manage Services', viewId: 'lab_manage_services' }, { label: 'Quote Requests', viewId: 'lab_quote_requests' }, { label: 'Manage Orders', viewId: 'lab_manage_orders' }, { label: 'Incoming Samples', viewId: 'lab_incoming_samples'}, { label: 'My Profile', viewId: 'lab_my_profile' }, { label: 'Client Communication', viewId: 'lab_communication' }, { label: 'Earnings', viewId: 'lab_earnings' } ],
        defaultView: 'lab_dashboard'
    },
    logistics: { /* ... same ... */ 
        title: 'Logistics Dashboard',
        links: [ { label: 'Dashboard', viewId: 'logistics_dashboard' }, { label: 'Pending Pickups', viewId: 'logistics_pending_pickups' }, { label: 'In Transit Samples', viewId: 'logistics_in_transit' }, { label: 'Completed Deliveries', viewId: 'logistics_completed_deliveries' }, { label: 'My Schedule', viewId: 'logistics_schedule' } ],
        defaultView: 'logistics_dashboard'
    },
    administrator: { /* ... same ... */ 
        title: 'Administrator Panel',
        links: [ { label: 'Dashboard', viewId: 'admin_dashboard' }, { label: 'Manage Transactions', viewId: 'admin_manage_transactions' }, { label: 'Manage Users', viewId: 'admin_manage_users' }, { label: 'Manage Services (All)', viewId: 'admin_manage_services_all' }, { label: 'Logistics Overview', viewId: 'admin_logistics_overview' }, { label: 'Dispute Resolution', viewId: 'admin_dispute_resolution' } ],
        defaultView: 'admin_dashboard'
    }
};

function e(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        if (key.startsWith('on') && typeof attributes[key] === 'function') {
            element.addEventListener(key.substring(2).toLowerCase(), attributes[key]);
        } else if (key === 'className') {
            element.className = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    }
    children.forEach(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    return element;
}

function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    const roleConfig = views[currentRole];
    document.getElementById('sidebarRoleTitle').textContent = roleConfig.title;
    
    const linksContainer = e('div');
    roleConfig.links.forEach(link => {
        let linkClass = 'sidebar-link';
        if (currentRole === 'logistics') { 
                linkClass = `sidebar-link ${link.viewId === currentView ? 'logistics-active' : ''}`;
        }
        const a = e('a', { href: '#', className: linkClass, 'data-view': link.viewId, onclick: (event) => { event.preventDefault(); navigateTo(link.viewId); } }, link.label);
        linksContainer.appendChild(a);
    });
    sidebar.querySelectorAll('div:not(:first-child)').forEach(el => el.remove()); 
    sidebar.appendChild(linksContainer);
}

function navigateTo(viewId) {
  currentView = viewId;
  
  // Update sidebar link classes based on the current role
  document.querySelectorAll('.sidebar-link').forEach(l => {
    if (currentRole === 'logistics') {
      l.classList.toggle('logistics-active', l.dataset.view === viewId);
      l.classList.remove('active'); 
    } else {
      l.classList.toggle('active', l.dataset.view === viewId);
      l.classList.remove('logistics-active'); 
    }
  });
  
  // Toggle active class for content views (if using cached views)
  document.querySelectorAll('.content-view').forEach(v => {
    v.classList.toggle('active', v.id === viewId);
  });
  
  const mainContent = document.getElementById('mainContent');
  mainContent.scrollTop = 0; 

  // If the view is not yet loaded in the DOM...
  if (!document.getElementById(viewId)) {
    // Show loading feedback immediately.
    mainContent.innerHTML = `
      <div class="flex items-center justify-center h-full p-4">
        <svg class="animate-spin h-8 w-8 text-blue-500 mr-2" 
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
        <span class="text-blue-700 font-semibold">Loading...</span>
      </div>
    `;
    
    // Use a timeout to allow the loading feedback to render before processing the heavy view rendering.
    setTimeout(() => {
      const viewElement = renderView(viewId);
      if (viewElement) {
        mainContent.innerHTML = ''; // Clear the loading indicator.
        mainContent.appendChild(viewElement);
      }
    }, 50); // Adjust the delay as necessary.
  }
}


function selectRole(role) {
    currentRole = role;
    document.getElementById('roleSelectionScreen').style.display = 'none';
    document.getElementById('appContainer').classList.add('active');
    renderSidebar(); 
    navigateTo(views[role].defaultView); 
}

function showRoleSelection() {
    currentRole = null; currentView = null;
    document.getElementById('appContainer').classList.remove('active');
    document.getElementById('roleSelectionScreen').style.display = 'block';
    document.getElementById('mainContent').innerHTML = ''; 
}

function showModal(title, bodyContent, actionButton = { text: '', onclick: null, visible: false }) {
    document.getElementById('modalTitle').textContent = title;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = ''; 
    if (typeof bodyContent === 'string') {
        modalBody.textContent = bodyContent;
    } else {
        modalBody.appendChild(bodyContent);
    }

    const modalActionButton = document.getElementById('modalActionButton');
    if (actionButton.visible && actionButton.text && actionButton.onclick) {
        modalActionButton.textContent = actionButton.text;
        modalActionButton.onclick = actionButton.onclick; 
        modalActionButton.classList.remove('hidden');
        modalActionButton.className = currentRole === 'logistics' ? 'button-logistics' : 'button-primary'; 
    } else {
        modalActionButton.classList.add('hidden');
        modalActionButton.onclick = null; 
    }
    document.getElementById('genericModal').classList.add('active');
}

function closeModal() {
    document.getElementById('genericModal').classList.remove('active');
    document.getElementById('modalActionButton').onclick = null; 
}

function renderStatusBadge(status) {
    let badgeClass = 'badge-blue';
    if (status.toLowerCase().includes('completed') || status.toLowerCase().includes('active') || status.toLowerCase().includes('processed') || status.toLowerCase().includes('sample delivered') || status.toLowerCase().includes('report sent')) badgeClass = 'badge-green';
    else if (status.toLowerCase().includes('progress') || status.toLowerCase().includes('pending') || status.toLowerCase().includes('submitted') || status.toLowerCase().includes('new request') || status.toLowerCase().includes('in transit') || status.toLowerCase().includes('analysis complete')) badgeClass = 'badge-yellow';
    else if (status.toLowerCase().includes('suspended') || status.toLowerCase().includes('cancelled')) badgeClass = 'badge-red';
    else if (status.toLowerCase().includes('awaiting pickup') || status.toLowerCase().includes('scheduled')) badgeClass = 'badge-orange';
    return e('span', {className: `badge ${badgeClass}`}, status);
}

function createForm(fields, submitText, onSubmit) {
    const form = e('form', { onSubmit: (ev) => { ev.preventDefault(); onSubmit(new FormData(ev.target)); } });
    fields.forEach(field => {
        const fieldGroup = e('div', { className: 'mb-4' });
        fieldGroup.appendChild(e('label', { htmlFor: field.id, className: 'block text-sm font-medium text-slate-700 mb-1' }, field.label));
        if (field.type === 'textarea') {
            fieldGroup.appendChild(e('textarea', { id: field.id, name: field.name, className: 'input-field h-24', placeholder: field.placeholder || '' }));
        } else if (field.type === 'select') {
            const select = e('select', { id: field.id, name: field.name, className: 'input-field' });
            (field.options || []).forEach(opt => select.appendChild(e('option', {value: opt.value}, opt.label)));
            fieldGroup.appendChild(select);
        } else if (field.type === 'file') {
            const fileInput = e('input', { type: 'file', id: field.id, name: field.name, className: 'hidden', accept: field.accept || '.pdf,.doc,.docx,.txt,.csv' });
            const fileLabel = e('label', { htmlFor: field.id, className: 'file-input-label' }, field.labelPlaceholder || 'Click to choose a file');
            fileInput.onchange = () => { fileLabel.textContent = fileInput.files.length > 0 ? fileInput.files[0].name : (field.labelPlaceholder || 'Click to choose a file'); };
            fieldGroup.appendChild(fileInput);
            fieldGroup.appendChild(fileLabel);
        }
        else {
            fieldGroup.appendChild(e('input', { type: field.type, id: field.id, name: field.name, className: 'input-field', placeholder: field.placeholder || '' }));
        }
        form.appendChild(fieldGroup);
    });
    const submitButtonClass = currentRole === 'logistics' ? 'button-logistics w-full mt-2' : 'button-primary w-full mt-2';
    form.appendChild(e('button', { type: 'submit', className: submitButtonClass }, submitText));
    return form;
}

function renderView(viewId) {
    const container = e('div', { id: viewId, className: 'content-view space-y-6' });
    container.appendChild(e('h1', { className: 'text-2xl font-semibold text-slate-800' }, viewId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())));
    
    if (viewId === 'customer_my_orders' || viewId === 'customer_service_history') {
        const isHistory = viewId === 'customer_service_history';
        container.appendChild(e('p', {className: 'text-slate-600'}, isHistory ? 'Review your past completed services.' : 'Track your current and past orders, including sample logistics and lab reports.'));
        const table = e('table', {className: 'w-full table'});
        const thead = e('thead', {}, e('tr', {}, e('th', {}, 'Order ID'), e('th', {}, 'Service'), e('th', {}, 'Lab'), e('th', {}, 'Order Status'), e('th', {}, 'Logistics'), e('th', {}, 'Report'), e('th', {}, 'Total')));
        const tbody = e('tbody');
        const ordersToShow = isHistory ? mockData.orders.customer.filter(o => o.status === 'Completed') : mockData.orders.customer;
        ordersToShow.forEach(order => {
            const row = e('tr');
            row.appendChild(e('td', {}, order.id));
            row.appendChild(e('td', {}, order.serviceName));
            row.appendChild(e('td', {}, order.labName));
            row.appendChild(e('td', {}, renderStatusBadge(order.status)));
            row.appendChild(e('td', {}, renderStatusBadge(order.logisticsStatus || 'N/A')));
            const reportCell = e('td');
            if (order.reportId) {
                const reportData = mockData.reports.find(r => r.reportId === order.reportId);
                reportCell.appendChild(e('button', {className: 'button-primary text-xs py-1 px-2', onclick: () => showModal(`View Report: ${reportData.fileName}`, `Displaying report content for Order ${order.id}. (File: ${reportData.fileName}, Size: ${reportData.fileSize}, Uploaded: ${reportData.uploadDate} by ${reportData.uploadedBy}) - In a real app, this would link to or embed the PDF.`)}, 'View Report'));
            } else {
                reportCell.textContent = 'N/A';
            }
            row.appendChild(reportCell);
            row.appendChild(e('td', {}, order.total));
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(e('div', {className: 'overflow-x-auto card p-0'}, table));
    }
    else if (viewId === 'lab_manage_orders') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Manage active orders, update status, and upload lab reports.'));
        const table = e('table', {className: 'w-full table'});
        const thead = e('thead', {}, e('tr', {}, e('th', {}, 'Order ID'), e('th', {}, 'Service'), e('th', {}, 'Client'), e('th', {}, 'Order Status'), e('th', {}, 'Logistics'), e('th', {}, 'Actions')));
        const tbody = e('tbody');
        mockData.orders.laboratory.forEach(order => {
            const row = e('tr');
            row.appendChild(e('td', {}, order.id));
            row.appendChild(e('td', {}, order.serviceName));
            row.appendChild(e('td', {}, order.clientName));
            row.appendChild(e('td', {}, renderStatusBadge(order.status)));
            row.appendChild(e('td', {}, renderStatusBadge(order.logisticsStatus || 'N/A')));
            const actionsCell = e('td', {className: 'space-x-1 flex flex-wrap gap-1'});
            actionsCell.appendChild(e('button', {className: 'button-secondary text-xs py-1 px-2', onclick: () => {
                const form = createForm([
                    {id: 'newStatus', name: 'newStatus', label: 'New Order Status', type: 'select', options: [{value: 'Sample Received', label: 'Sample Received'}, {value: 'In Progress', label: 'In Progress'}, {value: 'Analysis Complete', label: 'Analysis Complete'}, {value: 'Report Sent', label: 'Report Sent'}, {value: 'Completed', label: 'Completed'}]},
                    {id: 'notes', name: 'notes', label: 'Internal Notes', type: 'textarea'}
                ], 'Update Order Status', () => {
                    closeModal();
                    showModal('Order Status Updated', `Status for order ${order.id} has been updated.`);
                });
                showModal(`Update Order ${order.id} Status`, form, {text: 'Update', onclick: () => form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), visible: false});
            }}, 'Update Order'));
            
            if (order.status === 'Analysis Complete' && !order.reportId) {
                    actionsCell.appendChild(e('button', {className: 'button-success text-xs py-1 px-2', onclick: () => {
                    const form = createForm([
                        {id: 'reportFile', name: 'reportFile', label: 'Lab Report File', type: 'file', labelPlaceholder: 'Choose PDF, DOCX, etc.'},
                        {id: 'reportVersion', name: 'reportVersion', label: 'Version (e.g., 1.0)', type: 'text', placeholder: '1.0'},
                        {id: 'reportNotes', name: 'reportNotes', label: 'Notes for this version', type: 'textarea'}
                    ], 'Upload Report', (formData) => {
                        const fileName = formData.get('reportFile') ? formData.get('reportFile').name : 'N/A';
                        closeModal();
                        showModal('Report Uploaded', `Mock report "${fileName}" for order ${order.id} has been uploaded. Status changed to "Report Sent".`);
                        // In a real app, update mockData.orders and mockData.reports here
                        const orderToUpdate = mockData.orders.laboratory.find(o => o.id === order.id) || mockData.orders.customer.find(o => o.id === order.id);
                        if(orderToUpdate) { 
                            orderToUpdate.status = 'Report Sent';
                            orderToUpdate.reportId = 'r_new_' + order.id; // mock new report id
                            // Add to mockData.reports if needed for consistency in demo
                        }
                        navigateTo('lab_manage_orders'); // Refresh view
                    });
                    showModal(`Upload Report for Order ${order.id}`, form, {text: 'Upload', onclick: () => form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), visible: false});
                }}, 'Upload Report'));
            } else if (order.reportId) {
                actionsCell.appendChild(e('span', {className: 'text-xs text-green-600 font-medium'}, 'Report Uploaded'));
            }

            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(e('div', {className: 'overflow-x-auto card p-0'}, table));
    }
    // --- Keep other view rendering functions largely the same, just ensure they are called ---
    else if (viewId === 'customer_dashboard') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Welcome to your dashboard! Here you can get a quick overview of your recent activity. (Mock content)'));
        const statsGrid = e('div', {className: 'grid md:grid-cols-3 gap-4'});
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.orders.customer.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length), e('p', {}, 'Active Orders')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.quotes.customer.filter(q => q.status === 'Submitted' || q.status.startsWith('Received')).length), e('p', {}, 'Pending Quotes')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.orders.customer.filter(o => o.reportId).length), e('p', {}, 'Reports Available')));
        container.appendChild(statsGrid);
    } 
    else if (viewId === 'customer_find_services') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Search and filter to find the lab services you need. Click on a service for more details or to request a quote.'));
        container.appendChild(e('input', {type: 'search', placeholder: 'Search for services (e.g., HPLC, DNA Sequencing)...', className: 'input-field mb-4'}));
        const servicesGrid = e('div', {className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-4'});
        mockData.services.forEach(service => {
            const card = e('div', {className: 'card space-y-2'});
            card.appendChild(e('h3', {className: 'text-lg font-semibold'}, service.name));
            card.appendChild(e('p', {className: 'text-sm text-slate-500'}, `Lab: ${service.lab} | Category: ${service.category}`));
            card.appendChild(e('p', {className: 'text-sm'}, `Est. Price: ${service.priceEst} | Turnaround: ${service.turnaround}`));
            const actions = e('div', {className: 'pt-2 space-x-2'});
            actions.appendChild(e('button', {className: 'button-secondary text-sm py-1 px-3', onclick: () => showModal('Service Details: ' + service.name, service.description) }, 'View Details'));
            actions.appendChild(e('button', {className: 'button-primary text-sm py-1 px-3', onclick: () => {
                const form = createForm([
                    {id: 'projectName', name: 'projectName', label: 'Project Name/ID', type: 'text', placeholder: 'e.g., My Research Project'},
                    {id: 'sampleDetails', name: 'sampleDetails', label: 'Sample Details (Type, Quantity)', type: 'textarea', placeholder: 'e.g., 10x Serum Samples, 0.5ml each'},
                    {id: 'pickupAddress', name: 'pickupAddress', label: 'Pickup Address', type: 'text', placeholder: 'e.g., 123 Main St, Anytown'},
                    {id: 'specificRequirements', name: 'specificRequirements', label: 'Specific Requirements', type: 'textarea', placeholder: 'e.g., Need results by end of month'}
                ], 'Submit Quote Request', (formData) => {
                    closeModal();
                    showModal('Quote Request Submitted', `Your request for "${service.name}" has been submitted to ${service.lab}. You will be notified when they respond. A logistics request for sample pickup will be generated upon order confirmation.`);
                });
                showModal(`Request Quote: ${service.name}`, form, {text: 'Submit Request', onclick: () => form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), visible: false}); 
            }}, 'Request Quote'));
            card.appendChild(actions);
            servicesGrid.appendChild(card);
        });
        container.appendChild(servicesGrid);
    }
    else if (viewId === 'customer_my_quotes') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Manage your submitted quote requests and received quotes.'));
        mockData.quotes.customer.forEach(quote => {
            const card = e('div', {className: 'card space-y-2'});
            card.appendChild(e('h3', {className: 'text-lg font-semibold'}, `${quote.serviceName} - ${quote.labName}`));
            card.appendChild(e('p', {className: 'text-sm'}, `Submitted: ${quote.dateSubmitted} | Status: `, renderStatusBadge(quote.status)));
            card.appendChild(e('p', {className: 'text-sm text-slate-600'}, `Details: ${quote.details}`));
            if (quote.status.startsWith('Received')) {
                    card.appendChild(e('button', {className: 'button-success text-sm py-1 px-3 mt-2', onclick: () => showModal('Quote Accepted', 'You have accepted the quote. A logistics request for sample pickup will be initiated. You can track its status in "My Orders".')}, 'Accept Quote & Proceed'));
            }
            container.appendChild(card);
        });
    }
    else if (viewId === 'customer_my_profile' || viewId === 'lab_my_profile') {
        const isLab = viewId === 'lab_my_profile';
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Manage your profile information.'));
        const formFields = [
            {id: 'name', name: 'name', label: isLab ? 'Laboratory Name' : 'Full Name', type: 'text', placeholder: isLab ? 'e.g., Alpha Labs' : 'e.g., John Doe'},
            {id: 'email', name: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g., contact@example.com'},
            {id: 'phone', name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'e.g., (555) 123-4567'},
        ];
        if (isLab) {
            formFields.push({id: 'address', name: 'address', label: 'Address', type: 'text', placeholder: 'e.g., 123 Lab Street, Science City'});
            formFields.push({id: 'certifications', name: 'certifications', label: 'Certifications (comma-separated)', type: 'text', placeholder: 'e.g., ISO 17025, GLP'});
        } else { 
                formFields.push({id: 'defaultPickupAddress', name: 'defaultPickupAddress', label: 'Default Pickup Address', type: 'text', placeholder: 'e.g., 123 Main St, Anytown, USA 12345'});
        }
        const form = createForm(formFields, 'Save Profile Changes', () => {
            showModal('Profile Updated', 'Your profile information has been saved.');
        });
        container.appendChild(form);
    }
    else if (viewId === 'lab_dashboard') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Welcome to your lab dashboard. Manage your services, quotes, and orders. (Mock content)'));
        const statsGrid = e('div', {className: 'grid md:grid-cols-3 gap-4'});
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, '3'), e('p', {}, 'Active Services')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.quotes.laboratory.filter(q => q.status === 'New Request').length), e('p', {}, 'New Quote Requests')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.orders.laboratory.filter(o => o.status === 'Analysis Complete' && !o.reportId).length), e('p', {}, 'Reports to Upload')));
        container.appendChild(statsGrid);
    }
    else if (viewId === 'lab_manage_services') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'List, edit, or add new services offered by your laboratory.'));
        container.appendChild(e('button', { className: 'button-primary mb-4', onclick: () => {
            const form = createForm([
                {id: 'serviceName', name: 'serviceName', label: 'Service Name', type: 'text', placeholder: 'e.g., DNA Extraction'},
                {id: 'category', name: 'category', label: 'Category', type: 'text', placeholder: 'e.g., Molecular Biology'},
                {id: 'price', name: 'price', label: 'Price (or "Quote")', type: 'text', placeholder: 'e.g., $100 or Quote'},
                {id: 'turnaround', name: 'turnaround', label: 'Turnaround Time', type: 'text', placeholder: 'e.g., 2-3 business days'},
                {id: 'description', name: 'description', label: 'Description', type: 'textarea', placeholder: 'Detailed service description...'}
            ], 'Add Service', () => {
                closeModal();
                showModal('Service Added', 'The new service has been added to your listings.');
            });
                showModal('Add New Service', form, {text: 'Add Service', onclick: () => form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), visible: false});
        }}, '＋ Add New Service'));
        
        mockData.services.filter(s => s.lab === 'Alpha Labs' || s.lab === 'Beta Diagnostics' || s.lab === 'Gamma Analytics').slice(0,3) 
        .forEach(service => {
            const card = e('div', {className: 'card space-y-2'});
            card.appendChild(e('h3', {className: 'text-lg font-semibold'}, service.name));
            card.appendChild(e('p', {className: 'text-sm text-slate-500'}, `Category: ${service.category}`));
            card.appendChild(e('p', {className: 'text-sm'}, `Price: ${service.priceEst} | Turnaround: ${service.turnaround}`));
            const actions = e('div', {className: 'pt-2 space-x-2'});
            actions.appendChild(e('button', {className: 'button-secondary text-sm py-1 px-3'}, 'Edit'));
            actions.appendChild(e('button', {className: 'button-secondary text-sm py-1 px-3 bg-red-500 hover:bg-red-600'}, 'Delete'));
            card.appendChild(actions);
            container.appendChild(card);
        });
    }
    else if (viewId === 'lab_quote_requests') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Review and respond to quote requests from potential clients.'));
        mockData.quotes.laboratory.forEach(quote => {
            const card = e('div', {className: 'card space-y-2'});
            card.appendChild(e('h3', {className: 'text-lg font-semibold'}, `${quote.serviceName} - For: ${quote.clientName}`));
            card.appendChild(e('p', {className: 'text-sm'}, `Received: ${quote.dateReceived} | Status: `, renderStatusBadge(quote.status)));
            if (quote.status === 'New Request') {
                card.appendChild(e('button', {className: 'button-primary text-sm py-1 px-3 mt-2', onclick: () => {
                    const form = createForm([
                        {id: 'quoteAmount', name: 'quoteAmount', label: 'Quote Amount ($)', type: 'number', placeholder: 'e.g., 350'},
                        {id: 'turnaroundEst', name: 'turnaroundEst', label: 'Estimated Turnaround', type: 'text', placeholder: 'e.g., 5-7 business days'},
                        {id: 'notes', name: 'notes', label: 'Notes for Client', type: 'textarea', placeholder: 'Additional terms or comments...'}
                    ], 'Submit Quote', () => {
                        closeModal();
                        showModal('Quote Submitted', `Your quote for "${quote.serviceName}" has been sent to ${quote.clientName}.`);
                    });
                    showModal(`Respond to Quote: ${quote.serviceName}`, form, {text: 'Submit Quote', onclick: () => form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), visible: false});
                }}, 'Respond to Request'));
            }
            container.appendChild(card);
        });
    }
        else if (viewId === 'lab_incoming_samples') {
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Track samples currently being shipped to your laboratory.'));
        const incoming = mockData.pickups.filter(p => p.labName === 'Alpha Labs' || p.labName === 'Beta Diagnostics' || p.labName === 'Gamma Analytics').filter(p => p.status === 'Sample In Transit' || p.status === 'Awaiting Pickup');
        if (incoming.length === 0) {
            container.appendChild(e('p', {className: 'text-slate-500 card'}, 'No samples currently in transit to your lab.'));
        } else {
            incoming.forEach(pickup => {
                const card = e('div', {className: 'card space-y-1'});
                card.appendChild(e('h3', {className: 'font-semibold'}, `Order ID: ${pickup.orderId} (From: ${pickup.clientName})`));
                card.appendChild(e('p', {className: 'text-sm'}, 'Logistics Status: ', renderStatusBadge(pickup.status)));
                card.appendChild(e('p', {className: 'text-sm text-slate-500'}, `Pickup By: ${pickup.pickupBy}`));
                container.appendChild(card);
            });
        }
    }
    else if (viewId === 'lab_communication' || viewId === 'lab_earnings') {
        container.appendChild(e('p', {className: 'text-slate-600'}, `This section for "${viewId.split('_')[1]}" is a placeholder for now. In a real application, it would contain tools for client communication or financial earnings tracking.`));
        container.appendChild(e('div', {className: 'card h-64 flex items-center justify-center text-slate-400 text-lg'}, 'Feature Coming Soon'));
    }
    else if (viewId === 'logistics_dashboard') { /* ... same ... */ 
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Overview of current logistics tasks. (Mock content)'));
        const statsGrid = e('div', {className: 'grid md:grid-cols-3 gap-4'});
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold text-orange-600'}, mockData.pickups.filter(p=>p.status === 'Awaiting Pickup').length), e('p', {}, 'Pending Pickups')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold text-orange-600'}, mockData.pickups.filter(p=>p.status === 'Sample In Transit').length), e('p', {}, 'Samples In Transit')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold text-orange-600'}, mockData.pickups.filter(p=>p.status === 'Sample Delivered to Lab').length), e('p', {}, 'Completed Deliveries Today')));
        container.appendChild(statsGrid);
    }
    else if (viewId === 'logistics_pending_pickups' || viewId === 'logistics_in_transit' || viewId === 'logistics_completed_deliveries') { /* ... same ... */ 
        let titleText, filterFn;
        if (viewId === 'logistics_pending_pickups') {
            titleText = 'Manage samples awaiting pickup from clients.';
            filterFn = p => p.status === 'Awaiting Pickup' || p.status === 'Scheduled for Pickup';
        } else if (viewId === 'logistics_in_transit') {
            titleText = 'Track samples currently in transit to laboratories.';
            filterFn = p => p.status === 'Sample In Transit';
        } else {
            titleText = 'View recently completed deliveries.';
            filterFn = p => p.status === 'Sample Delivered to Lab';
        }
        container.appendChild(e('p', {className: 'text-slate-600'}, titleText));
        const pickupsToShow = mockData.pickups.filter(filterFn);
        if (pickupsToShow.length === 0) {
            container.appendChild(e('p', {className: 'text-slate-500 card'}, 'No tasks in this category at the moment.'));
        }
        pickupsToShow.forEach(pickup => {
            const card = e('div', {className: 'card space-y-2'});
            card.appendChild(e('h3', {className: 'text-lg font-semibold'}, `Order ID: ${pickup.orderId}`));
            card.appendChild(e('p', {className: 'text-sm'}, `Client: ${pickup.clientName} (at ${pickup.clientAddress})`));
            card.appendChild(e('p', {className: 'text-sm'}, `Destination Lab: ${pickup.labName} (at ${pickup.labAddress})`));
            card.appendChild(e('p', {className: 'text-sm'}, `Assigned To: ${pickup.pickupBy} | Status: `, renderStatusBadge(pickup.status)));
            if (pickup.notes) card.appendChild(e('p', {className: 'text-xs text-slate-500'}, `Notes: ${pickup.notes}`));
            
            const actions = e('div', {className: 'pt-2 space-x-2'});
            if (pickup.status === 'Awaiting Pickup') {
                actions.appendChild(e('button', {className: 'button-logistics text-sm py-1 px-3', onclick: () => showModal('Schedule Pickup', `Schedule pickup for Order ${pickup.orderId}. (Mock action - status would change to 'Scheduled for Pickup')`)}, 'Schedule Pickup'));
            } else if (pickup.status === 'Scheduled for Pickup' || pickup.status === 'Awaiting Pickup') {
                    actions.appendChild(e('button', {className: 'button-logistics text-sm py-1 px-3', onclick: () => showModal('Confirm Pickup', `Confirm sample pickup for Order ${pickup.orderId}. (Mock action - status would change to 'Sample In Transit')`)}, 'Confirm Pickup'));
            } else if (pickup.status === 'Sample In Transit') {
                actions.appendChild(e('button', {className: 'button-logistics text-sm py-1 px-3', onclick: () => showModal('Confirm Delivery', `Confirm sample delivery to ${pickup.labName} for Order ${pickup.orderId}. (Mock action - status would change to 'Sample Delivered to Lab')`)}, 'Confirm Delivery'));
            }
            actions.appendChild(e('button', {className: 'button-secondary text-sm py-1 px-3', onclick: () => showModal('View Details: ' + pickup.orderId, `Full details for pickup ${pickup.id}. (More details here like contact info, specific instructions etc.)`) }, 'View Details'));
            card.appendChild(actions);
            container.appendChild(card);
        });
    }
    else if (viewId === 'logistics_schedule') { /* ... same ... */ 
        container.appendChild(e('p', {className: 'text-slate-600'}, 'View your assigned pickup and delivery schedule. (Placeholder - would show a calendar or timed list)'));
        container.appendChild(e('div', {className: 'card h-64 flex items-center justify-center text-slate-400 text-lg'}, 'Logistics Schedule Feature Coming Soon'));
    }
    else if (viewId === 'admin_dashboard') { /* ... same ... */ 
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Overview of platform activity and key metrics. (Mock content)'));
        const statsGrid = e('div', {className: 'grid md:grid-cols-2 lg:grid-cols-4 gap-4'});
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.users.length), e('p', {}, 'Total Users')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.services.length), e('p', {}, 'Listed Services')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, mockData.reports.length), e('p', {}, 'Total Reports Uploaded')));
        statsGrid.appendChild(e('div', {className: 'card text-center'}, e('h3', {className: 'text-3xl font-bold'}, '0'), e('p', {}, 'Open Disputes')));
        container.appendChild(statsGrid);
    }
    else if (viewId === 'admin_manage_transactions') { /* ... same ... */ 
        container.appendChild(e('p', {className: 'text-slate-600'}, 'View and manage all platform transactions.'));
        const table = e('table', {className: 'w-full table'});
        const thead = e('thead', {}, e('tr', {}, e('th', {}, 'ID'), e('th', {}, 'Date'), e('th', {}, 'Type'), e('th', {}, 'Amount'), e('th', {}, 'Client/Lab'), e('th', {}, 'Status')));
        const tbody = e('tbody');
        mockData.transactions.forEach(t => {
            const row = e('tr');
            row.appendChild(e('td', {}, t.id));
            row.appendChild(e('td', {}, t.date));
            row.appendChild(e('td', {}, t.type));
            row.appendChild(e('td', {}, t.amount));
            row.appendChild(e('td', {}, t.type === 'Service Payment' ? t.client + ' to ' + t.lab : t.lab));
            row.appendChild(e('td', {}, renderStatusBadge(t.status)));
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(e('div', {className: 'overflow-x-auto card p-0'}, table));
    }
    else if (viewId === 'admin_manage_users') { /* ... same ... */ 
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Manage all users on the platform (Customers, Laboratories, Administrators, Logistics).'));
        const table = e('table', {className: 'w-full table'});
        const thead = e('thead', {}, e('tr', {}, e('th', {}, 'ID'), e('th', {}, 'Name'), e('th', {}, 'Email'), e('th', {}, 'Role'), e('th', {}, 'Joined'), e('th', {}, 'Status'), e('th', {}, 'Actions')));
        const tbody = e('tbody');
        mockData.users.forEach(user => {
            const row = e('tr');
            row.appendChild(e('td', {}, user.id));
            row.appendChild(e('td', {}, user.name));
            row.appendChild(e('td', {}, user.email));
            row.appendChild(e('td', {}, user.role));
            row.appendChild(e('td', {}, user.joined));
            row.appendChild(e('td', {}, renderStatusBadge(user.status)));
            const actionsCell = e('td', {className: 'space-x-1'});
            actionsCell.appendChild(e('button', {className: 'button-secondary text-xs py-1 px-2', onclick: () => showModal('View User: ' + user.name, `Details for user ${user.id}. Role: ${user.role}, Email: ${user.email}. (More details would show here)`)}, 'View'));
            actionsCell.appendChild(e('button', {className: `button-secondary text-xs py-1 px-2 ${user.status === 'Active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`, onclick: () => showModal('Confirm Action', `Are you sure you want to ${user.status === 'Active' ? 'suspend' : 'activate'} user ${user.name}? This is a mock action.`)}, user.status === 'Active' ? 'Suspend' : 'Activate'));
            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(e('div', {className: 'overflow-x-auto card p-0'}, table));
    }
    else if (viewId === 'admin_logistics_overview') { /* ... same ... */ 
        container.appendChild(e('p', {className: 'text-slate-600'}, 'Oversee all logistics operations, track overall performance, and manage logistics teams/users.'));
        const table = e('table', {className: 'w-full table'});
        const thead = e('thead', {}, e('tr', {}, e('th', {}, 'Pickup ID'), e('th', {}, 'Order ID'), e('th', {}, 'Client'), e('th', {}, 'Lab'), e('th', {}, 'Status'), e('th', {}, 'Assigned To')));
        const tbody = e('tbody');
        mockData.pickups.forEach(p => {
            const row = e('tr');
            row.appendChild(e('td', {}, p.id));
            row.appendChild(e('td', {}, p.orderId));
            row.appendChild(e('td', {}, p.clientName));
            row.appendChild(e('td', {}, p.labName));
            row.appendChild(e('td', {}, renderStatusBadge(p.status)));
            row.appendChild(e('td', {}, p.pickupBy));
            tbody.appendChild(row);
        });
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(e('div', {className: 'overflow-x-auto card p-0'}, table));
    }
    else if (viewId === 'admin_manage_services_all' || viewId === 'admin_dispute_resolution') { /* ... same ... */ 
            container.appendChild(e('p', {className: 'text-slate-600'}, `This section for "${viewId.split('_')[1]}" is a placeholder. It would allow admins to manage all listed services or handle disputes.`));
        container.appendChild(e('div', {className: 'card h-64 flex items-center justify-center text-slate-400 text-lg'}, 'Feature Coming Soon'));
    }
    else {
        container.appendChild(e('p', {}, `Content for ${viewId} coming soon.`));
    }
    return container;
}

showRoleSelection(); 
