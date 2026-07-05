package com.cognizant.spring_learn.service;

import com.cognizant.spring_learn.Country;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    public Country getCountry(String code) {

        ApplicationContext context =
                new ClassPathXmlApplicationContext("country.xml");

        List<Country> countryList =
                context.getBean("countryList", List.class);

        for (Country country : countryList) {
            if (country.getCode().equalsIgnoreCase(code)) {
                ((ClassPathXmlApplicationContext) context).close();
                return country;
            }
        }

        ((ClassPathXmlApplicationContext) context).close();
        return null;
    }
}