// Add basic interactivity
const brightnessSlider = document.getElementById('brightness-slider');
const brightnessLabel = document.querySelector('label[for="brightness-slider"]');
const roomSelect = document.getElementById('room-select');
const saveButton = document.getElementById('save-settings');
const resetButton = document.getElementById('reset-settings');

brightnessSlider.addEventListener('input', () => {
    brightnessLabel.textContent = `${brightnessSlider.value}%`;
});

// Display a basic alert on save settings
saveButton.addEventListener('click', () => {
    alert(`Settings saved for ${roomSelect.value}!`);
});

// Reset all controls to default values
resetButton.addEventListener('click', () => {
    brightnessSlider.value = 50;
    brightnessLabel.textContent = '50%';
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
    });
    document.querySelectorAll('input[type="range"]').forEach((slider) => {
        slider.value = 50;
    });
    alert('Settings have been reset.');
});
