const signInForm=document.getElementById('signinForm')
const signUpForm=document.getElementById('signupForm')
const logOutBtn=document.getElementById('btn-logout')
const hiddenContent=document.getElementById('gated-content')
const taskContainer=document.getElementById('taskContainer')
const userContainer=document.getElementById('userContainer')


const logout=()=>{
    localStorage.removeItem('taskmanagertoken')
    localStorage.removeItem('isAdmin')
    logOutBtn.style.display='none'
    signInForm.style.display='block'
    hiddenContent.style.display='none'
    taskContainer.innerHTML=''
    userContainer.innerHTML=''
}

const signinform = document.getElementById('signinForm')
signinform.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(document.getElementById('formData'));
    const email = formData.get('email');
    const password = formData.get('password');
    signin(email,password);
    document.getElementById('formData').reset()
})

const signin=async(email,password)=>{
    const response= await fetch(`http://localhost:2000/SignIn`,{
        method: `POST`,
        headers:{"Content-Type":"application/json","Accepted":"application/json"},
        body:JSON.stringify({'email':email,'password':password})
    });
    if(response.status==200){
        hiddenContent.style.display='block'
        logOutBtn.style.display='block'
        const userData = await response.json()
        signInForm.style.display='none'
        localStorage.setItem('taskmanagertoken',userData.token)
        localStorage.setItem('isAdmin',userData.isAdmin)
        if (userData.isAdmin){
            await loadUsers()
        }
        else{
            await loadTask()
        }
    }
}

window.onload=async()=>{
    if(localStorage.getItem('taskmanagertoken') && localStorage.getItem('isAdmin')){
        hiddenContent.style.display='block'
        if(localStorage.getItem('isAdmin')==='true'){
        console.log(localStorage.getItem('isAdmin'),'window')
            loadUsers()
        }
        else{
            loadTask()
        }
        logOutBtn.style.display='block'
        signInForm.style.display='none'
        signUpForm.style.display='none'
    }
}

const loadTask = async(url='http://localhost:2000/tasks')=>{
    const token = localStorage.getItem('taskmanagertoken')
    const response = await fetch(`${url}`, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      })
    const tasks=await response.json()
    console.log(tasks)
    displayTasks(tasks)
}

const displayTasks=(tasks)=>{
    taskContainer.innerHTML=''
    taskContainer.style.display='flex'
    userContainer.style.display='none'
    if (localStorage.getItem('isAdmin')==='true'){
        createBackbtn()   
    }
    else{
        createAddTaskbtn()
    }
    if(tasks.length==0){
        alert('Empty Task List')
    }
    tasks.forEach(element => {
        let card=document.createElement('div')
        card.className='taskCard'
        let title=document.createElement('h3')
        title.innerText=`Task:____${element.title}`
        let desc=document.createElement('h3')
        desc.innerText=`Desc:___${element.desc}`
        let status=document.createElement('h3')
        status.innerText=`Status:___${element.status}`
        let delBtn=document.createElement('button')
        delBtn.className='button'
        delBtn.id='delete'
        delBtn.innerText="DELETE"
        delBtn.style.background='white'
        delBtn.id=element.id
        delBtn.addEventListener('click',()=>{
            deleteTaskReuest(delBtn.id)
        })
        let updateBtn=document.createElement('button')
        updateBtn.className='button'
        updateBtn.id='delete'
        updateBtn.innerText="UPDATE"
        updateBtn.style.background='white'
        updateBtn.id=element.id
        updateBtn.addEventListener('click',()=>{
            updateTask(updateBtn.id,element.title,element.desc,element.status)
        })
        card.appendChild(title)
        card.appendChild(status)
        card.appendChild(desc)
        let btn_div = document.createElement('div')
        btn_div.appendChild(delBtn)
        btn_div.appendChild(updateBtn)
        btn_div.style.display='flex'
        card.appendChild(btn_div)
        taskContainer.appendChild(card)
    })
}

const updateTaskForm= document.getElementById('formData4')
const updateBtn =document.getElementById('updatebtn')
const updateTask = (id,title,desc,status)=>{
    displayUpdateTaskForm()
    updateTaskForm.title.value=title
    updateTaskForm.desc.value=desc
    updateTaskForm.status.value=status
    updateBtn.id = id
}
const uTaskForm= document.getElementById('updateTaskForm')
uTaskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(document.getElementById('formData4'));
    const title = formData.get('title');
    const desc = formData.get('desc');
    const status = formData.get('status');
    updateTaskRequest(title,desc,status);
    closeUpdateTaskForm()
})

