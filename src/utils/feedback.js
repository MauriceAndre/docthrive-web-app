import { toast } from "react-toastify";

export const TYPE = {
  DEFAULT: toast.TYPE.DEFAULT,
  SUCCESS: toast.TYPE.SUCCESS,
  INFO: toast.TYPE.INFO,
  WARNING: toast.TYPE.WARNING,
  ERROR: toast.TYPE.ERROR,
};

export const form = function (content, type) {
  call(content, { type, autoClose: 2500 });
};

export const action = function (...props) {
  form(...props);
};

// const register = function(content, type) {
//   type = type || TYPE.SUCCESS;
//   content = content || "🎉 Congrats! You're registred.";

//   call(content, {
//     type,
//     autoClose: 2000,
//     hideProgressBar: true,
//     pauseOnHover: false
//   });
// };

// const login = function(content, type) {
//   type = type || TYPE.SUCCESS;
//   content = content || "👋 Welcome back!";

//   call(content, {
//     type,
//     autoClose: 2000,
//     hideProgressBar: true,
//     pauseOnHover: false
//   });
// };

export const call = function (content, options) {
  toast(content, options);
};
