function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return !arr1.some((value, index) => value !== arr2[index]);
}

function getRecipientsList() {
  const scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty('REPORT_RECIPIENTS_LIST');
}
