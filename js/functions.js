 function mapValue(value, initialRangeStart, initialRangeEnd, finalRangeStart, finalRangeEnd) {
     if (initialRangeEnd == initialRangeStart)
         console.error("Can't devide by zero");
     else {
         return (value - initialRangeStart) * (finalRangeEnd - finalRangeStart) / (initialRangeEnd - initialRangeStart) + finalRangeStart

     }
 }

 function getRandomFloat(min, max) {
     return Math.random() * (max - min) + min;
 }

 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
 }

 function myFunction(xCoord, yCoord, angle, length) {
     length = typeof length !== 'undefined' ? length : 10;
     angle = angle * Math.PI / 180;
     return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord]
 }

 function getMs(fps) {
     return 1000 / fps
 }

 function getMousePosElem(click) {
     return new Vector(click.clientX - click.target.getBoundingClientRect().x, click.clientY - click.target.getBoundingClientRect().y)
 }

 function randomHexColor() {
     return '#' + (function co(lor) {
         return (lor += [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][Math.floor(Math.random() * 16)]) &&
             (lor.length == 6) ? lor : co(lor);
     })('');

 }