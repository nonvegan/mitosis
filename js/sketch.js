const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const button = document.createElement('button')
const range = document.createElement('input')
const nCellsLabel = document.createElement('h1')
range.setAttribute("type", "range")
button.innerHTML = "<span>Boomer</span> Button"
button.addEventListener('click', () => boom())
document.addEventListener('keydown', (key) => {
    if (key.key == " ")
        boom()
})
range.addEventListener('input', () => {
    if (nSpawnedCells != Math.round(range.value / 5)) {
        nSpawnedCells = Math.round(range.value / 5)
        while (cells.length > nSpawnedCells)
            cells.pop()
        while (cells.length < nSpawnedCells)
            cells.push(new Cell(getRandomInt(50, width - 50), getRandomInt(50, height - 50), 50, ctx))
    }
})
canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < cells.length; i++) {
        if (getMousePosElem(e).distance(cells[i].pos) < cells[i].radius) {
            document.body.style.cursor = 'pointer';
            return
        } else {
            document.body.style.cursor = '';
        }
    }

})
divRanges.appendChild(range)
divRanges.appendChild(button)
divRanges.appendChild(nCellsLabel)

const width = 600
const height = 600
canvas.width = width
canvas.height = height
let nSpawnedCells = range.value / 5
const cells = new Array

for (let i = 0; i < nSpawnedCells; i++) {
    cells.push(new Cell(getRandomInt(75, width - 75), getRandomInt(75, height - 75), 75, ctx))
}

canvas.addEventListener('click', click => {
    for (let i = cells.length - 1; i >= 0; i--) {
        if (getMousePosElem(click).distance(cells[i].pos) < cells[i].radius) {
            for (const cell of cells[i].fracture()) {
                cells.push(cell)
            }
            cells.splice(i, 1)
        }
    }
})

function update() {
    ctx.clearRect(0, 0, width, height)
    for (const cell1 of cells) {
        cell1.update()
        cell1.draw()
        for (const cell2 of cells) {
            if (cell2 != cell1 && cell1.pos.distance(cell2.pos) < cell1.radius * .95 + cell2.radius * .95) {
                cell1.acc = new Vector(-.0075 * (cell2.pos.x - cell1.pos.x), -.0075 * (cell2.pos.y - cell1.pos.y))

            }
        }
    }
    nCellsLabel.innerHTML = `<span>${cells.length} </span> Cells`
}

function boom() {
    for (let i = cells.length - 1; i >= 0; i--) {
        for (const cell of cells[i].fracture()) {
            cells.push(cell)
        }
        cells.splice(i, 1)
    }
}

setInterval(() => {
    update()
}, getMs(50));
