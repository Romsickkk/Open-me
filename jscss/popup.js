function openPopup() {
  document.querySelector(".popup").classList.add("active");
}

document
  .querySelector(".popup .btn-yes")
  .addEventListener("click", function () {
    location.reload();
  });
