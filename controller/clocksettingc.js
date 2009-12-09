function ClockSettingController(setting, setting_div)
{
	this.setting = setting;
	this.div = setting_div;
	this.initial_hour_input = this.div.getElementsByClassName('initial_hour')[0];
	this.initial_min_input = this.div.getElementsByClassName('initial_min')[0];
	this.initial_sec_input = this.div.getElementsByClassName('initial_sec')[0];
	
	this.update_setting = function()
	{


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

	this.update_div();
}


