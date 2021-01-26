const roundSetup = document.getElementById('round-setup')
const mainDiv =document.getElementById('main-div')


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
            console.log(holes)
            mainDiv.innerHTML = ''
            for(let i =0; i < holes.length; i++){
            mainDiv.innerHTML += `<div data-hole=${holes[i].id} class='hole'>Hole ${i+1} score:__<div>`
            }

        })
    })
    
})

mainDiv.addEventListener('click', function(e){
    let holeForm;
    if (e.target.className == 'hole'){
        
        e.target.innerHTML += `<span><img src='https://i.pinimg.com/564x/ec/17/22/ec1722fc44678bff1d60194f357e3769.jpg' alt='green' width='350' height'350'>
        <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAACvCAMAAABqzPMLAAAAeFBMVEX///8AAAB4eHjy8vJWVlZ8e3w4ODju7u4NAAA8AAC7vL3p6em3uLn4+fmws7NYTE1xb28aAABkX1+qq6vNAAB8AAClAgRtAABrcHBWUVF1AABHAQRkAADT1dXh4uI7OzswAgQqAAAiAAC2AgSZAAAzAACZm5vGxscANfV+AAAB2klEQVR4nO3Uy04UQQCG0SlHZBgFkVEuXsAb+v5v6ErSTUi+jUm34Zxd7f58qarNBoDV279eesG6vDmdn892b49e8OD83cVh2me/e/9hMHF5dT0NdHzz8dPSk9bl88mX2RM7GuN2y1+nr8bYPA60/Ydf3H/vqUDHy0xZJ4GCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGgIFAQKAgUBAoCBYGCQEGg8FSg7TJT1unuUaDtxcnXwcS377fTQPvx42rpSety+fN6doXOd+PmJQ/G/f2vWaDfh/n5uTs7HJaeAM/DH3j5H6NdRWy2AAAAAElFTkSuQmCC' alt='fairway' width='350' height='350'>
        <span>
        <form id='hole-form'>
        <label>Putts</label>
        <input type='number' name='putts'>
        <label>Score</label>
        <input type='number' name='score'>
        <input type='submit' value='Submit Hole'>
        </form>
        `
         holeForm = document.getElementById('hole-form')
        holeForm.addEventListener('submit', function(e){
            e.preventDefault()
            console.log('just submitted the hole form')
        })
        
    }
    

})

