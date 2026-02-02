// Features Data (Single Verification of Truth)
const FEATURES = [
    // Organize
    {
        id: 'merge',
        category: 'organize',
        title: 'Merge PDF',
        description: 'Combine multiple PDFs into one unified document.',
        icon: 'layers',
        color: 'bg-blue-600',
        inputs: [],
        accept: '.pdf',
        multiple: true
    },
    {
        id: 'split',
        category: 'organize',
        title: 'Split PDF',
        description: 'Extract pages from your PDF files.',
        icon: 'scissors',
        color: 'bg-orange-500',
        inputs: [{ name: 'range', label: 'Page Range (e.g. 1-5)', placeholder: '1-5' }],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'remove-pages',
        category: 'organize',
        title: 'Remove Pages',
        description: 'Delete specific pages from your document.',
        icon: 'trash-2',
        color: 'bg-red-500',
        inputs: [{ name: 'pages', label: 'Page Numbers (comma separated)', placeholder: '1, 3, 5' }],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'compress',
        category: 'organize',
        title: 'Compress PDF',
        description: 'Reduce file size while maintaining quality.',
        icon: 'minimize-2',
        color: 'bg-green-600',
        inputs: [],
        accept: '.pdf',
        multiple: false
    },

    // Convert TO PDF
    {
        id: 'img-to-pdf',
        category: 'convert-to',
        title: 'Image to PDF',
        description: 'Convert JPG or PNG images to PDF documents.',
        icon: 'image',
        color: 'bg-purple-600',
        inputs: [],
        accept: 'image/*',
        multiple: true
    },
    {
        id: 'word-to-pdf',
        category: 'convert-to',
        title: 'Word to PDF',
        description: 'Convert DOCX files to PDF.',
        icon: 'file-text',
        color: 'bg-indigo-600',
        inputs: [],
        accept: '.docx',
        multiple: false
    },
    {
        id: 'excel-to-pdf',
        category: 'convert-to',
        title: 'Excel to PDF',
        description: 'Convert Excel spreadsheets to PDF.',
        icon: 'file-spreadsheet',
        color: 'bg-emerald-600',
        inputs: [],
        accept: '.xlsx, .xls',
        multiple: false
    },
    {
        id: 'ppt-to-pdf',
        category: 'convert-to',
        title: 'PowerPoint to PDF',
        description: 'Convert PPT presentations to PDF.',
        icon: 'presentation',
        color: 'bg-orange-600',
        inputs: [],
        accept: '.pptx, .ppt',
        multiple: false
    },
    {
        id: 'html-to-pdf',
        category: 'convert-to',
        title: 'HTML to PDF',
        description: 'Convert HTML files to PDF documents.',
        icon: 'file-code',
        color: 'bg-pink-500',
        inputs: [],
        accept: '.html, .htm',
        multiple: false
    },

    // Convert FROM PDF
    {
        id: 'pdf-to-jpg',
        category: 'convert-from',
        title: 'PDF to JPG',
        description: 'Extract pages as high-quality images.',
        icon: 'file-archive',
        color: 'bg-yellow-500',
        inputs: [],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'pdf-to-word',
        category: 'convert-from',
        title: 'PDF to Word',
        description: 'Convert PDF to editable Word document.',
        icon: 'file-text',
        color: 'bg-blue-700',
        inputs: [],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'pdf-to-excel',
        category: 'convert-from',
        title: 'PDF to Excel',
        description: 'Convert PDF tables to Excel spreadsheets.',
        icon: 'file-spreadsheet',
        color: 'bg-emerald-700',
        inputs: [],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'pdf-to-ppt',
        category: 'convert-from',
        title: 'PDF to PowerPoint',
        description: 'Convert PDF to PowerPoint presentation.',
        icon: 'presentation',
        color: 'bg-orange-700',
        inputs: [],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'pdf-to-pdfa',
        category: 'convert-from',
        title: 'PDF to PDF/A',
        description: 'Convert to PDF/A for archiving.',
        icon: 'file-type',
        color: 'bg-slate-600',
        inputs: [],
        accept: '.pdf',
        multiple: false
    },

    // Security
    {
        id: 'watermark',
        category: 'security',
        title: 'Watermark',
        description: 'Stamp text over your PDF pages.',
        icon: 'stamp',
        color: 'bg-teal-600',
        inputs: [{ name: 'text', label: 'Watermark Text', placeholder: 'CONFIDENTIAL' }],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'protect',
        category: 'security',
        title: 'Protect PDF',
        description: 'Encrypt your PDF with a password.',
        icon: 'shield',
        color: 'bg-slate-800',
        inputs: [{ name: 'password', label: 'Set Password', type: 'password', placeholder: 'Enter strong password' }],
        accept: '.pdf',
        multiple: false
    },
    {
        id: 'unlock',
        category: 'security',
        title: 'Unlock PDF',
        description: 'Remove password security from PDF.',
        icon: 'unlock',
        color: 'bg-pink-600',
        inputs: [{ name: 'password', label: 'Enter Password', type: 'password', placeholder: 'Enter current password' }],
        accept: '.pdf',
        multiple: false
    },

    // OCR
    {
        id: 'ocr',
        category: 'convert-from',
        title: 'OCR PDF',
        description: 'Extract text from scanned documents.',
        icon: 'scan-text',
        color: 'bg-emerald-600',
        inputs: [],
        accept: '.pdf',
        multiple: false
    }
];

