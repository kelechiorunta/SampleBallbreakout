const container = document.querySelector(".container");
const testing = document.querySelector(".testing");

var ballleft = false,
  balldown;
//ballleft = false;
//balldown = true;
var userleft = false;
var xx, yy;
var timerId;

xx = 100;
yy = 0;

var useraxes = [xx, yy];
var ballaxes = [xx, yy + 20];

var eggblocks = [],
  hiteggs = [0];

class eggblock {
  constructor(xaxis, yaxis) {
    this.bottomLeft = [xaxis, yaxis];
    this.bottomRight = [xaxis + 50, yaxis];
    this.topLeft = [xaxis, yaxis + 50];
    this.topRight = [xaxis + 50, yaxis + 50];
  }
}

function createeggs() {
  for (let i = 1; i <= 35; i++) {
    const egg = document.createElement("div");
    egg.classList.add("egg");
    egg.setAttribute("id", i);
    egg.setAttribute("type", "egg");
    egg.addEventListener("click", () => {
      egg.innerHTML = egg.id;
    });

    //egg.style.left = xx + (100) + 'px'
    //egg.style.top = yy + (100*i) + 'px'

    container.appendChild(egg);
    eggblocks.push(egg);

    console.log(egg);
  }
}

// function geteggposition(){
//     for(n = 0; n>= 5; n++){
//         eggblocks[n].syle.left = (50 * (n+1)).toString() + "px"
//         eggblocks[n].syle.bottom = (50).toString() + "px"
//     }
// }

// function coloregss(){
//     eggblocks[0].style.backgroundColor = "green"
//     eggblocks[1].style.backgroundColor = "blue"
//     eggblocks[2].style.backgroundColor = "orange"
// }

function createuser() {
  const user = document.createElement("div");
  user.classList.add("user");
  container.append(user);
  redrawuser();
  console.log(user);
}

function createball() {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  container.append(ball);
  redrawball();
  console.log(ball);
}

function redrawuser() {
  user = document.querySelector(".user");
  user.style.left = useraxes[0] + "px";
  user.style.bottom = useraxes[1] + "px";
}

function redrawball() {
  ball = document.querySelector(".ball");
  ball.style.left = ballaxes[0] + "px";
  ball.style.bottom = ballaxes[1] + "px";
}

function moveuser(e) {
  switch (e.key) {
    case "ArrowLeft": {
      if (useraxes[0] >= 10) {
        useraxes[0] -= 10;
        userleft = true;
        redrawuser();
        break;
      }
    }
    case "ArrowRight": {
      if (useraxes[0] <= container.clientWidth - container.clientLeft - 200) {
        useraxes[0] += 10;
        userleft = false;
        redrawuser();
        break;
      }
    }

    default: {
      //userleft = userleft
      console.log(e.key);
    }
  }
}

function moveBall() {
  if (ballleft == true) {
    ballaxes[0] -= 10;
  } else if (ballleft == false) {
    ballaxes[0] += 10;
  }
  if (balldown == true) {
    ballaxes[1] -= 10;
  } else if (balldown == false) {
    ballaxes[1] += 10;
  }

  //ballaxes[1] += 10
  redrawball();
  checkcollision();
  checkeggcollision();
}
timerId = setInterval(moveBall, 100);

createeggs();
createuser();
createball();
//coloregss()
//geteggposition()

document.addEventListener("keydown", moveuser);

function showid(value) {
  testing.style.setProperty("opacity", "0.8");
  testing.style.setProperty("transition", "all 7s ease");
  for (let i = 1; i <= eggblocks.length; i++) {
    eggblocks[i - 1].style.setProperty("background-color", "blue");
    eggblocks[i - 1].style.setProperty("transform", "translateY(220px)");
    eggblocks[i - 1].style.setProperty("opacity", "0");
    eggblocks[i - 1].style.setProperty("pointer-events", "none");
    eggblocks[i - 1].classList.remove("egg");
    //eggblocks.splice(i - 1, 1);
  }
  testing.innerHTML = value.toString();
  return testing.innerHTML;
}

function checkcollision() {
  if (ballaxes[0] <= 0) {
    ballleft = false;
  } //console.log("left edge of frame")}
  else if (ballaxes[0] >= container.clientWidth - container.clientLeft - 20) {
    ballleft = true;
  } //console.log("Right edge of frame")}
  else if (
    ballaxes[1] <= 20 &&
    ballaxes[0] >= useraxes[0] &&
    ballaxes[0] <= useraxes[0] + 200
  ) {
    balldown = false;
  } //console.log("Top edge of frame")}
  else if (ballaxes[1] >= 380) {
    balldown = true;
  } //console.log("Bottom edge of frame")}
  else if (ballaxes[1] < 0) {
    //(!(ballaxes[1] <= 20) && (( ballaxes[0] >= useraxes[0]) && (ballaxes[0] <= useraxes[0] + 200)))
    clearInterval(timerId);
    document.removeEventListener("keydown", moveuser);
    showid("GAME OVER");
    console.log("GAME OVER");
    timerId = 0;
  }
}

// function givepos(){
//         const xaxisegg = eggblocks[0].offsetLeft
//         const yaxisegg = eggblocks[0].offsetTop

//         console.log(xaxisegg)
//         console.log(yaxisegg)
// }

// givepos()

function checkeggcollision() {
  for (let i = 1; i <= eggblocks.length; i++) {
    if (
      ballaxes[0] >= eggblocks[i - 1].offsetLeft &&
      ballaxes[0] <= eggblocks[i - 1].offsetLeft + 50 &&
      ballaxes[1] >= 400 - (eggblocks[i - 1].offsetTop + 70)
    ) {
      hiteggs.push(eggblocks[i - 1]);
      const eggcollided = Array.from(document.querySelectorAll(".egg"));
      console.log("Hurray, you got " + hiteggs.length + " eggs");
      console.log(eggblocks[i - 1]);
      balldown = true;

      if (ballaxes[0] <= useraxes[0] || ballaxes[0] >= useraxes[0] + 100) {
        ballleft = userleft;
      }

      eggblocks[i - 1].style.setProperty("background-color", "red");
      eggblocks[i - 1].style.setProperty("border-radius", "50%");
      eggblocks[i - 1].style.setProperty("transform", "translateY(20px)");
      eggblocks[i - 1].style.setProperty("opacity", "0");
      eggblocks[i - 1].style.setProperty("transition", "all 5s ease");
      //eggblocks[i - 1].style.setProperty("transition", "all 3s ease");
      //function clearegg(){
      //eggblocks[i-1].dataset.active = 'false'
      eggblocks[i - 1].classList.remove("egg");
      eggblocks.splice(i - 1, 1);

      //}

      //setInterval( clearegg, 500)
      //eggblocks[i-1].classList.add('egghit')
      //container.append(eggblocks[i-1])

      if (eggblocks.length == 0) {
        alert("You win");
        document.removeEventListener("keydown", moveuser);
        clearInterval(timerId);
      }
    }
    // }
  }
}
