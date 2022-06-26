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
        scoreList.push(localStorage.getItem(leaderBoard[i]));

    }
    scoreList.push(sessionScore);
    scoreList.sort();
    scoreList.reverse();
    console.log(scoreList);
    for (let i=0; i<3;i++){
        localStorage.setItem(leaderBoard[i],scoreList[i]); 
    }

    updateLeader();
}
