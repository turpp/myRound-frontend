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

    fetchEditHoles(e,girCor,firCor){
        switch(true){
            case (e.target.score.value <= 0):
                alert("Please fill out score field.");
                break;
            case (e.target.par.value <= 0):
                alert("Please fill out par field.");
                break;
            case (e.target.putts.value < 0):
                alert("Please fill out putts field.")
                break;
            default:
                return fetch(`http://localhost:3000/holes/${e.target.dataset.hole}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        par: e.target.par.value,
                        score: e.target.score.value,
                        putts: e.target.putts.value,
                        girloc: girCor,
                        fwloc: firCor
                    })
                })
        }

    }
}