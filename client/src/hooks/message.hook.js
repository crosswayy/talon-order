import {useCallback} from "react";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export const useMessage = () => {
    return useCallback((text, type = 'info', delay = 5000) => {
        if (text) {
            toast[type](text, {autoClose: delay});
        }
    }, []);
}
