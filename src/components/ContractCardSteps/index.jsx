import React from 'react'
import { Step } from 'semantic-ui-react'

export const ContractCardSteps = ({
  me,
  currentStep,
  currentStatus,
  statuses,
}) => {
  return (
    <Step.Group ordered width={5} fluid>
      <Step
        active={currentStatus === 'created'}
        completed={currentStep > statuses['accepted']}
        disabled={currentStep < statuses['accepted']}
      >
        <Step.Content>
          <Step.Title>
            {currentStep > statuses['accepted'] ? 'Accepted' : 'Accept'}
          </Step.Title>
          <Step.Description>
            {me === 'contractor' ? 'Me' : 'Contractor'}
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={currentStatus === 'accepted'}
        completed={currentStep > statuses['deployed']}
        disabled={currentStep < statuses['deployed']}
      >
        <Step.Content>
          <Step.Title>
            {currentStep > statuses['deployed'] ? 'Deployed' : 'Deploy'}
          </Step.Title>
          <Step.Description>
            {me === 'customer' ? 'Me' : 'Customer'}
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={currentStatus === 'deployed'}
        completed={currentStep > statuses['signed']}
        disabled={currentStep < statuses['signed']}
      >
        <Step.Content>
          <Step.Title>
            {currentStep > statuses['signed'] ? 'Signed' : 'Sign'}
          </Step.Title>
          <Step.Description>
            {me === 'contractor' ? 'Me' : 'Contractor'}
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={currentStatus === 'signed'}
        completed={currentStep > statuses['funded']}
        disabled={currentStep < statuses['funded']}
      >
        <Step.Content>
          <Step.Title>
            {currentStep > statuses['funded'] ? 'Funded' : 'Fund'}
          </Step.Title>
          <Step.Description>
            {me === 'customer' ? 'Me' : 'Customer'}
          </Step.Description>
        </Step.Content>
      </Step>

      <Step
        active={currentStatus === 'funded'}
        completed={currentStep > statuses['approved']}
        disabled={currentStep < statuses['approved']}
      >
        <Step.Content>
          <Step.Title>
            {currentStep > statuses['approved'] ? 'Approved' : 'Approve'}
          </Step.Title>
          <Step.Description>
            {me === 'customer' ? 'Me' : 'Customer'}
          </Step.Description>
        </Step.Content>
      </Step>
    </Step.Group>
  )
}
