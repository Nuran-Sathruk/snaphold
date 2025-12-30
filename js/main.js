let texts = JSON.parse(localStorage.getItem('savedTexts')) || [];

function saveText() {
    const textInput = document.getElementById('newText');
    const text = textInput.value.trim();
    if (text) {
        const newText = {
            id: Date.now(),
            content: text,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
};

            texts.unshift(newText);
            localStorage.setItem('savedTexts', JSON.stringify(texts));
            textInput.value = '';
            displayTexts();
}

}

function deleteText(id) {
    texts = texts.filter(text => text.id !== id);
    localStorage.setItem('savedTexts', JSON.stringify(texts));
    displayTexts();
}

function displayTexts() {
    const container = document.getElementById('savedTexts');
    if (texts.length === 0) {
        container.innerHTML = `<div class="empty-state">SNAPHOLD: No saved texts yet. Start by typing something above!</div>`;
        return;
}

container.innerHTML = texts.map(text => `<div class="text-card">
<div class="text-content">${text.content}</div>
<div class="text-meta">
<span>Saved on ${text.date} at ${text.time}</span>
<button class="delete-button" onclick="deleteText(${text.id})">Delete</button>
</div>
</div>`).join('');

}

displayTexts();

document.getElementById('newText').addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        saveText();
}

});