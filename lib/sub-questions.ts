export interface SubQuestion {
  question: string
}

// Each array corresponds to a main question
export const subQuestions: SubQuestion[][] = [
  // Risk-Based Approach
  [
    { question: "Is there a documented risk assessment for training needs?" },
    { question: "Are high-risk areas given priority in the training program?" },
    { question: "Is the training frequency adjusted based on risk levels?" },
  ],
  // Policy Coverage
  [
    { question: "Does the training cover all relevant AML regulations?" },
    { question: "Are internal policies and procedures included in the training?" },
    { question: "Is the training updated when policies change?" },
  ],
  // Role-Specific
  [
    { question: "Are there different training modules for different roles?" },
    { question: "Is the content tailored to job responsibilities?" },
    { question: "Are specialized roles given advanced training?" },
  ],
  // Effectiveness
  [
    { question: "Are there pre and post-training assessments?" },
    { question: "Is feedback collected from participants?" },
    { question: "Are there metrics to measure knowledge retention?" },
  ],
  // Maintenance
  [
    { question: "Is there a schedule for regular updates?" },
    { question: "Is content reviewed for accuracy and relevance?" },
    { question: "Are regulatory changes promptly incorporated?" },
  ],
  // Clear Roles
  [
    { question: "Is there a designated training owner/manager?" },
    { question: "Are responsibilities for content creation clearly assigned?" },
    { question: "Is there accountability for training completion?" },
  ],
  // Governance
  [
    { question: "Is there executive oversight of the training program?" },
    { question: "Are there regular reports on training status?" },
    { question: "Is there a process for addressing training deficiencies?" },
  ],
  // Traceability
  [
    { question: "Is training attendance/completion tracked?" },
    { question: "Are assessment results recorded?" },
    { question: "Can you demonstrate training history for audits?" },
  ],
  // Documentation
  [
    { question: "Are training materials version-controlled?" },
    { question: "Is there documentation of training sessions?" },
    { question: "Are training records retained for an appropriate period?" },
  ],
]