// Utility: Render Icons
function renderIcons() {
    lucide.createIcons();
}

// Logic: Determine page type
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // Navbar Logic
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile menu toggle'); // Simplified for vanilla
        });
    }

    if (path.includes('upload.html')) {
        initSmartUpload();
    } else if (path.includes('tool.html')) {
        initToolPage();
    } else {
        initHome();
    }

    renderIcons();
});

// --- Home Page Logic ---
function initHome() {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;

    // Filter logic (simple query param check if needed, else show all)
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat') || 'all';

    const filtered = category === 'all'
        ? FEATURES
        : FEATURES.filter(f => f.category === category || (category === 'convert-to' && f.category === 'convert-from'));

    // Update Title
    const titleEl = document.getElementById('section-title');
    if (titleEl && category !== 'all') {
        titleEl.textContent = category === 'organize' ? 'Organize Tools' : 'Convert Tools';
        titleEl.classList.remove('hidden');
    }

    grid.innerHTML = filtered.map(f => `
        <a href="tool.html?id=${f.id}" class="card">
            <div class="card-icon ${f.color.replace('bg-', 'bg-')}">
                <i data-lucide="${f.icon}"></i>
            </div>
            <h3 class="card-title">${f.title}</h3>
            <p class="card-desc">${f.description}</p>
        </a>
    `).join('');
}

// --- Smart Upload Logic ---
function initSmartUpload() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        handleSmartFiles(e.target.files);
    });
}

function handleSmartFiles(files) {
    if (files.length === 0) return;
    const file = files[0];

    // Simple storage to pass to next page (localStorage or just logic here)
    // For Vanilla, let's suggest tools dynamically on this page

    const name = file.name.toLowerCase();
    let suggestions = [];

    if (name.endsWith('.pdf')) {
        suggestions = FEATURES.filter(f => f.accept.includes('.pdf'));
    } else if (name.match(/\.(jpg|png|jpeg)$/)) {
        suggestions = FEATURES.filter(f => f.id === 'img-to-pdf');
    } else if (name.endsWith('.docx')) {
        suggestions = FEATURES.filter(f => f.id === 'word-to-pdf');
    }

    const results = document.getElementById('upload-results');
    results.classList.remove('hidden');
    document.getElementById('filename-display').textContent = file.name;

    const grid = document.getElementById('suggestion-grid');
    grid.innerHTML = suggestions.map(f => `
        <div onclick="goToTool('${f.id}')" class="card">
            <div class="card-icon ${f.color}" style="background-color: var(--primary-color)">
                 <i data-lucide="${f.icon}"></i>
            </div>
            <div>
                <h3 class="card-title">${f.title}</h3>
                <p class="card-desc">${f.description}</p>
            </div>
        </div>
    `).join('');

    renderIcons();

    // Store file in memory/sessionStorage? 
    // Passing file objects between pages in pure HTML/JS is hard without SPA.
    // Workaround: We will just navigate to tool.html and ask user to upload again OR 
    // use a Single Page approach for simplicity?
    // Let's stick to "Show Suggestions" -> Click -> Go to tool. 
    // User checks "Smart Upload" as "Discovery", then re-uploads in tool.
    // Or we keep the file in a global variable if we combined everything into one index.html, 
    // but we split files.
}

