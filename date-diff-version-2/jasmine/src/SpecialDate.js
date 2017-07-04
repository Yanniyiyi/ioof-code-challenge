function SpecialDate(dd, mm, yyyy) {
		this.day = parseInt(dd);
		this.month = parseInt(mm);
		this.year = parseInt(yyyy);
		this.toString = function() {
			return (this.day < 10 ? '0' + this.day : this.day) + " " + (this.month < 10 ? '0' + this.month : this.month) + " " + this.year;
		}
		this.valueOf = function() {
			var result = 0;
			if (this.year === this.base && this.month == 1) {
				result = this.day - 1;
			}

			if (this.year === this.base && this.month != 1) {

				for (var month = 1; month < this.month; month++) {
					result += this.getMonthDays(month);
				}
				result += this.day;
			}

			if (this.year > this.base) {
				for (var year = this.base; year < this.year; year++) {
					result += this.getYearDays(year);
				}
				for (var month = 1; month < this.month; month++) {
					result += this.getMonthDays(month);
				}
				result += this.day;
			}
			return result;
		}
		if (typeof SpecialDate.prototype.isLeapYear !== 'function') {
			SpecialDate.prototype.base = 1990;
			SpecialDate.prototype.isLeapYear = function(year) {
				if (year) {
					return !((year % 4) || (!(year % 100) && (year % 400)));
				}
				return !((this.year % 4) || (!(this.year % 100) && (this.year % 400)));
			};
			SpecialDate.prototype.leapYearDaysPair = {
				'1': 31,
				'2': 29,
				'3': 31,
				'4': 30,
				'5': 31,
				'6': 30,
				'7': 31,
				'8': 31,
				'9': 30,
				'10': 31,
				'11': 30,
				'12': 31,
				'total': 366
			};
			SpecialDate.prototype.commonYearDaysPair = {
				'1': 31,
				'2': 28,
				'3': 31,
				'4': 30,
				'5': 31,
				'6': 30,
				'7': 31,
				'8': 31,
				'9': 30,
				'10': 31,
				'11': 30,
				'12': 31,
				'total': 365
			};
			SpecialDate.prototype.getMonthDays = function(month,year) {
				if(year){
					return this.isLeapYear(year) ? this.leapYearDaysPair[month] : this.commonYearDaysPair[month];
				}
				return this.isLeapYear() ? this.leapYearDaysPair[month] : this.commonYearDaysPair[month];
			};
			SpecialDate.prototype.getYearDays = function(year) {
				return this.isLeapYear(year) ? this.leapYearDaysPair.total : this.commonYearDaysPair.total;
			};
		}
}
