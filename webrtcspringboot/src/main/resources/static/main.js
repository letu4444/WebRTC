var stompClient = null;
var sender1;
$('.chat1').click(function() {
	$('.chat2-2').text($('.chat1-1').val());
	$(".chat").css("display", "none");
	$(".chat2").css("display", "flex");
	var socket = new SockJS('/ws');
		stompClient = Stomp.over(socket);
		stompClient.connect({}, onConnected, onError);
	sender1 = $('.chat1-1').val();
});

$(document).on("click", ".chat2-4-1", function() {
	$('.chat2-6-1').text($(this).text());
});


$(document).on("click",".send",function(){
	
 let nd  =	$('.chat2-8-1').val();
 $('.chat2-7').append('<div class="nd1">Tôi:<span class="nd2">'+nd+'</span></div>');
 var chat = {
		sender: sender1,
		render:$('.chat2-6-1').text(),
		message:nd,
		type: "message"
	};
	stompClient.send("/app/messageuser", {}, JSON.stringify(chat));
 
});



//tạo hàm cho việc đã kết nối rồi
function onConnected() {
	stompClient.subscribe("/groud/public", onMessage);
	stompClient.subscribe("/user/" +sender1+ "/usermessage", onTraMessage);
	//Hàm nhận đã đăg nhập
	userJoin();
}

//HÀm đã đăng nhập
function userJoin() {
	console.log(sender1);
	var chat = {
		sender: sender1,
		type: "join"
	};
	stompClient.send("/app/message", {}, JSON.stringify(chat));
}

//xử lý khi lỗi
function onError(event) {
	console.log(event);
}
let ten ;
const onTraMessage =(payload)=>{
	var dodai =document.querySelectorAll('.chat2-4-1');
	let mege = JSON.parse(payload.body);
	console.log(mege);
	for(let i=0;i<dodai.length;i++){
		ten = dodai[i].innerText;
		if( ten == mege.sender){
			break;
		}
				
	}
	if(ten != mege.sender){
			$('.chat2-4-2').append('<li class="chat2-4-1">'+mege.sender+'</li>');
	}
	switch (mege.type) {
		case "message":
			 $(".chat2-7").append('<div class="nd4">Đối phương:<span class="nd3">'+mege.message+'</span></div>')
			 break
		case "video":
			$('.bao').css("display","block")
			$('.bao1-3').text(mege.sender)
			break
	}
	/*if(mege.type =="message"){
		    $(".chat2-7").append('<div class="nd4">Đối phương:<span class="nd3">'+mege.message+'</span></div>');
	}
	if()*/
	
}
const onMessage =(payload)=>{
	let mege = JSON.parse(payload.body);
	console.log(mege);
	if(mege.type =="join" && mege.sender != sender1){
		$('.chat2-4-2').append('<li class="chat2-4-1">'+mege.sender+'</li>');
	}
	
}
$('.chat2-6-4').click(function(){
	 var chat = {
		sender: sender1,
		render:$('.chat2-6-1').text(),
		message:'',
		type: "video"
		
	};
	stompClient.send("/app/messageuser", {}, JSON.stringify(chat));
	 window.open('http://localhost:8187/video');
})
$('.bao1-6').click(function(){
	 window.open('http://localhost:8187/video');
});