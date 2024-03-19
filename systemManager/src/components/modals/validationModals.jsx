import Swal from 'sweetalert2';

export function ValidationAlert(){
    return(
        Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question"
          })
    )
}
