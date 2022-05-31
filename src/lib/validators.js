export const isEmptyString = (string) => {
  return (
    typeof string === 'undefined' ||
    string === null ||
    string.toString().trim().length == 0
  )
}

export const isNotDefined = (value) => {
  return typeof value === 'undefined' || value === null
}
