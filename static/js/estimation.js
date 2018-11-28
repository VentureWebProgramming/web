function submitting() {
    if (document.querySelector("#name").value === '' || document.querySelector("#password").value === '') {
        console.log("you must fill name and password")
    } else if (document.querySelector("#body").value === '') {
        console.log("you must body")
    } else {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:5000/estimation/write", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let json = JSON.parse(xhr.responseText);
                console.log(json.success)
            }
        }

        const data = JSON.stringify({
            "name": document.querySelector("#name").value,
            "time": new Date().toLocaleString(),
            "body": document.querySelector("#body").value,
            "password": document.querySelector("#password").value
        })
        xhr.send(data)
    }
}