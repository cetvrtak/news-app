"use strict";

const selectCountryEl = document.querySelector(".select-country");

if (!localStorage.currentCountry) {
  localStorage.currentCountry = selectCountryEl.value;
} else {
  selectCountryEl.querySelectorAll("option").forEach((opt) => {
    opt.selected = opt.value == localStorage.currentCountry;
  });
}

selectCountryEl.addEventListener("click", function () {
  localStorage.currentCountry = selectCountryEl.value;
});
