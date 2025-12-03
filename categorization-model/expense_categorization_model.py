from transformers import BertTokenizer, BertForSequenceClassification

model_name = "kuro-08/bert-transaction-categorization"
tokenizer = BertTokenizer.from_pretrained(model_name)
model = BertForSequenceClassification.from_pretrained(model_name)

def predict(transaction):
    inputs = tokenizer(transaction, return_tensors="pt", truncation=True, padding=True)
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_category_id = logits.argmax(-1).item()
    return predicted_category_id
