let liveScoreSelect=document.getElementById("liveScore");
let scoreLive=0;
let alienImage=document.getElementById("alienImage");
let rocketImage=document.getElementById("rocketImage");
let shotImage=document.getElementById("shotImage");
let powerImage=document.getElementById("powerImage");
let count=0;
function powerClass(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 50;
	this.h = 50;
	this.speed = speed;
	this.image = function(){
		ctx.drawImage(powerImage,this.x,this.y,this.w,this.h);
	}
	this.update = function(){
	this.x = this.x + this.speed;
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}
		this.y++;
	}
}

function alienClass(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 50;
	this.h = 50;
	this.speed = speed;
	this.image = function(){
		ctx.drawImage(alienImage,this.x,this.y,this.w,this.h);
	}
	this.update = function(){
	this.x = this.x + this.speed;
		if(this.x >= W-this.w || this.x<=0){
			this.speed *= -1;
		}
		this.y++;
	}
}
function bullet(x,y,speed){
	this.x = x;
	this.y = y;
	this.w = 10;
	this.h = 20;
	this.speed = speed;
	this.image = function(){
        ctx.drawImage(shotImage,this.x,this.y,this.w,this.h);
	}
	this.update = function(){
		this.y -= this.speed;
	}
}
function myGameArea(){
canvas = document.getElementById('canvas');
gameFinish = false;
ctx = canvas.getContext('2d'); 
W = canvas.width;
H = canvas.height;
frameNo = 0;
framer = 0;
spaceShip = {
	x : (W/2)-50,
	y : (H/2)-50,
	w : 50,
	h : 50,
	speed : 8,
	bullets : [],
	image : function(){
		ctx.drawImage(rocketImage,spaceShip.x,spaceShip.y,spaceShip.w,spaceShip.h);
	},
	collide : function(){
		if(framer-frameNo>=1){

			let b = new bullet(this.x + (this.w)/2, this.y,10);
			this.bullets.push(b);
			frameNo = framer;
			for(let i=0;i<aliensArray.length;i++)
			{
				if(crashWithBullet(b,aliensArray[i])){
				scoreLive+=3;
				liveScoreSelect.innerHTML=scoreLive;
				let k = aliensArray.indexOf(aliensArray[i]);
				aliensArray.splice(k,1);
				}
			}
		}
	}
};
aliensArray = [];
let e = new alienClass(10,20,1);
aliensArray.push(e);
powerArray=[];
let p= new powerClass(100,50,1);
powerArray.push(p);
}

liveScoreSelect.innerHTML=scoreLive;

function image(){
	ctx.clearRect(0,0,W,H);
	spaceShip.image();
	for(let i=0;i<spaceShip.bullets.length;i++)
	{
		spaceShip.bullets[i].image();
	}
	for(let i=0;i<aliensArray.length;i++)
	{
		aliensArray[i].image();
	}
	for(let i=0;i<powerArray.length;i++)
	{
		powerArray[i].image();
	}
}

let highScoreSelect = document.getElementById("highScore");

if(localStorage.getItem("spaceHigh")===null)
{
	highScoreSelect.innerHTML=0;
}
else{
	highScoreSelect.innerHTML=`${localStorage.getItem("spaceHigh")}`
}

function update(){
	for(let i=0;i<spaceShip.bullets.length;i++)
	{
		spaceShip.bullets[i].update();
	}
	for(let i=0;i<aliensArray.length;i++)
	{
		aliensArray[i].update();
	}
	for(let i=0;i<powerArray.length;i++)
	{
		powerArray[i].update();
	}
	let randNum =  Math.random();
	if(randNum<=0.01){
		let x, y , speed;
		let anoRand= Math.random();
		if(anoRand<0.2)
		{
			x = Math.floor(Math.random()*(W-50));
			y = Math.floor(Math.random()*10);
			speed = 1;
			let negative = Math.random();
			if(negative<0.5){
				speed = -speed;
			}
			let e = new powerClass(x,y,speed);
			powerArray.push(e);
		}
		
		if(count==0){
			x = Math.floor(Math.random()*(W-50));
			y = Math.floor(Math.random()*10);
			speed = 1;
		}
		if(count==1){
			x = Math.floor(Math.random()*(W-50));
			y = Math.floor(Math.random()*40);
			speed = 8;
		}

		let negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}
		let e = new alienClass(x,y,speed);
		aliensArray.push(e);
	}
	else if(randNum>0.01 && randNum<=0.03){
		
		if(count==1){
			console.log("I'm in mission 2")
			let x, y , speed;
			x = Math.floor(Math.random()*(W-50));
			y = Math.floor(Math.random()*40);
			speed = 8;

		let negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}
		let e = new alienClass(x,y,speed);
		aliensArray.push(e);
		}
	}
	for(let i=0;i<powerArray.length;i++)
	{
		if(crash(spaceShip,powerArray[i])){
			scoreLive+=30;
			liveScoreSelect.innerHTML=scoreLive;
			let k = powerArray.indexOf(powerArray[i]);
			powerArray.splice(k,1);
		}
	}
	for(let i=0;i<aliensArray.length;i++)
	{

			if(crash(spaceShip,aliensArray[i])){
				
			if(localStorage.getItem("spaceHigh") === null){
				window.localStorage.setItem("spaceHigh",JSON.stringify(scoreLive));
			}
			else{
				if(parseFloat(window.localStorage.getItem("spaceHigh"))<scoreLive)
        		{
            		window.localStorage.setItem("spaceHigh",JSON.stringify(scoreLive));
        		}  
			}
			document.querySelector("canvas").style.opacity="0.5";
			let btn = document.createElement("BUTTON");
			btn.setAttribute("id", "playAgainButton");
			document.querySelector(".left").appendChild(btn);
			btn.innerHTML ="&nbsp &nbsp"+ "MISSION FAILED!" + '&nbsp &nbsp &nbsp ' +  "START WAR AGAIN!"+"&nbsp &nbsp";
			btn.addEventListener("click",function(){
				location.reload();
			})
			if(count==0){
				clearInterval(timerRun);
			}
			if(count==1){
				clearInterval(timerRun1);
			}
			gameFinish = true;

		}
	}
}

