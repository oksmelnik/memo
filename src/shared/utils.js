export function isValidForm(formState) {
  let isValid = true

  Object.values(formState).forEach(item => {
    isValid = isValidField(item.id, item.value, formState) && isValid
  })

  return isValid
}


export function isValidField(id, value, formState) {
  const trimmedValue = value ? value.trim(' ') : ''
  let isValid = true
  const field  = formState[id]

  if (trimmedValue) {
    if (field.rules) {
      isValid = trimmedValue.length >= field.rules.minLength && isValid
    }
  } else if (field.required) {
    isValid = false
  }

  return isValid
}
