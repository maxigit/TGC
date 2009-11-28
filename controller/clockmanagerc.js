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

function add_clock(clock_id, config_id)
{
	var clock_div = document.getElementById(clock_id);
	var config_div = document.getElementById(config_id);

	if (clock_div == null)
	{
			alert("Can't find div ["+clock_id+"]");
	}

	var config = new clockconfig();
	var clock = new PlayerClock(config);

	clock_controller = new ClockController(clock, clock_div);


}
