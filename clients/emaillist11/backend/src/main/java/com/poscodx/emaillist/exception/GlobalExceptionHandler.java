package com.poscodx.emaillist.exception;



import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.poscodx.emaillist.dto.JsonResult;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public void handlerException(HttpServletRequest request, HttpServletResponse response, Exception e) throws Exception {
		// logging
		StringWriter errors = new StringWriter();
		e.printStackTrace(new PrintWriter(errors));
		log.error(errors.toString());
		
		
		// 500 for json request
		String accept = request.getHeader("accept");
		if(accept.matches(".*application/json.*")) { 
			JsonResult jsonResult = JsonResult.fail(errors.toString());
			String jsonString = new ObjectMapper().writeValueAsString(jsonResult);
			
			response.setStatus(HttpServletResponse.SC_OK);
			response.setContentType("application/json; charset=utf-8");
			OutputStream os = response.getOutputStream();
			os.write(jsonString.getBytes("utf-8"));
			os.close();
			
			return;
		}
		
		// 404 for html request
		if(e instanceof NoHandlerFoundException) {
			request.getRequestDispatcher("/error/404").forward(request, response);
			return;
		}
		
		// 500 for html request 
		request.setAttribute("errors", errors.toString());
		request.getRequestDispatcher("/error/500").forward(request, response);
	}
}