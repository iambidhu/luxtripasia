 $(document).ready(function() {
     $('.deleteUser').on('click', deleteUser);
 });

 function deleteUser() {
     var confirmation = confirm('Are You Sure?');

     if (confirmation) {
         $.ajax({
             type: 'DELETE',
             url: '/admin/admin_home/providers/delete/' + $(this).data('id')
         }).done(function(response) {
             window.location.replace('/admin');
         });
     } else {
         return false;
     }
 }