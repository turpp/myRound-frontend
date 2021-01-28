const roundSetup = document.getElementById('round-setup')
const mainDiv =document.getElementById('main-div')
const holesDiv = document.getElementById('holes-div')
const summaryDiv = document.getElementById('summary')


roundSetup.addEventListener('submit', function(e){
    e.preventDefault()
    if(e.target.num_of_holes.value > 0){
    }fetch('http://localhost:3000/rounds', {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num_of_holes: e.target.num_of_holes.value
        })
    }).then(resp => resp.json()).then(function(round){
        // let newRound = new Round(round.id, round.score, round.gir, round.fir, round.num_of_holes)
        // mainDiv.innerHTML = ''
        // for(let i =0; i < newRound.num_of_holes; i++){
        //     mainDiv.innerHTML += `<div data-hole=${i+1} class='hole'>Hole ${i+1} score:__<div>`
        // }
        return round
    }).then(function(round){
        fetch(`http://localhost:3000/rounds/${round.id}/holes`,{
            method: 'Post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num_of_holes: round.num_of_holes,
                round_id: round.id
            })
        }).then(resp => resp.json()).then(function(holes){
            mainDiv.innerHTML = ''
            let button;
            let div;
            for(let i = 0; i<holes.length; i++){
                button = document.createElement('button')
                button.type = 'button'
                button.className = "collapsible"
                button.dataset.holeNum = i+1
                button.dataset.id = holes[i].id
                holesDiv.appendChild(button)
                button.innerHTML = `Hole ${i+1} score:__`
                
                div = document.createElement('div')
                div.className = 'content'
                holesDiv.appendChild(div)
                    div.innerHTML =`
                        <form data-hole=${holes[i].id} id='hole-form'>
                        <div id='gir-hole-${i+1}'> <img id='gir-hole-${i+1}' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='350' height='350'></div>
                        <div id='fir-hole-${i+1}'> <img id='fir-hole-${i+1}' src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='350' height='350'></div>
                        <label>Par</label>
                        <input type='number' name='par' value = ${holes[i].par ? holes[i].par : 0}>
                        <label>Putts</label>
                        <input type='number' name='putts' value = ${holes[i].putts ? holes[i].putts : 0}>
                        <label>Score</label>
                        <input type='number' name='score' value = ${holes[i].score ? holes[i].score : 0}>
                        <input type='submit' value='Submit Hole'>
                        </form>
                        <br>
                        `
                        document.getElementById(`gir-hole-${i+1}`).onmousedown = GetCoordinates
                        document.getElementById(`fir-hole-${i+1}`).onmousedown = GetCoordinates



            }

            let coll = document.getElementsByClassName("collapsible");
            let i;
            
            for (i = 0; i < coll.length; i++) {
              coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.display === "block") {
                    // console.log(document.querySelectorAll(`#${this.nextElementSibling.childNodes[1].id} .dot`))
                  content.style.display = "none";
                } else {
                  content.style.display = "block";
                }
              });
            }

            summaryDiv.innerHTML = `<button data-round=${holes[0].round_id} type='button'>Finalize Round</button>`
            
            // let button;
            // for(let i =0; i < holes.length; i++){
            //     button = document.createElement('button')
            //     button.type = 'submit'
            //     button.className = 'hole'
            //     mainDiv.appendChild(button)
            // button.innerHTML += `<div data-hole=${holes[i].id} data-round=${holes[i].round_id} class='hole'>Hole ${i+1} score:__<div>`
            // }

        })
    })
    
})
// document.addEventListener('click',function(e){
//     console.log(e.target)
//     let div;
//     if(e.target.className == 'hole'){
//         div = document.createElement('div')
//         div.className = 'content'
//         e.target.appendChild(div)
//         fetch(`http://localhost:3000/rounds/${e.target.dataset.round}/holes/${e.target.dataset.hole}`).then(resp => resp.json()).then(function(hole){
//             console.log(hole)
//             div.innerHTML =`
//                     <form id='hole-form'>
//                     <span><img src='https://i.pinimg.com/564x/ec/17/22/ec1722fc44678bff1d60194f357e3769.jpg' alt='green' width='350' height='350'>
//                     <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAACvCAMAAABqzPMLAAAAeFBMVEX///8AAAB4eHjy8vJWVlZ8e3w4ODju7u4NAAA8AAC7vL3p6em3uLn4+fmws7NYTE1xb28aAABkX1+qq6vNAAB8AAClAgRtAABrcHBWUVF1AABHAQRkAADT1dXh4uI7OzswAgQqAAAiAAC2AgSZAAAzAACZm5vGxscANfV+AAAB2klEQVR4nO3Uy04UQQCG0SlHZBgFkVEuXsAb+v5v6ErSTUi+jUm34Zxd7f58qarNBoDV279eesG6vDmdn892b49e8OD83cVh2me/e/9hMHF5dT0NdHzz8dPSk9bl88mX2RM7GuN2y1+nr8bYPA60/Ydf3H/vqUDHy0xZJ4GCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGg8FSg7TJT1unuUaDtxcnXwcS377fTQPvx42rpSety+fN6doXOd+PmJQ/G/f2vWaDfh/n5uTs7HJaeAM/DH3j5H6NdRWy2AAAAAElFTkSuQmCC' alt='fairway' width='350' height='350'>
//                     </span>
//                     <label>Putts</label>
//                     <input type='number' name='putts' value = ${hole.putts ? hole.putts : 0}>
//                     <label>Score</label>
//                     <input type='number' name='score' value = ${hole.score ? hole.score : 0}>
//                     <input type='submit' value='Submit Hole'>
//                     </form>
//                     <br>
//             `
//         }).then(function(){
//             let holeFrom = document.getElementById('hole-form')
//             holeFrom.addEventListener('submit', function(e){
//                 e.preventDefault()
//                 console.log('just sumbitted the edit form for hole')
//             })
//         })

