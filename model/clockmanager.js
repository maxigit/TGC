
const UNINITIALZED = 0;
const RUNNING = 1;
const PAUSED = 2;
const STOPPED = 3;

function ClockManager()
{
	this.players = new Array();
	this.active_player = null;

	this.state = 0;
	this.last_time = null;

	this.new_player = function(config)
	{
		var player = new PlayerClock(config);
		this.players.push(player);

		return player;

	}

	this.reset = function()
	{
		for (i in this.players)
		{
			this.players[i].reset();
		}
		this.last_time = null;
	}
	this.start = function(date)
	{
		for (i in this.players)
		{
			this.players[i].reset();
		}

		this.active_player = this.players[0];
		this.state = RUNNING;

		this.last_time = date;
	}
	this.ontick = function(date)
	{
		if (this.state == 0)
		{
			this.start();
		}

		if(this.last_time != null)
		{
			var duration = date.getTime() - this.last_time.getTime();
			if (this.active_player)
			{
				this.active_player.consume_time(duration);
			}
		}
		this.last_time = date;
	}

	this.toggle_player = function(date)
	{
		this.active_player.next_move();
		var next_index = this.players[0] == this.active_player ? 1 : 0;
		this.active_player = this.players[next_index];

	}
}
