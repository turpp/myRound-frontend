class HoleAdapter {
    constructor(url){
        this.baseUrl = url
    }

    fetchNewHoles(round){
       return fetch(this.baseUrl,{
            method: 'Post',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                num_of_holes: round.num_of_holes,
                round_id: round.id
            })
        })

    }

}