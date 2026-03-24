using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public class AuditService : IAuditService
{
    private static readonly IReadOnlyList<Audit> Audits = new List<Audit>
    {
        new() { Id = 1,  Title = "Annual ISO 9001 Surveillance Audit",          Type = AuditType.External,  Status = AuditStatus.Completed,  AuditorName = "DNV GL - Karin Holm",       Department = "Quality",     ScheduledDate = new DateTime(2025, 3, 15),  CompletedDate = new DateTime(2025, 3, 17),  Findings = 3 },
        new() { Id = 2,  Title = "Production Process Compliance Audit",         Type = AuditType.Internal,  Status = AuditStatus.Completed,  AuditorName = "Anna Lindberg",             Department = "Production",  ScheduledDate = new DateTime(2025, 5, 10),  CompletedDate = new DateTime(2025, 5, 12),  Findings = 5 },
        new() { Id = 3,  Title = "Supplier Qualification Audit - ChemCorp AB",  Type = AuditType.External,  Status = AuditStatus.Completed,  AuditorName = "Erik Johansson",            Department = "Quality",     ScheduledDate = new DateTime(2025, 6, 20),  CompletedDate = new DateTime(2025, 6, 21),  Findings = 2 },
        new() { Id = 4,  Title = "Document Control System Audit",               Type = AuditType.Internal,  Status = AuditStatus.Completed,  AuditorName = "Nils Eriksson",             Department = "Quality",     ScheduledDate = new DateTime(2025, 8, 5),   CompletedDate = new DateTime(2025, 8, 6),   Findings = 1 },
        new() { Id = 5,  Title = "Warehouse and Storage Compliance Audit",      Type = AuditType.Internal,  Status = AuditStatus.Completed,  AuditorName = "Anna Lindberg",             Department = "Logistics",   ScheduledDate = new DateTime(2025, 9, 15),  CompletedDate = new DateTime(2025, 9, 16),  Findings = 4 },
        new() { Id = 6,  Title = "R&D Laboratory Practices Audit",              Type = AuditType.Internal,  Status = AuditStatus.InProgress, AuditorName = "Maria Karlsson",            Department = "R&D",         ScheduledDate = new DateTime(2026, 1, 10),  CompletedDate = null,                       Findings = 0 },
        new() { Id = 7,  Title = "IT System Validation Audit",                  Type = AuditType.Internal,  Status = AuditStatus.Planned,    AuditorName = "Nils Eriksson",             Department = "IT",          ScheduledDate = new DateTime(2026, 3, 1),   CompletedDate = null,                       Findings = 0 },
        new() { Id = 8,  Title = "FDA Pre-Approval Inspection Readiness",       Type = AuditType.External,  Status = AuditStatus.Planned,    AuditorName = "TBD - FDA Investigator",    Department = "Production",  ScheduledDate = new DateTime(2026, 5, 15),  CompletedDate = null,                       Findings = 0 },
        new() { Id = 9,  Title = "Environmental Health and Safety Audit",       Type = AuditType.Internal,  Status = AuditStatus.Planned,    AuditorName = "Lars Pettersson",           Department = "Production",  ScheduledDate = new DateTime(2026, 4, 10),  CompletedDate = null,                       Findings = 0 },
        new() { Id = 10, Title = "ISO 14001 Recertification Audit",             Type = AuditType.External,  Status = AuditStatus.Planned,    AuditorName = "Bureau Veritas - Jan Berg",  Department = "Quality",     ScheduledDate = new DateTime(2026, 6, 1),   CompletedDate = null,                       Findings = 0 },
    };

    public Task<IEnumerable<Audit>> GetAllAsync()
        => Task.FromResult<IEnumerable<Audit>>(Audits);

    public Task<Audit?> GetByIdAsync(int id)
        => Task.FromResult(Audits.FirstOrDefault(a => a.Id == id));
}
