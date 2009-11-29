// The Clock Manager controller
// it manage all the other controllers and dispatch event to display controllers and clock manager


// Instanciating the ClockManagaer
var clock_manager = new ClockManager();
var clock_controllers = new Array();
	
//Installing event
document.onkeydown= on_key;

const Key_r = 82;
const Key_s = 83;
const Key_p = 80;
function on_key(e)
{
	var date = new Date()
	var key = e ? e.which : null;

	if(e)
	{
			var a=1;
	}

	process_event(key, date);
}

function process_event(key, date)
{

	date = date ? date : new Date();

	clock_manager.ontick(date);
	if(key == 32)
	{
		if (clock_manager.state == UNINITIALZED)
		{
			start();
		}
		else if (clock_manager.state == RUNNING)
		{
			clock_manager.toggle_player(date);
		}
		else if (clock_manager.state == PAUSED)
		{
			clock_manager.resume(date);
		}
	}
	else if (key == Key_s) //S
	{
		clock_manager.start();
	}
	else if (key == Key_r) //R
	{
		clock_manager.reset();
	}
	else if (key == Key_p) //P
	{
		if(clock_manager.state == RUNNING) {
			clock_manager.pause(date);
		}
		else if ( clock_manager.state == PAUSED) {
			clock_manager.resume(date);
		}

	}

	update_clock_controllers();

}

function add_clock(clock_id, config_id)
{
	var clock_div = document.getElementById(clock_id);
	var config_div = document.getElementById(config_id);

	if (clock_div == null)
	{
			alert("Can't find div ["+clock_id+"]");
	}

	var config = null; // new clockconfig();
	var clock = clock_manager.new_player(config);

	var clock_controller = new PlayerClockController(clock, clock_div);
	clock_controllers.push(clock_controller);


}

function update_clock_controllers()
{
	for (i in clock_controllers) 
	{
		clock_controllers[i].update();
	}
}

function reset()
{
	process_event(Key_r);
}


function  start()
{
	process_event(Key_s);
}

function pause()
{
	process_event(Key_p);
}

