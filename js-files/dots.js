class Dots{
    constructor(x, y){
        this.xCor = x
        this.yCor = y
    }

    FindPosition(oElement){
        if(typeof( oElement.offsetParent ) != "undefined")
        {
            for(let posX = 0, posY = 0; oElement; oElement = oElement.offsetParent){
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
            }
            return [ posX, posY ];
            }
        else{
            return [ oElement.x, oElement.y ];
            }
    }
    
    GetCoordinates(e){
      let PosX = 0;
      let PosY = 0;
    //   var ImgPos;
    //   ImgPos = FindPosition(gir);
      if (!e) var e = window.event;
      if (e.pageX || e.pageY){
        PosX = e.pageX;
        PosY = e.pageY;
      }
      else if (e.clientX || e.clientY){
          PosX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
          PosY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
        }
      PosX = PosX;
      PosY = PosY;
      let array =[PosX, PosY]
    //   document.getElementById("x").innerHTML = PosX;
    //   document.getElementById("y").innerHTML = PosY;
      let oldDot = document.querySelectorAll(`#${window.event.path[1].id} .dot`)
      oldDot.forEach(function(dot){
          dot.remove()
      })
      dotClass.placeDot(array, e.path[1])
    }
    
    
    placeDot(array,location){
        let div = document.createElement('div');
        div.className = 'dot';
        div.style.left = array[0] + 'px';
        div.style.top = array[1] + 'px';
        location.appendChild(div)
    }
    
    removeDot(){
        document.querySelectorAll('.dot').forEach(function(el){
            el.remove()
        })
    }
    // gir.onmousedown = GetCoordinates
    // fir.onmousedown = GetCoordinates
}