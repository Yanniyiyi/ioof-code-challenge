
window.onload=(function(){
	function Robot(x,y,f){
		this.currentX = x;
		this.currentY = y;
		this.facingTo = f;
	}

	var robotController = {
		availableDirections:['EAST','SOUTH','WEST','NORTH'],
		availabelCommands:['move','right','left','report','place'],
		maxXRange:4,
		maxYRange:4,
		robot: null,
		start: function(){
			document.getElementById('command').addEventListener('keypress',function(event){
				if(event.key.toLowerCase() === 'enter'){
					robotController.clearPreviousMessage();
					var commandStr = this.value.trim();
					var args = commandStr.split(' ');
					var command = args[0].toLowerCase();
					if(robotController.availabelCommands.indexOf(command) > -1){
						var commandArgs = args.splice(1).join("").trim().split(',');
						if(commandArgs.length != 3 && commandArgs != 0)
						{
							robotController.showMessage('invalid command');
							return;
						}
						if(command != 'place' && robotController.robot == null){
							robotController.showMessage('please place robot first');
							return;	
						}
						robotController[command](commandArgs);
					}else{
						robotController.showMessage('invalide command');
					}
					this.select();		
				}
			});
		},
		place:function(args){
			var x = parseInt(args[0]);
			var y = parseInt(args[1]);
			var f = args[2].toUpperCase();
			if(this.isInRange(x,'x') && this.isInRange(y,'y') && this.isValidDirection(f)){
			    this.robot = new Robot(x,y,f);
			    this.report();
			}		
		},
		move:function(){
			var newPostion = null;
			switch(this.robot.facingTo){
				case 'EAST':
					newPostion = this.robot.currentX + 1;
					if(this.isInRange(newPostion,'x')){
						this.robot.currentX = newPostion;
						this.report();
					}
					break;
				case 'SOUTH':
					newPostion = this.robot.currentY - 1;
					if(this.isInRange(newPostion,'y')){
						this.robot.currentY = newPostion;
						this.report();
					}
					break;
				case 'WEST':
					newPostion = this.robot.currentX - 1;
					if(this.isInRange(newPostion,'x')){
						this.robot.currentX = newPostion;
						this.report();
					}
					break;
				case 'NORTH':
					newPostion = this.robot.currentY + 1;
					if(this.isInRange(newPostion,'y')){
						this.robot.currentY = newPostion;
						this.report();
					}
					break;	
			}
			
		},
		right:function(){
			this.rotateRobot('right');
		},
		left:function(){
			this.rotateRobot('left');
		},
		rotateRobot:function(direction){
			var currentFacingIndex = this.availableDirections.indexOf(this.robot.facingTo);
			if(direction == 'right'){
				var newDirection = currentFacingIndex + 1;
				this.robot.facingTo = this.availableDirections[newDirection > 3 ? 0 : newDirection];
				this.report();
				return;
			}

			if(direction == 'left'){
				var newDirection = currentFacingIndex - 1;
				this.robot.facingTo = this.availableDirections[newDirection < 0 ? 3 : newDirection];
				this.report();
				return;
			}

		},
		report:function(){
			this.showMessage("Robot current status: " + this.robot.currentX + ", " + this.robot.currentY + ", " + this.robot.facingTo);
 		},
 		isValidDirection:function(direction){
 			if(this.availableDirections.indexOf(direction) < 0){
 				this.showMessage('invalide direction');
 				return false;
 			}
 			return true;
 		},
		isInRange:function(position,axis){
			if(Math.round(position) != position){
				this.showMessage('please input a number for ' + axis  + " axis");
				return false;
			}

			if(axis.toLowerCase() === 'x' && (position > this.maxXRange || position < 0)){
				this.showMessage('x axis out of range');
				return false;
			}
			if(axis.toLowerCase() === 'y' && (position > this.maxYRange || position < 0)){
				this.showMessage('y axis out of range');
				return false;
			}
			return true;
		},
		clearPreviousMessage(){
			document.getElementById('message').innerHTML = "";
		},
		showMessage:function(message){
			var messageContainer = document.createElement('p');
			var textNode = document.createTextNode(message);
			messageContainer.appendChild(textNode);
			document.getElementById('message').appendChild(messageContainer);
		}
	};
	robotController.start();
})();