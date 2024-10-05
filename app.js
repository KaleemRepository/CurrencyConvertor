// const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
//The above URL is nor work, due to some issue.

const anotherURL =
  "https://v6.exchangerate-api.com/v6/be1c24288127b83ad9e19da5/latest/USD"; //This is the Exchange API.

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


window.addEventListener("load", async () => {
  updateExchaneRate();
});

for (let select of dropdowns) {
  // console.log(select);
  for (let currCode in countryList) {
    let newOption = document.createElement("option"); //here the create the new tag.
    newOption.innerText = currCode; //here we set the inner text of the option tag.
    newOption.value = currCode; //here we set the value of the innertext. i-e <option value="PKR">PKR</option>

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "PKR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); //event.target basically returns a select tag, and it passes throrgh the updateFlag.
    //evt.target is the <select> element that triggered the change event.
  });
} //End of outer for loop.

const updateFlag = (element) => {
  let currCode = element.value;
  //   console.log(currCode);
  let countyCode = countryList[currCode];

  let newSrc = `https://flagsapi.com/${countyCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img"); //element is select, and his parent is select-container and we want access the img and change it's url dynamically.
  img.src = newSrc;
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  //  console.log(evt);
  updateExchaneRate();
});



const updateExchaneRate = async () => {
  let amount = document.querySelector(".amount  input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amount.value = "1";
    amtVal = 1;
  }

  // console.log(amtVal);

  let response = await fetch(anotherURL);
  let data = await response.json();

  let conversionRates = data.conversion_rates;

  // Get the rate for the selected currencies.
  let fromCurrencyRate = conversionRates[fromCurr.value];
  let toCurrencyRate = conversionRates[toCurr.value];

  // let rate = conversionRates[toCurr.value];
  //  console.log(rate);

  // let finalAmount = rate * amtVal;//amount in text field.
  let finalAmount = (amtVal * toCurrencyRate) / fromCurrencyRate;
  msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmount.toFixed(2)}${
    toCurr.value
  }`;

  // console.log(fromCurr.value, toCurr.value);
};
