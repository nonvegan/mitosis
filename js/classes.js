class Cell {
    constructor(x, y, r, ctx) {
        if (x && y)
            this.pos = new Vector(x, y)
        else
            this.pos = new Vector(getRandomInt(r, ctx.canvas.width - r), getRandomInt(r, ctx.canvas.height - r))

        this.vel = new Vector(getRandomFloat(-2, 2), getRandomFloat(-2, 2))
        this.acc = new Vector(0, 0)
        this.radius = r
        this.ctx = ctx
        this.phase = 1
        this.color = randomHexColor()
    }
    draw() {
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        this.ctx.ellipse(this.pos.x, this.pos.y, this.radius, this.radius, 0, 0, Math.PI * 2)
        this.ctx.fill()
    }
    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if (this.acc.x > 0)
            this.acc.x -= 0.025
        if (this.acc.x < 0)
            this.acc.x += 0.025
        if (this.acc.y > 0)
            this.acc.y -= 0.025
        if (this.acc.y < 0)
            this.acc.y += 0.025
        this.vel = new Vector(getRandomFloat(-2, 2), getRandomFloat(-2, 2))
        this.isHittingWalls()
    }

    isHittingWalls() {
        if (this.pos.x < this.radius) {
            this.pos.x = this.radius
        } else {
            if (this.pos.x > this.ctx.canvas.width - this.radius) {
                this.pos.x = this.ctx.canvas.width - this.radius
            }
        }
        if (this.pos.y < this.radius) {
            this.pos.y = this.radius
        } else {
            if (this.pos.y > this.ctx.canvas.height - this.radius) {
                this.pos.y = this.ctx.canvas.height - this.radius
            }
        }
    }

    fracture() {
        let fractureRatio = getRandomFloat(1.3, 1.5)
        let newCells = new Array(new Cell(this.pos.x, this.pos.y, this.radius / fractureRatio, this.ctx), new Cell(this.pos.x, this.pos.y, this.radius / fractureRatio, this.ctx))
        newCells[0].phase = this.phase * -1
        newCells[1].phase = this.phase * -1
        newCells[0].color = this.color
        newCells[1].color = this.color
        newCells[0].acc = new Vector(1, -1 * newCells[0].phase)
        newCells[1].acc = new Vector(-1, 1 * newCells[1].phase)
        return newCells
    }
}

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(vector) {
        this.x += vector.x
        this.y += vector.y
    }
    sub(vector) {
        this.x -= vector.x
        this.y -= vector.y
    }
    invert() {
        this.x *= -1
        this.y *= -1
    }

    mult(val) {
        this.x *= val
        this.y *= val
    }
    distance(vector) {
        return Math.sqrt(Math.pow(vector.x - this.x, 2) + Math.pow(vector.y - this.y, 2))
    }
}