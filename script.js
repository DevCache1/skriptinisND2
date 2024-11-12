const brightnessSlider = document.getElementById('brightness-slider');
const brightnessLabel = document.querySelector('label[for="brightness-slider"]');
const roomButtons = document.querySelectorAll('.room-button');
const resetButton = document.getElementById('reset-settings');
const resetAllButton = document.getElementById('reset-all-settings');
const colorPicker = document.getElementById('color-picker');
const lightSwitches = document.querySelectorAll('input[type="checkbox"]');

let currentRoom = "Living Room";

function saveSettings(room) {
    const switchesState = Array.from(lightSwitches).map((switchElement) => switchElement.checked);

    const settings = {
        brightness: brightnessSlider.value,
        color: colorPicker.value,
        switches: switchesState,
    };

    localStorage.setItem(`settings-${room}`, JSON.stringify(settings));
}

function loadSettings(room) {
    const settings = JSON.parse(localStorage.getItem(`settings-${room}`));

    if (settings) {
        brightnessSlider.value = settings.brightness || 50;
        brightnessLabel.textContent = `${brightnessSlider.value}%`;
        colorPicker.value = settings.color || "#ffffff";

        lightSwitches.forEach((switchElement, index) => {
            switchElement.checked = settings.switches[index] || false;
        });
    } else {
        resetSettings();
    }
}

function resetSettings() {
    brightnessSlider.value = 50;
    brightnessLabel.textContent = '50%';
    colorPicker.value = "#ffffff";
    lightSwitches.forEach((switchElement) => {
        switchElement.checked = false;
    });
}

function resetAllRoomSettings() {
    const roomNames = ["Living Room", "Kitchen", "Bedroom", "Bathroom"];
    roomNames.forEach(room => {
        localStorage.removeItem(`settings-${room}`);
    });
    resetSettings();
}

brightnessSlider.addEventListener('input', () => {
    brightnessLabel.textContent = `${brightnessSlider.value}%`;
    saveSettings(currentRoom);
});

resetButton.addEventListener('click', () => {
    resetSettings();
    saveSettings(currentRoom);
});

resetAllButton.addEventListener('click', resetAllRoomSettings);

roomButtons.forEach(button => {
    button.addEventListener('click', () => {
        saveSettings(currentRoom);

        currentRoom = button.getAttribute('data-room');
        roomButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        loadSettings(currentRoom);
    });
});

lightSwitches.forEach(switchElement => {
    switchElement.addEventListener('change', () => {
        saveSettings(currentRoom);
    });
});

colorPicker.addEventListener('input', () => {
    saveSettings(currentRoom);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector(`[data-room="${currentRoom}"]`).classList.add('active');
    loadSettings(currentRoom);
});
