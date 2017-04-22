const play = document.querySelector('#play');
const reset = document.querySelector('#reset');
const scores = document.querySelector('#scores');
const summary = document.querySelector('#summary');
let tie = false;

function Team(name){
    this.name = name;
    this.goals = 0;
    this.wins = 0;
};
Team.prototype.goal = function(){return this.goals++};
Team.prototype.win = function(){return this.wins++ }

const home = new Team();
const away = new Team();

function score(){
    roundedRandom() === 1 ? home.goal() : away.goal();
}

function tieBreaker(){
    tie = true;
    score()
};

function gameEvent(){
    gamePlay(Math.round(Math.random()*10));

    if(home.goals === away.goals){
        tieBreaker();
    };

    home.goals > away.goals  ? home.win() : away.win();

    message.game(home.goals, away.goals);
    message.series();

    [home.goals, away.goals, tie] = [0, 0, false];
};

function gamePlay(counter){
    if(counter <= 0) return;

    score();
    return gamePlay(counter - 1);
};

const message = {};

message.game = (home, away) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `Home - ${home} Away - ${away}`;

    if(tie === true) listItem.innerHTML = listItem.innerHTML + ` (OT)`
        scores.appendChild(listItem);
};

message.series = () => {
    let msg;

    if(home.wins > away.wins){
        msg = `Home Lead series ${home.wins} - ${away.wins}`;
    }else if(home.wins < away.wins){
        msg = `Away Lead series ${away.wins} - ${home.wins}`;
    }else if(home.wins === away.wins){
        msg = `Series tied ${home.wins} - ${away.wins}`
    }

    if(home.wins === 4){
        msg = `Home wins series ${home.wins} - ${away.wins}`;
    }else if(away.wins === 4){
        msg = `Away wins series ${away.wins} - ${home.wins}`;
    }
    summary.innerHTML = msg;
};

function roundedRandom(){
    return Math.round(Math.random());
}


function resetEvent(){
    [home.wins, away.wins, scores.innerHTML, summary.innerHTML] = [0,0, ' ', `Let's do this!`];
};

play.addEventListener('click', gameEvent);
reset.addEventListener('click', resetEvent);