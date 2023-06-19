import { ToastOptions, toast } from 'react-toastify';

const toastrConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const showErrorToast = (message: string) => {
  return toast.error(message, toastrConfig);
};

export const showSuccessToast = (message: string) => {
  return toast.success(message, toastrConfig);
};