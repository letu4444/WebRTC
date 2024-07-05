package webrtcspringboot.webchat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class VideoController {

	
	@GetMapping("/video")
	public String Video() {
		return "videochat";
	}
}
