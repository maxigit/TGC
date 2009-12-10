function ClockSettingController(setting, setting_div)
{
	this.setting = setting;
	this.div = setting_div;
	this.initial_hour_input = this.div.getElementsByClassName('initial_hour')[0];
	this.initial_min_input = this.div.getElementsByClassName('initial_min')[0];
	this.initial_sec_input = this.div.getElementsByClassName('initial_sec')[0];
	
	this.update_setting = function()
	{
		var time = 0;
		if (this.initial_hour_input)
		{
			time += this.initia_hour_input*60*60*1000;
		}

		if (this.initial_min_input)
		{
			time += this.initia_min_input*60*1000;
		}

		if (this.initial_sec_input)
		{
			time += this.initia_sec_input*1000;
		}

		this.setting.initial_time = time;
	}

	this.update_div = function()
	{
		var initial_time = split_time(this.setting.initial_time);
		if (this.initial_hour_input)
		{
			this.initial_hour_input.value = initial_time.hour;
		}
		if (this.initial_min_input)
		{
			this.initial_min_input.value = initial_time.min;
		}
		if (this.initial_sec_input)
		{
			this.initial_sec_input.value = initial_time.sec;
		}
	}

	this.set_onchange_method = function(input)
	{
		if (input)
		{
			input.onchange = on_setting_change;
			input.setting_controller = this;
		}
	}

	this.update_div();
	this.set_onchange_method(this.initial_hour_input);
	this.set_onchange_method(this.initial_min_input);
	this.set_onchange_method(this.initial_sec_input);
}


