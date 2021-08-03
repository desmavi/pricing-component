//VARIABLES
var slider = document.querySelector(".slider");
var fill = document.querySelector(".fill");
var pageView = document.querySelector(".page-view");
var pageAndAmount = [[10, 8.00],
                    [50, 12.00],
                    [100, 16.00],
                    [500, 24.00],
                    [1, 36.00]]
var dollar = document.querySelector(".dollar");
var amount = document.querySelector(".amount");
var sliderSwitch = document.querySelector(".input-switch");
var billingType = document.querySelector(".billing-type");
var discountLg = document.querySelector(".discount-lg");
var mediaQuery = window.matchMedia('(min-width: 768px)');

//Return K or M for amount
function amountUnit () {
      //change K to M
    if (pageAndAmount[slider.value][0] == 1) {
        dollar.textContent = "M";
    }
    else {
        dollar.textContent = "K"
    }
}

//Change amount based on if switch is toggled or not and Update aria text and value
function changeAmountBasedOnSwitch() {
    amountUnit()
    if (sliderSwitch.checked) {
        var priceYearly = (pageAndAmount[slider.value][1]) * 12;
        var priceYearlyDiscounted = priceYearly - (priceYearly * 25 / 100);
        var priceYearlyDiscountedInteger = priceYearlyDiscounted.toFixed(2);

        billingType.textContent = " /year";
        amount.textContent = "$" + priceYearlyDiscountedInteger;

        //Update aria text yearly billing
        slider.setAttribute("aria-valuenow", slider.value);
        slider.setAttribute("aria-valuetext", pageAndAmount[slider.value][0] + dollar.textContent + " per " + priceYearlyDiscountedInteger + " dollars" + " per year")
    }
    else {
        billingType.textContent = " /month";
        amount.textContent = "$" + pageAndAmount[slider.value][1].toFixed(2);

        //update ariatext monthly billing
        slider.setAttribute("aria-valuetext", pageAndAmount[slider.value][0] + dollar.textContent + " per " + pageAndAmount[slider.value][1].toFixed(2) + " dollars" + " a month")
    }
}

// Toggle Switch
sliderSwitch.addEventListener("change",
    function () {
    changeAmountBasedOnSwitch()
    if (sliderSwitch.getAttribute("aria-checked") == "false") {
    sliderSwitch.setAttribute("aria-checked", "true");
    } else {
    sliderSwitch.setAttribute("aria-checked", "false");
    }
})

//Input Range
slider.addEventListener("input",
function () {
    //change pageviews and amount number
    pageView.textContent = pageAndAmount[slider.value][0];
    amount.textContent = "$" + pageAndAmount[slider.value][1].toFixed(2);

    //input range progress bar
    var newVal = slider.value / (this.max - this.min) * 100;
    fill.style.width = newVal + "%";

    //change amount based on if switch is checked or not whhile using the slider
    changeAmountBasedOnSwitch()

    //change K to M
    amountUnit()
})

//change discount text content
function checkMediaQuery() {
if (window.innerWidth > 768) {
    discountLg.textContent = " discount";
}
else {
    discountLg.textContent = "";
}
}

//On Load
checkMediaQuery();

// Add a listener for when the window resizes
window.addEventListener('resize', checkMediaQuery);

