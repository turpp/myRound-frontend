const roundSetup = document.getElementById('round-setup')
const mainDiv =document.getElementById('main-div')
const holesDiv = document.getElementById('holes-div')
const summaryDiv = document.getElementById('summary')
const roundAdapter = new RoundAdapter('http://localhost:3000/rounds')
const holeAdapter = new HoleAdapter()
//start
roundSetup.addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('title').innerText = 'myRound'
    if(e.target.num_of_holes.value > 0){
        roundAdapter.fetchNewRound(e)

    // }fetch('http://localhost:3000/rounds', {
    //     method: 'Post',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         num_of_holes: e.target.num_of_holes.value
    //     })
    .then(resp => resp.json()).then(function(round){
        // fetch(`http://localhost:3000/rounds/${round.id}/holes`,{
        //     method: 'Post',
        //     headers: {
        //     'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         num_of_holes: round.num_of_holes,
        //         round_id: round.id
        //     })
        // })
        holeAdapter.baseUrl = `http://localhost:3000/rounds/${round.id}/holes`
        holeAdapter.fetchNewHoles(round)
        .then(resp => resp.json()).then(function(holes){
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
                        <div id='gir-hole-${i+1}'> <img id='girr-hole-${i+1}' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='350' height='350'></div>
                        <div id='fir-hole-${i+1}'> <img id='firr-hole-${i+1}' src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='350' height='350'></div>
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
                        document.getElementById(`girr-hole-${i+1}`).onmousedown = GetCoordinates
                        document.getElementById(`firr-hole-${i+1}`).onmousedown = GetCoordinates
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

            summaryDiv.innerHTML = `<button id='summary-btn' data-round=${holes[0].round_id} type='button'>Finalize Round</button>`
            document.getElementById('summary-btn').addEventListener('click', summary)
        })
    })
    }
})

// submiting the form for the hole and sending info to the backend
holesDiv.addEventListener('submit', function(e){
    e.preventDefault()
    let girId = window.event.path[0].childNodes[1].id
    let firId = window.event.path[0].childNodes[3].id
    let girDotArray = document.querySelectorAll(`#${girId} .dot`) 
    let firDotArray = document.querySelectorAll(`#${firId} .dot`)
    let girCor = `${girDotArray[0].style.left.split('px')[0]}-${girDotArray[0].style.top.split('px')[0]}`
    let firCor =`${firDotArray[0].style.left.split('px')[0]}-${firDotArray[0].style.top.split('px')[0]}`
    // fetch(`http://localhost:3000/holes/${e.target.dataset.hole}`,{
    //     method: 'PUT',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         par: e.target.par.value,
    //         score: e.target.score.value,
    //         putts: e.target.putts.value,
    //         girloc: girCor,
    //         fwloc: firCor
    //     })
    // })
    holeAdapter.fetchEditHoles(e,girCor,firCor)
    .then(resp=> resp.json()).then(function(hole){
        let parent =e.target.parentNode
        parent.style.display = 'none'
        let grandparent = parent.previousElementSibling
        grandparent.innerHTML = `Hole ${grandparent.dataset.holeNum} score: ${hole.score}`

        let girDot = document.querySelectorAll(`#gir-hole-${grandparent.dataset.holeNum} .dot`)
        let firDot =document.querySelectorAll(`#fir-hole-${grandparent.dataset.holeNum} .dot`)
        let yGirDot = girDot[0].style.top
        let xGirDot = girDot[0].style.left
        let xFirDot = firDot[0].style.left
        let yFirDot = firDot[0].style.top
        let dotObj = {
            girDot: [xGirDot.split('px')[0], yGirDot.split('px')[0]],
            firDot: [xFirDot.split('px')[0], yFirDot.split('px')[0]]
        }
        // console.log(dotObj)
        



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
// actions for when you click on the summary button
function summary(e){
    console.log('old=', e.target)
    roundAdapter.fetchRoundSummary(e)
    .then(function(summary){
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

    })


}


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
//   document.getElementById("x").innerHTML = PosX;
//   document.getElementById("y").innerHTML = PosY;
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