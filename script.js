const apiKey = "b8820162c27b145086cbc258";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

let conversionRates = {};

// Fetch currency rates and populate dropdowns
async function loadCurrencies() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.result === "success") {
      conversionRates = data.conversion_rates;
      const currencyList = Object.keys(conversionRates);

      const fromSelect = document.getElementById("fromCurrency");
      const toSelect = document.getElementById("toCurrency");

      currencyList.forEach(code => {
        fromSelect.innerHTML += `<option value="${code}">${code}</option>`;
        toSelect.innerHTML += `<option value="${code}">${code}</option>`;
      });

      fromSelect.value = "USD";
      toSelect.value = "PKR";
    } else {
      alert("Error loading currencies!");
    }
  } catch (error) {
    alert("Failed to fetch exchange rates.");
    console.error(error);
  }
}

// Convert currency
function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;

  if (amount === "" || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  const usdAmount = amount / conversionRates[from]; 
  const converted = usdAmount * conversionRates[to];

  document.getElementById("result").innerText =
    `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}

// Initialize
loadCurrencies();

// ✅ Fix: button event listener
document.getElementById("convertBtn").addEventListener("click", convertCurrency);
