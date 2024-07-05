package webrtcspringboot.webchat;

public class Message {

	private String render;
	private String sender;
	private String message;
	private String type;
	public String getRender() {
		return render;
	}
	public void setRender(String render) {
		this.render = render;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
