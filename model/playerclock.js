// The clock of one player
// it more keeps track of time given by the ClockManager
// and implement the rules 
// event if the clock controller display the remaining time, 
// the clock stoe re the elapsed time.


const END_OF_TIME = 2;
const OK=1;
const BYOYOMI = 3;
const EXTRA = 4;
const NORMAL = 0;
function PlayerClock(config)
{
	this.config = config ? config :  new ClockSetting();

	this.reset= function ()
	{
		// copy the initial config to th actual parameters
		this.remaining_time = this.config.initial_time;
		//TODO byo=yomi
		this.remaining_byo_move = this.config.byo_move;
		this.remaining_byo_period = this.config.byo_period;
		this.move_number = 0;
		this.state = NORMAL;
	}

	this.freeze = function()
	{
		this.config.initial_time = this.remaining_time;
		this.config.byo_period = this.remaining_byo_period;
		this.config.byo_move = this.remaining_byo_move;
	}

	this.consume_time = function(time)
	{
		// all the intelligence of the clock
		while (time >= this.remaining_time)
		{
			time  -= this.remaining_time;
			this.remaining_time = 0;

			var reset = false;
			if (this.state == NORMAL) // we start the byo-yomi
			{
				this.state = BYOYOMI;
				reset = true;
			}
			else if (this.remaining_byo_period > 0 && this.remaining_byo_move>0)
			{
				// one extra period has been consume
				this.remaining_byo_period-=1;

				reset = true;
			}

			if (reset)
			{
				this.reset_current_byo();
				//loop
			}
			else 
			{
				break;
			}
		}
		this.remaining_time -= time;
		return this.remaining_time > 0 ?  OK : END_OF_TIME;

	}

	this.reset_current_byo = function()
	{
		this.remaining_time = this.config.byo_time;
		this.remaining_byo_move = this.config.byo_move;
	}

	this.manage_overtime = function(overtime)
	{
	}

	this.next_move = function()
	{
		this.move_number += 1;
	}
	
	this.end_of_move = function()
	{
		if (this.state == BYOYOMI)
		{
			this.remaining_byo_move -= 1;
			if (this.remaining_byo_move == 0)
			{
				this.reset_current_byo();
			}
		}
	}

	this.displayed_remaining_time = function()
	{
			return this.remaining_time;
	}

	

	this.reset();
}

