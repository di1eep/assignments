def calculate_stock_span(prices):
    n = len(prices)
    spans = [0] * n
    spans[0] = 1  # Span of the first day is always 1

    for i in range(1, n):
        current_price = prices[i]
        span = 1  # Default span for the current day

        # Initialize index for backward traversal
        j = i - 1

        # Backward traversal to find the span
        while j >= 0 and current_price >= prices[j]:
            span += spans[j]
            j -= spans[j]

        spans[i] = span

    return spans

# Example usage:
stock_prices = [100, 80, 60, 70, 60, 75, 85]
result = calculate_stock_span(stock_prices)
print("Stock Spans:", result)
