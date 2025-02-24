package org.manh.help_desk_ticketing_system_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class HelpDeskTicketingSystemServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelpDeskTicketingSystemServerApplication.class, args);
	}

}
