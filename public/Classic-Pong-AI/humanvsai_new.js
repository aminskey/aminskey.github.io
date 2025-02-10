let playerPaddle, aiPaddle, ball;
let playerScore = 0;
let aiScore = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playerPaddle = new Paddle(true);
  aiPaddle = new Paddle(false);
  ball = new Ball();
}

function draw() {
  background(0);
  
  // Display and update paddles and ball
  playerPaddle.display();
  playerPaddle.update(ball,playerPaddle, aiPaddle);
  
  aiPaddle.display();
  aiPaddle.update(ball,playerPaddle, aiPaddle);
  
  ball.display();
  ball.update(playerPaddle, aiPaddle);
  
  // Display scores
  fill(255);
  textSize(32);
  text(playerScore, width / 4, 50);
  text(aiScore, 3 * width / 4, 50);
}

class Paddle {
  constructor(isPlayer) {
    this.width = 20;
    this.height = 100;
    this.isPlayer = isPlayer;
    this.x = isPlayer ? 50 : width - 50;
    this.y = height / 2 - this.height / 2;
    this.speed = 5; // Human paddle speed
    this.aiSpeed = 5; // AI paddle speed
  }
  
  display() {
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
  
  update(ball) {
    if (this.isPlayer) {
      this.updateHuman(ball,playerPaddle, aiPaddle);
    } else {
      this.updateAI(ball, playerPaddle, aiPaddle);
    }
    
    // Constrain paddle within canvas
    this.y = constrain(this.y, 0, height - this.height);
  }

  updateHuman(ball,playerPaddle, aiPaddle) {
    if (this.isPlayer) {
      if (keyIsDown(87)) { // W key
        this.y -= this.speed;
      }
      if (keyIsDown(83)) { // S key
        this.y += this.speed;
      }
    }
  }
  /* ********************************************
  
  Her kan I lave jeres AI. I kan vælge at udvide en af de fire
  eller lave jeres helt egen. 
  
  ******************************************/

  updateAI(ball, playerPaddle, aiPaddle,strategy=-1) {
    if(strategy==1){
      this.AI1(ball, playerPaddle, aiPaddle);
    }
    else if(strategy==2){
      this.AI2(ball, playerPaddle, aiPaddle);
    }
    else if(strategy==3){
      this.AI3(ball, playerPaddle, aiPaddle);
    }
    else if(strategy==4){
      this.AI4(ball, playerPaddle, aiPaddle);
    } else {
      if(ball.xSpeed > 0) aiPaddle.y = ball.y;
      else {
        var n = aiPaddle.y - height/2;
        if(n > 0) aiPaddle.y -= this.speed;
        else {
          aiPaddle.y += this.speed;
        }
      }
    }
  }


  AI1(ball, playerPaddle, aiPaddle) {
    // stragegy==1: Move towards the ball
    if (ball.y < aiPaddle.y + aiPaddle.height / 2) {
      aiPaddle.y -= aiPaddle.aiSpeed;
    }
    if (ball.y > aiPaddle.y + aiPaddle.height / 2) {
      aiPaddle.y += aiPaddle.aiSpeed;
    }
  }

  AI2(ball, playerPaddle, aiPaddle) {
    // stragegy==2: Move towards the ball only when it is moving away from the paddle
    if (ball.xSpeed > 0) {
      if (ball.y < aiPaddle.y + aiPaddle.height / 2) {
        aiPaddle.y -= aiPaddle.aiSpeed;
      }
      if (ball.y > aiPaddle.y + aiPaddle.height / 2) {
        aiPaddle.y += aiPaddle.aiSpeed;
      }
    }
  }

  AI3(ball, playerPaddle, aiPaddle) {
    // stragegy==3: Move towards the ball only when it is moving away from the paddle and the ball is on the AI side
    if (ball.xSpeed > 0 && ball.x > width / 2) {
      if (ball.y < aiPaddle.y + aiPaddle.height / 2) {
        aiPaddle.y -= aiPaddle.aiSpeed;
      }
      if (ball.y > aiPaddle.y + aiPaddle.height / 2) {
        aiPaddle.y += aiPaddle.aiSpeed;
      }
    }
  }

  AI4(ball, playerPaddle, aiPaddle) {
    // stragegy==4: The aiPaddle just follow the playerPaddle
    if(aiPaddle.y + aiPaddle.height / 2 < playerPaddle.y + playerPaddle.height / 2){
      aiPaddle.y += aiPaddle.aiSpeed;
    }
    else if(aiPaddle.y + aiPaddle.height / 2 > playerPaddle.y + playerPaddle.height / 2){
      aiPaddle.y -= aiPaddle.aiSpeed;
    }
  }


}

