
function LoginValidator1()
{
// bind a simple alert window to this controller to display any errors //
	this.loginErrors = $('.modal-alert');
	
	this.showLoginError = function(t, m)
	{
		$('.modal-alert .modal-header h4').text(t);
		$('.modal-alert .modal-body').html(m);
		this.loginErrors.modal('show');
	}
}

LoginValidator1.prototype.validateForm = function()
{
	
		if ($('#pass-tf').val() == ''){
		this.showLoginError('Ooops!', 'Please enter a valid password');
		return false;
	}	else{
		return true;
	}
}