const updateTaskRequest=async(title,desc,status)=>{
    const token = localStorage.getItem('taskmanagertoken')
    const response= await fetch(`http://localhost:2000/tasks`,{
        method: `PUT`,
        headers:{"Content-Type":"application/json","Accepted":"application/json",'Authorization': token},
        body:JSON.stringify({'taskId':updateBtn.id,'title':title,'desc':desc,'status':status})
    });   
    taskForm.style.display='none'
    loadTask()        
}

const createAddTaskbtn=()=>{
    let btn = document.createElement('button')
    btn.innerText = 'CREATE TASK'
    btn.id='delbtn'
    taskContainer.appendChild(btn)
    btn.addEventListener('click',()=>{
        taskForm.style.display='block'
    })
}



const createBackbtn=()=>{
    let btn = document.createElement('button')
    btn.innerText = 'BACK'
    btn.id='delbtn'
    taskContainer.appendChild(btn)
    btn.addEventListener('click',()=>{
        taskContainer.style.display='none'
        userContainer.style.display='flex'
    })
}

const loadUsers = async()=>{
    const token = localStorage.getItem('taskmanagertoken')
    const response = await fetch('http://localhost:2000/users', {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        method: 'GET',
      })
    const userList = await response.json()
    displayUsers(userList)
}

const signupform = document.getElementById('signupForm')
signupform.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(document.getElementById('formData2'));
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');
    signup(email,password,username);
    document.getElementById('formData2').reset()
})



const signup=async(email,password,username)=>{
    const response= await fetch(`http://localhost:2000/SignUp`,{
        method: `POST`,
        headers:{"Content-Type":"application/json","Accepted":"application/json"},
        body:JSON.stringify({'email':email,'password':password,'username':username})
    });
    if(response.status==200){
        alert('account created sucessfully , please log in')
        switchSignInUp()
    }
    else{
        alert('account already exists / fill correct details')
    }
}

const switchSignInUp=()=>{
    if (signInForm.style.display=='none'){
        signInForm.style.display='block'
        signUpForm.style.display='none'
    }
    else{
        signInForm.style.display='none'
        signUpForm.style.display='block'    
    }
}

const closeUpdateTaskForm=()=>{
    document.getElementById('updateTaskForm').style.display='none'
}

const closeTaskForm=()=>{
    document.getElementById('taskForm').style.display='none'
}

const taskForm = document.getElementById('taskForm')
taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(document.getElementById('formData3'));
    const title = formData.get('title');
    const desc = formData.get('desc');
    const status = formData.get('status');
    createTaskRequest(title,desc,status);
    document.getElementById('formData3').reset()
})

const displayUpdateTaskForm=()=>{
    document.getElementById('updateTaskForm').style.display='block'
}

const createTaskRequest = async (title,desc,status) => {
    const token = localStorage.getItem('taskmanagertoken')
    const response= await fetch(`http://localhost:2000/tasks`,{
        method: `POST`,
        headers:{"Content-Type":"application/json","Accepted":"application/json",'Authorization': token},
        body:JSON.stringify({'title':title,'desc':desc,'status':status})
    });   
    console.log(await response.json())
    taskForm.style.display='none'
    loadTask()
}

const deleteTaskReuest = async(taskId)=>{
    const token = localStorage.getItem('taskmanagertoken')
    const response= await fetch(`http://localhost:2000/tasks`,{
        method: `DELETE`,
        headers:{"Content-Type":"application/json","Accepted":"application/json",'Authorization': token},
        body:JSON.stringify({'taskId':taskId})
    });
    loadTask()
}

const displayUsers=(userList)=>{
    userContainer.innerHTML=''
    taskContainer.style.display='none'
    userContainer.style.display='flex'
    userList.forEach(element=>{
        let card = document.createElement('div')
        card.className='userCard'
        card.id=`${element.id}`
        let id = document.createElement('h3')
        let email = document.createElement('h3')
        let userName = document.createElement('h3')
        userName.innerText = `UserName:__ ${element.name}`
        id.innerText = `UserID:_____ ${element.id}`
        email.innerText =`UserEmail:__ ${element.email}`
        card.appendChild(id)
        card.appendChild(userName)
        card.appendChild(email)
        card.addEventListener('click',()=>{
            loadTask(`http://localhost:2000/tasks/${card.id}`)
        })
        userContainer.appendChild(card)
    })
}