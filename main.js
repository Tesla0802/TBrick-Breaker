document.addEventListener("DOMContentLoaded", () => {
  let elements = {
    Game: document.queryCommandIndeterm(".game"),
  };
  let gameWidth = elements.Game.getBoundingClientRect().width;
  let gameHeight = elements.Game.getBoundingClientRect().height;

  function defData() {
    mouseMove();
  }
  function mouseMove() {
    elements.Game.addEventListener("mousemove", (e) => {
      console.log(e.offsetX, e.offsetY);
    });
  }
});
