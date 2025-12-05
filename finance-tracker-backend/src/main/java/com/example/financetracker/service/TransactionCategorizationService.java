package com.example.financetracker.service;

import com.example.financetracker.dto.CategoryPredictionResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Service responsible for predicting transaction categories by calling
 * an external Python AI API.
 */
@Service
public class TransactionCategorizationService {

    private static final Logger log = LoggerFactory.getLogger(TransactionCategorizationService.class);

    private final RestTemplate restTemplate;
    private static final String PYTHON_API_URL = "http://localhost:5000/predict";

    public TransactionCategorizationService() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * Predicts the category of a transaction by its name.
     *
     * @param transactionName the name/description of the transaction
     * @return a CategoryPredictionResponse containing the predicted category
     * @throws RuntimeException if the external AI service call fails
     */
    public CategoryPredictionResponse predictCategory(String transactionName) {
        log.info("Predicting category for transaction: '{}'", transactionName);
        try {
            Map<String, String> request = Map.of("transaction", transactionName);
            CategoryPredictionResponse response = restTemplate.postForObject(
                    PYTHON_API_URL,
                    request,
                    CategoryPredictionResponse.class
            );
            log.debug("Received category prediction: {}", response != null ? response.getCategoryName() : "null");
            return response;
        } catch (RestClientException e) {
            throw new RestClientException("Failed to predict category: " + e.getMessage(), e);
        }
    }
}
