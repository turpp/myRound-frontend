const roundSetup = document.getElementById('round-setup')
const mainDiv =document.getElementById('main-div')
const holesDiv = document.getElementById('holes-div')
const summaryDiv = document.getElementById('summary')
const roundAdapter = new RoundAdapter('http://localhost:3000/rounds')
const holeAdapter = new HoleAdapter()
const holeObj = new Hole()
const roundObj = new Round()
const dotClass = new Dots()

//start
roundSetup.addEventListener('submit', function(e){
    e.preventDefault()
    document.getElementById('title').innerHTML = '<h1>myRound</h1>'
    if(e.target.num_of_holes.value > 0){
        roundAdapter.fetchNewRound(e)

    .then(resp => resp.json()).then(function(round){
        holeAdapter.baseUrl = `http://localhost:3000/rounds/${round.id}/holes`
        holeAdapter.fetchNewHoles(round)
        .then(resp => resp.json()).then(function(holes){
            mainDiv.innerHTML = ''
            holeObj.createButtonForms(holes)
            holeObj.makeButtonsCollapsible()

            summaryDiv.innerHTML = `<br><button id='summary-btn' data-round=${holes[0].round_id} type='button' class="btn btn-dark">Finalize Round</button>`
            document.getElementById('summary-btn').addEventListener('click', summary)
        })
    })
    }
})

// submiting the form for the hole and sending info to the backend
holesDiv.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('in eventlistner', e, this)
    let corArray = holeObj.getGirFirCor()
    holeAdapter.fetchEditHoles(e,corArray[0],corArray[1])
    .then(resp=> resp.json()).then(function(hole){
        let holeCard = holeObj.collapseAndChangeCardTitle(e,hole)
        // let dotObj = holeObj.getDotLocations(holeCard)
        holeObj.updateHoleForm(e,holeCard,hole)
        document.getElementById(`girr-hole-${holeCard.dataset.holeNum}`).onmousedown = dotClass.GetCoordinates
        document.getElementById(`firr-hole-${holeCard.dataset.holeNum}`).onmousedown = dotClass.GetCoordinates
    })
})
function summary(e){
    roundAdapter.fetchRoundSummary(e)
    .then(function(summary){
        roundObj.displaySummary(summary)
        let dotPlacement = []
        let girImgPosition = dotClass.FindPosition(document.getElementById('girr-summary'))
        let firImgPosition = dotClass.FindPosition(document.getElementById('firr-summary'))
        console.log('gir=', summary.girArray, 'fir=', summary.fwArray, 'girImg=', girImgPosition, 'firImg=', firImgPosition)
        summary.girArray.forEach(function(cordinate){
            dotPlacement = [cordinate[0]+girImgPosition[0], cordinate[1]+girImgPosition[1]]
            console.log('dotPlacemetn=',dotPlacement)
        dotClass.placeDotSummary(dotPlacement, document.getElementById('gir-summary'))
        })
        summary.fwArray.forEach(function(cordinate){
            dotPlacement = [cordinate[0]+firImgPosition[0], cordinate[1]+firImgPosition[1]]
        dotClass.placeDotSummary(dotPlacement, document.getElementById('fir-summary'))
        })
    })
}

