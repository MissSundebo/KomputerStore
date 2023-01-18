const getBankButtonElement = document.getElementById('bankButton');
const getWorkButtonElement = document.getElementById('workButton');
const getGetALoanButtonElement = document.getElementById('getALoanButton');
const getBuyButtonElement = document.getElementById('buyButton');
const productsElement = document.getElementById('products');
const featuresElement = document.getElementById('features');
const workBalanceElement = document.getElementById('workBalance');
const bankBalanceElement = document.getElementById('bankBalance');
const loanBalanceElement = document.getElementById('loanBalance');
const buyButtonElement = document.getElementById('buyButton');
const acceptedElement = document.getElementById('accepted');
const getRepayLoanButtonElement = document.getElementById('repayLoanButton');
const laptopImageElement = document.getElementById('laptopImage');
const laptopTitleElement = document.getElementById('laptopTitle');
const laptopDescriptionElement = document.getElementById('laptopDescription');
const laptopPriceElement = document.getElementById('laptopPrice');
const laptopPriceElementValue = document.getElementById('laptopPriceValue');

const nf = new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' });

let products = [];
let hasLoan = false;

workBalanceElement.innerText = 0;
bankBalanceElement.innerText = 0;
loanBalanceElement.innerText = 0;

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => products = data)
    .then(products => addProductsToCart(products));

const addProductsToCart = (products) => {
    products.forEach(product => addProductToCart(product));
}

const addProductToCart = (product) => {
    const productElement = document.createElement('option');
    productElement.value = product.id;
    productElement.appendChild(document.createTextNode(product.title));
    productsElement.appendChild(productElement);
}

const updateFeaturesList = (event) => {
    const selectedProduct = products[event.target.selectedIndex];
    featuresElement.innerHTML = '';

    for (let i = 0; i < selectedProduct.specs.length; i++) {
        const featureElement = document.createElement('li');
        featureElement.appendChild(document.createTextNode(selectedProduct.specs[i]));
        featuresElement.appendChild(featureElement);
    }
 }

 const updateLaptopImage = (event) => {
    const selectedProduct = products[event.target.selectedIndex];   
    laptopImageElement.src = "https://hickory-quilled-actress.glitch.me/" + selectedProduct.image;
 }

 const updateLaptopTitle = (event) => {
    const selectedProduct = products[event.target.selectedIndex];   
    laptopTitleElement.innerText = selectedProduct.title;
 }

 const updateLaptopDescription = (event) => {
    const selectedProduct = products[event.target.selectedIndex];
    laptopDescriptionElement.innerText = selectedProduct.description;
 }

 const updateLaptopPrice = (event) => {
    const selectedProduct = products[event.target.selectedIndex];
    laptopPriceElementValue.innerText = selectedProduct.price;
    laptopPriceElement.innerText = nf.format(selectedProduct.price);
 }

 const resetAcceptMessage = (event) => {
    acceptedElement.innerText = '';
 }

 productsElement.addEventListener('change', updateFeaturesList);

 productsElement.addEventListener('change', updateLaptopImage);
 productsElement.addEventListener('change', updateLaptopTitle);
 productsElement.addEventListener('change', updateLaptopDescription);
 productsElement.addEventListener('change', updateLaptopPrice);
 productsElement.addEventListener('change', resetAcceptMessage);
 

const sendMoneyToBank = () => {
    deposit(Number(workBalanceElement.innerText));
    workBalanceElement.innerText = 0;
}


const getMoney = () => {
    workBalanceElement.innerText = Number(workBalanceElement.innerText) + 100;
}

const getALoanInBank = () => {
    let requestedLoan = Number(prompt("How much money would you like to borrow?"));
    if(hasLoan){

    }
    else{
        if(requestedLoan <= Number(bankBalance.innerText * 2)){
            bankBalanceElement.innerText = Number(bankBalanceElement.innerText) + requestedLoan;
            loanBalanceElement.innerText = requestedLoan;
            hasLoan = true;
            getRepayLoanButtonElement.classList.remove('hidden');
        }
    }
}

const deposit = (amount) => {
    if(hasLoan) {
        let loanAmount = Number(loanBalanceElement.innerText);
        let downPayment = amount * 0.1;
        let remainder = 0;

        if (loanAmount <= downPayment){
            loanBalanceElement.innerText = 0;
            remainder = downPayment - loanAmount;
            hasLoan = false;
            getRepayLoanButtonElement.classList.add('hidden');
        }
        else {
            loanBalanceElement.innerText = loanAmount - downPayment;
        }

        bankBalanceElement.innerText = Number(bankBalanceElement.innerText) + amount * 0.9 + remainder;
    }
    else{
        bankBalanceElement.innerText = Number(bankBalanceElement.innerText) + amount;
    }
}

const repayLoan = () => {
    if(hasLoan) {
        let payAmount = Number(workBalanceElement.innerText)
        let loanAmount = Number(loanBalanceElement.innerText);

        if (loanAmount <= payAmount){
            loanBalanceElement.innerText = 0;
            let remainder = payAmount - loanAmount;
            bankBalanceElement.innerText = Number(bankBalanceElement.innerText) + remainder;
            hasLoan = false;
            getRepayLoanButtonElement.classList.add('hidden');
        }
        else {
            loanBalanceElement.innerText = loanAmount - payAmount;
        }

        workBalanceElement.innerText = 0;
    }
}

const withdraw = (amount, loanStatus) => {}

const buyProduct = () => {
    let laptopPrice = Number(laptopPriceElementValue.innerHTML); // Price is hidden so we use innerHTML here
    let bankBalance = Number(bankBalanceElement.innerText);
    
    if(laptopPrice <= bankBalance){

        bankBalanceElement.innerText = bankBalance - laptopPrice;
        acceptedElement.innerText = "Congratulations! You are now the owner of a new laptop!";
    }
    else {
        acceptedElement.innerText = "Sorry, you can't afford this laptop";
    }
}

getBankButtonElement.addEventListener('click', function() {
    sendMoneyToBank(); 
 });
 
 getWorkButtonElement.addEventListener("click", function(){
    getMoney();
 });
 
 getRepayLoanButtonElement.addEventListener("click", function(){
    repayLoan();
 });
 
 getGetALoanButtonElement.addEventListener("click", function(){
    getALoanInBank();
 });
 
 getBuyButtonElement.addEventListener("click", function(){
    buyProduct();
 });