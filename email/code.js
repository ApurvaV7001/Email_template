function submitTemplate() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const footer = document.getElementById('footer').value;
    const imageFile = document.getElementById('image').files[0];

    const emailObject = { title, content, footer };

    // Display preview
    document.getElementById('preview').innerHTML = `
        <h2>Preview</h2>
        <div style="border: 1px solid #ddd; padding: 15px;">
            <h1>${emailObject.title}</h1>
            <p>${emailObject.content}</p>
            <img id="previewImage" style="max-width: 100%;" />
            <p>${emailObject.footer}</p>
        </div>
    `;

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    }

    // Send emailObject and image to backend
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('footer', footer);
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch('/uploadEmailConfig', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server Response:', data);
        alert('Email Template Submitted Successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Submission failed!');
    });
}