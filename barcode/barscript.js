document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const barcodeSizeSelect = document.getElementById('barcodeSize');
    const displayValueCheckbox = document.getElementById('displayValue');
    const generateButton = document.getElementById('generate-btn');
    const downloadButton = document.getElementById('download-btn');
    const barcodeContainer = document.getElementById('barcode-container');

    function generateBarcode() {
        const text = textInput.value.trim();
        const barcodeSize = barcodeSizeSelect.value;
        const displayValue = displayValueCheckbox.checked;

        // Clear previous barcode
        barcodeContainer.innerHTML = ''; 

        // Create a new canvas
        const canvas = document.createElement('canvas');
        barcodeContainer.appendChild(canvas);

        let height = 40; 
        if (barcodeSize === 'small') {
            height = 20;
        } else if (barcodeSize === 'large') {
            height = 60;
        } else if (barcodeSize == 'xtrlarge') {
            height = 100;
        }

        JsBarcode(canvas, text, {
            format: "CODE128",
            height: height,
            displayValue: displayValue, 
            textPosition: "bottom" 
        });

        generateButton.style.display = 'none';
        downloadButton.style.display = 'block';
    }

    function downloadBarcode() {
        const canvas = barcodeContainer.querySelector('canvas');
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'barcode.png';
        link.click();
    }

    generateButton.addEventListener('click', generateBarcode);
    downloadButton.addEventListener('click', downloadBarcode);
});
