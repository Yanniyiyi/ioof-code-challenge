window.onload= (function(){
	var inputType = 'enter';
	var fileInputs = null;
	var enteredInputs = null;
	var EventUtil = {
	  addHandler: function(element, type, handler){
	    if(element.addEventListener){
	      element.addEventListener(type,handler, false);
	    }else if(elent.attachEvent){
	      element.attachEvent('on'+type, handler);
	    }else{
	      element["on" + type] = handler;
	    }
	  },
	  getEvent: function(event){
	    return event ? event : window.event
	  },
	  getTarget: function(event){
	    return event.target || event.srcElement;
	  }
    }

	var leapYearDaysPair = {
				'1':31,
				'2':28,
				'3':31,
				'4':30,
				'5':31,
				'6':30,
				'7':31,
				'8':31,
				'9':30,
				'10':31,
				'11':30,
				'12':31,
	}
	var commonYearDaysPair = {
				'1':31,
				'2':28,
				'3':31,
				'4':30,
				'5':31,
				'6':30,
				'7':31,
				'8':31,
				'9':30,
				'10':31,
				'11':30,
				'12':31,
	}

	function isLeapYear(year){
	  return !((year % 4) || (!(year % 100) && (year % 400)));
	};

	function getEnteredArgs(){
		enteredInputs = document.getElementById("dates").value.split('\n');
		
	}

	function formatArgs(inputs){
		return inputs.map(function(item){
			return item.split(',');
		});
	}

	function isValidArgs(args){
		return args.every(isYearInRange);
	}

	function isYearInRange(item){
		var year = parseInt(item.trim().slice(-4));
		return year >= 1990 && year <= 2010;
	}

	function displayResult(result){
		var para = document.createElement("P");                      
		para.appendChild(document.createTextNode(result));                                          
 		document.getElementById('result').appendChild(para);
	}

	function clearPreviousResult(){
		document.getElementById('result').innerHTML = "";
	}

	EventUtil.addHandler(document.getElementById('input-area'),'click',function(event){
		target = EventUtil.getTarget(EventUtil.getEvent(event));
		clearPreviousResult();
		switch(target.id){
			case 'run':
				console.time("start");
				var inputs = null;
				if(inputType === "enter"){
					getEnteredArgs();
					inputs = enteredInputs;
				}else{
					inputs = fileInputs;
				}
				inputs = formatArgs(inputs);
				inputs.forEach(function(item, index){
					if(isValidArgs(item)){
						var sortedResult = sort(item[0].trim().split(" "),item[1].trim().split(" "));
						var daysDiff = getDaysDiff(sortedResult[0],sortedResult[1]);
						displayResult(sortedResult[0].join(" ") + ", " + sortedResult[1].join(" ") + ", " + daysDiff);
					}else{
						displayResult("Invalide years in line " +  (index + 1) + " , year should be between 1990 and 2010");
					}
				})
				console.timeEnd("start");
				break;
			case 'file-input':
				inputType = "file";
				document.getElementById('dates').style.display = "none";
				document.getElementById('file').style.display = "inline-block";
				break;
			case 'enter-input':
				inputType = "enter";
				document.getElementById('dates').style.display = "inline-block";
				document.getElementById('file').style.display = "none";
				break;
		}
	});

	EventUtil.addHandler(document.getElementById('file'),'change',function(event){
		    var input = EventUtil.getTarget(EventUtil.getEvent(event));
		    var file = input.files[0];
		    var reader = new FileReader();
		    reader.onload = function(){
		      var text = reader.result;
		      
		      fileInputs = text.split("\n");
		      
		    };
		    reader.readAsText(file);
	});




	function sort(a,b){
		// compare two dates array, started from year which index is 2;
		for(i = 2; i >=0 ; i--){
			if(a[i] > b[i]){
				return [b,a];
			}
			if(a[i] == b[i]){
				continue;
			}
			if(a[i] < b[i]){
				return [a,b];
			}
		}
		// no result returned from above loop date1 equals date2
		return [a,b];
	}

	function getDaysDiff(firstDate,secondDate){
		var daysDiff = 0;
		var firstYear = parseInt(firstDate[2]);
		var secondYear = parseInt(secondDate[2]);
		var firstMonth = parseInt(firstDate[1]);
		var secondMonth = parseInt(secondDate[1]);
		var firstYearIsLeapYear = isLeapYear(firstYear);
		var secondYearIsLeapYear = isLeapYear(secondYear);

		for(var year = firstYear + 1; year < secondYear; year++){
			
			isLeapYear(year) ? daysDiff += 366 : daysDiff += 365;
			
		} 

		if(firstYear == secondYear){
			// same year, same month
			if(firstMonth == secondMonth){
				return daysDiff = parseInt(secondDate[0]) - parseInt(firstDate[0]);
			}
			else{
				// same year, not same month, how many months between
				for(var month = firstMonth + 1; month < secondMonth; month ++){
					firstYearIsLeapYear ? daysDiff += leapYearDaysPair[month] : daysDiff += commonYearDaysPair[month];
				}
				daysDiff += firstYearIsLeapYear? leapYearDaysPair[firstMonth] - parseInt(firstDate[0]) : commonYearDaysPair[firstMonth] - parseInt(firstDate[0]);
				daysDiff += parseInt(secondDate[0]);
			}
		}else{
			// not same year, Months left for first year
			for(var month = firstMonth + 1; month <= 12; month ++){
				firstYearIsLeapYear ? daysDiff += leapYearDaysPair[month] : daysDiff += commonYearDaysPair[month];
			}

			// not same year month past for second year
			for( month = 1; month < secondMonth; month ++){
				secondYearIsLeapYear ? daysDiff += leapYearDaysPair[month] : daysDiff += commonYearDaysPair[month];
			}

			daysDiff += firstYearIsLeapYear? leapYearDaysPair[firstMonth] - parseInt(firstDate[0]) : commonYearDaysPair[firstMonth] - parseInt(firstDate[0]);
			daysDiff += parseInt(secondDate[0]);
		}
		return daysDiff;
	}
})();
