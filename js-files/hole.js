class Hole{
  constructor(id, round_id, score, fwloc, girloc, putts){
    this.id = id
    this.round_id = round_id
    this.score = score
    this.fwloc = fwloc
    this.girloc = girloc
    this.putts = putts
  }

  createButtonForms(holes){
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
        <div id='gir-hole-${i+1}'> <img id='girr-hole-${i+1}' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='250' height='250'></div>
        
        <div id='fir-hole-${i+1}'> <img id='firr-hole-${i+1}' src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='250' height='250'></div>
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
      document.getElementById(`girr-hole-${i+1}`).onmousedown = dotClass.GetCoordinates
      document.getElementById(`firr-hole-${i+1}`).onmousedown = dotClass.GetCoordinates
    }
  }

  makeButtonsCollapsible(){
    let coll = document.getElementsByClassName("collapsible");
    console.log('outside', this)

    for (let i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        let girDot = document.getElementById(`img-girr-hole-${this.dataset.holeNum}`)
        let firDot = document.getElementById(`img-firr-hole-${this.dataset.holeNum}`)

        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
          // console.log('inside', this)
          girDot.style.display = 'none'
          firDot.style.display = 'none'
          // console.log(document.querySelectorAll(`#${this.nextElementSibling.childNodes[1].id} .dot`))
          content.style.display = "none";
      } else {
        console.log('inside of else', this)
          if(girDot){
          girDot.style.display ='block'
          firDot.style.display = 'block'
          }
          content.style.display = "block";
              }
      });
    }
  }


  getGirFirCor(){
    console.log(window.event, this )
    let hole = window.event.path[2].firstElementChild.dataset.holeNum
    console.log(hole)
    let girDot = document.getElementById(`img-girr-hole-${hole}`)
    let firDot = document.getElementById(`img-firr-hole-${hole}`)
    console.log([girDot.dataset.corOnImg, firDot.dataset.corOnImg])
    return[girDot.dataset.corOnImg, firDot.dataset.corOnImg]
    // let girId = window.event.path[0].childNodes[1].id
    // let firId = window.event.path[0].childNodes[3].id
    // let girDotArray = document.querySelectorAll(`#${girId} .dot`) 
    // let firDotArray = document.querySelectorAll(`#${firId} .dot`)
    // let girCor = `${girDotArray[0].style.left.split('px')[0]}-${girDotArray[0].style.top.split('px')[0]}`
    // let firCor =`${firDotArray[0].style.left.split('px')[0]}-${firDotArray[0].style.top.split('px')[0]}`
    // return [girCor, firCor]
  }


  collapseAndChangeCardTitle(e,hole){
    let parent =e.target.parentNode
    parent.style.display = 'none'
    let grandparent = parent.previousElementSibling
    grandparent.innerHTML = `Hole ${grandparent.dataset.holeNum} score: ${hole.score}`
    return grandparent
  }

  getDotLocations(node){
    let girDot = document.querySelectorAll(`#gir-hole-${node.dataset.holeNum} .dot`)
    let firDot =document.querySelectorAll(`#fir-hole-${node.dataset.holeNum} .dot`)
    let yGirDot = girDot[0].style.top
    let xGirDot = girDot[0].style.left
    let xFirDot = firDot[0].style.left
    let yFirDot = firDot[0].style.top
    let dotObj = {
      girDot: [xGirDot.split('px')[0], yGirDot.split('px')[0]],
      firDot: [xFirDot.split('px')[0], yFirDot.split('px')[0]]
    }
    return dotObj
  }

  updateHoleForm(e,card,hole){
    e.target.innerHTML = `
      <div id='gir-hole-${card.dataset.holeNum}'> <img id='girr-hole-${card.dataset.holeNum}' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='250' height='250'></div>
      <div id='fir-hole-${card.dataset.holeNum}'> <img id='firr-hole-${card.dataset.holeNum}' src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='250' height='250'></div>
      <label>Par</label>
      <input type='number' name='par' value = ${hole.par ? hole.par : 0}>
      <label>Putts</label>
      <input type='number' name='putts' value = ${hole.putts ? hole.putts : 0}>
      <label>Score</label>
      <input type='number' name='score' value = ${hole.score ? hole.score : 0}>
      <input type='submit' value='Submit Hole'>
      `
  }

}