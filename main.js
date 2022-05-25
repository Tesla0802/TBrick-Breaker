let elements = {
  Game: document.querySelector(".game"),
  Desk: document.querySelector(".desk"),
  wallContainer: document.querySelector(".walls"),
  Ball: document.querySelector(".ball"),
  topWall: document.querySelector(".top-wall"),
  leftWall: document.querySelector(".left-wall"),
  rightWall: document.querySelector(".right-wall"),
  bottomWall: document.querySelector(".bottom-wall"),
  scoreEleme: document.querySelector(".Score"),
  overElement: document.querySelector(".over"),
  Walls: [],
};
let styleRoot = document.querySelector(":root");
let gameWidth = elements.Game.getBoundingClientRect().width;
let gameHeight = elements.Game.getBoundingClientRect().height;
let wallLength = 40;
let enableUpdate = true;
let Score = 0;
let ballPhisics = {
  x: getStyleProperty("--ballLeft"),
  y: getStyleProperty("--ballTop"),
  w: elements.Ball.getBoundingClientRect().width,
  h: elements.Ball.getBoundingClientRect().height,
  vx: 3,
  vy: 3,
  speed: 1.5,
};

defData();
requestAnimationFrame(update);

function update() {
  if (!enableUpdate) {
    return;
  }
  checkGameOver();
  ballCatchDask();
  requestAnimationFrame(update);
}
function defData() {
  console.log(ballPhisics);
  mouseMove();
  createWall();
  console.log(elements.Walls);
}
function ballCatchDask() {
  elements.Walls.forEach((item) => {
    if (
      collision(
        elements.Ball.getBoundingClientRect(),
        item.getBoundingClientRect()
      )
    ) {
      crashWall(parseInt(item.getAttribute("data")));
    }
  });

  if (
    collision(
      elements.Desk.getBoundingClientRect(),
      elements.Ball.getBoundingClientRect()
    )
  ) {
    let random = randomNumber(2);
    if (random === 1) {
      ballPhisics.vx *= 1;
      ballPhisics.vy *= -1;
    } else {
      ballPhisics.vx *= -1;
      ballPhisics.vy *= -1;
    }
  } else if (
    collision(
      elements.rightWall.getBoundingClientRect(),
      elements.Ball.getBoundingClientRect()
    )
  ) {
    ballPhisics.vx *= -1;
    ballPhisics.vy *= 1;
  } else if (
    collision(
      elements.leftWall.getBoundingClientRect(),
      elements.Ball.getBoundingClientRect()
    )
  ) {
    ballPhisics.vx *= -1;
    ballPhisics.vy *= 1;
  } else if (
    collision(
      elements.topWall.getBoundingClientRect(),
      elements.Ball.getBoundingClientRect()
    )
  ) {
    ballPhisics.vx *= 1;
    ballPhisics.vy *= -1;
  } else if (
    collision(
      elements.bottomWall.getBoundingClientRect(),
      elements.Ball.getBoundingClientRect()
    )
  ) {
    console.log("lose");
  }
  setStyleProperty("--ballLeft", `${(ballPhisics.x += ballPhisics.vx)}px`);
  setStyleProperty("--ballTop", `${(ballPhisics.y += ballPhisics.vy)}px`);
}
function crashWall(id) {
  elements.Walls.forEach((item) => {
    if (parseInt(item.getAttribute("data")) == id) {
      if (item.classList.contains("disable")) {
        return;
      }
      item.classList.add("disable");
      if (Score % 5 == 0) {
        ballPhisics.speed = ballPhisics.speed + 1;
        ballPhisics.vx = ballPhisics.speed;
        ballPhisics.vy = ballPhisics.speed;
      }
      ballPhisics.vx *= 1;
      ballPhisics.vy *= -1;
      Score++;
      elements.scoreEleme.textContent = `Score ${Score}`;
      if (Score == wallLength) {
        gameWin();
      }
    }
  });
}
function mouseMove() {
  elements.Game.addEventListener("mousemove", (e) => {
    if (!enableUpdate) {
      return;
    }
    setStyleProperty("--deskLeft", `${e.offsetX}px`);
  });
}
function setStyleProperty(variable, value) {
  styleRoot.style.setProperty(variable, value);
}
function getStyleProperty(variable) {
  return parseFloat(getComputedStyle(styleRoot).getPropertyValue(variable));
}
function createWall() {
  for (let i = 0; i < wallLength; i++) {
    let elem = document.createElement("div");
    elem.classList.add("wall");
    elem.setAttribute("data", i);
    elements.Walls.push(elem);
    elements.wallContainer.appendChild(elem);
  }
}
function checkGameOver() {
  if (
    collision(
      elements.Ball.getBoundingClientRect(),
      elements.bottomWall.getBoundingClientRect()
    )
  ) {
    gameOver();
  }
}
function gameOver() {
  enableUpdate = false;
  elements.overElement.style.display = "block";
  elements.Game.addEventListener("click", () => {
    window.location.reload();
  });
}
function gameWin() {
  enableUpdate = false;
  elements.overElement.textContent = "You Win";
  elements.overElement.style.display = "block";
  elements.Game.addEventListener("click", () => {
    window.location.reload();
  });
}
function collision(rect1, rect2) {
  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) {
    return true;
  } else {
    return false;
  }
}
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
