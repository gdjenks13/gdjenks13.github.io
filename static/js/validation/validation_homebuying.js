document.getElementById('homePrice').addEventListener('input', function() {
    const homePriceInput = document.getElementById('homePrice');
    const errorElement = document.getElementById('homePriceError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^\d+(\.\d{0,2})?$/;

    if (pattern.test(homePriceInput.value) || homePriceInput.value === '') {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});

document.getElementById('downPayment').addEventListener('input', function() {
    const homePriceInput = document.getElementById('homePrice').value;
    const downPaymentInput = document.getElementById('downPayment').value;
    const errorElement = document.getElementById('downPaymentError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^\d+(\.\d{0,2})?$/;

    if (pattern.test(downPaymentInput) && downPaymentInput !== '' && parseFloat(downPaymentInput) <= parseFloat(homePriceInput)) {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});

document.getElementById('interestRate').addEventListener('input', function() {
    const interestRateInput = document.getElementById('interestRate').value;
    const errorElement = document.getElementById('interestRateError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^(100(\.0*)?|(\d{1,2})(\.\d*)?)$/;

    if (pattern.test(interestRateInput) && interestRateInput !== '') {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});

document.getElementById('propertyTax').addEventListener('input', function() {
    const propertyTaxInput = document.getElementById('propertyTax').value;
    const errorElement = document.getElementById('propertyTaxError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^(100(\.0*)?|(\d{1,2})(\.\d*)?)$/;

    if (pattern.test(propertyTaxInput) && propertyTaxInput !== '') {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});

document.getElementById('homeInsurance').addEventListener('input', function() {
    const homeInsuranceInput = document.getElementById('homeInsurance').value;
    const errorElement = document.getElementById('homeInsuranceError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^(100(\.0*)?|(\d{1,2})(\.\d*)?)$/;

    if (pattern.test(homeInsuranceInput) && homeInsuranceInput !== '') {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});

document.getElementById('pmi').addEventListener('input', function() {
    const pmiInput = document.getElementById('pmi').value;
    const errorElement = document.getElementById('pmiError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^(100(\.0*)?|(\d{1,2})(\.\d*)?)$/;

    if (pattern.test(pmiInput) && pmiInput !== '') {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});

document.getElementById('appreciation').addEventListener('input', function() {
    const appreciationInput = document.getElementById('appreciation').value;
    const errorElement = document.getElementById('appreciationError');
    const calculateButton = document.getElementById('calculateButton');
    
    const pattern = /^(100(\.0*)?|(\d{1,2})(\.\d*)?)$/;

    if (pattern.test(appreciationInput) && appreciationInput !== '') {
        errorElement.style.display = 'none';
        calculateButton.disabled = false;
    } else {
        errorElement.style.display = 'block';
        calculateButton.disabled = true;
    }
});
