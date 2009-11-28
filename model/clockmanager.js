
function ClockManager()
{
	this.players = new Array();

	this.new_player = function(config)
	{
		player = new PlayerClock(config);
		this.playera.push(player);

	}
}
