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


 $(document).ready(function() {
     $('.deleteDestination').on('click', deleteDestination);
 });

 function deleteDestination() {
     var confirmation = confirm('Are You Sure?');

     if (confirmation) {
         $.ajax({
             type: 'DELETE',
             url: '/admin/admin_home/destination/delete/' + $(this).data('id')
         }).done(function(response) {
             window.location.replace('/admin');
         });
     } else {
         return false;
     }
 }

 $(document).ready(function() {
     $('.updateDestination').on('click', updateDestination);
 });

 function updateDestination() {
     var confirmation = confirm('Do you want to update this field ??');
     var data = {
         name: $(this).parents('.modal-body').find('.dest_name').val()
     };
     if (confirmation) {
         $.ajax({
             type: 'PUT',
             data: data,
             url: '/admin/admin_home/destination/update/' + $(this).parents('.modal-body').find(".updateDestination").attr('value')


         }).done(function(response) {
             window.location.replace('/');
         });
         console.log($(this));
         console.log($(this).parents('.modal-body').find('.dest_name').val());
         console.log($(this).parents('.modal-body').find(".updateDestination").attr('value'));
     } else {
         return false;
     }

 }


 $(".get_dest").click(function() {
     var destname = $(this).parents('.destination_form').find(".destination_name").text();
     var destinationId = $(this).parents('.destination_form').find(".destination_name").attr('data-id');
     console.log(destinationId);
     $(".dest_name").val(destname);
     $(".updateDestination").val(destinationId);
 });