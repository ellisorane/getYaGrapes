//AJAX way of retriving the JSON info
// const xhttp = new XMLHttpRequest()
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         const response = JSON.parse(xhttp.responseText)
//         console.log(response)
//     }
// }
// xhttp.open("GET", "js/inventory.json", true)
// xhttp.send()

const hotGrapesRow = document.querySelector('.hot-grapes-row')
const shopRow = document.querySelector('.shop-row')


//POPULATE 'HOTTEST GRAPES' AND 'SHOP' USING JSON INFO
const createGrapeItem = (parent, name, imgUrl, type, country, stock, price) => {
  const grapeQuantityDiv = document.querySelector('.grape-quantity')

  //FIX THIS FUNCTION LATER
  //CHECK NUMBER OF STOCK FOR EACH GRAPE AND ADD IT TO QUANTITY 
  function grapeQuantity(stock) {
    if (grapeQuantityDiv) {
      for (let i = 1; i < stock + 1; i++) {
        html = `<option value="${i}">${i}</option>`
        console.log(grapeQuantityDiv)
        grapeQuantityDiv.insertAdjacentHTML('beforeend', html)
      }
    }
      
  }

  let grapeTemplate = `
      <!-- GRAPE ITEM COL START  -->
          <div class="col-md-4 mb-4">
              <div class="hot-grape-item">
                <!-- THIS ROW CONTAINS THE CURRENT GRAPE IMAGE -->
                <div class="row ">
                  <div class="col grape-img-col d-flex justify-content-center mt-4">
                    <img class="grape-img" src="${imgUrl}" alt="">
                  </div>
                </div>
                <!-- CURRENT GRAPE NAME -->
                <div class="grape-info">
                  <p class="grape-name">${name} <span class="grape-price float-end">$${price.toFixed(2)}</span></p>
                  <hr>
                  <p class="type">Seed type: ${type}</p>
                  <p class="grape-country">Country: ${country}</p>
                  <div class="row">
                    <div class="col">
                      <p class="float-start">Quantity</p>
                    </div>
                    <div class="col">
                      <select class="grape-quantity">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      </select>
                    </div>
                    <div class="col">
                      <buttton class="btn btn-primary">Add to Cart</buttton>
                    </div>
                  </div>
              </div>  
          </div>
      </div>
      <!-- GRAPE ITEM COL END  -->
  `
  parent.insertAdjacentHTML('afterbegin', grapeTemplate)



}


//SET FETCH PATHNAME BASED ON WHICH PAGE YOU'RE CURRENTLY ON OR ELSE IT WON'T WORK
let pathname = "./js/inventory.json"
if (shopRow) pathname = '../js/inventory.json'

//RETRIEVE INVENTORY INFO FROM LOCAL JSON FILE
fetch(pathname)
    .then((res) => {
    return res.json()
    })
    .then((data) => {
        //STORE JSON DATA RETRIEVED INTO A NEW VARIABLE
        let invData = data.grapes

      invData.forEach(grape => {
          // grapeQuantity(grape.stock)
          //POPULATE 'HOTTEST GRAPES' IN INDEX.HTML
          if (hotGrapesRow && grape.hot === "Yes") {
            createGrapeItem(hotGrapesRow, grape.name, grape.image, grape.type, grape.origin, grape.stock, grape.price)
          }
          if (shopRow && grape.stock > 0) {
            //POPULATE 'SHOP' IN SHOP.HTML
            createGrapeItem(shopRow, grape.name, grape.image, grape.type, grape.origin, grape.stock, grape.price)
            }
            
        });
        
    })