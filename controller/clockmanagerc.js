// The Clock Manager controller
// it manage all the other controllers and dispatch event to display controllers and clock manager


// Instanciating the ClockManagaer
var clock_manager = new ClockManager();
	
//Installing event
document.onkeyup = on_keyup;

function on_keyup(e)
{
	var key = e ? e.which : e.event.keyCode;
	clock_manager.ontick();

}
