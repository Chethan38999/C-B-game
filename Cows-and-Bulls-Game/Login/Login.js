
document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    const modal = new bootstrap.Modal(document.getElementById('forgotPasswordModal'));
    forgotPasswordLink.addEventListener('click', function(event) {
        event.preventDefault();
        modal.show();
    });
});


document.getElementById('forgotPasswordForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

   
    var email = document.getElementById('forgotEmail').value;
    var newPassword = document.getElementById('newPassword').value;


    var resetPasswordUrl = ''; 
    console.log("calling API");
    fetch(resetPasswordUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password:newPassword })
    })
    .then(response => {
        console.log('response',response);
        if (response.status==404) {
            alert('Email ID not found in the system, please enter valid email id.');
        } else if (response.ok) {
            alert('Password has been reset. Please login using the new password.');
            $('#forgotPasswordModal').modal('hide'); 
        } else {
            $('#forgotPasswordModal').modal('hide'); 
            throw new Error('Failed to reset password. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to reset password. Please try again.');
    });
});


       
       
  