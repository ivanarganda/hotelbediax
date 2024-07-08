import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useModalConfirm = ()=>{

    const MySwal = withReactContent(Swal);

    const showAlert = async( title , text , icon ) => {
        const result = await MySwal.fire({
          title: title,
          text: text,
          icon: icon,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel'
        });
        return result.isConfirmed;
    };

    return { showAlert };

}

export default useModalConfirm;