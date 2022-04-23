// NOTE: https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB')
}

export function formatDateTime(date) {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  return new Date(date).toLocaleDateString('en-GB', options)
}
