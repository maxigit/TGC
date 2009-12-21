
const UNINITIALZED = 0;
const RUNNING = 1;
const PAUSED = 2;
const STOPPED = 3;

const STATE_STR = ["UNINITIALED", "RUNNING", "PAUSED", "STOPPED"];

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
		this.active_player = this.players[0]
		this.last_time = null;
		this.state = UNINITIALZED;
	}
	this.start = function(date)
	{
		for (i in this.players)
		{
			this.players[i].reset();
		}

		this.active_player = this.players[0];
		this.active_player.next_move();
		this.state = RUNNING;

		this.last_time = date;
	}
	this.ontick = function(date)
	{
		if(this.state != RUNNING)
		{
			return;
		}
		if (this.state == 0)
		{
			return;
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

	this.pause = function(date)
	{
		this.ontick(date);
		this.state = PAUSED;
		this.last_time = null;

	}

	this.resume = function(date)
	{
		if (this.state != PAUSED)
		{
			return;
		}
		this.last_time = date
			this.state = RUNNING;
	}

	this.get_next_active_player_index = function()
	{
		return this.players[0] == this.active_player ? 1 : 0;
	}
	this.toggle_player = function(date)
	{
		var next_index = this.get_next_active_player_index();
		this.active_player = this.players[next_index];
		this.active_player.next_move();

	}

	this.freeze = function (date)
	{
		this.ontick(date);
		for (i in this.players)
		{
			this.players[i].freeze();
		}
	}
}
