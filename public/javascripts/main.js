 // Delete User

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

 // Delete Destination
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


 //Update destination
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


 // DELETE CATEGORY

 $(document).ready(function() {
     $('.deleteCategory').on('click', deleteCategory);
 });

 function deleteCategory() {
     var confirmation = confirm('Are You Sure ?');

     if (confirmation) {
         $.ajax({
             type: 'DELETE',
             url: '/admin/admin_home/categories/delete/' + $(this).data('id')
         }).done(function(response) {
             window.location.replace('/admin');
         });
     } else {
         return false;
     }
 }

 // UPDATE CATEGORY

 $(document).ready(function() {
     $('.updateCategory').on('click', updateCategory);
 });

 function updateCategory() {
     var confirmation = confirm('Do you want to update this field ?? ');

     var data = {
         name: $(this).parents('.modal-body').find('.category_name').val()
     };
     if (confirmation) {
         $.ajax({
             type: 'PUT',
             data: data,
             url: '/admin/admin_home/categories/update/' + $(this).parents('.modal-body').find(".updateCategory").attr('value')
         }).done(function(response) {
             window.location.replace('/');
         });
         console.log($(this));
         console.log($(this).parents('.modal-body').find('.category_name').val());
         console.log($(this).parents('.modal-body').find(".updateCategory").attr('value'));
     } else {
         return false;
     }
 }

 //Update Provider
 $(document).ready(function() {
     $('.updateProvider').on('click', updateProvider);
 });

 function updateProvider() {
     var confirmation = confirm('Do you want to update this field ??');
     var data = {
         name: $(this).parents('.modal-body').find('.provider_name').val(),
         email: $(this).parents('.modal-body').find('.provider_email').val(),
         mobile: $(this).parents('.modal-body').find('.provider_mobile').val(),
         address: $(this).parents('.modal-body').find('.provider_address').val(),
         zipcode: $(this).parents('.modal-body').find('.provider_zipcode').val(),
         city: $(this).parents('.modal-body').find('.provider_city').val(),
         state: $(this).parents('.modal-body').find('.provider_state').val(),
         country: $(this).parents('.modal-body').find('.provider_country').val()
     };
     if (confirmation) {
         $.ajax({
             type: 'PUT',
             data: data,
             url: '/admin/admin_home/provider/update/' + $(this).parents('.modal-body').find(".updateProvider").attr('value')

         }).done(function(response) {
             window.location.replace('/');
         });
         console.warn(data);
         console.log($(this));
         console.log($(this).parents('.modal-body').find('.provider_name').val());
         console.log($(this).parents('.modal-body').find(".updateProvider").attr('value'));
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

 $(".get_category").click(function() {
     var categoryname = $(this).parents('.category_form').find(".category_name").text();
     var categoryId = $(this).parents('.category_form').find(".category_name").attr('data-id');
     console.log(categoryId);
     $(".category_name").val(categoryname);
     $(".updateCategory").val(categoryId);
 });

 $(".get_provider").click(function() {
     var providername = $(this).parents('.provider_form').find(".provider_name").text();
     var provideremail = $(this).parents('.provider_form').find(".provider_email").text();
     var providermobile = $(this).parents('.provider_form').find(".provider_mobile").text();
     var provideraddress = $(this).parents('.provider_form').find(".provider_address").text();
     var providerzipcode = $(this).parents('.provider_form').find(".provider_zipcode").text();
     var providercity = $(this).parents('.provider_form').find(".provider_city").text();
     var providerstate = $(this).parents('.provider_form').find(".provider_state").text();
     var providercountry = $(this).parents('.provider_form').find(".provider_country").text();
     var providerId = $(this).parents('.provider_form').find(".provider_name").attr('data-id');
     console.log(providerId);
     console.log(providermobile);
     console.log(providerzipcode);
     $(".provider_name").val(providername);
     $(".provider_email").val(provideremail);
     $(".provider_mobile").val(JSON.parse(providermobile));
     $(".provider_address").val(provideraddress);
     $(".provider_zipcode").val(JSON.parse(providerzipcode));
     $(".provider_city").val(providercity);
     $(".provider_state").val(providerstate);
     $(".provider_country").val(providercountry);
     $(".updateProvider").val(providerId);
 });