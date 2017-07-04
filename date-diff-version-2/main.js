window.onload = (function() {

    var inputUtil = new InputUtil();
/*
		InputUtil has two functions:
		1. Managing input type;
		2. Based on input, generating pairs of date. Each pair is an arry of 2 SpecialDate objects. 
		   and the return value is an array of pair of date
	 */
	function InputUtil() {
		this.inputType = false;
		this.fileInput = null;
		this.enteredInput = null;
		if (typeof InputUtil.prototype.clearPreviousResult !== 'function') {
			InputUtil.prototype.changeInputType = function() {
				this.fromFile = !this.fromFile;
			};
			InputUtil.prototype.getDatePairs = function() {
				input = this.fromFile ? this.fileInput : this.enteredInput;
				return input.split('\n').map(function(item) {
					var args = item.split(',');
					var firstDate = args[0].trim().split(' ');
					var secondDate = args[1].trim().split(' ');
					return [new SpecialDate(firstDate[0], firstDate[1], firstDate[2]), new SpecialDate(secondDate[0], secondDate[1], secondDate[2])];
				});
			};
		};
	}



/*
	Event handler for different browser
	 */
	var EventUtil = {
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (elent.attachEvent) {
				element.attachEvent('on' + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		getEvent: function(event) {
			return event ? event : window.event
		},
		getTarget: function(event) {
			return event.target || event.srcElement;
		}
	}

/*
    SpecialDate is an object created based on dd, mm and yyyy;
     */
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


/*
    Main function used to get days between a pair of date
     */
	function dateDiff() {
		var datePairs = null;
		if (inputUtil.fromFile) {
			datePairs = inputUtil.getDatePairs();
		} else {
			inputUtil.enteredInput = document.getElementById("dates").value
			datePairs = inputUtil.getDatePairs();
		}
		datePairs.forEach(function(datePair, index) {
			if (isValidDate(datePair)) {
				datePair.sort(compare);
				displayResult(datePair[0].toString() + ", " + datePair[1].toString() + ", " + (datePair[1] - datePair[0]));
			} else {
				displayResult("Invalide years in line " + (index + 1) + " , year should be between 1990 and 2010");
			}
		});
	}


	function isValidDate(dates) {
		return dates.every(isYearInRange);
	}

	function isYearInRange(date) {
		var year = date.year;
		return year >= 1990 && year <= 2010;
	}

	function compare(a, b) {
		return a - b;
	}

	function displayResult(result) {
		var para = document.createElement("P");
		para.appendChild(document.createTextNode(result));
		document.getElementById('result').appendChild(para);
	}

	function clearPreviousResult() {
		document.getElementById('result').innerHTML = "";
	}

	EventUtil.addHandler(document.getElementById('input-area'), 'click', function(event) {
		target = EventUtil.getTarget(EventUtil.getEvent(event));
		switch (target.id) {
		case 'run':
			console.time("dateDiff() cost:");
			clearPreviousResult();
			dateDiff();
			console.timeEnd("dateDiff() cost:");
			break;
		case 'file-input':
			inputUtil.changeInputType();
			clearPreviousResult();
			document.getElementById('dates').style.display = "none";
			document.getElementById('file').style.display = "inline-block";
			break;
		case 'enter-input':
			inputUtil.changeInputType();
			clearPreviousResult();
			document.getElementById('dates').style.display = "inline-block";
			document.getElementById('file').style.display = "none";
			break;
		}
	});

	EventUtil.addHandler(document.getElementById('file'), 'change', function(event) {
		var input = EventUtil.getTarget(EventUtil.getEvent(event));
		var file = input.files[0];
		var reader = new FileReader();
		reader.onload = function() {
			var text = reader.result;
			inputUtil.fileInput = text;
		};
		reader.readAsText(file);
	});

})();