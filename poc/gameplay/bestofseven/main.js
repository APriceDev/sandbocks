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
Team.display = (home, away) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `Home - ${home} Away - ${away}`;

    if(tie === true) listItem.innerHTML = listItem.innerHTML + ` (OT)`
        scores.appendChild(listItem);
};

const home = new Team();
const away = new Team();

function gamePlay(counter){
    if(counter <= 0) return;

    roundedRandom() === 1 ? home.goal() : away.goal();
    return gamePlay(counter - 1);
};

function gameEvent(){
    gamePlay(Math.round(Math.random()*10));

    if(home.goals === away.goals){
        tieBreaker();
    };

    home.goals > away.goals  ? home.win() : away.win();

    Team.display(home.goals, away.goals);
    series();

    [home.goals, away.goals, tie] = [0, 0, false];
};

function tieBreaker(){
    tie = true;
    roundedRandom() === 1 ? home.goals++ : away.goals++;
};

function series(){
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
    //console.log(msg);
    summary.innerHTML = msg;
};


function resetEvent(){
    [home.wins, away.wins, scores.innerHTML, summary.innerHTML] = [0,0, ' ', `Let's do this!`];
    //console.clear();
};

function roundedRandom(){
    return Math.round(Math.random());
}

play.addEventListener('click', gameEvent);
reset.addEventListener('click', resetEvent);