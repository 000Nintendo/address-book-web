import { toast } from "react-toastify"


export class Toast {

   static toastConfig: any = {
        autoClose: 5000,
        position: 'bottom-right',
        hideProgressBar: true,
        className: 'toast-container'
    }

    static success = (message: string): any => toast.success(message, this.toastConfig)

    static error = (message: string): any => toast.error(message, this.toastConfig)

    static warning = (message: string): any => toast.warning(message, this.toastConfig)
}