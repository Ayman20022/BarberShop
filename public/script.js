const timeSelect = document.getElementById('time')
const bookingForm = document.getElementById('select-time')
const userappt = document.getElementById('user-appointment')
const listUsers = document.getElementById('list-users')
const dateContainer = document.getElementById('date')


// get available times
function loadAvailabletimes(date){
    if(!date) return;

    fetch(`/availableTimes?date=${date}`)
    .then(res=>{
        if(!res.ok) throw new Error('could not fetch available times')
        return res.json()
    })
    .then(availableTimes=>{
        timeSelect.innerHTML = '<option value="" disabled selected>Select a time</option>'
        availableTimes.forEach(time=>{
            const option = document.createElement('option')
            option.value = time
            option.textContent = time
            timeSelect.appendChild(option)
        })
    })
    .catch(err=>{
        console.log(err)
        alert('could not load available times')
    })
}


// book appointment

bookingForm.addEventListener('submit',(e)=>{
    const name = document.getElementById('username-form1').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    e.preventDefault()
    fetch('/book',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body : JSON.stringify({name,date,time})
    })
    .then(res=>{
        if(!res.ok) throw new Error('failed to book appointment')
        return res.json()
    }).then(data=>{
        alert(data.message)
        loadAvailabletimes(date)
    }).catch(err=>{
        console.log(err)
        alert(err)
    })

})

userappt.addEventListener('submit',(e)=>{
    e.preventDefault()
    const userName = document.getElementById('username-form2').value
    fetch(`/appointments?username=${userName}`)
    .then(res=>{
        if(!res.ok) throw new Error('failed to load appointment')
        return res.json()
    })
    .then(data =>{
        console.log('date recieved from user appts',data)
        listUsers.innerHTML = ''    
        data.forEach(appt=>{
                const appointment = document.createElement('li')
                appointment.textContent = `Date : ${appt.date} at time : ${appt.time}`
                listUsers.appendChild(appointment)
        })
        
    })
    .catch(err=>{
        console.log(err)
        listUsers.innerHTML = '<li>No appointment found</li>'
    })
})


dateContainer.addEventListener('change',(e)=>{
    const selectedDate = e.target.value
    if(selectedDate) loadAvailabletimes(selectedDate)
})