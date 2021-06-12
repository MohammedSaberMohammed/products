export const setIcon = (iconName, extension) => require(`../Images/${iconName}.${extension || 'svg'}`).default;

export const ToastConfig = (configs = {}) => ({
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  ...configs,
});