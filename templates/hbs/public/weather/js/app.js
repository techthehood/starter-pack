console.log("[public/js] app.js running!");


const weatherForm = document.querySelector('Form');
const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

// msg1.textContent = 'from Javascript';



weatherForm.addEventListener('submit',(e) => {
  e.preventDefault();
  console.log("testing");

  let input_el = document.querySelector('input');
  let place = input_el.value;

  console.log(place);
  msg1.textContent = "loading...";
  msg2.textContent  = "";

  fetch(`${location.origin}/req/forecast?address=${place}`) /* // failed - net::ERR_CONNECTION_REFUSED*/
  .then((response)=>{
    response.json()
    .then((data) => {
      if(data.error){
        console.log(data.error);
        msg1.textContent = data.error;
      }else{
        console.log(data);
        console.log(data.location);
        console.log(data.summary);

        msg1.textContent = data.location;
        msg2.innerHTML = `${data.summary} <br>
        ${data.temperature} <br>
        ${data.probability}
        `
      }
    })
  })//.then

});// weatherForm.addEventListener
