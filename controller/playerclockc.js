
function PlayerClockController(clock, clock_div)
{
	this.clock = clock;
	this.div = clock_div;
	this.div_className = clock_div.className;

	this.remaining_time_label=  this.div.getElementsByClassName('remaining_time')[0];
	this.remaining_dec_label=  this.div.getElementsByClassName('remaining_dec')[0];
	this.wheel_label=  this.div.getElementsByClassName('wheel')[0];
	this.move_label=  this.div.getElementsByClassName('move')[0];

	this.remaining_byo_move_label = this.div.getElementsByClassName('byo_move')[0];
	this.remaining_byo_period_label = this.div.getElementsByClassName('byo_period')[0];

	//init

	this.update = function(active, state)
	{
		this.div.className = this.div_className +(active ? " active_clock" : " ") +" " + STATE_STR[state]+"_clock";

		var remaining_time = split_time( this.clock.displayed_remaining_time());

		this.remaining_time_label.textContent= pad_int(remaining_time.min, 2)+":"+pad_int(remaining_time.sec, 2) ;



		if(this.remaining_dec_label)
		{
			this.remaining_dec_label.textContent= remaining_time.dec;
		}

		if(this.wheel_label)
		{
			var cent = remaining_time.dec*10+remaining_time.cent;
			cent = (100-cent)%100;
			var wheelchar = '|';
			if(cent > 75) {
				wheelchar = '\\';
			}
			else if (cent > 50)
			{
				wheelchar = '--';
			}
			else if (cent > 25)
			{
				wheelchar = '/';
			}

			//wheelchar = Math.floor((100-cent)/25)+1+"";

			this.wheel_label.textContent = wheelchar;
		}

		this.move_label.textContent = pad_int( this.clock.move_number, 2);
		if (this.remaining_byo_move_label) // update all byo-yomi fields
		{
			if(this.clock.state == BYOYOMI)
				this.remaining_byo_move_label.textContent = pad_int(this.clock.remaining_byo_move, 2);
			else
				this.remaining_byo_move_label.textContent = "--";
			this.remaining_byo_period_label.textContent = this.clock.remaining_byo_period;

		}

		var alert = this.get_alert_state(remaining_time);
		if (alert > 0)
		{
			this.div.className += " alert alert_"+alert;
		}
		else {
			this.div.className += " no_alert";
		}

	};

	this.get_alert_state = function(remaining_time)
	{
		if (remaining_time.total_sec > 11)
		{
			return 0;
		}

		return 10-remaining_time.dec
	}
}

function split_time(time)
{
	var a = new Object();
	a.total_sec= time/1000;
	a.milli = time % 10;
	time -= a.milli;
	time /= 10;


	a.cent = time % 10;
	time -= a.cent;
	time /= 10;

	a.dec =time % 10;
	time -= a.dec;
	time /= 10;

	a.sec = time % 60;
	time -= a.sec;
	time /= 60;

	a.min = time % 60;
	time -= a.min;
	time /= 60;

	a.hour = time % 60;

	return a;

}

function pad_left(s, width, pad )
{
	while (s.length < width)
	{
		s = pad + s;
	}
	return s;
}

function pad_int(a, width)
{
	return pad_left(""+a, width, "0");
}
