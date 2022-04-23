export default function isJobOwner(job, person) {
  return job.created_by === person?.id
}
