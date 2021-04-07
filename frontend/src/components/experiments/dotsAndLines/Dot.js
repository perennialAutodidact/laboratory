class Dot {
  constructor(ctx, startx, starty, radius) {
    this.ctx = ctx;
    this.x = startx;
    this.y = starty;
    this.radius = radius;
    this.velx = Math.random() + 0.1;
    this.vely = Math.random() + 0.1;

    if (Math.random() < 0.5) {
      this.velx *= -1;
    }

    if (Math.random() < 0.5) {
      this.vely *= -1;
    }
  }

  drawLines(neighbors) {
    // if any two dots are within a certain distance 
    // of each other, draw a line between them
    neighbors.forEach((neighbor) => {
      this.ctx.beginPath();
      this.ctx.lineWidth = "2"; // width of the line
      this.ctx.globalAlpha = neighbor.opacity;
      this.ctx.strokeStyle = "white"; // color of the line
      this.ctx.moveTo(this.x, this.y); // begins a new sub-path based on the given x and y values.
      this.ctx.lineTo(neighbor.x, neighbor.y); // used to create a pointer based on x and y
      this.ctx.stroke();
      this.ctx.globalAlpha = 1;
    });
  }

  update() {
    this.x += this.velx;
    this.y += this.vely;

    let top = 0;
    let bottom = this.ctx.canvas.height;
    let left = 0;
    let right = this.ctx.canvas.width;

    let ballRight = this.x + this.radius;
    let ballLeft = this.x - this.radius;
    let ballTop = this.y - this.radius;
    let ballBottom = this.y + this.radius;

    if (ballRight > right) {
      this.velx *= -1;
      this.x = right - this.radius;
    } else if (ballLeft < left) {
      this.velx *= -1;
      this.x = left + this.radius;
    }

    if (ballTop < top) {
      this.vely *= -1;
      this.y = top + this.radius;
    } else if (ballBottom > bottom) {
      this.vely *= -1;
      this.y = bottom - this.radius;
    }
  }

  draw() {
    this.ctx.fillStyle = "#ffffff";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export default Dot;
