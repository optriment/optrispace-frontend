export function isJobOwner(job, person) {
  return job.created_by === person?.id;
}
