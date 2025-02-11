let aiPaddleLeft, aiPaddle, ball;
let playerScore = 0;
let aiScore = 0;

let aivsai = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  aiPaddleLeft = new Paddle(true);
  aiPaddle = new Paddle(false);
  ball = new Ball();
  background(0);
}

function draw() {
  background(0);

  
  // Display and update paddles and ball
  aiPaddleLeft.display();
  aiPaddleLeft.update(ball,aiPaddleLeft, aiPaddle);
  
  aiPaddle.display();
  aiPaddle.update(ball,aiPaddleLeft, aiPaddle);
  
  ball.display();
  ball.update(aiPaddleLeft, aiPaddle);
  
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
    this.speed = 7; // Human paddle speed
    this.aiSpeed = 7; // AI paddle speed
    this.calculated = false;
  }
  
  display() {
    if(!this.isPlayer)
      fill(255,0, 0);
    else{
      fill(0, 255, 0);
    }
    
    rect(this.x, this.y, this.width, this.height);
  }
  
  update(ball) {
    if (this.isPlayer) {
      //this.updateAILeft(ball,aiPaddleLeft, aiPaddle);
      this.updateAI(ball, aiPaddle, aiPaddleLeft, 1);
    } else {
      this.updateAI(ball, aiPaddleLeft, aiPaddle,6);
    }
    
    // Constrain paddle within canvas
    this.y = constrain(this.y, 0, height - this.height);
  }

   /* ********************************************
  
  Her kan I indsætte jeres venstre  AI så de kan spille mod hinanden. 
  Bemærk updateAILeft forventer at this.x og this.y justere positionen 
  
  ******************************************/

  MoveTowards(y, ofCenter) {
    if (y > height/2) y -= ofCenter
    else y += ofCenter
    if (y < this.y + this.height / 2) {
      this.y -= min(this.aiSpeed, abs(y - (this.y + this.height / 2)));
    }
    if (y > this.y + this.height / 2) {
      this.y += min(this.aiSpeed, abs(y - (this.y + this.height / 2)))
    }
  }
  BestAI(ball, aiPaddleLeft, aiPaddle, ofCenter = 0) {
    let Left = (this.x < width/2)
    //let ofCenter = this.height/2 - 30
    //ofCenter = 0
    if ((ball.xSpeed < 0 && Left) || (ball.xSpeed > 0 && !Left)) {
      let by = 0
      if (Left) by = (max(ball.x - 70, 0))/abs(ball.xSpeed) * ball.ySpeed + ball.y
      else by = (min(width - 70 - ball.x, width))/abs(ball.xSpeed) * ball.ySpeed + ball.y
      //if (by < height && by > 0) this.MoveTowards(by, ofCenter)
      //if (by >= height) this.MoveTowards(2*height - by, ofCenter)
      //if (by <= 0) this.MoveTowards(-by, ofCenter)
      while (by > height || by < 0) {
        if (by >= height) by = 2*height - by
        if (by <= 0) by = -by
      }
      this.MoveTowards(by, ofCenter)
    }
    else {
      let by = 0
      if (Left) by = ((width-70) - ball.x + (width-140))/abs(ball.xSpeed) * ball.ySpeed + ball.y
      else by = ((width-140) + ball.x - 70)/abs(ball.xSpeed) * ball.ySpeed + ball.y
      while (by > height || by < 0){
        if (by >= height) by = 2*(height) - by
        if (by <= 0) by = -by
    }
      this.MoveTowards(by, ofCenter)
    }
  }

  updateAILeft(ball,aiPaddle, aiPaddleRight) {
    // stragegy==1: Move towards the ball
    // notice this.y should be changed instead of aiPaddle.y
    // so you have to find and replace
    if(ball.xSpeed < 0) {
      var n = 0, x=0;
      var a = ball.ySpeed / ball.xSpeed;
      var b = ball.y - a*ball.x;

      while(!this.calculated){
        if(a > 0){
          x = this.top(a, b);
          var y = (a*x) + b;
          a *= -ball.delta;
          b = y - (a*x);
        }else{
          x = this.zero(a, b);
          var y = (a*x) + b;
          a *= -ball.delta;
          b = y - (a*x);
        }
        
        if(x >= aiPaddle.x)
          this.calculated = true;
          break;
      }
      
      //n = (abs(n - ball.y) > 6)? n : ball.y;
      // n = (a*aiPaddle.x) + b;
      n = min(max((a*aiPaddle.x) + b), height);

      if(n < aiPaddle.y + aiPaddle.height/3)
        aiPaddle.y -= aiPaddle.speed;
      if(n > (aiPaddle.y + aiPaddle.height* 2/3))
        aiPaddle.y += aiPaddle.speed;
      
      strokeWeight(5);
      stroke(0, 0, 255);
      line(ball.x, ball.y, aiPaddle.x, n);
      stroke(255);
      point(aiPaddle.x, n);
      noStroke();

    } 
    else if(ball.x > width/2) aiPaddle.calculated = false;
    else {
      this.calculated = true;
      if(!this.isInRange(aiPaddle.y, aiPaddle.height/2, height * 5/12, height * 7/12)){
        if((aiPaddle.y + aiPaddle.height/2) < height/2)
          aiPaddle.y += this.aiSpeed;
        else if((aiPaddle.y + aiPaddle.height/2) > height/2)
          aiPaddle.y -= this.aiSpeed;
      }
    } 
  }


  updateAI(ball, aiPaddleLeft, aiPaddle, strategy) {
    if(strategy==1){
      this.AI1(ball, aiPaddleLeft, aiPaddle);
    }
    else if(strategy==2){
      this.AI2(ball, aiPaddleLeft, aiPaddle);
    }
    else if(strategy==3){
      this.AI3(ball, aiPaddleLeft, aiPaddle);
    }
    else if(strategy==4){
      this.AI4(ball, aiPaddleLeft, aiPaddle);
    } else if(strategy == 5) {
      if(ball.xSpeed > 0) {
        var n = 0, x=0;
        var a = ball.ySpeed / ball.xSpeed;
        var b = ball.y - a*ball.x;

        while(!aiPaddle.calculated){
          if(a > 0){
            x = this.top(a, b);
            var y = (a*x) + b;
            a *= -ball.delta;
            b = y - (a*x);
          }else{
            x = this.zero(a, b);
            var y = (a*x) + b;
            a *= -ball.delta;
            b = y - (a*x);
          }
          
          if(x >= aiPaddle.x)
            aiPaddle.calculated = true;
            break;
        }
        
        //n = (abs(n - ball.y) > 6)? n : ball.y;
        // n = (a*aiPaddle.x) + b;
        n = min(max((a*aiPaddle.x) + b), height);

        if(n < aiPaddle.y + aiPaddle.height/3)
          aiPaddle.y -= aiPaddle.speed;
        if(n > (aiPaddle.y + aiPaddle.height* 2/3))
          aiPaddle.y += aiPaddle.speed;
        
        strokeWeight(5);
        stroke(255, 0, 255);
        line(ball.x, ball.y, aiPaddle.x, n);
        stroke(255);
        point(aiPaddle.x, n);
        noStroke();

      } 
      else if(ball.x < width/2) aiPaddle.calculated = false;
      else {
        aiPaddle.calculated = true;
        if(!this.isInRange(aiPaddle.y, aiPaddle.height/2, height * 5/12, height * 7/12)){
          if((aiPaddle.y + aiPaddle.height/2) < height/2)
            aiPaddle.y += this.aiSpeed;
          else if((aiPaddle.y + aiPaddle.height/2) > height/2)
            aiPaddle.y -= this.aiSpeed;
        }
      }
    } else if (strategy == 6){
      if(ball.xSpeed > 0){
        if(!aiPaddle.calculated){
          var d = new Ball();
          d.x = ball.x;
          d.y = ball.y;
          d.xSpeed = ball.xSpeed;
          d.ySpeed = ball.ySpeed;

          while(d.x <= aiPaddle.x - aiPaddle.width){
            d.x = d.x + d.xSpeed;
            d.y = d.y + d.ySpeed;

            // Bounce off top and bottom edges
            if (d.y < 0 || d.y > height) {
              d.ySpeed *= -1;
              d.ySpeed *= d.delta;
              d.xSpeed *= d.delta;
            }
            // Check for collision with paddles
            if (d.x - d.size / 2 < aiPaddleLeft.x + aiPaddleLeft.width &&
                d.y > aiPaddleLeft.y && d.y < aiPaddleLeft.y + aiPaddleLeft.height) {
              d.xSpeed *= -1;
              d.xSpeed *= d.delta;
              d.ySpeed *= d.delta;
              d.x = aiPaddleLeft.x + aiPaddleLeft.width + d.size / 2;
            }
            if (d.x + d.size / 2 > aiPaddle.x &&
                d.y > aiPaddle.y && d.y < aiPaddle.y + aiPaddle.height) {
              d.xSpeed *= -1;
              d.xSpeed *= d.delta;
              d.ySpeed *= d.delta;
              d.x = aiPaddle.x - d.size / 2;
            }
          }

          if (d.y > aiPaddle.y + aiPaddle.height/3 && n < (aiPaddle.y + aiPaddle.height* 2/3)){
            aiPaddle.calculated = true;
          } 
          else if(d.y < aiPaddle.y + aiPaddle.height/3)
            aiPaddle.y -= aiPaddle.aiSpeed;
          else if(d.y > (aiPaddle.y + aiPaddle.height* 2/3))
            aiPaddle.y += aiPaddle.aiSpeed;
        }
      }
      else if(ball.x < width/2) aiPaddle.calculated = false;
      else {
        aiPaddle.calculated = true;
        var d = new Ball();
        d.x = ball.x;
        d.y = ball.y;
        d.xSpeed = ball.xSpeed;
        d.ySpeed = ball.ySpeed;
        while(d.x <= aiPaddle.x - aiPaddle.width){
          d.x = d.x + d.xSpeed;
          d.y = d.y + d.ySpeed;

          // Bounce off top and bottom edges
          if (d.y < 0 || d.y > height) {
            d.ySpeed *= -1;
            d.ySpeed *= d.delta;
            d.xSpeed *= d.delta;
          }
          // Check for collision with paddles
          if (d.x - d.size / 2 < aiPaddleLeft.x + aiPaddleLeft.width &&
              d.y > aiPaddleLeft.y && d.y < aiPaddleLeft.y + aiPaddleLeft.height) {
            d.xSpeed *= -1;
            d.xSpeed *= d.delta;
            d.ySpeed *= d.delta;
            d.x = aiPaddleLeft.x + aiPaddleLeft.width + d.size / 2;
          }
          if (d.x + d.size / 2 > aiPaddle.x &&
              d.y > aiPaddle.y && d.y < aiPaddle.y + aiPaddle.height) {
            d.xSpeed *= -1;
            d.xSpeed *= d.delta;
            d.ySpeed *= d.delta;
            d.x = aiPaddle.x - d.size / 2;
          }
        }
        if(d.y < aiPaddle.y + aiPaddle.height/3)
          aiPaddle.y -= aiPaddle.aiSpeed;
        else if(d.y > (aiPaddle.y + aiPaddle.height* 2/3))
          aiPaddle.y += aiPaddle.aiSpeed;
      }
    }
  }
  
  isInRange(x, off, s, b){
    return (x - off) > s && (x + off) < b;
  }


  zero(a,b) { return -b/a;}
  top(a,b) { return (height-b)/a;}

  AI1(ball, aiPaddleLeft, aiPaddle) {
    // stragegy==1: Move towards the ball
    if (ball.y < aiPaddle.y + aiPaddle.height / 2) {
      aiPaddle.y -= aiPaddle.aiSpeed;
    }
    if (ball.y > aiPaddle.y + aiPaddle.height / 2) {
      aiPaddle.y += aiPaddle.aiSpeed;
    }
  }

  AI2(ball, aiPaddleLeft, aiPaddle) {
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

  AI3(ball, aiPaddleLeft, aiPaddle) {
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

  AI4(ball, aiPaddleLeft, aiPaddle) {
    // stragegy==4: The aiPaddle just follow the aiPaddleLeft
    if(aiPaddle.y + aiPaddle.height / 2 < aiPaddleLeft.y + aiPaddleLeft.height / 2){
      aiPaddle.y += aiPaddle.aiSpeed;
    }
    else if(aiPaddle.y + aiPaddle.height / 2 > aiPaddleLeft.y + aiPaddleLeft.height / 2){
      aiPaddle.y -= aiPaddle.aiSpeed;
    }
  }


}

