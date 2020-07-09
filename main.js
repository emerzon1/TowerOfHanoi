//Each disk is y = 580 - (NUMDISK*25) -> if 0 based otherwise it is 605 - (NUMDISK*25);
let numDisks = 3;
var stackA = [];//FIX RESET BUTTON;
var stackB = [];
var stackC = [];
var winT = $(".Win");
winT.text("lol");
var d1 = $(".one");
var d2 = $(".two");
var d3 = $(".three");
var d4 = $(".four");
var d5 = $(".five");
var d6 = $(".six");
var startTime = Date.now();
var ogLeft = 312.5;
var ogTop = 455;
var diskArr = [d1, d2, d3, d4, d5, d6];
setup();
var score = 0;
var selector = $("#disks");
var isOneCLICKED = false;
var clickedPole = "";
var start = false;
var started = false
var end = true;

selector.change(function(){

	if(parseInt(selector.val()) != numDisks){
		numDisks = parseInt(selector.val());
		reset();
		document.getElementById('expected').textContent = "Minimum score: " + (Math.pow(2, numDisks) - 1);
		redraw(parseInt(selector.val()));
	}
});
function sleep(ms)
{
    return(
        new Promise(function(resolve, reject)
        {
            setTimeout(function() { resolve(); }, ms);
        })
    );
}
moves = [];
$(".solve").click(function(){
	reset();
	redraw(parseInt(selector.val()));
	moves = [];
	helper(parseInt(selector.val()), 0, 2, 1);
	otherHelper(moves);
});
function delay(){
	return new Promise(resolve => {
		setTimeout(() => { resolve(); }, 500); 
	  }); 
	   
}
async function otherHelper(arr){
	for(let i = 0; i < arr.length ;i ++){
		await delay()
		get(parseInt(arr[i][1])).push(get(parseInt(arr[i][0])).pop());
		score++;
		console.log("mv disk from" + arr[i][0] + " to " + arr[i][1]);
		draw();
	}
}
function helper(n, src, dest, spare){
	if(n==1){
		moves.push(src + "" + dest)
		//console.log(stackA + " " + stackB + " " + stackC);
		
	}
	else{
		helper(n-1, src, spare, dest)
		moves.push(src + "" + dest)
		helper(n-1, spare, dest, src);
	}
}
function get(src){
	if(src==0){
		return stackA;
	}
	if(src==1){
		return stackB;
	}
	if(src==2){
		return stackC;
	}
}
$(".reset").click(function(){
	reset();
	redraw(parseInt(selector.val()));
});
$(".aContainer").click(function(){
	//alert('clicked');
	//alert($('.one').css('left'));
	//$(".one").css("left", parseInt($(".one").css("left").replace("px", "")) + {VALUE HERE} + "px");
	start = true;
	if(stackA.length == 0 && !isOneCLICKED){
		isOneCLICKED = false;
		console.log("That click didn't count!");
	}
	else if(isOneCLICKED){
		switch(clickedPole){
			case "B":
				if(stackB[stackB.length-1]<stackA[stackA.length-1] || stackA.length==0){
					stackA.push(stackB.pop());
				}
				score++;
				break;
			case "C":
				stackA.push(stackC.pop());
				if(stackC[stackC.length-1]<stackA[stackA.length-1] || stackA.length==0){
					stackA.push(stackC.pop());
				}
				score++;
				break;
		}
		isOneCLICKED = false;
		
		document.getElementById('score').textContent = "Your score is: " + score;
		draw();
	}
	else if(!isOneCLICKED){
		clickedPole = "A"
		isOneCLICKED = true;
	}
	console.log("A: " + stackA + " B: " + stackB + " C: " + stackC);
	isWin();
});
$(".bContainer").click(function(){
	start = true;
	//alert('clicked');
	//alert($('.one').css('left'));
	//$(".one").css("left", parseInt($(".one").css("left").replace("px", "")) + {VALUE HERE} + "px");
	if(stackB.length == 0 && !isOneCLICKED){
		isOneCLICKED = false;
		console.log("That click didn't count!");
	}
	else if(isOneCLICKED){
		switch(clickedPole){
			case "A":
				if(stackA[stackA.length-1]<stackB[stackB.length-1]|| stackB.length==0){
					stackB.push(stackA.pop());
				}
				score++;
				break;
			case "C":
				if(stackC[stackC.length-1]<stackB[stackB.length-1]|| stackB.length==0){
					stackB.push(stackC.pop());
				}
				score++;
				break;
		}
		isOneCLICKED = false;
		draw();

		document.getElementById('score').textContent = "Your score is: " + score;
	}
	else if(!isOneCLICKED){
		clickedPole = "B"
		isOneCLICKED = true;
	}
	console.log("A: " + stackA + " B: " + stackB + " C: " + stackC);
	isWin();
});
$(".cContainer").click(function(){
	start = true;
	if(stackC.length == 0 && !isOneCLICKED){
		isOneCLICKED = false;
		console.log("That click didn't count!");
	}
	else if(isOneCLICKED){
		switch(clickedPole){
			case "A":
				if(stackA[stackA.length-1]<stackC[stackC.length-1]|| stackC.length==0){
					stackC.push(stackA.pop())
				}
				score++;
				break;
			case "B":
				if(stackB[stackB.length-1]<stackC[stackC.length-1]|| stackC.length==0){
					stackC.push(stackB.pop());
				}
				score++;
				break;
		}
		isOneCLICKED = false;

		document.getElementById('score').textContent = "Your score is: " + score;
		draw();
	}
	else if(!isOneCLICKED){
		clickedPole = "C"
		isOneCLICKED = true;
	}
	isWin();
});
function setup(){
	d4.hide();
	d5.hide();
	d6.hide();
	stackA = [3, 2, 1];
	d1.css("top", parseInt(d1.css("top").replace('px', '')) + 75 + "px"); 
	d2.css("top", parseInt(d2.css("top").replace('px', '')) + 75 + "px"); 
	d3.css("top", parseInt(d3.css("top").replace('px', '')) + 75 + "px"); 
	winT.text("");
}
function isWin(){
	var w = true;
	
	if(stackC.length==numDisks){
		stackC.reverse()
		for(var i = 0 ; i < stackC.length; i ++){
			if(stackC[i] == i+1){
				console.log("good");
			}
			else{
				w = false;
				break;
			}
		}	
	}
	else{
		w = false;
	}
	if(w){
		end = false;
		winT.text("You Win! Click the reset button to play again.");
	}
	
}
function reset(){
	stackA = [];
	stackB = [];
	stackC = [];
	score = 0;
	document.getElementById('score').textContent = "Your score is: " + score;
	for(var i = 0; i < diskArr.length; i ++){
		diskArr[i].hide();
		diskArr[i].css("left", ogLeft-12.5*i);
		diskArr[i].css('top', ogTop + 25*i);
	}
	winT.text("");
}


