describe('SpecialDate',function(){
	it('shoule be able to create a date object based on given args',function(){
		var specialDate = new SpecialDate('01','02','1990');
		expect(specialDate.day).toBe(1);
		expect(specialDate.month).toBe(2);
		expect(specialDate.year).toBe(1990);
	});
	it('should be able to get how many days in each month based on the year',function(){
		var specialDate = new SpecialDate('01','02','1990');
		expect(specialDate.getMonthDays(1)).toBe(31);
		expect(specialDate.getMonthDays(2)).toBe(28);
		expect(specialDate.getMonthDays(2,2000)).toBe(29);
		expect(specialDate.getMonthDays(2,2001)).toBe(28);
	});
	it('should be able to get how many days in a year', function(){
		var specialDate = new SpecialDate('01','02','1990');
		expect(specialDate.getYearDays()).toBe(365);
		expect(specialDate.getYearDays(2000)).toBe(366);
	});
	it('should be able to judge whether a year is leap year or not', function(){
		var specialDate = new SpecialDate('01','02','1990');
		expect(specialDate.isLeapYear()).toBe(false);
		expect(specialDate.isLeapYear(2000)).toBe(true);
	});
	it('should be able to show the formatted date', function(){
		var specialDate = new SpecialDate('01','02','1990');
		expect("Formated Date: " + specialDate.toString() ).toBe('Formated Date: 01 02 1990');
	});
	it('should be able to calculate how many days passed since 1990', function(){
		var specialDate = new SpecialDate('01','01','1990');
		expect(specialDate.valueOf()).toBe(0);
		var specialDate = new SpecialDate('01','02','1991');
		expect(specialDate.valueOf()).toBe(397);
		var specialDate = new SpecialDate('01','03','1991');
		expect(specialDate.valueOf()).toBe(425);
	});
	it('should be able to compare', function(){
		var specialDateA = new SpecialDate('01','01','1990');
		var specialDateB = new SpecialDate('01','02','1991');
		var specialDateC = new SpecialDate('01','02','1991');
		expect(specialDateA > specialDateB).toBe(false);
		expect(specialDateA < specialDateB).toBe(true);
		expect(specialDateB.valueOf() == specialDateC.valueOf()).toBe(true);
	});
	it('should be able to be sorted', function(){
		var specialDateA = new SpecialDate('01','01','1990');
		var specialDateB = new SpecialDate('01','02','1991');
		var datesArray = [specialDateB, specialDateA];
		var result = datesArray.sort(function(a,b){return a - b});
		expect(result[0]).toBe(specialDateA);
		expect(result[1]).toBe(specialDateB);
	});
	it('should be able to do calculation', function(){
		var specialDateA = new SpecialDate('01','01','1990');
		var specialDateB = new SpecialDate('01','02','1991');
		expect(specialDateB - specialDateA).toBe(397);
	});
});