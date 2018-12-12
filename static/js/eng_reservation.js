  function writing() {
      if (document.querySelector("#vname").value === '' || document.querySelector("#vmail").value === '' || document.querySelector("#vdate").value === '' || document.querySelector("#vtime").value === '' || document.querySelector("#vpeople").value === '') {
          alert("You have to fill the forms.")
      } else if (isNaN(parseInt(document.querySelector("#vpeople").value))) {
        alert("You have to write people in number.")
      } else {
          const xhr = new XMLHttpRequest()
          xhr.open("POST", "http://localhost:5000/reservation/write", true)
          xhr.setRequestHeader("Content-Type", "application/json")
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4 && xhr.status === 200) {
                  const json = JSON.parse(xhr.responseText);
                  console.log(json)
                  if (json.success) {
                      alert("Reservation confirmed.")
                  } else {
                      alert("Choose another time.")
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