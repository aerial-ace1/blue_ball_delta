function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

var leaderBoard = ['first','second','third'];

for (let i=0; i<3;i++){

    if ( null === localStorage.getItem(leaderBoard[i])){ 
        localStorage.setItem(leaderBoard[i],0); 
    } 
}

function updateLeader(){
    for (let i=0; i<3;i++){
        document.getElementById(`${leaderBoard[i]}`).innerHTML = localStorage.getItem(leaderBoard[i]);
    }
}

function playerScore( sessionScore ){
    scoreList = []
    for (let i=0; i<3;i++){
        scoreList.push(Number(localStorage.getItem(leaderBoard[i])));

    }
    scoreList.push(sessionScore);
    console.log(scoreList);
    scoreList.sort();
    scoreList.reverse();
    console.log(scoreList);
    for (let i=0; i<3;i++){
        localStorage.setItem(leaderBoard[i],scoreList[i]); 
    }

    updateLeader();
}

function heart_maker() {
    new_heart = new spawning_lives();
    heart_list.push(new_heart);
    new_heart.draw();
}

function banana_maker() {
    new_banana = new spawning_banana();
    banana_list.push(new_banana);
    new_banana.draw();
}

function boost_maker() {
    new_boost = new spawning_boost();
    boost_list.push(new_boost);
    new_boost.draw();
}

function powerup_caller() {

    picker = randomIntFromRange(1,3);
    if (picker === 1) { heart_maker();}
    else if (picker === 2) { banana_maker();}
    else { boost_maker();}
}

function collision( r1, r2 ) {
    return (
      r1.x + r1.height >= r2.x &&
      r1.x <= r2.x + r2.height &&
      r1.y + r1.height >= r2.y &&
      r1.y <= r2.y + r2.height
    )
  }

function end(){
    hearts -= 1;
    unanimate();
    window.removeEventListener("keydown",movement);
    clearInterval(platform_generator);
    clearInterval(powerup_generator);
    score_but.innerHTML = score;

    if (hearts === 0 ){
        play_audio("end");
        playing = false;
        playerScore(score);
        play_but.innerHTML = "Restart";
        play_but.addEventListener("click",start);
    }
    else {
        replay = setTimeout( function () {
            start()
        }, 1000);
    }
}

document.addEventListener('visibilitychange', function (event) {
    active = document.hidden;
});

function play_audio(id){
    let audio = document.querySelector(`#${id}`);
    audio.currentTime = 0;
    audio.play();
}