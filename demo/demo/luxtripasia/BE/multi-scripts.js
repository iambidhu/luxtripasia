	function MM_openBrWindow(theURL,winName,features) 
	{ 
		window.open(theURL,winName,features);
	}
	$(function(){
		// Datepicker
		/*$('.datepicker').datepicker({
			inline: true
		});*/
		
		
		var dateToday = new Date();
		$( ".datepicker" ).datepicker({	inline: true, minDate:dateToday, dateFormat:"dd/mm/yy",showOn: "button",
		buttonImage: "http://www.dekeling.com/BE/calendar.ico", buttonImageOnly:"true",changeMonth: "true",
		changeYear: "true",
		showOn: 'both',currentText:"Now" });
		
		$('#fromdate').change(function() 
		{  
			var date2 = $('#fromdate').datepicker('getDate', '+1d');    
			date2.setDate(date2.getDate()+1);   
			$('#todate').datepicker('setDate', date2); 
		}); 	
	});
	