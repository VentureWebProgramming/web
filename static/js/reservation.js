// function writing() {
//     if (document.querySelector("#name").value === '' || document.querySelector("#people").value === '' || document.querySelector("#password").value === '') {
//         console.log("you must fill these forms")
//     } else if (isNaN(parseInt(document.querySelector("#people").value))) {
//         console.log("you must input people num")
//     } else {
//         const xhr = new XMLHttpRequest()
//         xhr.open("POST", "http://localhost:5000/reservation/write", true)
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
//             "reserveTime": new Date().toLocaleString(),
//             "people": parseInt(document.querySelector("#people").value),
//             "password": document.querySelector("#password").value
//         })
//         console.log(data)
//         xhr.send(data)
//     }
// }

// (function getReservation() {
//     const xhr = new XMLHttpRequest()
//     xhr.open("GET", "http://localhost:5000/reservation/data", true)
//     xhr.setRequestHeader("Content-Type", "text/plain")
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == XMLHttpRequest.DONE) {
//             const json = JSON.parse(xhr.responseText);
//             console.log(json)
//             //const arrayOfJSON = JSON.parse(xhr.responseText);
//             //for(let i = 0; i < arrayOfJSON.length; i++) {
//             //    console.log(arrayOfJSON[i])
//             //}
//         }
//     }
//     xhr.send()
// })()

  function writing() {
      if (document.querySelector("#vname").value === '' || document.querySelector("#vmail").value === '' || document.querySelector("#vdate").value === '' || document.querySelector("#vtime").value === '' || document.querySelector("#vpeople").value === '') {
          alert("위의 정보를 모두 입력한 후 예약해주세요.")
      } else {
          const xhr = new XMLHttpRequest()
          xhr.open("POST", "http://localhost:5000/reservation/write", true)
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  const json = JSON.parse(xhr.responseText);
                  console.log(json)
                  if (json.success) {
                      alert("예약이 완료되었습니다.")
                  } else {
                      alert("다른 시간에 예약해주세요.")
                  }
                  // console.log(json.success)
              }
          }

          const data = JSON.stringify({
              "name": document.querySelector("#vname").value,
              "now": new Date().toLocaleString(),
              "reserveTime": document.querySelector("#vdate").value + document.querySelector("#vtime").value,
              "email": document.querySelector("#vmail").value
          })
          console.log(data)
          xhr.send(data)
      }
  }