using Centuri.Demo.Models;
namespace Centuri.Demo.Services;

public class CaseService : ICaseService
{
    private static readonly IReadOnlyList<CaseItem> Cases = new List<CaseItem>
    {
        new() { Id = 1,  Title = "Customer complaint: particulate matter in product P-100",     Description = "Customer reported visible particles in three vials from lot L20251001. Investigation required per SOP-001.",                     Type = CaseType.Complaint,   Priority = CasePriority.High,   Status = CaseStatus.InProgress, CreatedBy = "Erik Johansson",   CreatedAt = new DateTime(2025, 10, 20) },
        new() { Id = 2,  Title = "CAPA-2025-015: Recurring temperature excursions",             Description = "Third temperature excursion in cold storage room B within 6 months. Root cause analysis and systemic corrective action needed.", Type = CaseType.CAPA,        Priority = CasePriority.High,   Status = CaseStatus.InProgress, CreatedBy = "Anna Lindberg",    CreatedAt = new DateTime(2025, 11, 5) },
        new() { Id = 3,  Title = "Improvement: Digitize batch record review process",           Description = "Proposal to replace paper-based batch record review with electronic workflow to reduce cycle time by 40%.",                      Type = CaseType.Improvement, Priority = CasePriority.Medium, Status = CaseStatus.New,        CreatedBy = "Maria Karlsson",   CreatedAt = new DateTime(2025, 12, 1) },
        new() { Id = 4,  Title = "Customer complaint: delayed shipment of order ORD-8847",      Description = "Customer reported shipment arrived 5 days late due to quality hold. Impact assessment needed.",                                   Type = CaseType.Complaint,   Priority = CasePriority.Medium, Status = CaseStatus.Resolved,   CreatedBy = "Sofia Andersson",  CreatedAt = new DateTime(2025, 9, 15) },
        new() { Id = 5,  Title = "CAPA-2025-016: Equipment calibration process gaps",           Description = "Audit finding revealed three instruments with overdue calibration. Process improvement required.",                                Type = CaseType.CAPA,        Priority = CasePriority.High,   Status = CaseStatus.InProgress, CreatedBy = "Nils Eriksson",    CreatedAt = new DateTime(2025, 12, 3) },
        new() { Id = 6,  Title = "Improvement: Implement real-time environmental monitoring",   Description = "Proposal to install IoT sensors for continuous monitoring of cleanroom conditions with automated alerts.",                        Type = CaseType.Improvement, Priority = CasePriority.Low,    Status = CaseStatus.New,        CreatedBy = "Lars Pettersson",  CreatedAt = new DateTime(2025, 11, 15) },
        new() { Id = 7,  Title = "Customer complaint: incorrect documentation in shipment",     Description = "Certificate of Analysis missing from shipment to MedTech GmbH for order ORD-9102.",                                              Type = CaseType.Complaint,   Priority = CasePriority.Medium, Status = CaseStatus.Resolved,   CreatedBy = "Erik Johansson",   CreatedAt = new DateTime(2025, 8, 22) },
        new() { Id = 8,  Title = "CAPA-2025-017: Training effectiveness gaps",                  Description = "Management review identified insufficient training effectiveness verification. New assessment method needed.",                    Type = CaseType.CAPA,        Priority = CasePriority.Medium, Status = CaseStatus.New,        CreatedBy = "Anna Lindberg",    CreatedAt = new DateTime(2025, 12, 10) },
        new() { Id = 9,  Title = "Improvement: Automated deviation trending dashboard",         Description = "Build real-time dashboard for deviation trending and statistical analysis to support proactive quality management.",               Type = CaseType.Improvement, Priority = CasePriority.Medium, Status = CaseStatus.InProgress, CreatedBy = "Nils Eriksson",    CreatedAt = new DateTime(2025, 10, 5) },
        new() { Id = 10, Title = "Customer complaint: product viscosity out of specification",   Description = "Customer lab testing showed viscosity at 125 cP versus specification of 80-120 cP for lot L20250930.",                           Type = CaseType.Complaint,   Priority = CasePriority.High,   Status = CaseStatus.InProgress, CreatedBy = "Maria Karlsson",   CreatedAt = new DateTime(2025, 10, 8) },
        new() { Id = 11, Title = "CAPA-2025-018: Supplier non-conformance trend",               Description = "Three non-conforming material deliveries from supplier S-042 in Q4 2025. Supplier re-qualification or replacement required.",    Type = CaseType.CAPA,        Priority = CasePriority.High,   Status = CaseStatus.New,        CreatedBy = "Sofia Andersson",  CreatedAt = new DateTime(2025, 12, 18) },
        new() { Id = 12, Title = "Improvement: Standardize risk assessment templates",          Description = "Create unified risk assessment templates across departments to ensure consistent risk evaluation methodology.",                    Type = CaseType.Improvement, Priority = CasePriority.Low,    Status = CaseStatus.Resolved,   CreatedBy = "Lars Pettersson",  CreatedAt = new DateTime(2025, 7, 1) },
    };

    public Task<IEnumerable<CaseItem>> GetAllAsync()
        => Task.FromResult<IEnumerable<CaseItem>>(Cases);

    public Task<CaseItem?> GetByIdAsync(int id)
        => Task.FromResult(Cases.FirstOrDefault(c => c.Id == id));
}
