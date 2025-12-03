package com.example.financetracker.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CategoryPredictionResponse {
    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("transaction_name")
    private String transactionName;
}
