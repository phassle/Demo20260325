namespace CompanyX.Integrations.ComplianceEngine;

/// <summary>
/// Mock implementation of the compliance validator.
/// For demo/workshop use only — not for production.
/// </summary>
public class ComplianceValidator
{
    public async Task<ValidationResult> ValidateTransactionAsync(Transaction transaction)
    {
        var result = new ValidationResult { IsValid = true };

        if (transaction.Amount > 15_000)
            result.Flags.Add("LARGE_TRANSACTION: Requires enhanced due diligence");

        if (string.IsNullOrEmpty(transaction.CounterpartyId))
        {
            result.IsValid = false;
            result.Flags.Add("MISSING_COUNTERPARTY: KYC check required");
        }

        return await Task.FromResult(result);
    }
}

public class Transaction
{
    public string Id { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "SEK";
    public string CounterpartyId { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}

public class ValidationResult
{
    public bool IsValid { get; set; }
    public List<string> Flags { get; set; } = new();
}
