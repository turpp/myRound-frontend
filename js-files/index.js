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
       
// getting response from edit fetch. that is the data for a hole
// I update the card with the score of the hole
// I get the dot locations from the HTML
// I take the data from the hole minus dots and fill in the form
// add event to registar new dots
// place dots that i got early from the html back on the page

// problem: getting dots from the HTML and placing them back on the imgs
// solutions: 
// a: I can get the dots from the html and just replace them before. I just need to change where the dotobj i slooking for the dots
// b: I can pull the locations from the edit response and figure out how to use place dot and get cordinate to reverse engineer where to put them.


        let holeCard = holeObj.collapseAndChangeCardTitle(e,hole)
        // let dotObj = holeObj.getDotLocations(holeCard)
        holeObj.updateHoleForm(e,holeCard,hole)
        document.getElementById(`girr-hole-${holeCard.dataset.holeNum}`).onmousedown = dotClass.GetCoordinates
        document.getElementById(`firr-hole-${holeCard.dataset.holeNum}`).onmousedown = dotClass.GetCoordinates
        // dotClass.placeDot(dotObj.girDot, document.getElementById(`gir-hole-${holeCard.dataset.holeNum}`))
        // dotClass.placeDot(dotObj.firDot, document.getElementById(`fir-hole-${holeCard.dataset.holeNum}`))

    })
})
function summary(e){
    roundAdapter.fetchRoundSummary(e)
    .then(function(summary){
        roundObj.displaySummary(summary)
        let dotPlacement = []
        let girImgPosition = dotClass.FindPosition(document.getElementById('girr-summary'))
        let firImgPosition = dotClass.FindPosition(document.getElementById('firr-summary'))
        //I need to take the img position of summary and then add it to the cor from the database
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

// gir.onmousedown = GetCoordinates
// fir.onmousedown = GetCoordinates
