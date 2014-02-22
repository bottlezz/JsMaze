// width and height must be ODD!!
function generateMaze(width, height){
	var cells = height*width;
	var maze = new Array();
	for(var i=0; i<cells; i++){
	    maze[i] = 1;
	}
	
	//functions
	function addAdjacent(index){
	    var shifts = [-width, width, -1, 1];
	    for(var i=0; i<shifts.length; i++){
	        if(isInMaze(index+shifts[i])==0){
	            walls.push(index+shifts[i]);
	        }
	    }
	}
	
	function isInMaze(index){
	    return (1 - maze[(index)]);
	}
	
	function returnOtherSide(index){
	    if(index%width%2!=0){
	        if(maze[index-1]!=0)
	            return (index-1);
	        else if(maze[index+1]!=0)
	            return (index+1);
	        else
	            return 0;
	    }
	    if(maze[index-width]!=0)
	        return (index-width);
	    else if(maze[index+width]!=0)
	        return (index+width);
	    else
	        return 0;
	
	    return -1;
	}
	
	var walls = new Array();
	//start
	maze[0] = 0;
	addAdjacent(0);
	
	while(walls.length>0){
	    var randomIndex = Math.floor(Math.random() * walls.length);
	    var randomWall = walls[randomIndex];
	    //check if the other side is in the maze
	    var otherSide = returnOtherSide(randomWall);
	    if(otherSide != 0){
	        // mark it as a part of the maze
	        maze[otherSide] = 0;
	        // also mark the wall to be part of the maze
	        maze[randomWall] = 0;
	        // add all adjacent cells to the wall list
	        addAdjacent(otherSide);
	    }
	    walls.splice(randomIndex, 1);
	}
	
	return maze;
}


function returnFrame(index, width, height){
	var centerX = index%width;
	var centerY = index/width;
	return returnFrame2(centerX, centerY, width, height);
	
}

function isOutBound(indexX, indexY, width, height){
	if(indexX < 0 || indexX >= width)
		return 1;
	if(indexY < 0 || indexY >= height)
		return 1;
	return 0;
}

function returnFrame2(centerX, centerY, width, height){
	var frameSize = 11;
	var frame = new Array();
	for(var i=0; i<frameSize; i++){
		frame[i] = new Array();
	}
	var windowSize = (frameSize-1)/2;
	var leftCornerX = centerX - windowSize;
	var leftCornerY = centerY - windowSize;

	for(var i=leftCornerX; i<leftCornerX+frameSize; i++){
		for(var j=leftCornerY; j<leftCornerY+frameSize; j++){
			if(isOutBound(i, j, width, height)>0)
				frame[j-leftCornerY][i-leftCornerX] = 1;
			else
				frame[j-leftCornerY][i-leftCornerX] = maze[j*width+i];
		}
	}
	return frame;
}

