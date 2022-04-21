// NOTE: https://dockyard.com/blog/2020/02/14/you-probably-don-t-need-moment-js-anymore

export function formatDate(date_as_string) {
  return new Date(date_as_string).toLocaleDateString('en-GB');
}

export function formatDateTime(date_as_string) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return new Date(date_as_string).toLocaleDateString('en-GB', options);
}