function crash(spaceShip,alien){
	let checkx = Math.abs(spaceShip.x - alien.x)<= Math.max(spaceShip.w,alien.w);
	let checky = Math.abs(spaceShip.y - alien.y)<= Math.max(spaceShip.h,alien.h);
	return checkx && checky;
}

function crashWithBullet(bullet,alien){
	if((alien.y)<bullet.y)
	{
		console.log("hello");
		let checkx = Math.abs(bullet.x - alien.x)<= Math.max(bullet.w,alien.w);
		return checkx ;
	}
}

function updateGameArea(){
	image();
	update();
	framer++;
	if(gameFinish == false){
		window.requestAnimationFrame(updateGameArea);
	}
}


function startGame(){
	myGameArea();
	updateGameArea();
}
startGame();

function keyPress(e){
	if(e.key==" "){
		shootAlien();
	}
	if(e.key=="ArrowLeft"){
		moveLeft();
	}
	if(e.key=="ArrowRight"){
		moveRight();
	}
    if(e.key=="ArrowUp")
    {
		moveUp();
    }
    if(e.key=="ArrowDown")
    {
		moveDown();
	}

}
document.addEventListener('keydown', keyPress);


function moveRight(){
	spaceShip.x = spaceShip.x + spaceShip.speed;
		if(spaceShip.x >= W-spaceShip.w){
			spaceShip.x = W-spaceShip.w;
		}
}
function moveLeft(){
	spaceShip.x = spaceShip.x - spaceShip.speed;
	if(spaceShip.x<=0){
		spaceShip.x= 0;
	}	
}
function moveUp(){
	spaceShip.y=spaceShip.y-spaceShip.speed;
	if(spaceShip.y<=0){
		spaceShip.y= 0;
	}	
}
function moveDown(){
	spaceShip.y=spaceShip.y+spaceShip.speed;
	if(spaceShip.y>=H-spaceShip.h){
		spaceShip.y = H-spaceShip.h;
	}
}

function shootAlien(){
	spaceShip.collide();
}

let c=100;
let f=100;
let timerSelect=document.getElementById("timerId");

function timerFunc1()
{
	count=1;
	f=f-1;
	if(f<100)
	{
		timerSelect.innerHTML=f;
	}
	if(f<1){
		if(localStorage.getItem("spaceHigh") === null){
			window.localStorage.setItem("spaceHigh",JSON.stringify(scoreLive));
		}
		else{
			if(parseFloat(window.localStorage.getItem("spaceHigh"))<scoreLive)
			{
				window.localStorage.setItem("spaceHigh",JSON.stringify(scoreLive));
			}  
		}
		document.querySelector("canvas").style.opacity="0.5";
		let btn = document.createElement("BUTTON");
		btn.setAttribute("id", "playAgainButton");
		document.querySelector(".left").appendChild(btn);
		btn.innerHTML = "Success!✨ You have saved your SpaceShip from WhiteSpikes ✨"+`<br>`+"Click to Start War again"
		btn.addEventListener("click",function(){
			location.reload();
		})
		if(count==0){
			clearInterval(timerRun);
		}
		if(count==1){
			clearInterval(timerRun1);
		}
		gameFinish = true;
		
	}
}

function timerFunc(){
	c=c-1;
	if(c<100){
		timerSelect.innerHTML=c;
	}
	if(c<1){
		scoreLive+=100;
		liveScoreSelect.innerHTML=scoreLive;
		clearInterval(timerRun);
		timerRun1=setInterval("timerFunc1()",1000);
		alert("Congrats!🥳 You are advanced to Mission 2✨ And also, You are awarded with 100 Bonus Points 🌟 Click 'OK' to continue");
		document.getElementById("missionNum").innerHTML=2;
	}
}

let timerRun=setInterval("timerFunc()",1000);
let timerRun1;