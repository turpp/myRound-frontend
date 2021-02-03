const roundSetup = document.getElementById('round-setup')
const mainDiv =document.getElementById('main-div')
const holesDiv = document.getElementById('holes-div')
const summaryDiv = document.getElementById('summary')
const roundAdapter = new RoundAdapter('http://localhost:3000/rounds')
const holeAdapter = new HoleAdapter()
const holeObj = new Hole()
const roundObj = new Round()
const dotClass = new Dots()
const searchRound = document.getElementById('search')
// let allDots = []

//start
roundSetup.addEventListener('submit', (e) => {
    e.preventDefault()
    document.getElementById('title').innerHTML = '<h1>myRound</h1>'
    if(e.target.num_of_holes.value > 0){
        roundAdapter.fetchNewRound(e)
    .then(resp => resp.json()).then((round) => {
        holeAdapter.baseUrl = roundAdapter.baseUrl + `/${round.id}/holes`
        holeAdapter.fetchNewHoles(round)
        .then(resp => resp.json()).then(holes => {
            mainDiv.innerHTML = ''
            holeObj.createButtonForms(holes)
            holeObj.makeButtonsCollapsible()
            summaryDiv.innerHTML = `<span><br><button id='summary-btn' data-round=${holes[0].round_id} type='button' class="btn btn-dark">Finalize Round</button> <button class = 'btn btn-secondary' onclick="refresh()">Start New Game</button></span>`
            document.getElementById('summary-btn').addEventListener('click', summary)
        })
    })
    }
})

// submiting the form for the hole and sending info to the backend
holesDiv.addEventListener('submit', function(e){
    e.preventDefault()
    let corArray = holeObj.getGirFirCor(e.target.dataset.holeNum)
    holeAdapter.fetchEditHoles(e,corArray[0],corArray[1])
    .then(resp=> resp.json()).then(function(hole){
        let holeCard = holeObj.collapseAndChangeCardTitle(e,hole)
        holeObj.updateHoleForm(e,holeCard,hole)
        document.getElementById(`girr-hole-${holeCard.dataset.holeNum}`).onmousedown = dotClass.GetCoordinates
        document.getElementById(`firr-hole-${holeCard.dataset.holeNum}`).onmousedown = dotClass.GetCoordinates
    })
})

//summary
function summary(e){
    console.log(e)
    roundAdapter.fetchRoundSummary(e.target.dataset.round)
    .then(function(summary){
        roundObj.displaySummary(summary)

        let girImgPosition = dotClass.FindPosition(document.getElementById('girr-summary'))
        let firImgPosition = dotClass.FindPosition(document.getElementById('firr-summary'))


        summary.holes.forEach((hole) => {
            fwloc = [parseInt(hole.fwloc.split(',')[0])+firImgPosition[0], parseInt(hole.fwloc.split(',')[1])+firImgPosition[1]]
            girloc = [parseInt(hole.girloc.split(',')[0])+girImgPosition[0], parseInt(hole.girloc.split(',')[1])+girImgPosition[1]]
            dotClass.placeDotSummary(fwloc, document.getElementById('fir-summary'))
            dotClass.placeDotSummary(girloc, document.getElementById('gir-summary'))
        })



        // let dotPlacement = []
        // let girImgPosition = dotClass.FindPosition(document.getElementById('girr-summary'))
        // let firImgPosition = dotClass.FindPosition(document.getElementById('firr-summary'))
        // summary.girArray.forEach(function(cordinate){
        //     dotPlacement = [cordinate[0]+girImgPosition[0], cordinate[1]+girImgPosition[1]]
        //     dotClass.placeDotSummary(dotPlacement, document.getElementById('gir-summary'))
        // })
        // summary.fwArray.forEach(function(cordinate){
        //     dotPlacement = [cordinate[0]+firImgPosition[0], cordinate[1]+firImgPosition[1]]
        //     dotClass.placeDotSummary(dotPlacement, document.getElementById('fir-summary'))
        // })
    })
}

function instructions(){
    alert("How to use myRound!\n   \nPlease select the number of holes you would like to play. Don't worry if you don't finish all the holes, the application will ignore any blank holes\n   \nClick on the tiles for the hole you are playing. This will expand to give you fields to fill out about that hole. For the two images:\n-The first image is the green with the middle being the cup. Each circle can be either 5 or 10 feet depending on your skill level. Just make sure you decide before the round and stick to it.\n-The second image is the fairway. Anything in the middle is the fairway, anything between the dotted and solid lines are the rough. Anything outside of the solid lines, is out of bounds. Currently the application only supports one tee shot per hole.\n   \nIMPORTANT: Since Par threes do not have fairways please click on the very top or bottom of the image. These dots will show up in your summary, but you will be able to tell they are par threes due to the placement. The FIR% will not count any par 3's in its calculation.\n   \nFill out the rest of the form and click submit to save the hole. If you do not save, once you click the Finalize button you will loose everything.\nClicking on Finalize round will give you your full round stats! I hope you enjoy! : ) ")
}

function refresh(){
    console.log('in refresh')
    location.reload()
}

searchRound.addEventListener('submit', e => {
    e.preventDefault()
    mainDiv.innerHTML = ''
    let dots = document.querySelectorAll('.dot')
    if(dots){
        dots.forEach(dot => {
            dot.style.display = 'none'
        })
    }
    roundAdapter.fetchRoundSummary(e.target.roundId.value).then(summary => {
        roundObj.displaySummary(summary)

        let girImgPosition = dotClass.FindPosition(document.getElementById('girr-summary'))
        let firImgPosition = dotClass.FindPosition(document.getElementById('firr-summary'))


        summary.holes.forEach((hole) => {
            fwloc = [parseInt(hole.fwloc.split(',')[0])+firImgPosition[0], parseInt(hole.fwloc.split(',')[1])+firImgPosition[1]]
            girloc = [parseInt(hole.girloc.split(',')[0])+girImgPosition[0], parseInt(hole.girloc.split(',')[1])+girImgPosition[1]]
            dotClass.placeDotSummary(fwloc, document.getElementById('fir-summary'))
            dotClass.placeDotSummary(girloc, document.getElementById('gir-summary'))
        })
    })

})

