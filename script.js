const budgetInput = document.querySelector(".budget-value");
const budgetNumber =document.querySelector(".budget-number");
const budgetAddBtn = document.querySelector(".budget-add-btn");
const budgetContainer = document.querySelector(".budget-input");
const productAddBtn = document.querySelector(".main-add-btn");
const productNameInput =document.querySelector(".product-name-input");
const productPriceInput = document.querySelector(".product-price-input");
const budgetDetailContainer = document.querySelector(".budget-detail-container");

let totalValue = 0;
let totalProductPrice = 0;

budgetAddBtn.addEventListener("click", ()=>{
    let newBudgetInput = parseFloat(budgetInput.value.trim());
    if(newBudgetInput ==="" || isNaN(newBudgetInput)){
        let errorMsg = budgetContainer.querySelector(".error");
        errorMsg.style.color="red"
    
        setTimeout(() => {
            errorMsg.classList.remove("show");
            errorMsg.textContent = ""; // Optionally clear the text
        }, 3000);
    }else {
        totalValue += newBudgetInput;
        budgetInput.value ="";
    }
    
    budgetNumber.textContent = totalValue;
});

productAddBtn.addEventListener("click", ()=>{
    let newProductName = productNameInput.value.trim();
    let newProductPrice = productPriceInput.value.trim();

    let displayDetail = document.createElement("div");
    displayDetail.setAttribute("class", "display-details")

    let productNameElement = document.createElement("p");
    let productPriceElement = document.createElement("p");
    let editBtn = document.createElement("img");
    let deleteBtn = document.createElement("img");

    productNameElement.innerHTML = newProductName;
    productPriceElement.innerHTML = newProductPrice;
    editBtn.src = 'images/pencil-square.svg';
    deleteBtn.src = 'images/trash3-fill.svg';

    displayDetail.appendChild(productNameElement);
    displayDetail.appendChild(productPriceElement);
    displayDetail.appendChild(editBtn);
    displayDetail.appendChild(deleteBtn);
    budgetDetailContainer.appendChild(displayDetail);

    totalProductPrice += newProductPrice;
    updateTotalDisplay();
    
});


function updateTotalDisplay() {
    const totalDisplayElement = document.querySelector(".total-expense-value");
    totalDisplayElement.innerHTML = `$${totalProductPrice}`;
}
