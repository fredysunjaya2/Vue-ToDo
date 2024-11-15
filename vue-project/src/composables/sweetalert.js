import Swal from "sweetalert2";

const taskToast = Swal.mixin({
  icon: "success",
  iconColor: "#FFFFFF",
  showConfirmButton: false,
  toast: true,
  timerProgressBar: true,
  timer: 3000,
  position: "top-right",
  background: "#00C853",
  customClass: {
    title: "text-white",
  },
});

const taskConfirmation = Swal.mixin({
  icon: "warning",
  backdrop: true,
  allowOutsideClick: false,
  allowEscapeKey: false,
  showConfirmButton: true,
  confirmButtonText: "Confirm",
  confirmButtonColor: "#00C853",
  showDenyButton: true,
  denyButtonText: "Cancel",
  denyButtonColor: "#D50000",
  background: "#FFFFFF",
  customClass: {
    confirmButton: "text-white",
    denyButton: "text-white",
    title: "text-black text-h5 font-weight-bold",
  },
});

export { taskToast, taskConfirmation };
