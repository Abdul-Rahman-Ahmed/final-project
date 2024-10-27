const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
let resultDiv = document.querySelector(".results");

btnSearch.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  const searchWord = document
    .getElementById("conditionInput")
    .value.toLowerCase();

  fetch("./travel.recommenation.json")
    .then((Response) => Response.json())
    .then((data) => {
      let condition;
      if (searchWord == "beach" || searchWord == "beaches") {
        condition = data.beaches;
      } else if (searchWord == "temple" || searchWord == "temples") {
        condition = data.temples;
      } else if (searchWord == "country" || searchWord == "countries") {
        condition = [];
        data.countries.forEach((el) => {
          el.cities.forEach((ele) => {
            condition.push(ele);
          });
        });
        console.log(condition);
      } else {
        condition = undefined;
      }
      if (condition) {
        condition.forEach((el) => {
          resultDiv.innerHTML += `
          <div class="card">
            <img src="${el.imageUrl}" alt="IMG" width="300" height="200" />
            <div class="text">
              <h3>${el.name}</h3>
              <p>
                ${el.description}
              </p>
              <button>visit</button>
            </div>
          </div>
          `;
        });
      } else {
        resultDiv.innerHTML = "Condition not found.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
});

btnClear.addEventListener("click", () => {
  resultDiv.innerHTML = "";
  document.getElementById("conditionInput").value = "";
});
