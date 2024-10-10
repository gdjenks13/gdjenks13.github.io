function calculate() {
    let homePrice = parseFloat(document.getElementById('homePrice').value);
    let downPayment = parseFloat(document.getElementById('downPayment').value);
    let loanAmount = homePrice - downPayment;
    let monthlyInterest = (parseFloat(document.getElementById('interestRate').value) / 100) / 12;
    let propertyTaxRate = parseFloat(document.getElementById('propertyTax').value) / 100;
    let loanTerm = parseInt(document.getElementById('loanTerm').value) * 12;
    let homeInsuranceRate = parseFloat(document.getElementById('homeInsurance').value) / 100;
    let pmi = loanAmount * (parseFloat(document.getElementById('pmi').value) / 100);
    let appreciationRate = parseFloat(document.getElementById('appreciation').value) / 100;
    
    let monthlyPayment = loanAmount 
                            * (monthlyInterest * Math.pow(1 + monthlyInterest, loanTerm)) 
                            / (Math.pow(1 + monthlyInterest, loanTerm) - 1);
    let propertyTax = homePrice * propertyTaxRate;
    let homeInsurance = homePrice * homeInsuranceRate;

    let results = `<p>Mortgage Payment: $${monthlyPayment.toFixed(2)}</p><br><table><tr><th>Month</th><th>Mortgage Payment</th><th>Property Tax</th><th>Home Insurance</th><th>Total Cost</th></tr>`;
    let totalMortgageCost = 0;
    let remainingLoanAmount = 0;

    for (let month = 1; month <= loanTerm; month++) {
        let totalMonthlyCost = monthlyPayment + (propertyTax / 12) + (homeInsurance / 12);
        totalMortgageCost += totalMonthlyCost;

        results += `<tr>
                        <td>${month}</td>
                        <td>$${monthlyPayment.toFixed(2)}</td>
                        <td>$${(propertyTax / 12).toFixed(2)}</td>
                        <td>$${(homeInsurance / 12).toFixed(2)}</td>
                        <td>$${totalMonthlyCost.toFixed(2)}</td>
                    </tr>`;
        
        homePrice += homePrice * (appreciationRate / 12);
        propertyTax = homePrice * propertyTaxRate;
        homeInsurance = homePrice * homeInsuranceRate;
    }

    results += `</table><br>
                <strong>Total Mortgage Cost:</strong> $${totalMortgageCost.toFixed(2)}<br>
                <strong>Final Home Value:</strong> $${homePrice.toFixed(2)}`;
    
    document.getElementById('results').innerHTML = results;
}