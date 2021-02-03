class RoundAdapter{
    constructor(url){
        this.baseUrl = url
    }

    fetchNewRound(e){
       return fetch(this.baseUrl, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            num_of_holes: e.target.num_of_holes.value
        })
    })
    }

    fetchRoundSummary(id){
        return fetch(`http://localhost:3000/rounds/${id}`).then(resp => resp.json())
    }
}