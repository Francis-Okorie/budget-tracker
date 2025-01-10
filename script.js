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
        errorMsg.classList.add("show");
        errorMsg.style.color="red"
    
        setTimeout(() => {
            errorMsg.classList.remove("show");
            errorMsg.textContent = ""; 
        }, 3000);
    }else {
        totalValue += newBudgetInput;
        budgetInput.value ="";
    }
    
    budgetNumber.textContent = `$${totalValue}`;
    totalBalance();
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
    
    
    const totalDisplayElement = document.querySelector(".total-expense-value");
    console.log(productPriceInput.value)
    totalProductPrice += parseFloat(productPriceInput.value.trim());
    console.log();
    
    totalDisplayElement.innerHTML = `$${totalProductPrice}`;

    productNameInput.value="";
    productPriceInput.value="";

    totalBalance();

    /*
    editBtn.addEventListener("click", ()=>{
        console.log(totalValue);
        let updatedProductName = prompt("Enter new product name:", updatedNewName);
        let updatedProductPrice = parseFloat(
            prompt("Enter new product price:", updatedNewPrice)
        );
        if (!isNaN(updatedProductPrice) && updatedProductPrice >= 0) {
            totalProductPrice -= newProductPrice; // Subtract the old price
            totalProductPrice += updatedProductPrice; // Add the new price

            productNameElement.innerHTML = updatedProductName;
            productPriceElement.innerHTML = `$${updatedProductPrice.toFixed(2)}`;

            newProductName = updatedProductName; // Update reference
            newProductPrice = updatedProductPrice; // Update reference

            totalDisplayElement.innerHTML = `$${totalProductPrice.toFixed(2)}`;
            totalBalance();
        } else {
            alert("Invalid product price!");
        }
    }); */
    
});

function totalBalance(){
    const totalBalanceElement = document.querySelector(".total-balance");
    totalBalanceElement.innerHTML = totalValue - totalProductPrice ;
}

totalBalance

