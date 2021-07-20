let liveScoreSelect=document.getElementById("liveScore");
let scoreLive=0;
let alienImage=document.getElementById("alienImage");
let rocketImage=document.getElementById("rocketImage");
let shotImage=document.getElementById("shotImage");
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
	let randNum =  Math.random();
	if(randNum<0.01){
		let x = Math.floor(Math.random()*(W-50));
		let y = Math.floor(Math.random()*10);
        let speed = 1;
		let negative = Math.random();
		if(negative<0.5){
			speed = -speed;
		}
		let e = new alienClass(x,y,speed);
		aliensArray.push(e);
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
			alert("Game over. Press OK to restart!");
			location.reload();
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
	else{
		startGame();
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
