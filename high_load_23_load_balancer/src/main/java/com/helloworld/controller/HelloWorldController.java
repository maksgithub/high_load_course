package com.helloworld.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Date;

@RestController
public class HelloWorldController 
{
    long id = 0;

    public HelloWorldController() {
        Date date = new Date();
        id = date.getTime();
    }

    @RequestMapping("/")
    public String hello() 
    {
        return String.format("<h1> Server id: %s </h1>", id.toString());
    }
}
