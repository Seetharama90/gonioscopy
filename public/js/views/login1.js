
$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();
	
	$('#login1').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/download1';
		},
		error : function(e){
			lv.showLoginError('Login Failure', 'Please check your Serial Number');
		}
	}); 
	$('#pass-tf').focus();

	
});
