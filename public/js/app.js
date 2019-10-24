const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#m1')
const msg2 = document.querySelector('#m2')
const spin = document.querySelector('#ic1')

weatherform.addEventListener('submit',(e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    msg1.textContent = 'Loading Data'
    msg2.textContent = ''
    spin.className = 'fa fa-circle-o-notch fa-spin'
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                msg2.textContent = data.error
                msg1.textContent = ''
                //spin.className = ''
            }
            else{
                //console.log(data) 
                msg1.textContent = data.weather 
                spin.className =""
                msg2.textContent = data.msg
                //console.log(data.location)
            }
        })
    })

})