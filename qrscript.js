document.addEventListener('DOMContentLoaded', function() {
    const qrSizeInput = document.getElementById('qr-size');
    const sizeValue = document.getElementById('size-value');
    const generateButton = document.getElementById('generate-btn');
    const downloadButton = document.getElementById('download-btn');
    const qrCodeContainer = document.getElementById('qr-code');
    const inputTypeSelect = document.getElementById('input-type');
    const inputContainer = document.getElementById('input-container');
    const qrVersionSelect = document.getElementById('qr-version');

    
    function adjustQRSizeLimits() {
        if (window.innerWidth <= 600) {
            qrSizeInput.min = 200;
            qrSizeInput.max = 350;
            if (qrSizeInput.value < 200) qrSizeInput.value = 200;
            if (qrSizeInput.value > 350) qrSizeInput.value = 350;
        } else {
            qrSizeInput.min = 100;
            qrSizeInput.max = 500;
        }
        sizeValue.textContent = qrSizeInput.value;
    }

    
    function limitWords(input, maxWords) {
        const words = input.trim().split(/\s+/);
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(' ');
        }
        return input;
    }

   
    function switchInputField() {
        const inputType = inputTypeSelect.value;
        inputContainer.innerHTML = ''; 

        if (inputType === 'text') {
            const textarea = document.createElement('textarea');
            textarea.id = 'input-value';
            textarea.placeholder = 'Enter Text here';
            inputContainer.appendChild(textarea);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'input-value';
            input.placeholder = 'Enter URL here';
            inputContainer.appendChild(input);
        }
    }

    // Function to generate QR code with selected version
    function generateQRCode() {
        const inputType = inputTypeSelect.value;
        const inputValue = document.getElementById('input-value').value;
        const qrSize = qrSizeInput.value;
        const version = parseInt(qrVersionSelect.value);

        if (inputValue.trim() === '') {
            alert('Please enter a ' + inputType);
            return;
        }

        
        const limitedInputValue = inputType === 'text' ? limitWords(inputValue, 1000) : inputValue;

       
        qrCodeContainer.innerHTML = '';

        // Generate new QR code with version
        new QRCode(qrCodeContainer, {
            text: limitedInputValue,
            width: parseInt(qrSize),
            height: parseInt(qrSize),
            version: version,
            correctLevel: QRCode.CorrectLevel.H 
        });

        
        generateButton.style.display = 'none';
        downloadButton.style.display = 'inline-block';
    }

    // Initial adjustment of QR size limits
    adjustQRSizeLimits();

    // Adjust QR size limits on window resize
    window.addEventListener('resize', adjustQRSizeLimits);

    // Update size value display when slider is adjusted
    qrSizeInput.addEventListener('input', function() {
        sizeValue.textContent = this.value;
    });

    
    inputTypeSelect.addEventListener('change', switchInputField);

    
    generateButton.addEventListener('click', generateQRCode);

    
    downloadButton.addEventListener('click', function() {
        const qrCanvas = document.querySelector('#qr-code canvas');
        const link = document.createElement('a');
        link.href = qrCanvas.toDataURL('image/png');
        link.download = 'qrcode.png';
        link.click();
    });

   
    switchInputField();
});
