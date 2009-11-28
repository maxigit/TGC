
function ClockManager()
{
	this.players = new Array();

	this.new_player = function(config)
	{
		var player = new PlayerClock(config);
		this.players.push(player);

		return player;

	}
}
