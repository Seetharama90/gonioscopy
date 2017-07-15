
$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();
	
	$('#login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			} 	
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/signup1';
		},
		error : function(e){
			lv.showLoginError('Login Failure', 'Please check your Username/Password ');
		}
	}); 
	$('#user-tf').focus();

	
});
