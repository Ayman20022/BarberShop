const express = require('express')
const app = express()


app.use(express.static('public'))
app.use(express.json())

// no time to sqlite3 db
const users= []
const appointments =[]






app.get('/availableTimes',(req,res)=>{
    const allTimes = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
    ];
    const {date} = req.query
    console.log(date)

    const bookedTimes = appointments.filter(app=> app.date===date).map(app=>app.time)
    const availableTimes = allTimes.filter(time=>!bookedTimes.includes(time))
    res.status(200).json(availableTimes)
})


app.post('/book',(req,res)=>{
    const {name,date,time} = req.body
    console.log('name',name)

    // check if user exist
    searchUser = users.find(u=>u.name=name)
    if (!searchUser){
        users.push({
            'id':users.length+1,
            'name':name
        })
    }

    // get user data 
    const user = users.find(u=>u.name=name)
    appointments.push({
        'id':appointments.length+1,
        'userId':user.id,
        'date':date,
        'time':time
    })
    res.send({'message':`user : ${name} has booked on date : ${date} at ${time}`})
})



// list all user appointment

app.get('/appointments',(req,res)=>{
    const {username} = req.query
    const user = users.find(u=>u.name == username)
    console.log('users',users)
    console.log('searched user is : ',user)
    console.log('appointments',appointments)
    if(!user) {
        console.log('user not found')
        res.status(404).json({'message':'User not found'})
    }
    else{
        console.log(user.id)
        const user_app = appointments.filter(appt=> appt['userId']===user.id)
        console.log('user_app',user_app)
        res.json(user_app)
    }

    
})


app.listen(3000, () => {
    console.log('Listening on 3000')
  })
