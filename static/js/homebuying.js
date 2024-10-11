let displayByYear = false;
let tableVisible = true;

function calculate() {
    // let rentPrice = parseFloat(document.getElementById('rentPrice').value)
    // let rentInsurance = parseFloat(document.getElementById('rentInsurance').value / 100);
    // let rentTime = parseFloat(document.getElementById('rentTime').value);
    let homePurchasePrice = parseFloat(document.getElementById('homePrice').value);
    let homeCurrentValue = homePurchasePrice;
    let downPayment = parseFloat(document.getElementById('downPayment').value);
    let homePricePaid = 0;
    let loanAmount = homePurchasePrice - downPayment;
    let monthlyInterestRate = (parseFloat(document.getElementById('interestRate').value) / 100) / 12;
    let propertyTaxRate = parseFloat(document.getElementById('propertyTax').value) / 100;
    let loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
    let homeInsuranceRate = parseFloat(document.getElementById('homeInsurance').value) / 100;
    let pmiRate = parseFloat(document.getElementById('pmi').value) / 100;
    let pmiPresentAtStart = (downPayment / homePurchasePrice) < 0.2;
    let appreciationRate = 1 + parseFloat(document.getElementById('appreciation').value) / 100;

    let monthlyPayment = loanAmount
        * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTerm))
        / (Math.pow(1 + monthlyInterestRate, loanTerm) - 1);
    let formattedMonthlyPayment = formatValue(monthlyPayment);

    let yearlyPmi = homePurchasePrice * pmiRate;
    let yearlyPropertyTax = homePurchasePrice * propertyTaxRate;
    let yearlyHomeInsurance = homePurchasePrice * homeInsuranceRate;

    let remainingMortgage = loanAmount;
    let totalMortgageCost = 0;

    let amortizationTable = `<h2>${displayByYear ? 'Yearly Amortization' : 'Monthly Amortization'}</h2><table><tr><th>${displayByYear ? 'Year' : 'Month'}</th><th>${displayByYear ? 'Monthly Payments' : 'Monthly Payment'}</th>${pmiPresentAtStart ? '<th>PMI</th>' : ''}<th>Property Tax</th><th>Home Insurance</th><th>Total Cost</th><th>Remaining Balance</th></tr>`;

    if (displayByYear) {
        let adjustedYearlyPmi = yearlyPmi;
        let pmiPresentNow = pmiPresentAtStart;
        for (let year = 1; year <= loanTerm / 12; year++) {
            for (let i = 0; i < 12; i++) {
                remainingMortgage -= monthlyPayment - remainingMortgage * monthlyInterestRate;

                if (pmiPresentNow && adjustedYearlyPmi === yearlyPmi && (remainingMortgage / homePurchasePrice <= 0.8)) {
                    adjustedYearlyPmi = yearlyPmi * (i / 12);
                }
            }

            let totalYearlyCost = monthlyPayment * 12 + yearlyPropertyTax + yearlyHomeInsurance;
            totalMortgageCost += totalYearlyCost;

            amortizationTable += `<tr>
                            <td>${year}</td>
                            <td>${formatValue(monthlyPayment * 12)}</td>
                            ${pmiPresentAtStart 
                                ? (pmiPresentNow 
                                    ? `<td>${adjustedYearlyPmi === yearlyPmi 
                                        ? formatValue(yearlyPmi) 
                                        : formatValue(adjustedYearlyPmi)}</td>` 
                                    : `<td>${formatValue(0)}</td>`) 
                                : ''}
                            <td>${formatValue(yearlyPropertyTax)}</td>
                            <td>${formatValue(yearlyHomeInsurance)}</td>
                            <td>${formatValue(totalYearlyCost)}</td>
                            <td>${formatValue(remainingMortgage)}</td>
                        </tr>`;

            yearlyPropertyTax *= appreciationRate;
            yearlyHomeInsurance *= appreciationRate;
            homeCurrentValue *= appreciationRate;

            if (adjustedYearlyPmi !== yearlyPmi) {
                pmiPresentNow = false;
            }
        }

    } else {
        for (let month = 1; month <= loanTerm; month++) {
            homePricePaid = monthlyPayment - remainingMortgage * monthlyInterestRate;
            remainingMortgage -= homePricePaid;
            pmiPresentNow = remainingMortgage / homePurchasePrice > 0.8;

            let totalMonthlyCost = monthlyPayment + yearlyPropertyTax / 12 + yearlyHomeInsurance / 12 + (pmiPresentNow ? yearlyPmi / 12 : 0);
            totalMortgageCost += totalMonthlyCost;
            
            amortizationTable += `<tr>
                            <td>${month}</td>
                            <td>${formattedMonthlyPayment}</td>
                            ${pmiPresentAtStart 
                                ? `<td>${pmiPresentNow 
                                    ? formatValue(yearlyPmi / 12) 
                                    : formatValue(0)}</td>` 
                                : ''}
                            <td>${formatValue(yearlyPropertyTax / 12)}</td>
                            <td>${formatValue(yearlyHomeInsurance / 12)}</td>
                            <td>${formatValue(totalMonthlyCost)}</td>
                            <td>${formatValue(remainingMortgage)}</td>
                        </tr>`;
            if (month % 12 === 0) {
                yearlyPropertyTax *= appreciationRate;
                yearlyHomeInsurance *= appreciationRate;
                homeCurrentValue *= appreciationRate;
            }
        }
    }

    amortizationTable += `</table><br>`;
    let results = `<h2>Results</h2>
                    Mortgage Payment: <strong>${formattedMonthlyPayment}</strong><br>
                    Total Mortgage Cost: <strong>${formatValue(monthlyPayment * loanTerm)}</strong><br>
                    Total Costs: <strong>${formatValue(totalMortgageCost)}</strong><br>
                    Final Home Value: <strong>${formatValue(homeCurrentValue)}</strong>`;

    document.getElementById('results').innerHTML = results;
    document.getElementById('amortizationTable').innerHTML = amortizationTable;

    let toggleDisplayByYearOrMonth = document.getElementById('toggleDisplayByYearOrMonthButton');
    toggleDisplayByYearOrMonth.style.display = 'inline-block';
    toggleDisplayByYearOrMonth.innerText = displayByYear ? 'Show Monthly' : 'Show Yearly';

    let table = document.getElementById('amortizationTable');
    if (!tableVisible) {
        table.style.display = 'none';
    }
}

function formatValue(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}


function toggleTableVisibility() {
    let table = document.getElementById('amortizationTable');
    let toggleAmortizationTableButton = document.getElementById('toggleAmortizationTableButton');

    tableVisible = !tableVisible;

    if (tableVisible) {
        table.style.display = 'block';
        toggleAmortizationTableButton.innerText = 'Hide Table';
    } else {
        table.style.display = 'none';
        toggleAmortizationTableButton.innerText = 'Show Table';
    }
}

function toggleYearlyMonthly() {
    displayByYear = !displayByYear;
    calculate();
}