import { toast } from 'react-toastify';

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const triggerFlashMessage = ({
  message,
  messageType = 'success',
  position = 'bottom-left'
}) => {
  const toasterObj = {
    position,
    theme: document.documentElement.getAttribute('data-theme') === 'winter' ? 'light' : 'dark'
  };
  if(messageType === 'error') {
    toast.error(message, toasterObj);
  } else {
    toast.success(message, toasterObj);
  }
}