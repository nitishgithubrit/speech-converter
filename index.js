let synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
    voices = synth.getVoices();
    let voiceSelect = document.getElementById('voices');
    voiceSelect.innerHTML = '';
    voices.forEach((voice, index) => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

function speak() {
    let text = document.getElementById('textToSpeak').value;
    let selectedVoiceName = document.getElementById('voices').selectedOptions[0].getAttribute('data-name');
    let utterance = new SpeechSynthesisUtterance(text);
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            utterance.voice = voice;
        }
    });
    synth.speak(utterance);
}
