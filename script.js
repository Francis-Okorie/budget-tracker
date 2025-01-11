const budgetInput = document.querySelector(".budget-value");
const budgetNumber =document.querySelector(".budget-number");
const budgetAddBtn = document.querySelector(".budget-add-btn");
const budgetContainer = document.querySelector(".budget-input");
const productAddBtn = document.querySelector(".main-add-btn");
const productNameInput =document.querySelector(".product-name-input");
const productPriceInput = document.querySelector(".product-price-input");
const budgetDetailContainer = document.querySelector(".budget-detail-container");
const displayDetailDiv = document.querySelector(".display-details");
const budgetDashBoard = document.querySelector(".budget-dashboard");


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
    saveDashBoard();
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
    productPriceElement.innerHTML = `$${newProductPrice}`;
    editBtn.src = 'images/pencil-square.svg';
    deleteBtn.src = 'images/trash3-fill.svg';

    deleteBtn.setAttribute("class", "delete-button");
    editBtn.setAttribute("class", "edit-btn");

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

    deleteBtn.addEventListener("click", (e)=>{
        if(e.target.tagName === "IMG"){
            const priceToRemove = parseFloat(
                e.target.parentElement.querySelector("p:nth-child(2)").textContent.replace("$", "")
            );
            totalProductPrice -= priceToRemove;
            e.target.parentElement.remove();
            const totalDisplayElement = document.querySelector(".total-expense-value");
                totalDisplayElement.innerHTML = `$${totalProductPrice.toFixed(2)}`;
            totalBalance();
            saveBudgetDetail();
        }
    });

    
    editBtn.addEventListener("click", ()=>{
        const editButtons = budgetDetailContainer.querySelector(".edit-btn");
        editButtons.forEach(editbutton => {
            editbutton.addEventListener("click", ()=> {
                let updatedProductName = prompt("Enter new product name:", newProductName);
        let updatedProductPrice = parseFloat(
            prompt("Enter new product price:", newProductPrice)
        );
        if (!isNaN(updatedProductPrice) && updatedProductPrice >= 0) {
            const oldProductPrice = parseFloat(newProductPrice);
            totalProductPrice += (updatedProductPrice - oldProductPrice);


            productNameElement.innerHTML = updatedProductName;
            productPriceElement.innerHTML = `$${updatedProductPrice.toFixed(2)}`;

            newProductName = updatedProductName;
            newProductPrice = updatedProductPrice;

            totalDisplayElement.innerHTML = `$${totalProductPrice.toFixed(2)}`;
            totalBalance();
            saveDashBoard();
            saveBudgetDetail();
        } else {
            alert("Invalid product price!");
        }
            });
        });
        
    }); 

    
    
    saveDashBoard();
    saveBudgetDetail();


});

function totalBalance(){
    const totalBalanceElement = document.querySelector(".total-balance");
    totalBalanceElement.innerHTML = `$${(totalValue - totalProductPrice).toFixed(2)}` ;
}

function saveDashBoard() {
    localStorage.setItem("savedboard", budgetDashBoard.innerHTML);
}

function showDashBoard() {
    const savedBoard = localStorage.getItem("savedboard");
    if(savedBoard) budgetDashBoard.innerHTML = savedBoard
}

function showBudgetDetail (){
    const savedData = localStorage.getItem("savedbudget");
    if(savedData) budgetDetailContainer.innerHTML = savedData;
    const deleteButtons = budgetDetailContainer.querySelectorAll(".delete-button");
    deleteButtons.forEach(deleteBtn =>{
        deleteBtn.addEventListener("click", (e)=>{
            if(e.target.tagName === "IMG"){
                const priceToRemove = parseFloat(
                    e.target.parentElement.querySelector("p:nth-child(2)").textContent.replace("$", "")
                );
                totalProductPrice -= priceToRemove;
                e.target.parentElement.remove();
                const totalDisplayElement = document.querySelector(".total-expense-value");
                totalDisplayElement.innerHTML = `$${totalProductPrice.toFixed(2)}`;
                totalBalance();
                saveBudgetDetail();
            }
        });
    });
}

function saveBudgetDetail(){
    localStorage.setItem ("savedbudget", budgetDetailContainer.innerHTML);
}

showDashBoard();
showBudgetDetail();

