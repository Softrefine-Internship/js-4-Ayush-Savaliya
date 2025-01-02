// write javascript here

const popup = document.querySelector(".addexpense");
    // const overlay = document.querySelector(".overlay");
    const btnClosePopup = document.querySelector(".close-popup");
const btnsOpenPopup = document.querySelector(".show-popup");
    const btnExpense = document.querySelector(".btn--expense");

    const openpopup = function () {
      popup.classList.remove("hidden");
      overlay.classList.remove("hidden");
    };

    const closepopup = function () {
      popup.classList.add("hidden");
      overlay.classList.add("hidden");
    };



btnsOpenPopup.addEventListener("click", openpopup);
btnClosePopup.addEventListener("click", closepopup);
// overlay.addEventListener("click", closepopup);
// btnExpense.addEventListener("click", closepopup);


btnExpense.addEventListener("click", function () {
  // alert("saugh");  
  closepopup(); 
});
    
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    closepopup();
  }
});
    

