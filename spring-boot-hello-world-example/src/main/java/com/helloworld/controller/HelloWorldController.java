package com.helloworld.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.apache.commons.math3.random.RandomDataGenerator;

@RestController
public class HelloWorldController 
{
    int id = 0;

    public HelloWorldController() {
        RandomDataGenerator randomDataGenerator = new RandomDataGenerator();
        id = randomDataGenerator.nextInt(0, 100);
    }

    @RequestMapping("/")
    public String hello() 
    {
        return String.format("<h1> Server id: %s </h1>", id.toString());
    }
}
