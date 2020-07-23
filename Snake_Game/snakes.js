function init(){
    //docment object is directly accissble in js code
    // we can find canavs obj by its id "mycnavas"
    var canvas = document.getElementById('mycanvas');
    W=H=canvas.width = canvas.height = 1000;
    pen=canvas.getContext('2d');//pen object to draw something on canvas
    cs=66.5;
    game_over=false;
    score=5;
    //create a image object for food
    food_img =new Image();
    food_img.src="https://user-images.githubusercontent.com/42711978/80275257-b7663c80-86fd-11ea-86f9-7f4be24ceac4.png";
    trophy =new Image();
    trophy.src = "https://user-images.githubusercontent.com/42711978/80277339-e2578d00-870b-11ea-8f6d-99eca26292fd.png";
    food=getrandomfood();



    //snake object 
    
    snake ={
        init_len: 5,
        color:"blue",
        cells:[],
        direction:"right",

        

        createsnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawsnake:function(){
            for(var i=0;i<this.cells.length;i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
            }

           
           

        },

        
        updatesnake:function(){
            // console.log("updatition in snake");
            // this.cells.pop();

            // var headX =this.cells[0].x;
            // var headY =this.cells[0].y;

            // var X= headX +1;
            // var Y= headY;
            // this.cells.unshift({x:X,y:Y});

            //console.log("updatition in snake according to the direction property ");
            //check if the snake has eaten food,increase the length of the snake and
            //generate new food object

            var headX =this.cells[0].x;
            var headY =this.cells[0].y;

            if(headX==food.x && headY==food.y){
                console.log("food eaten");
                food = getrandomfood();
                score++;
            }
            else{
            this.cells.pop();


            }
            

            var nextX,nextY;
            if(this.direction=="right"){
                nextX=headX + 1;
                nextY = headY;
            }
            else if(this.direction=="left"){
                nextX=headX - 1;
                nextY = headY;
            }
            else if(this.direction=="down"){
                nextX = headX;
                nextY = headY+ 1;
            }
            else{
                nextX=headX ;
                nextY = headY- 1;
            }
            this.cells.unshift({x:nextX,y:nextY});

            //write logic that prevents snake to comes out
            var last_x = Math.round(W/cs);
            var last_y =Math.round(H/cs);
            if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x-1 || this.cells[0].y > last_y-1){
				game_over = true;
			}

            






        }


    };
    snake.createsnake();
    //add a event listener on document object
    function keypressed(e){
        //console.log("key pressed",e.key);//as we want specefic property of the object that is key so e.key
        //we can use conditional statements
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        console.log(snake.direction);


    }
    document.addEventListener('keydown',keypressed)

}


function draw(){
//console.log("In Draw");
pen.clearRect(0,0,W,H);
snake.drawsnake();
pen.fillStyle = food.color;
pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
pen.drawImage(trophy,10,20);
pen.fillStyle="blue";
pen.font ="50px Roboto";
pen.fillText(score,35,60);
}

function update(){
    //console.log("In Update");
snake.updatesnake();    


}
function getrandomfood(){
    var foodX =Math.round(Math.random()*(W-cs)/cs);
    var foodY =Math.round(Math.random()*(H-cs)/cs);

    var food ={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}

function gameloop(){
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
        return;
    }

draw();
update();
}

init();


var f= setInterval(gameloop,100);
