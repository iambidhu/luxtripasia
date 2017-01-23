   /*  $(document).ready(function() {
                              var max_fields = 10; //maximum input boxes allowed
                              var wrapper = $(".input_fields_wrap"); //Fields wrapper
                              var add_button = $(".add_field_button"); //Add button ID

                              var x = 1; //initlal text box count
                              $(add_button).click(function(e) { //on add input button click
                                  e.preventDefault();
                                  if (x < max_fields) { //max input box allowed
                                      x++; //text box increment
                                      $(wrapper).append('<div><input type="text" name="mytext[]" class="form-control col-md-6"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
                                  }
                              });

                              $(wrapper).on("click", ".remove_field", function(e) { //user click on remove text
                                  e.preventDefault();
                                  $(this).parent('div').remove();
                                  x--;
                              })
                          });
                     */
   //Country And Staes List For New-Accomodation Page
   populateCountries("country", "state");

   $(document).ready(function() {

       var counter = 2;

       $("#addButton").click(function() {

           if (counter > 10) {
               alert("Only 10 Rooms allowed");
               return false;
           }

           var newTextBoxDiv = $(document.createElement('div'))
               .attr("id", 'TextBoxDiv' + counter);

           newTextBoxDiv.after().html('<label>Room #' + counter + ' : </label>' +
               '<input class="form-control" type="text" name="textbox' + counter +
               '" id="textbox' + counter + '" value="" >');

           newTextBoxDiv.appendTo("#TextBoxesGroup");


           counter++;
       });

       $("#removeButton").click(function() {
           if (counter == 1) {
               alert("No more Rooms to remove");
               return false;
           }

           counter--;

           $("#TextBoxDiv" + counter).remove();

       });
       //Getting Button value
       $("#getButtonValue").click(function() {

           var msg = '';
           for (i = 1; i < counter; i++) {
               msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
           }
           alert(msg);
       });
   });