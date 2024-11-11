// Check if the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window) || !('speechSynthesis' in window)) {
    alert('Sorry, your browser does not fully support Speech Recognition or Speech Synthesis.');
} else {
    // Initialize the Speech Recognition object
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const speakBtn = document.getElementById('speak-btn');
    const textOutput = document.getElementById('text-output');
    const textInput = document.getElementById('text-input');
    const status = document.getElementById('status');

    // Speech Recognition Event Listeners
    startBtn.addEventListener('click', () => {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        status.textContent = 'Listening...';
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        status.textContent = 'Stopped Listening.';
    });

    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        textOutput.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        status.textContent = 'Error: ' + event.error;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onend = () => {
        status.textContent = 'Recognition Ended.';
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    // Text-to-Speech Functionality
    speakBtn.addEventListener('click', () => {
        const textToSpeak = textInput.value.trim();
        if (textToSpeak) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'en-US'; // Set language
            utterance.pitch = 1;      // Set pitch (0.1 to 2)
            utterance.rate = 1;       // Set speed (0.1 to 10)
            utterance.volume = 1;     // Set volume (0 to 1)

            window.speechSynthesis.speak(utterance);
            status.textContent = 'Speaking...';
            
            utterance.onend = () => {
                status.textContent = 'Speech Completed.';
            };
        } else {
            alert('Please enter some text to speak.');
        }
    });
}
