package com.example.financetracker.service;

import com.example.financetracker.dto.CategoryPredictionResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class TransactionCategorizationService {
    private final RestTemplate restTemplate;
    private static final String PYTHON_API_URL = "http://localhost:5000/predict";

    public TransactionCategorizationService() {
        this.restTemplate = new RestTemplate();
    }

    public CategoryPredictionResponse predictCategory(String transactionName) {
        try {
            Map<String, String> request = Map.of("transaction", transactionName);
            return restTemplate.postForObject(
                    PYTHON_API_URL,
                    request,
                    CategoryPredictionResponse.class
            );
        } catch (RestClientException e) {
            throw new RuntimeException("Failed to predict category: " + e.getMessage(), e);
        }
    }
}
