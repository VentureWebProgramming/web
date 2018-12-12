function reviewSubmit() {
    if (document.querySelector("#rname").value === '' || document.querySelector("#rpassword").value === '' || document.querySelector("#rmsg").value === '') {
        alert("Fill the blank")
    } else {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:5000/review/write", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                console.log(json.success)
                if(json.success) {
                    window.location = "http://localhost:5000/review";
                } else {
                    alert("Fail")
                }
            }
        }

        const data = JSON.stringify({
            "name": document.querySelector("#rname").value,
            "password": document.querySelector("#rpassword").value,
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
            console.log(xhr.responseText)
            const json = JSON.parse(xhr.responseText);
            console.log(json)
            for(let i = 0; i < json.length; i++) {
                // document.querySelector("#rList").innerHTML += `<li>${json[i]["name"]}  ${json[i]["body"]}`
                // document.querySelector("#rList").innerHTML += `<button type="button" class="btn btn-danger" id="but${i}" onclick=deleteReview(${i})>Delete</button>`
                // document.querySelector("#rList").innerHTML += `<input type="password" name="fname" id="deletePass${i}"></li>`
                document.querySelector("#rList").innerHTML += `
                  <a class="list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${json[i]["name"]}</h5>
                        <small><button type="button" class="btn btn-outline-danger btn-sm" id="but${i}" onclick=deleteReview(${i})>Delete</button></small>
                    </div>
                    <p class="mb-1">${json[i]["body"]}</p>
                    <small><input type="password" class="form-control form-control-sm" name="fname" id="deletePass${i}" placeholder="Write your password and click Delete."></small>
                </a>
                `
            }
            //const arrayOfJSON = JSON.parse(xhr.responseText);
            //for(let i = 0; i < arrayOfJSON.length; i++) {
            //    console.log(arrayOfJSON[i])
            //}
        }
    }
    xhr.send()
})()

function deleteReview(me) {
    if(document.querySelector(`#deletePass${me}`).value === '') {
        alert("Write password to Delete")
    } else {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "http://localhost:5000/review/delete", true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const json = JSON.parse(xhr.responseText);
                console.log(json.success)
                if(json.success) {
                    window.location = "http://localhost:5000/review";
                } else {
                    alert("Wrong password")
                }  
            }
        }

        const data = JSON.stringify({
            "id": me,
            "password": document.querySelector(`#deletePass${me}`).value,
        })
        console.log(data)
        xhr.send(data)
    }
}