class Round {
    constructor(id, score, gir, fir, num_of_holes){
        this.num_of_holes = num_of_holes
    }

    // createButtonForms(holes){
    //     let button;
    //     let div;
    //     for(let i = 0; i<holes.length; i++){
    //         button = document.createElement('button')
    //         button.type = 'button'
    //         button.className = "collapsible"
    //         button.dataset.holeNum = i+1
    //         button.dataset.id = holes[i].id
    //         holesDiv.appendChild(button)
    //         button.innerHTML = `Hole ${i+1} score:__`
            
    //         div = document.createElement('div')
    //         div.className = 'content'
    //         holesDiv.appendChild(div)
    //             div.innerHTML =`
    //                 <form data-hole=${holes[i].id} id='hole-form'>
    //                 <div id='gir-hole-${i+1}'> <img id='girr-hole-${i+1}' src='https://i.ibb.co/cgBBY05/GIR-image.jpg' alt='green' width='350' height='350'></div>
    //                 <div id='fir-hole-${i+1}'> <img id='firr-hole-${i+1}' src='https://i.ibb.co/mv7cmHz/fir-image.jpg' alt='fairway' width='350' height='350'></div>
    //                 <label>Par</label>
    //                 <input type='number' name='par' value = ${holes[i].par ? holes[i].par : 0}>
    //                 <label>Putts</label>
    //                 <input type='number' name='putts' value = ${holes[i].putts ? holes[i].putts : 0}>
    //                 <label>Score</label>
    //                 <input type='number' name='score' value = ${holes[i].score ? holes[i].score : 0}>
    //                 <input type='submit' value='Submit Hole'>
    //                 </form>
    //                 <br>
    //                 `
    //                 document.getElementById(`girr-hole-${i+1}`).onmousedown = GetCoordinates
    //                 document.getElementById(`firr-hole-${i+1}`).onmousedown = GetCoordinates
    //     }
    // }

    // makeButtonsCollapsible(){
    //     let coll = document.getElementsByClassName("collapsible");
    //         for (let i = 0; i < coll.length; i++) {
    //           coll[i].addEventListener("click", function() {
    //             this.classList.toggle("active");
    //             let content = this.nextElementSibling;
    //             if (content.style.display === "block") {
    //                 // console.log(document.querySelectorAll(`#${this.nextElementSibling.childNodes[1].id} .dot`))
    //               content.style.display = "none";
    //             } else {
    //               content.style.display = "block";
    //             }
    //           });
    //         }
    // }


    displaySummary(summary){
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
    }

    
}