class Dots{
    constructor(x, y){
        this.xCor = x
        this.yCor = y
    }
    FindPosition(oElement)
    {
      if(typeof( oElement.offsetParent ) != "undefined")
      {
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent)
        {
          posX += oElement.offsetLeft;
          posY += oElement.offsetTop;
        }
          return [ posX, posY ];
        }
        else
        {
          return [ oElement.x, oElement.y ];
        }
    }
    // FindPosition(oElement){
    //   let posX=oElement.offsetLeft
    //   let posY=oElement.offsetTop
    //   var viewportOffset = oElement.getBoundingClientRect();
    //   let div = oElement.parentNode
    //   let divv = div.parentNode
    //   let divvv=divv.parentNode
    //   let divvvv = divvv.parentNode
    //   let card = divvvv.parentNode
    //   let divRect = card.getBoundingClientRect()
    //   let imgRect = oElement.getBoundingClientRect()
    //   let offsetY = imgRect.top - divRect.top
    //   let offsetX = imgRect.left - divRect.left
    //   return [offsetX, offsetY]

    //     // if(typeof( oElement.offsetParent ) != "undefined")
    //     // {
    //     //     for(let posX = 0, posY = 0; oElement; oElement = oElement.offsetParent){
    //     //       console.log('we in this')
    //     //     posX = oElement.offsetLeft;
    //     //     posY = oElement.offsetTop;
    //     //     }
    //     //     return [ posX, posY ];
    //     //     }
    //     // else{
    //     //     console.log('we in else')
    //     //     return [ oElement.x, oElement.y ];
    //     //     }
    // }
    
    GetCoordinates(e)
    {
      var PosX = 0;
      var PosY = 0;
      var ImgPos;
      ImgPos = dotClass.FindPosition(this);
      if (!e) var e = window.event;
      if (e.pageX || e.pageY)
      {
        PosX = e.pageX;
        PosY = e.pageY;
      }
      else if (e.clientX || e.clientY)
        {
          PosX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
          PosY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
        }
      let imgPosX = PosX-ImgPos[0];
      let imgPosY = PosY-ImgPos[1];
      let array =[PosX, PosY]
      let imgCor = [imgPosX, imgPosY]
    

      // document.getElementById("x").innerHTML = imgPosX;
      // document.getElementById("y").innerHTML = imgPosY;
      let oldDot = document.querySelectorAll(`#img-${this.id}`)
      oldDot.forEach(function(dot){ 
        // console.log(dot)
        
          dot.remove()
      })
      
      dotClass.placeDot(array, e.path[1],this, imgCor)


    }





    // GetCoordinates(img,e){
      
    //   let PosX = 0;
    //   let PosY = 0;
    //   var ImgPos;
    //   ImgPos = dotClass.FindPosition(this);
    //   console.log('img-pos=', ImgPos)
    //   if (!e) var e = window.event;
    //   if (e.pageX || e.pageY){
    //     PosX = e.pageX;
    //     PosY = e.pageY;
    //   }
    //   else if (e.clientX || e.clientY){
    //       PosX = e.clientX + document.body.scrollLeft
    //         + document.documentElement.scrollLeft;
    //       PosY = e.clientY + document.body.scrollTop
    //         + document.documentElement.scrollTop;
    //     }
    //   PosX = PosX-ImgPos[0];
    //   PosY = PosY-ImgPos[1];
    //   let array =[PosX, PosY]
    //   console.log(array)
    //   document.getElementById("x").innerHTML = PosX;
    //   document.getElementById("y").innerHTML = PosY;
    //   let oldDot = document.querySelectorAll(`#${window.event.path[1].id} .dot`)
    //   oldDot.forEach(function(dot){
    //       dot.remove()
    //   })
    //   dotClass.placeDot(array, e.path[1])
    // }
    
    
    placeDot(array,location,img, imgCor){
      // console.log('img=',img)
        // let x= array[0] + ImgPos[0]
        // let y = array[1] + ImgPos[1]
        let body = document.getElementById('main-body')
        let div = document.createElement('div');
        div.className = 'dot';
        div.id = `img-${img.id}`
        div.dataset.corOnImg = imgCor
        div.style.left = array[0] + 'px';
        div.style.top = array[1] + 'px';
        // div.style.left = x + 'px'
        // div.style.top = y + 'px'
        body.appendChild(div)
    }
    
    removeDot(){
        document.querySelectorAll('.dot').forEach(function(el){
            el.remove()
        })
    }

    placeDotSummary(array, img){
      let body = document.getElementById('main-body')
      let div = document.createElement('div');
      div.className = 'dot';
      div.style.left = array[0] + 'px';
      div.style.top = array[1] + 'px';
      body.appendChild(div)

    }
    // gir.onmousedown = GetCoordinates
    // fir.onmousedown = GetCoordinates
}









// ***** I have the image getting x and y according to the image now I need to adust my dot placement.