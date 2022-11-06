const socket = io('http://localhost:8000');
 const form = document.getElementById('send-container');
 const messageInput = document.getElementById('messageInp')
 const messageContainer= document.querySelector(".container")
 var audio=new Audio('C:\Users\vaishnavi naygaonkar\Desktop\project\mixkit-game-notification-wave-alarm-987 - Shortcut.lnk');
 
 const append = (message, position)=>{

 const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position=='left'){
audio.play();
}

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message= messageInput.value;
    append('You: ${message}','right');
    socket.emit('send',message);
    messageInput=''
})

const name=prompt("Enter your name to join");
socket.emit('new-user-joined',name);
socket.on('user-joined', name =>{
    append('${name} joined the chat'),'right'
})
socket.on('receive', data =>{
    append('${data.name}: ${data.message}','right')
})
socket.on('left', data =>{
    append('${data.name}left the chat','left')
})