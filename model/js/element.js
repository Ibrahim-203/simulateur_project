var Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  showCloseButton: true,
  cancelButtonAriaLabel: "Thumbs down",
  timer: 5000,
});
var showWarningWal = function (text) {
  Toast.fire({
    icon: "warning",
    title: text,
  });
};

var showSuccedWal = function (text) {
  Toast.fire({
    icon: "success",
    title: text,
  });
};

var showInfosWal = function (text) {
  Toast.fire({
    icon: "info",
    title: text,
  });
};

var showErrorWal = function (text) {
  Toast.fire({
    icon: "error",
    title: text,
  });
};
