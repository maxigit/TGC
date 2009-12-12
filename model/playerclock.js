// The clock of one player
// it more keeps track of time given by the ClockManager
// and implement the rules 
// event if the clock controller display the remaining time, 
// the clock stoe re the elapsed time.


const END_OF_TIME = 2;
const OK=1;
function PlayerClock(config)
{
	this.config = config ? config :  new ClockSetting();

	this.reset= function ()
	{
		// copy the initial config to th actual parameters
		this.remaining_time = this.config.initial_time;
		//TODO byo=yomi
		this.move_number = 0;
	}

	this.freeze = function()
	{
		this.config.initial_time = this.remaining_time;
	}

	this.consume_time = function(time)
	{
		// all the intelligence of the clock
		if (time < this.remaining_time)
		{
			this.remaining_time -= time;
			return  OK
		}
		else // trouble
		{

			var overtime = time = this.remaining_time;
			this.remaining_time = 0;
			return manage_overtime(overtime);
		}
	}

	this.manage_overtime = function(overtime)
	{
			return END_OF_TIME;
	}

	this.next_move = function()
	{
		this.move_number += 1;
	}

	this.displayed_remaining_time = function()
	{
			return this.remaining_time;
	}

	

	this.reset();
}