function goToTool(id) {
    window.location.href = `tool.html?id=${id}`;
}

// --- Tool Page Logic ---
let currentFiles = [];

function initToolPage() {
    const params = new URLSearchParams(window.location.search);
    const toolId = params.get('id');
    const tool = FEATURES.find(f => f.id === toolId);

    if (!tool) {
        window.location.href = 'index.html';
        return;
    }

    // Render Header
    document.getElementById('tool-title').textContent = tool.title;
    document.getElementById('tool-desc').textContent = tool.description;

    // Inputs
    const inputsContainer = document.getElementById('tool-inputs');
    if (tool.inputs.length > 0) {
        inputsContainer.innerHTML = tool.inputs.map(input => `
            <div class="input-group">
                <label>${input.label}</label>
                <input type="${input.type || 'text'}" id="input-${input.name}" class="input-field" placeholder="${input.placeholder || ''}">
            </div>
        `).join('');
    }

    // Config Uploader
    const fileInput = document.getElementById('tool-file-input');
    fileInput.accept = tool.accept;
    fileInput.multiple = tool.multiple;

    document.getElementById('tool-drop-zone').addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        currentFiles = Array.from(e.target.files);
        document.getElementById('file-count').textContent = `${currentFiles.length} file(s) selected`;
        document.getElementById('process-btn').disabled = false;
        document.getElementById('process-btn').classList.remove('opacity-50');
    });

    // Process
    document.getElementById('process-btn').addEventListener('click', async () => {
        const btn = document.getElementById('process-btn');
        const status = document.getElementById('status-msg');

        btn.disabled = true;
        btn.textContent = 'Processing...';

        try {
            // Collect params
            const params = {};
            tool.inputs.forEach(input => {
                params[input.name] = document.getElementById(`input-${input.name}`).value;
            });

            await processPdf(tool.id, currentFiles, params);

            status.textContent = 'Success! File downloaded.';
            status.style.color = 'green';
        } catch (e) {
            status.textContent = 'Error processing request.';
            status.style.color = 'red';
        } finally {
            btn.disabled = false;
            btn.textContent = 'Process Files';
        }
    });
}

// Language Selector Logic
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    const langPopup = document.getElementById('langPopup');

    if (langBtn && langPopup) {
        // Toggle popup
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langPopup.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langPopup.contains(e.target)) {
                langPopup.classList.remove('active');
            }
        });

        // Selection logic (visual only for now)
        const langItems = langPopup.querySelectorAll('.lang-item');
        langItems.forEach(item => {
            item.addEventListener('click', () => {
                langItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                // Update button text
                const langName = item.textContent.trim();
                langBtn.innerHTML = `<i data-lucide="globe" width="16"></i> ${langName} <i data-lucide="chevron-down" width="16"></i>`;
                lucide.createIcons();

                langPopup.classList.remove('active');
            });
        });
    }
});

/* FAQ Accordion Logic */
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq-container');
    
    if (faqContainer) {
        faqContainer.addEventListener('click', (e) => {
            const questionBtn = e.target.closest('.faq-question');
            
            if (questionBtn) {
                const item = questionBtn.parentElement;
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('active');
                
                // Close all other items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    }
});
