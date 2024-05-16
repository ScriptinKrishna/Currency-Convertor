document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "https://api.currencyapi.com/v3/latest?";
    const apiKey = "cur_live_vbONrPw6zgWGR4DzhBIzFkaq79kGnPUUbhutZujl";

    document.getElementById('get-rate').addEventListener('click', async () => {
        const amount = document.getElementById('amount').value;
        const fromCurrency = document.getElementById('from-currency').value;
        const toCurrency = document.getElementById('to-currency').value;

        try {
            const response = await fetch(`${baseUrl}apikey=${apiKey}&base_currency=${fromCurrency}&currencies=${toCurrency}`);
            const data = await response.json();

            if (data.data && data.data[toCurrency]) {
                const rate = data.data[toCurrency].value;
                const convertedAmount = (amount * rate).toFixed(2);
                document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                document.getElementById('result').innerText = "Error fetching exchange rate.";
            }
        } catch (error) {
            document.getElementById('result').innerText = "An error occurred. Please try again.";
        }
    });

    // Update flags based on selected currency
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');

    fromCurrencySelect.addEventListener('change', (edit) => {
        const flagUrl = `https://flagsapi.com/${countryList[edit.target.value]}/flat/64.png`;
        document.getElementById('from-flag').src = flagUrl;
    });

    toCurrencySelect.addEventListener('change', (edit) => {
        const flagUrl = `https://flagsapi.com/${countryList[edit.target.value]}/flat/64.png`;
        document.getElementById('to-flag').src = flagUrl;
    });
});
