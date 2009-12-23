// The basic clock setting, contains, inital time, byo yomi etc ...

// So a japenese byo=yomi, 30Mn + 5*30s
// initial_time = 30mn
// byo_move = 1
// byo_time = 30
// byo_period = 5
// extra_time = 0

// Blood bowl
// initial time = 0;
// byo_time = 4:00
// byo_move = 1
// extra_time = 15:00

//times are in second.
function ClockSetting()
{
	this.initial_time = 40*60*1000;
	this.initial_time = 15*1000;
	this.byo_move = 1
	this.byo_time = 30*1000;
	this.byo_period = 5;
	this.extra_time = 0;

	this.copy_from = function(setting)
	{
	this.initial_time = setting.initial_time;
	this.byo_move = setting.byo_move;
	this.byo_time = setting.byo_time;
	this.byo_period = setting.byo_period;
	this.extra_time = setting.extra_time;
	}
}
