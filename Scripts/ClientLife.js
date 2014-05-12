$(document).ready(
                 function () {
                     Array.matrix = function (m, n, initial) {
                         var a, i, j, mat;
                         mat = new Array(Life.HEIGHT);
                         for (i = 0; i < Life.HEIGHT; i++) {
                             mat[i] = new Array(Life.WIDTH);
                             for (j = 0; j < Life.WIDTH; j++)
                                 mat[i][j] = initial;
                         }
                         return mat;
                     };
                     
                     var Life = {};
                     Life.CELL_SIZE = 20;
                     Life.X = 4096;
                     Life.Y = 4096;
                     Life.WIDTH = Math.floor(Life.X / Life.CELL_SIZE);
                     Life.HEIGHT =  Math.floor(Life.Y / Life.CELL_SIZE);
                     Life.DEAD = 0;
                     Life.ALIVE = 1;
                     Life.DELAY = 100;
                     Life.STOPPED = 0;
                     Life.RUNNING = 1;
                     Life.minimum = parseInt(document.getElementById("minimumSelect").value);
                     Life.maximum = parseInt(document.getElementById("maximumSelect").value);
                     Life.spawn = parseInt(document.getElementById("spawnSelect").value);
                     Life.state = Life.STOPPED;
                     Life.interval = null;
                     Life.prevGeneretion = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                     Life.grid = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                     Life.counter = 0;
                      
                     if ($("#config").data("cellsize") !== "") {
                         Life.minimum = $("#config").data("min");
                         $("#minimumSelect").val(Life.minimum);
                         Life.maximum = $("#config").data("max");
                         $("#maximumSelect").val(Life.maximum);
                         Life.spawn = $("#config").data("spawn");
                         $("#spawnSelect").val(Life.spawn);
                         Life.CELL_SIZE = $("#config").data("cellsize");
                         var X = $("#config").data("x");
                         var Y = $("#config").data("y");
                         for (var i = 0; i < X.length; i++) {
                             Life.grid[X[i]][Y[i]] = 1;
                             Life.prevGeneretion[X[i]][Y[i]] = 0;
                         }
                       
                     }
                     Life.updateState = function () {
                         var neighbours;
                         var nextGenerationGrid = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                         for (var h = 0; h < Life.HEIGHT; h++) {
                             for (var w = 0; w < Life.WIDTH; w++) {
                                 neighbours = Life.calculateNeighbours(h, w);
                                 if (Life.grid[h][w] !== Life.DEAD) {
                                     if ((neighbours >= Life.minimum) && (neighbours <= Life.maximum)) {
                                         nextGenerationGrid[h][w] = Life.ALIVE;
                                     }
                                 } else {
                                     if (neighbours === Life.spawn) {
                                         nextGenerationGrid[h][w] = Life.ALIVE;
                                     }
                                 }
                             }
                         }
                         Life.copyGrid(Life.grid, Life.prevGeneretion);
                         Life.copyGrid(nextGenerationGrid, Life.grid);
                         Life.counter++;
                     };
                     Life.calculateNeighbours = function (y, x) {
                         var total = (Life.grid[y][x] !== Life.DEAD) ? -1 : 0;
                         for (var h = -1; h <= 1; h++) {
                             for (var w = -1; w <= 1; w++) {
                                 if (Life.grid[(Life.HEIGHT + (y + h)) % Life.HEIGHT][(Life.WIDTH + (x + w)) % Life.WIDTH] !== Life.DEAD) {
                                     total++;
                                 }
                             }
                         }
                         return total;
                     };
                     Life.copyGrid = function (source, destination) {
                         for (var h = 0; h < source.length, h< destination.length; h++) {
                             
                             for (var w = 0; w < source[0].length, w< destination[0].length; w++) {
                             destination[h][w] = source[h][w];
                             }
                         }
                     };
                     function Cell(row, column) {
                         this.row = row;
                         this.column = column;
                     };
                     var gridCanvas = document.getElementById('grid');
                     var counterSpan = document.getElementById("counter");
                     var controlLink = document.getElementById("controlLink");
                     var clearLink = document.getElementById("clearLink");
                     var minimumSelect = document.getElementById("minimumSelect");
                     var maximumSelect = document.getElementById("maximumSelect");
                     var spawnSelect = document.getElementById("spawnSelect");
                     var resizeUpLink = document.getElementById("resizeUp");
                     var resizeDownLink = document.getElementById("resizeDown");
                     var gridSize = document.getElementById("gridSize");
                     var saveLink = document.getElementById("saveOk");
                     gridSize.innerHTML =Life.WIDTH + "x" + Life.HEIGHT;
                     controlLink.onclick = function () {
                         switch (Life.state) {
                             case Life.STOPPED:
                                 Life.prevGeneretion = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                                 for (var h = 0; h < Life.HEIGHT; h++)
                                     for (var w = 0; w < Life.WIDTH; w++) {
                                         Life.prevGeneretion[h][w] = Life.grid[h][w] == 1 ? 0 : 1;
                                     }
                                 Life.interval = setInterval(function () {
                                     update();
                                 }, Life.DELAY);
                                 Life.state = Life.RUNNING;
                                 break;
                             default:
                                 clearInterval(Life.interval);
                                 Life.state = Life.STOPPED;
                         }
                     };
                     clearLink.onclick = function () {
                         Life.grid = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                         Life.counter = 0;
                         clearInterval(Life.interval);
                         Life.state = Life.STOPPED;
                         updateAnimations1();
                     }
                     minimumSelect.onchange = function () {
                         clearInterval(Life.interval);
                         Life.state = Life.STOPPED;
                         Life.minimum = parseInt(this.value);
                         updateAnimations();
                     }
                     maximumSelect.onchange = function () {
                         clearInterval(Life.interval);
                         Life.state = Life.STOPPED;
                         Life.maximum = parseInt(this.value);
                         updateAnimations();
                     }
                     spawnSelect.onchange = function () {
                         clearInterval(Life.interval);
                         Life.state = Life.STOPPED;
                         Life.spawn = parseInt(this.value);
                         updateAnimations();
                     }
                     resizeUpLink.onclick = function () {
                         Life.CELL_SIZE = Math.floor(Life.CELL_SIZE / 2);
                         var oldWidth = Life.WIDTH;
                         var oldHeight = Life.HEIGHT;
                         var oldGrid = Array.matrix(oldHeight, oldWidth, 0);
                         Life.copyGrid(Life.grid, oldGrid);
                         Life.WIDTH =  Math.floor(Life.X / Life.CELL_SIZE);
                         Life.HEIGHT =  Math.floor(Life.Y / Life.CELL_SIZE);
                         Life.grid = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                         Life.prevGeneretion = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                         for (var h = 0; h < oldHeight; h++)
                             for (var w = 0; w < oldWidth; w++) {
                                 Life.grid[h][w] = oldGrid[h][w];
                                 Life.prevGeneretion[h][w] = Life.grid[h][w] === 1 ? 0 : 1;
                             }
                         gridSize.innerHTML = ", Size:" + Life.WIDTH + "x" + Life.HEIGHT;
                         Strokes();
                         updateAnimations();
                     }
                     resizeDownLink.onclick = function () {
                         Life.CELL_SIZE = Math.floor(Life.CELL_SIZE * 2);
                         Life.WIDTH =  Math.floor(Life.X / Life.CELL_SIZE);
                         Life.HEIGHT =  Math.floor(Life.Y / Life.CELL_SIZE);
                         Life.grid = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                         gridSize.innerHTML = ", Size:" + Life.WIDTH + "x" + Life.HEIGHT;
                         clearLink.onclick();
                     }
                     saveLink.onclick = function () {
                         $("#enteringName").dialog("close");
                         var arguments = {};
                         arguments.name = document.getElementById("configName").value;
                         arguments.cellSize = Life.CELL_SIZE;
                         arguments.min = Life.minimum;
                         arguments.max = Life.maximum;
                         arguments.spawn = Life.spawn;
                         arguments.grid = Array.matrix(Life.HEIGHT, Life.WIDTH, 0);
                         Life.copyGrid(Life.grid, arguments.grid);
                         console.log(arguments);
                         $.ajax({
                             type: "POST",
                             url: '/Config/Save',
                             dataType: "json",
                             contentType: 'application/json',
                             traditional: true,
                             data: JSON.stringify(arguments),
                             success: function (data) {
                                 alert(data);
                             }
                         });
                     }
                     function update() {
                         Life.updateState();
                         //updateInput();
                         //updateAI();
                         //updatePhysics();
                         updateAnimations();
                         //updateSound();
                         //updateVideo();
                     };
                     function updateAnimations1() {
                         for (var h = 0; h < Life.HEIGHT; h++) {
                             for (var w = 0; w < Life.WIDTH; w++) {
                                 if (Life.grid[h][w] === Life.ALIVE) {
                                     context.fillStyle = "#000000";
                                 } else {
                                     context.fillStyle = "#FFFFFF";
                                 }
                                 context.fillRect(
                                                                           w * Life.CELL_SIZE + 1,
                                                                           h * Life.CELL_SIZE + 1,
                                                                           Life.CELL_SIZE - 1,
                                                                           Life.CELL_SIZE - 1);
                             }
                         }
                         counterSpan.innerHTML = Life.counter;
                     };
                     function updateAnimations() {
                         for (var h = 0; h < Life.HEIGHT; h++) {
                             for (var w = 0; w < Life.WIDTH; w++) {
                                 if ( Life.prevGeneretion[h][w] === Life.grid[h][w])
                                     continue;
                                 if (Life.grid[h][w] === Life.ALIVE) {
                                     context.fillStyle = "#000";
                                 } else {
                                     context.fillStyle = "#FFFFFF";
                                 }
                                 context.fillRect(
                                                                           w * Life.CELL_SIZE + 1,
                                                                           h * Life.CELL_SIZE + 1,
                                                                           Life.CELL_SIZE - 1,
                                                                           Life.CELL_SIZE - 1);
                             }
                         }
                         counterSpan.innerHTML = Life.counter;
                     };

                     function Strokes() {
                         if (gridCanvas.getContext) {
                             var context = gridCanvas.getContext('2d');
                             context.fillStyle = "white";
                             context.fillRect(0, 0, Life.X, Life.Y);
                             var offset = Life.CELL_SIZE;
                             if (Life.WIDTH < 900) {
                                 for (var x = 0; x <= Life.X; x += Life.CELL_SIZE) {
                                     context.moveTo(0.5 + x, 0);
                                     context.lineTo(0.5 + x, Life.Y);
                                 }
                                 for (var y = 0; y <= Life.Y; y += Life.CELL_SIZE) {
                                     context.moveTo(0, 0.5 + y);
                                     context.lineTo(Life.X, 0.5 + y);
                                 }
                                 context.strokeStyle = "#254117";
                                 context.stroke();
                             }

                         }
                     }
                     if (gridCanvas.getContext) {
                         var context = gridCanvas.getContext('2d');
                         context.fillStyle = "white";
                         context.fillRect(0, 0, Life.X, Life.Y);
                         var offset = Life.CELL_SIZE;
                         
                             for (var x = 0; x <= Life.X; x += Life.CELL_SIZE) {
                                 context.moveTo(0.5 + x, 0);
                                 context.lineTo(0.5 + x, Life.Y);
                             }
                             for (var y = 0; y <= Life.Y; y += Life.CELL_SIZE) {
                                 context.moveTo(0, 0.5 + y);
                                 context.lineTo(Life.X, 0.5 + y);
                             }
                             context.strokeStyle = "#254117";
                             context.stroke();
                         

                             function canvasOnClickHandler(event) {
                                 //Life.copyGrid(Life.grid, Life.prevGeneretion);
                                 var cell = getCursorPosition(event);
                                 var state = Life.grid[cell.row][cell.column] == Life.ALIVE ? Life.DEAD : Life.ALIVE;
                                 Life.grid[cell.row][cell.column] = state;
                                 updateAnimations();
                         };
                         function getCursorPosition(event) {
                             var x;
                             var y;
                             if (event.pageX || event.pageY) {
                                 x = event.pageX + document.getElementById("myCanvas").scrollLeft;
                                 y = event.pageY + document.getElementById("myCanvas").scrollTop;
                             } else {
                                 x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft + document.getElementById("myCanvas").scrollLeft;
                                 y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop + document.getElementById("myCanvas").scrollTop;
                             }
                             x -= gridCanvas.offsetLeft;
                             y -= gridCanvas.offsetTop;

                             var cell = new Cell(Math.floor((y) / Life.CELL_SIZE), Math.floor((x) / Life.CELL_SIZE));
                             return cell;
                         };

                         updateAnimations();
                         gridCanvas.addEventListener("click", canvasOnClickHandler, false);
                     } else {
                         alert("Canvas is unsupported in your browser.");
                     }
                 }


        );


