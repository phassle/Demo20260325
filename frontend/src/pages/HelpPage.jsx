const faqs = [
  {
    question: 'How do I create a new document?',
    answer:
      'Navigate to the Documents page and click "New Document". Fill in the title, category, and content, then submit for review. Documents go through Draft, InReview, and Approved stages.',
  },
  {
    question: 'What happens when a deviation is reported?',
    answer:
      'Deviations are created with an "Open" status. A quality manager reviews and assigns them. The assignee investigates, implements corrective actions, and resolves the deviation. Finally, the quality manager closes it.',
  },
  {
    question: 'How are audits scheduled?',
    answer:
      'Audits are planned by quality managers and assigned to auditors. Each audit has a scheduled date and department. Once the audit is conducted and findings recorded, the status moves from Planned to InProgress to Completed.',
  },
  {
    question: 'What is the difference between a case and a deviation?',
    answer:
      'Cases are general management items such as CAPAs, change requests, or complaints. Deviations specifically track non-conformances and quality issues that require corrective action.',
  },
  {
    question: 'Who can export documents as CSV?',
    answer:
      'Only users with the Admin role can export documents. The export feature will be available on the Documents page once enabled by the system administrator.',
  },
];

export function HelpPage() {
  return (
    <div>
      <div class="page-header">
        <h2 class="page-title">Help & FAQ</h2>
      </div>
      <div class="faq-list">
        {faqs.map((faq, i) => (
          <div class="card faq-item" key={i}>
            <h3 class="faq-question">{faq.question}</h3>
            <p class="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
