const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
var platform_list = [];
var platform_generator;
var hearts;
var play_but = document.getElementById('play');
var score_but = document.getElementById('score');
var score;
var playing = false;
var replay;


canvas.width = 700;
canvas.height = 300;


const colors = ['#5ffbd6', '#7ECEFD', '#FFF6E5', '#FF0000']


function init() {
    
    c.clearRect(0, 0, canvas.width, canvas.height);
    platform_list =[]

    moving_ball = new ball(canvas.width/2 - 5, 300 -50,0,1,10);
    window.addEventListener("keydown",movement);
    
    one_platform(250 ,canvas.width/2-125 , 300 -50+10 );
    two_platform();
    platform_generator = setInterval( platformpicker, 1000);
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].draw();
    }
    spikes = new spike("background/spikes.png");
    spikes.draw();    
}


// Animation Loop
function animate() {
    
    score_but.innerHTML = score;

    animate_func = requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    moving_ball.update();
    moving_ball.dx = 0;
    for (var i=0; i<platform_list.length; i++) {
        platform_list[i].update();
    }
    spikes.draw(); 
}

function unanimate(){
    cancelAnimationFrame(animate_func);
}

function start() {
    
    if (playing != true){
        score = 0;
        play_but.removeEventListener("click",start);
        hearts = 3;
        playing = true;
    }
    play_but.innerHTML = "Playing";
    init();
    animate();
}

updateLeader();
play_but.addEventListener("click",start);

