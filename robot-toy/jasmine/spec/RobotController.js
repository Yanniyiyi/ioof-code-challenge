describe('RobotController',function(){
	afterEach(function() {
  		robotController.clearPreviousMessage();
  	});

	it('shoule be able to place a robot',function(){
		robotController.place([1,1,'NORTH']);
		expect(robotController.robot.currentX).toBe(1);
		expect(robotController.robot.currentY).toBe(1);
		expect(robotController.robot.facingTo).toBe('NORTH');
	});
	it('should be able to move a robot',function(){
		robotController.place([1,1,'NORTH']);
		robotController.move();
		expect(robotController.robot.currentX).toBe(1);
		expect(robotController.robot.currentY).toBe(2);
		expect(robotController.robot.facingTo).toBe('NORTH');	
	});
	it('should be able to rotate a robot',function(){
		robotController.place([1,1,'NORTH']);
		robotController.left();
		expect(robotController.robot.facingTo).toBe('WEST');	
		robotController.left();
		expect(robotController.robot.facingTo).toBe('SOUTH');	
		robotController.left();
		expect(robotController.robot.facingTo).toBe('EAST');	
		robotController.left();
		expect(robotController.robot.facingTo).toBe('NORTH');
		robotController.right();
		expect(robotController.robot.facingTo).toBe('EAST');	
		robotController.right();
		expect(robotController.robot.facingTo).toBe('SOUTH');	
		robotController.right();
		expect(robotController.robot.facingTo).toBe('WEST');	
		robotController.right();
		expect(robotController.robot.facingTo).toBe('NORTH');
	});
	it("should be able to ingore any move that would cause the robot to fall",function(){
		robotController.place([4,4,'NORTH']);
		robotController.move();
		expect(robotController.robot.currentX).toBe(4);
		expect(robotController.robot.currentY).toBe(4);
		expect(robotController.robot.facingTo).toBe('NORTH');	
	});
	it("routine test 1",function(){
		robotController.place([0,0,'NORTH']);
		robotController.move();
		expect(robotController.robot.currentX).toBe(0);
		expect(robotController.robot.currentY).toBe(1);
		expect(robotController.robot.facingTo).toBe('NORTH');	
	});
	it("routine test 2",function(){
		robotController.place([0,0,'NORTH']);
		robotController.left();
		expect(robotController.robot.currentX).toBe(0);
		expect(robotController.robot.currentY).toBe(0);
		expect(robotController.robot.facingTo).toBe('WEST');	
	});
	it("routine test 3",function(){
		robotController.place([1,2,'EAST']);
		robotController.move();
		robotController.move();
		robotController.left();
		robotController.move();
		expect(robotController.robot.currentX).toBe(3);
		expect(robotController.robot.currentY).toBe(3);
		expect(robotController.robot.facingTo).toBe('NORTH');	
	});

});