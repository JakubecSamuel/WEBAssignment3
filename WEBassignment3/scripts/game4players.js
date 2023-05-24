const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      // Set up canvas dimensions
      canvas.width = 500;
      canvas.height = 500;

      // Set up ball properties
      let ballX = canvas.width / 2;
      let ballY = canvas.height / 2;
      let ballDX = -3;
      let ballDY = 3;
      const ballRadius = 10;

      // Set up paddle properties
      const paddleWidth = 10;
      const paddleHeight = 100;
      const paddleWidth2 = 100;
      const paddleHeight2 = 10;
      const paddleSpeed = 20;
      let leftPlayerScore = 0;
      let rightPlayerScore = 0;
      let topPlayerScore = 0;
      let bottomPlayerScore = 0;
      let lastHit = 'n';
      // Set up player 1 paddle (left)
      let leftPaddleY = (canvas.height - paddleHeight) / 2;

      // Set up player 2 paddle (right)
      let rightPaddleY = (canvas.height - paddleHeight) / 2;

      // Set up player 3 paddle (top)
      let topPaddleX = (canvas.width - paddleWidth2) / 2;

      // Set up player 4 paddle (bottom)
      let bottomPaddleX = (canvas.width - paddleWidth2) / 2;

      // Handle player 1 (left) controls
      document.addEventListener("keydown", (event) => {
        if (event.key === "w") {
          leftPaddleY = Math.max(0, leftPaddleY - paddleSpeed);
        } else if (event.key === "s") {
          leftPaddleY = Math.min(canvas.height - paddleHeight, leftPaddleY + paddleSpeed);
        }
      });

      // Handle player 2 (right) controls
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
          rightPaddleY = Math.max(0, rightPaddleY - paddleSpeed);
        } else if (event.key === "ArrowDown") {
          rightPaddleY = Math.min(canvas.height - paddleHeight, rightPaddleY + paddleSpeed);
        }
      });

      // Handle player 3 (top) controls
      document.addEventListener("keydown", (event) => {
        if (event.key === "f") {
          topPaddleX = Math.max(0, topPaddleX - paddleSpeed);
        } else if (event.key === "g") {
          topPaddleX = Math.min(canvas.width - paddleWidth2, topPaddleX + paddleSpeed);
        }
      });

      // Handle player 4 (bottom) controls
      document.addEventListener("keydown", (event) => {
        if (event.key === "j") {
          bottomPaddleX = Math.max(0, bottomPaddleX - paddleSpeed);
        } else if (event.key === "k") {
          bottomPaddleX = Math.min(canvas.width - paddleWidth2, bottomPaddleX + paddleSpeed);
        }
      });

      // Draw the ball on canvas
      function drawBall() {
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
      }

            // Draw the paddles on canvas
    function drawPaddles() {
        // Draw player 1 (left) paddle
        ctx.beginPath();
        ctx.rect(0, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // Draw player 2 (right) paddle
        ctx.beginPath();
        ctx.rect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // Draw player 3 (top) paddle
        ctx.beginPath();
        ctx.rect(topPaddleX, 0, paddleWidth2, paddleHeight2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        // Draw player 4 (bottom) paddle
        ctx.beginPath();
        ctx.rect(bottomPaddleX, canvas.height - paddleHeight2, paddleWidth2, paddleHeight2);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
        
      }

      function drawScore(){
        ctx.fillStyle = "#000";
        ctx.font = "24px Arial";
        ctx.fillText(`${leftPlayerScore}`, 0, leftPaddleY -3);
        ctx.fillText(`${rightPlayerScore}`, canvas.width - paddleWidth -3, rightPaddleY -3);
        ctx.fillText(`${topPlayerScore}`, topPaddleX, 30);
        ctx.fillText(`${bottomPlayerScore}`, bottomPaddleX, canvas.height - paddleHeight2 - 3);
      }

      function updateScore(){
        switch(lastHit) {
            case "l":
                leftPlayerScore++;
                break;
            case "r":
                rightPlayerScore++;
                break;
            case "t":
                topPlayerScore++;
                break;
            case "b":
                bottomPlayerScore++;
                break;
            default:
                break;
            }
        lastHit = 'n';
      }
      // Update the ball's position
      function updateBall() {
        // Check if ball hits left paddle
        if (
          ballX - ballRadius <= paddleWidth &&
          ballY >= leftPaddleY &&
          ballY <= leftPaddleY + paddleHeight
        ) {
          ballDX = -ballDX;
          lastHit = 'l';
        }

        // Check if ball hits right paddle
        if (
          ballX + ballRadius >= canvas.width - paddleWidth &&
          ballY >= rightPaddleY &&
          ballY <= rightPaddleY + paddleHeight
        ) {
          ballDX = -ballDX;
          lastHit = 'r';
        }

        // Check if ball hits top paddle
        if (
          ballY - ballRadius <= paddleHeight2 && ballX >= topPaddleX && ballX <= topPaddleX + paddleWidth2
        ) {
          ballDY = -ballDY;
          lastHit = 't';
        }

        // Check if ball hits bottom paddle
        if (
          ballY + ballRadius >= canvas.height - paddleHeight2 && ballX >= bottomPaddleX && ballX <= bottomPaddleX + paddleWidth2
        ) {
          ballDY = -ballDY;
          lastHit = 'b';
        }

        // Check if ball goes past left or right edge of canvas
        if ((ballX - ballRadius < 0) || (ballX + ballRadius > canvas.width) || (ballY - ballRadius < 0) || (ballY + ballRadius > canvas.height)) {
            updateScore();
            resetBall();
        }

        // Update ball position
        ballX += ballDX;
        ballY += ballDY;
    }

      // Reset ball to center of canvas
      function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        let angle = Math.random() * Math.PI * 2; // Generate a random angle in radians
        let speed = Math.random() * 2 + 2; // Generate a random speed between 2 and 4
        ballDX = Math.cos(angle) * speed; // Calculate the horizontal component of the velocity
        ballDY = Math.sin(angle) * speed; // Calculate the vertical component of the velocity
        }

      // Main game loop
      function gameLoop() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw ball and paddles
        drawBall();
        drawPaddles();
        drawScore();

        // Update ball position
        updateBall();
        drawScore();
        // Request next animation frame
        requestAnimationFrame(gameLoop);
      }

      // Start the game loop
      gameLoop();