const budgetInput = document.querySelector(".budget-value");
const budgetNumber =document.querySelector(".budget-number");
const budgetAddBtn = document.querySelector(".budget-add-btn");
const budgetContainer = document.querySelector(".budget-input");

let totalValue = 0;

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
