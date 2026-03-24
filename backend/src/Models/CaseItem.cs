namespace Centuri.Demo.Models;

public enum CaseType { Complaint, Improvement, CAPA }
public enum CasePriority { Low, Medium, High }
public enum CaseStatus { New, InProgress, Resolved }

public class CaseItem
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public CaseType Type { get; set; } = CaseType.Complaint;
    public CasePriority Priority { get; set; } = CasePriority.Medium;
    public CaseStatus Status { get; set; } = CaseStatus.New;
    public string CreatedBy { get; set; } = "";
    public DateTime CreatedAt { get; set; }
}