//     }
// })

// mainDiv.addEventListener('click', function(e){
//     let holeForm;
//     if (e.target.className == 'hole'){
        
//         e.target.innerHTML += `
//         <form id='hole-form'>
//         <span><img src='https://i.pinimg.com/564x/ec/17/22/ec1722fc44678bff1d60194f357e3769.jpg' alt='green' width='350' height'350'>
//         <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAACvCAMAAABqzPMLAAAAeFBMVEX///8AAAB4eHjy8vJWVlZ8e3w4ODju7u4NAAA8AAC7vL3p6em3uLn4+fmws7NYTE1xb28aAABkX1+qq6vNAAB8AAClAgRtAABrcHBWUVF1AABHAQRkAADT1dXh4uI7OzswAgQqAAAiAAC2AgSZAAAzAACZm5vGxscANfV+AAAB2klEQVR4nO3Uy04UQQCG0SlHZBgFkVEuXsAb+v5v6ErSTUi+jUm34Zxd7f58qarNBoDV279eesG6vDmdn892b49e8OD83cVh2me/e/9hMHF5dT0NdHzz8dPSk9bl88mX2RM7GuN2y1+nr8bYPA60/Ydf3H/vqUDHy0xZJ4GCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGg8FSg7TJT1unuUaDtxcnXwcS377fTQPvx42rpSety+fN6doXOd+PmJQ/G/f2vWaDfh/n5uTs7HJaeAM/DH3j5H6NdRWy2AAAAAElFTkSuQmCC' alt='fairway' width='350' height='350'>
//         </span>
//         <label>Putts</label>
//         <input type='number' name='putts'>
//         <label>Score</label>
//         <input type='number' name='score'>
//         <input type='submit' value='Submit Hole'>
//         </form>
//         <br>
//         `
//     }
    

// })

