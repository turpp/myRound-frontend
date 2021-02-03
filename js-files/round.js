class Round {
    constructor(id, score, gir, fir, num_of_holes){
        this.num_of_holes = num_of_holes
    }

    displaySummary(summary){
        holesDiv.innerHTML = '' 
        summaryDiv.innerHTML = `
            <h1> Round Summary</h1>
            <h3>Score: ${summary.score}</h3>
            <br>
            <div id='gir-summary'> <img id='girr-summary' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='250' height='250'></div>
            <div id='fir-summary'> <img id='firr-summary'  src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='250' height='250'></div>
            <p>Putts: ${summary.putts}</p>
            <p>Gir: ${summary.gir * 100}%</p>
            <p>Fir: ${summary.fir * 100}%</p>
            <p>Scramble: ${summary.scramble * 100}%</p>
            <button class = 'btn btn-dark' onclick="refresh()">Start New Game</button>
            `
    }

    
}