
function PlayerClockController(clock, clock_div)
{
	this.clock = clock;
	this.div = clock_div;

	this.remaining_time_label=  this.div.getElementsByClassName('remaining_time')[0];

	//init

	this.update = function()
	{
		var remaining_time = this.clock.displayed_remaining_time();

		this.remaining_time_label.textContent= remaining_time;

	};
}
