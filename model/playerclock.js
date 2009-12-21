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
		this.remaining_byo_period = 5;
		this.move_number = 0;
		this.state = NORMAL;
	}

	this.freeze = function()
	{
		this.config.initial_time = this.remaining_time;
	}

	this.consume_time = function(time)
	{
		while (time > this.remaining_time)
		{
			//if (this.state == NORMAL
			if (this.remaining_byo_move)
			{
				time  -= this.remaining_time;
				this.state = BYOYOMI;
				this.remaining_time = this.config.byo_time;
			}
			else if (this.byo_period > 0)
			{
				this.byo_period-=1;
				this.byo_remaining_move = this.config.byo_move;
				//loop
			}
			else // byo yomi elapsed
			{
				return this.manage_overtime(overtime);
			}

		}
		// all the intelligence of the clock
		if (time < this.remaining_time)
		{
			this.remaining_time -= time;
			return  OK
		}

	}

	this.manage_overtime = function(overtime)
	{
		// we manage the byo yomi here
		if (this.remaining_byo_move)
		{
			this.remaining_time = this.config.byo_time;
			this.state = BYOYOMI;
		}
		if (this.remaining_time)
			return END_OF_TIME;
	}

	this.next_move = function()
	{
		this.move_number += 1;
		if (this.state == BYOYOMI)
		{
			this.byo_remaining_move -= 1;
		}
	}

	this.displayed_remaining_time = function()
	{
			return this.remaining_time;
	}

	

	this.reset();
}

