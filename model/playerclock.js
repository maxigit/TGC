// The clock of one player
// it more keeps track of time given by the ClockManager
// and implement the rules 
// event if the clock controller display the remaining time, 
// the clock stoe re the elapsed time.
const END_OF_TIME = 2;
const OK=1;
function PlayerClock(config)
{
	this.config = config ? config :  ClockSetting();

	this.reset= function ()
	{
		// copy the initial config to th actual parameters
		this.remaining_time = this.config.initial_time;
		//TODO byo=yomi
		this.move_number = 0;
	}

	this.consume_time(time)
	{
		// all the intelligence of the clock
		if (time < this.remaining.time)
		{
			this.remainig.time -= time;
			return  OK
		}
		else // trouble
		
			this.remainig_time = 0;
		return END_OF_TIME;
		}
	}

	this.reset();
}