function redraw(n){
	document.getElementById('expected').textContent = "Minimum score: " + (Math.pow(2, n) - 1);
	score = 0;
	document.getElementById('score').textContent = "Your score is: " + score;
	for(var i = 0; i < n; i ++){
		diskArr[i].show();
		//alert(((6-n)*25 + "px"));
		stackA.unshift(i+1);
		//alert(parseInt(diskArr[i].css("top").replace("px", "")) + ((6-n)*25) + "px");
		diskArr[i].css("top", parseInt(diskArr[i].css("top").replace("px", "")) + ((6-n)*25) + "px");
	}
	winT.text("");

}
function draw(){
	//draw stackA
	document.getElementById('score').textContent = "Your score is: " + score;
	for(var i = 0; i < stackA.length; i ++){//THERE ARE TWO (3, 2) -> the TOP SHOULDN'T CHANGE
		diskArr[stackA[i]-1].css("top", ogTop + ((6-i)*25) - 25 + "px");
		diskArr[stackA[i]-1].css("left", ogLeft - .5 * parseInt(diskArr[stackA[i]-1].css("width").replace("px", "")) + 25);
	}
	for(var i = 0; i < stackB.length; i ++){//THERE ARE TWO (3, 2) -> the TOP SHOULDN'T CHANGE
		diskArr[stackB[i]-1].css("top", ogTop + ((6-i)*25) - 25 + "px");
		//diskArr[stackB[i]-1].css("left", (parseInt(diskArr[stackB[i] - 1].css("top").replace("px", "")) %400 + 400) + "px");
		diskArr[stackB[i]-1].css("left", ogLeft - .5 * parseInt(diskArr[stackB[i]-1].css("width").replace("px", "")) + 425);
	}
	for(var i = 0; i < stackC.length; i ++){//THERE ARE TWO (3, 2) -> the TOP SHOULDN'T CHANGE
		diskArr[stackC[i]-1].css("top", ogTop + ((6-i)*25) - 25 + "px");
		diskArr[stackC[i]-1].css("left", ogLeft - .5 * parseInt(diskArr[stackC[i]-1].css("width").replace("px", "")) + 825);
	}

}