holesDiv.addEventListener('submit', function(e){
    e.preventDefault()
    let girId = window.event.path[0].childNodes[1].id
    let firId = window.event.path[0].childNodes[3].id
    let girDotArray = document.querySelectorAll(`#${girId} .dot`) 
    let firDotArray = document.querySelectorAll(`#${firId} .dot`)
    let girCor = `${girDotArray[0].style.left.split('px')[0]}-${girDotArray[0].style.top.split('px')[0]}`
    let firCor =`${firDotArray[0].style.left.split('px')[0]}-${firDotArray[0].style.top.split('px')[0]}`
    // I have the id i now need to query all and get the dots and then sytle left and top to get the cordinates to save
    // console.log(girCor, firCor)
    fetch(`http://localhost:3000/holes/${e.target.dataset.hole}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            par: e.target.par.value,
            score: e.target.score.value,
            putts: e.target.putts.value,
            girloc: girCor,
            fwloc: firCor
        })
    }).then(resp=> resp.json()).then(function(hole){
        let parent =e.target.parentNode
        parent.style.display = 'none'
        let grandparent = parent.previousElementSibling
        grandparent.innerHTML = `Hole ${grandparent.dataset.holeNum} score: ${hole.score}`

        // removeDot()
        //going to hide dots
        let girDot = document.querySelectorAll(`#gir-hole-${grandparent.dataset.holeNum} .dot`)
        let firDot =document.querySelectorAll(`#fir-hole-${grandparent.dataset.holeNum} .dot`)
        // girDot.forEach(dot => console.log(dot.style.top))
        // firDot.forEach(dot => console.log(dot.style.left))
        let yGirDot = girDot[0].style.top
        let xGirDot = girDot[0].style.left
        let xFirDot = firDot[0].style.left
        let yFirDot = firDot[0].style.top
        let dotObj = {
            girDot: [xGirDot.split('px')[0], yGirDot.split('px')[0]],
            firDot: [xFirDot.split('px')[0], yFirDot.split('px')[0]]
        }
        // console.log(dotObj)
        

        //


        e.target.innerHTML = `
        <div id='gir-hole-${grandparent.dataset.holeNum}'> <img id='gir-hole-${grandparent.dataset.holeNum}' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='350' height='350'></div>
        <div id='fir-hole-${grandparent.dataset.holeNum}'> <img id='fir-hole-${grandparent.dataset.holeNum}' src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='350' height='350'></div>
<label>Par</label>
        <input type='number' name='par' value = ${hole.par ? hole.par : 0}>
        <label>Putts</label>
        <input type='number' name='putts' value = ${hole.putts ? hole.putts : 0}>
        <label>Score</label>
        <input type='number' name='score' value = ${hole.score ? hole.score : 0}>
        <input type='submit' value='Submit Hole'>
        `
        document.getElementById(`gir-hole-${grandparent.dataset.holeNum}`).onmousedown = GetCoordinates
        document.getElementById(`fir-hole-${grandparent.dataset.holeNum}`).onmousedown = GetCoordinates
        placeDot(dotObj.girDot, document.getElementById(`gir-hole-${grandparent.dataset.holeNum}`))
        placeDot(dotObj.firDot, document.getElementById(`fir-hole-${grandparent.dataset.holeNum}`))

    })
})


summaryDiv.addEventListener('click', function(e){
    fetch(`http://localhost:3000/rounds/${e.target.dataset.round}/summary`).then(resp => resp.json()).then(function(summary){
    console.log(summary.girArray)   
    holesDiv.innerHTML = '' 
    summaryDiv.innerHTML = `
        <h1> Round Summary</h1>
        <h3>Score: ${summary.score}</h3>
        <br>
        <div id='gir-summary'> <img id='gir-summary' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='350' height='350'></div>
        <div id='fir-summary'> <img id='fir-summary'  src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='350' height='350'></div>
        <p>Putts: ${summary.putts}</p>
        <p>Gir: ${summary.gir}</p>
        `
        console.log('gir=', summary.girArray, 'fir=', summary.fwArray)
        summary.girArray.forEach(function(cordinate){
        placeDot(cordinate, document.getElementById('gir-summary'))
        })
        summary.fwArray.forEach(function(cordinate){
        placeDot(cordinate, document.getElementById('fir-summary'))
        })
        document.getElementById('gir-summary').onmousedown = GetCoordinates

    })

    // summary.girArray.forEach(function(cordinate){
    //     placeDot(cordinate, document.getElementById('gir-summar'))
    // })
    // summary.fwArray.forEach(function(cordinate){
    //     placeDot(cordinate, document.getElementById('fir-summary'))
    // })
    // placeDot(summary.girArray, document.getElementById('gir-summary'))
    // placeDot(summary.fwArray, document.getElementById('fir-summary'))
})


// everything for gir and fir location marking and saving-----------------

function FindPosition(oElement)
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

function GetCoordinates(e)

{
  var PosX = 0;
  var PosY = 0;
//   var ImgPos;
//   ImgPos = FindPosition(gir);
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
  PosX = PosX;
  PosY = PosY;
  let array =[PosX, PosY]
  document.getElementById("x").innerHTML = PosX;
  document.getElementById("y").innerHTML = PosY;
  let oldDot = document.querySelectorAll(`#${window.event.path[1].id} .dot`)
  oldDot.forEach(function(dot){
      dot.remove()
  })
  placeDot(array, e.path[1])
}


function placeDot(array,location){
    let div = document.createElement('div');
    div.className = 'dot';
    div.style.left = array[0] + 'px';
    div.style.top = array[1] + 'px';
    location.appendChild(div)
   
}

function removeDot(){
    document.querySelectorAll('.dot').forEach(function(el){
        el.remove()
    })
}
// gir.onmousedown = GetCoordinates
// fir.onmousedown = GetCoordinates