import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let currentUser;

function alertError(msg){
  toast.error(msg, { theme: "colored" });
}
function alertSuccess(msg){
  toast.success(msg, { theme: "colored" });
}
const globalService = {
    currentUser,
    alertError,
    alertSuccess
  };
  
  export default globalService;

  