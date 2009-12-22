// The Clock Manager controller
// it manage all the other controllers and dispatch event to display controllers and clock manager


// Instanciating the ClockManagaer
var clock_manager = new ClockManager();
var clock_controllers = new Array();
var setting_controller_map = new Array();
	
//Installing event
document.onkeydown= on_key;

const Key_r = 82;
const Key_s = 83;
const Key_p = 80;
const Key_z = 91;
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
		if (clock_manager.state == RUNNING)
		{
			// pause 
			pause();
		}
		else
		{
		
		clock_manager.reset();
		}
		//reset_setting_controller();
		
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
	else if (key == Key_z) //Z
	{
		// Freeze, we pause and copy the remaining time to the setting.
		clock_manager.freeze(date);
		clock_manager.pause(date);
		reset_setting_controller();
	}

	update_clock_controllers();

}

function reset_setting_controller()
{
	for (i in setting_controller_map)
	{
		setting_controller_map[i].update_div();
	}
}

function add_clock(clock_id, config_id)
{
	var clock_div = document.getElementById(clock_id);
	var config_div = document.getElementById(config_id);

	if (clock_div == null)
	{
			alert("Can't find div ["+clock_id+"]");
	}

	var config_controller = setting_controller_map[config_id]; // new clockconfig();
	var config = config_controller ? config_controller.setting: null;
	var clock = clock_manager.new_player(config);

	var clock_controller = new PlayerClockController(clock, clock_div);
	clock_controllers.push(clock_controller);

	var setting_controller = new ClockSettingController(clock.config, config_div); 
	setting_controller_map[config_id] = setting_controller;
}

function update_clock_controllers()
{
	for (i in clock_controllers) 
	{
		var active = clock_manager.active_player == clock_controllers[i].clock;	
		clock_controllers[i].update(active, clock_manager.state);
	}
}

function reset()
{
	process_event(Key_r);
	reset_focus();
}


function  start()
{
	process_event(Key_s);
	reset_focus();
}

function pause()
{
	process_event(Key_p);
}

function toggle()
{
	process_event(32);
}

function freeze()
{
	process_event(Key_z);
}


function reset_focus()
{
	var parent  = document.activeElement.parentNode;
	if (parent) {
		parent.focus();
	}
}

function on_setting_change(controller)
{
	controller.update_setting();
	process_event(Key_r);
}

function copy_html(src_id, dst_id)
{
	var src_div= document.getElementById(src_id);
	var dst_div= document.getElementById(dst_id);

	dst_div.innerHTML = src_div.innerHTML;
}
