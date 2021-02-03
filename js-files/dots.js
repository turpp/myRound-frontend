class Dots{
    constructor(x, y,img, holeNum){
        this.xCor = x
        this.yCor = y
        this.img = img
        this.holeNum = holeNum
    }
    
    FindPosition(oElement)
    {
      if(typeof( oElement.offsetParent ) != "undefined"){
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent){
          posX += oElement.offsetLeft;
          posY += oElement.offsetTop;
        }
          return [ posX, posY ];
        }
        else{
          return [ oElement.x, oElement.y ];
        }
    }
    



    GetCoordinates()
    {
      let PosX = 0;
      let PosY = 0;
      let ImgPos;
      let e = window.event
      ImgPos = dotClass.FindPosition(this);
        PosX = e.pageX;
        PosY = e.pageY;
      let imgPosX = PosX-ImgPos[0];
      let imgPosY = PosY-ImgPos[1];
      let array =[PosX, PosY]
      let imgCor = [imgPosX, imgPosY]
      let oldDot = document.querySelectorAll(`#img-${this.id}`)
      // allDots.push(new Dots(PosX, PosY, this.id.split('-')[0], this.id.split('-'[2])))
      // console.log(allDots)
      oldDot.forEach(function(dot){         
          dot.remove()
      })
      dotClass.placeDot(array,this,imgCor)
      // document.getElementById("x").innerHTML = PosX;
      // document.getElementById("y").innerHTML = PosY;
    }











    // GetCoordinates(e)
    // {
    //   let PosX = 0;
    //   let PosY = 0;
    //   let ImgPos;
    //   ImgPos = dotClass.FindPosition(this);
    //   if (!e) var e = window.event;
    //   if (e.pageX || e.pageY)
    //   {
    //     PosX = e.pageX;
    //     PosY = e.pageY;
    //   }
    //   else if (e.clientX || e.clientY)
    //     {
    //       PosX = e.clientX + document.body.scrollLeft
    //         + document.documentElement.scrollLeft;
    //       PosY = e.clientY + document.body.scrollTop
    //         + document.documentElement.scrollTop;
    //     }
    //   let imgPosX = PosX-ImgPos[0];
    //   let imgPosY = PosY-ImgPos[1];
    //   let array =[PosX, PosY]
    //   let imgCor = [imgPosX, imgPosY]
    //   let oldDot = document.querySelectorAll(`#img-${this.id}`)
    //   oldDot.forEach(function(dot){         
    //       dot.remove()
    //   })
    //   dotClass.placeDot(array,this,imgCor)
    //   // document.getElementById("x").innerHTML = PosX;
    //   // document.getElementById("y").innerHTML = PosY;
    // }

    placeDot(array,img,imgCor){
        let body = document.getElementById('main-body')
        let div = document.createElement('div');
        div.className = 'dot';
        div.id = `img-${img.id}`
        div.dataset.corOnImg = imgCor
        div.style.left = array[0] + 'px';
        div.style.top = array[1] + 'px';
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
