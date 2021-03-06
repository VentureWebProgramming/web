function reviewSubmit() {
    if (document.querySelector("#rname").value === '' || document.querySelector("#rpassword").value === '' || document.querySelector("#rmsg").value === '') {
        alert("주어진 양식을 모두 채운 후에 실행해주세요")
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
                    alert("글 등록이 실패하였습니다.")
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
                    <small><input type="password" class="form-control form-control-sm" name="fname" id="deletePass${i}" placeholder="글 삭제 비밀번호를 입력하고 Delete 버튼을 눌러 주세요."></small>
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
        alert("글을 지우려면 비밀번호를 입력하세요")
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
                    alert("비밀번호가 다릅니다.")
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