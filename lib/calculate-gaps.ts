import type { Question } from "./questions"

export interface Gap {
  dimension: string
  score: number
  severity: "High" | "Medium" | "Low"
  issues: string
  action: string
}

export function calculateGaps(answers: Record<number, number>, questions: Question[]): Gap[] {
  return questions.map((question, index) => {
    const score = answers[index] || 0

    let severity: "High" | "Medium" | "Low"
    let issues: string
    let action: string

    if (score <= 1.5) {
      severity = "High"

      // Customize issues and actions based on the dimension
      switch (index) {
        case 0: // Risk-Based Approach
          issues = "No structured risk mapping by role or business unit"
          action = "Introduce risk matrix & mapping logic"
          break
        case 1: // Policy Coverage
          issues = "Incomplete coverage of policies and procedures"
          action = "Conduct gap analysis and expand training content"
          break
        case 2: // Role-Specific
          issues = "Generic training not tailored to specific roles"
          action = "Segment training by role and responsibility"
          break
        case 3: // Effectiveness
          issues = "No measurement of training effectiveness"
          action = "Implement pre/post assessments and feedback mechanisms"
          break
        case 4: // Maintenance
          issues = "No regular update schedule or process"
          action = "Establish quarterly review and update procedures"
          break
        case 5: // Clear Roles
          issues = "Unclear ownership and responsibilities"
          action = "Define and document training roles and responsibilities"
          break
        case 6: // Governance
          issues = "Lack of oversight and governance structure"
          action = "Implement governance framework with executive sponsorship"
          break
        case 7: // Traceability
          issues = "Unable to track or measure training completion"
          action = "Deploy tracking system with reporting capabilities"
          break
        case 8: // Documentation
          issues = "No evidence of yearly updates or archiving"
          action = "Implement version control and documentation standards"
          break
        default:
          issues = "Significant gaps identified"
          action = "Conduct detailed assessment and develop improvement plan"
      }
    } else if (score <= 2.5) {
      severity = "Medium"

      switch (index) {
        case 0: // Risk-Based Approach
          issues = "Partial risk assessment without systematic approach"
          action = "Enhance risk methodology and documentation"
          break
        case 1: // Policy Coverage
          issues = "Some policies covered but not comprehensive"
          action = "Review coverage and prioritize missing elements"
          break
        case 2: // Role-Specific
          issues = "Overlaps across roles; lack of tailored content"
          action = "Review and segment training by role"
          break
        case 3: // Effectiveness
          issues = "Limited measurement of training outcomes"
          action = "Expand assessment methods and metrics"
          break
        case 4: // Maintenance
          issues = "Irregular updates without clear schedule"
          action = "Formalize update process and calendar"
          break
        case 5: // Clear Roles
          issues = "Some roles defined but gaps in accountability"
          action = "Clarify responsibilities and reporting lines"
          break
        case 6: // Governance
          issues = "Basic governance without structured oversight"
          action = "Strengthen governance framework and reporting"
          break
        case 7: // Traceability
          issues = "Basic tracking without comprehensive metrics"
          action = "Enhance tracking with detailed analytics"
          break
        case 8: // Documentation
          issues = "Inconsistent documentation practices"
          action = "Standardize documentation approach and templates"
          break
        default:
          issues = "Areas for improvement identified"
          action = "Develop targeted enhancement plan"
      }
    } else {
      severity = "Low"
      issues = "Minor improvements possible"
      action = "Continue monitoring and refine as needed"
    }

    return {
      dimension: question.shortLabel,
      score,
      severity,
      issues,
      action,
    }
  })
}
