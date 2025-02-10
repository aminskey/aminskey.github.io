// DONT TOUCH THIS
class Ball {
    constructor() {
      this.reset();
      this.delta = 1.05 // Speed increase factor
    }
    reset() {
      this.x = width / 2;
      this.y = height / 2;
      this.size = 20;
      //this.xSpeed = random(6, 7) * (random(1) > 0.5 ? 1 : -1);
      //this.ySpeed = random(6, 7) * (random(1) > 0.5 ? 1 : -1);
      this.xSpeed = 5 * (random(1) > 0.5 ? 1 : -1);
      this.ySpeed = 5 * (random(1) > 0.5 ? 1 : -1);
    }
    display() {
      fill(255);
      ellipse(this.x, this.y, this.size);
    }
    update(playerPaddle, aiPaddle) {
      print(this.xSpeed, this.ySpeed)
      this.x = this.x + this.xSpeed;
      this.y = this.y + this.ySpeed;

      // Bounce off top and bottom edges
      if (this.y < 0 || this.y > height) {
        this.ySpeed *= -1;
        this.ySpeed *= this.delta;
        this.xSpeed *= this.delta;
      }
      // Check for collision with paddles
      if (this.x - this.size / 2 < playerPaddle.x + playerPaddle.width &&
          this.y > playerPaddle.y && this.y < playerPaddle.y + playerPaddle.height) {
        this.xSpeed *= -1;
        this.xSpeed *= this.delta;
        this.ySpeed *= this.delta;
        this.x = playerPaddle.x + playerPaddle.width + this.size / 2;
      }
      if (this.x + this.size / 2 > aiPaddle.x &&
          this.y > aiPaddle.y && this.y < aiPaddle.y + aiPaddle.height) {
        this.xSpeed *= -1;
        this.xSpeed *= this.delta;
        this.ySpeed *= this.delta;
        this.x = aiPaddle.x - this.size / 2;
      }
      // Check for scoring
      if (this.x < 0) {
        aiScore++;
        this.reset();
      }
      if (this.x > width) {
        playerScore++;
        this.reset();
      }
    }
  }