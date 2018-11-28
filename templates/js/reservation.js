function submitting() {
    if(document.querySelector("#name").value === '' || document.querySelector("#people").value === '') {
        console.log("you must fill these forms")
    } else if(isNaN(parseInt(document.querySelector("#people")))) {
        console.log("you must input people num")
    }else {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:5000/reservation/reservation", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                console.log(json.success)
            }
        }

        const data = JSON.stringify({
            "name": document.querySelector("#name").value,
            "now": new Date().toLocaleString(),
            "reserveTime": new Date().toLocaleString(),
            "people": parseInt(document.querySelector("#people").value)
        })
        console.log(data)
        xhr.send(data)
    }
}

(function getReservation() {
    
})()