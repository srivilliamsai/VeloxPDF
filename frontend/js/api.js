const API_BASE_URL = 'http://localhost:8080/api/pdf';

async function processPdf(toolId, files, params = {}) {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    // Append params
    Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
    });

    try {
        const response = await fetch(`${API_BASE_URL}/${toolId}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Get filename from header or default
        const disposition = response.headers.get('Content-Disposition');
        let filename = 'processed.pdf';
        if (disposition && disposition.indexOf('filename=') !== -1) {
            filename = disposition.split('filename=')[1].replace(/"/g, '');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        return true;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
