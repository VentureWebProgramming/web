  function writing() {
      if (document.querySelector("#vname").value === '' || document.querySelector("#vmail").value === '' || document.querySelector("#vdate").value === '' || document.querySelector("#vtime").value === '' || document.querySelector("#vpeople").value === '') {
          alert("위의 정보를 모두 입력한 후 예약해주세요.")
      } else if (isNaN(parseInt(document.querySelector("#vpeople").value))) {
        alert("방문 인원수에 숫자를 입력해주세요")
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