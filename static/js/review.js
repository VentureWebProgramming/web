function reviewSubmit() {
    if (document.querySelector("#rname").value === '' || document.querySelector("#rmail").value === '' || document.querySelector("#rmsg").value === '') {
        console.log("주어진 양식을 모두 채운 후에 실행해주세요")
    } else {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:5000/review/write", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                console.log(json.success)
                if(json.success) {
                    window.location = "http://localhost/review";
                } else {
                    alert("fail")
                }  
            }
        }

        const data = JSON.stringify({
            "name": document.querySelector("#rname").value,
            "now": new Date().toLocaleString(),
            "body": document.querySelector("#rmsg").value
        })
        console.log(data)
        xhr.send(data)
    }
}

// function rewriting() {
//     if (document.querySelector("#name").value === '' || document.querySelector("#password").value === '') {
//         console.log("you must fill name and password")
//     } else if (document.querySelector("#body").value === '') {
//         console.log("you must body")
//     } else {
//         const xhr = new XMLHttpRequest()
//         xhr.open("POST", "http://localhost:5000/estimation/rewrite", true)
//         xhr.setRequestHeader("Content-Type", "application/json")
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4 && xhr.status === 200) {
//                 const json = JSON.parse(xhr.responseText);
//                 console.log(json.success)
//             }
//         }

//         const data = JSON.stringify({
//             "name": document.querySelector("#name").value,
//             "now": new Date().toLocaleString(),
//             "ptime": new Date().toLocaleString(),
//             "body": document.querySelector("#body").value,
//             "password": document.querySelector("#password").value
//         })
//         console.log(data)
//         xhr.send(data)
//     }
// }

(function getReservation() {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "http://localhost:5000/review/data", true)
    xhr.setRequestHeader("Content-Type", "text/plain")
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            const json = JSON.parse(xhr.responseText);
            console.log(json)
            //const arrayOfJSON = JSON.parse(xhr.responseText);
            //for(let i = 0; i < arrayOfJSON.length; i++) {
            //    console.log(arrayOfJSON[i])
            //}
        }
    }
    xhr.send()
})()