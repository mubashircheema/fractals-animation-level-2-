window.addEventListener("load" ,()=>{
    const canvas= document.getElementById("canvas1")
    const ctx= canvas.getContext("2d")
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;  
    //canvas stettings
    
    ctx.lineCap='round';
    ctx.shadowColor ="rgba(0,0,0,0.7)"
    ctx.shadowOffsetX=10;
    ctx.shadowOffsetY=5;
    ctx.shadowBlur=10;
    //effect setting
    let size =canvas.width < canvas.height ? canvas.width*0.3 : canvas.height*0.3;
    const branches=2;
    const maxlevel=4;
    let sides=5;
    let spread=0.5;
    let scale=0.5;
    let color = 'hsl('+ Math.random()*360 +', 100%, 50%)' ;
    let lineWidth = Math.random ()*20+10; 
    //control
    const randomizedButton= document.getElementById("randomizebutton")
    const resetButton = document.getElementById("resetbutton");
    const slider_spread= document.getElementById("spread");
    const label_spread =document.querySelector('[for="spread"]')
    slider_spread.addEventListener('change', function(e){
        console.log(e.target.value)
        spread=e.target.value
        updateSlider()
        drawfractal()

    })
    const slider_sides= document.getElementById("sides")
    const label_sides = document.querySelector('[for="sides"]');
    slider_sides.addEventListener('change', function(e){
        sides=e.target.value
        updateSlider()
        drawfractal()

    })

    function drawBranches(level){
        if (level > maxlevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0 )
        ctx.lineTo(size,0);
        ctx.stroke();
        for(let i=0; i<branches; i++){
            ctx.save();
            ctx.translate(size-(size/branches)*i,0)
            ctx.scale(scale,scale);

            ctx.save();
            ctx.rotate(spread)
            drawBranches(level+1)
            ctx.restore();

            ctx.save();
            ctx.rotate(-spread)
            drawBranches(level+1)
            ctx.restore();
            ctx.restore();
        }
       
    }
    function drawfractal(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.save();
        ctx.lineWidth=lineWidth;
        ctx.strokeStyle= color;
        ctx.translate(canvas.width/2,canvas.height/2)
        for( let i=0; i<sides; i++){
            ctx.rotate((Math.PI*2)/sides);
            drawBranches(0);
        }
        ctx.restore()
        randomizedButton.style.backgroundColor= color;

    }
    drawfractal()

    function randomizedFractal(){
    sides=Math.floor(Math.random()*7+2);
    scale=Math.random()*0.4+0.2;
    spread=Math.random()*2.9+0.1;
    color = 'hsl('+ Math.random()*360 +', 100%, 50%)'
    lineWidth = Math.random ()*20+10; 
    randomizedButton.style.backgroundColor= color;
    }

    randomizedButton.addEventListener('click', function(){
        randomizedFractal()
        updateSlider()
        drawfractal();
      });

    function resetFacrtoral(){
        sides=5;
        scale=0.5;
        spread=0.5;
        color = 'hsl(290 , 100%, 50%)'
        lineWidth = 10 ; 
    }
    resetButton.addEventListener('click', function(){
        resetFacrtoral()
        updateSlider()
        drawfractal()
    })
 
    function updateSlider(){
        slider_spread.value=spread;
        label_spread.innerText= 'spread:' + Number(spread).toFixed(2);
        slider_sides.value=sides;
        label_sides.innerText= 'sides:' + sides;
    } 
    updateSlider()

   
 
})