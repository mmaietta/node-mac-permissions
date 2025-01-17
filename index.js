const nonMacResponse = () => undefined
const stub = {
  askForCalendarAccess: nonMacResponse,
  askForContactsAccess: nonMacResponse,
  askForFoldersAccess: nonMacResponse,
  askForFullDiskAccess: nonMacResponse,
  askForRemindersAccess: nonMacResponse,
  askForCameraAccess: nonMacResponse,
  askForMicrophoneAccess: nonMacResponse,
  askForPhotosAccess: nonMacResponse,
  askForSpeechRecognitionAccess: nonMacResponse,
  askForScreenCaptureAccess: nonMacResponse,
  askForAccessibilityAccess: nonMacResponse,
  getAuthStatus: nonMacResponse,
}

const os = require('os')
const permissions = os.platform() === 'darwin' ? require('bindings')('permissions.node') : stub

function getAuthStatus(type) {
  const validTypes = [
    'contacts',
    'calendar',
    'reminders',
    'full-disk-access',
    'camera',
    'photos',
    'speech-recognition',
    'microphone',
    'accessibility',
    'location',
    'screen',
    'bluetooth',
  ]

  if (!validTypes.includes(type)) {
    throw new TypeError(`${type} is not a valid type`)
  }

  return permissions.getAuthStatus.call(this, type)
}

function askForFoldersAccess(folder) {
  const validFolders = ['desktop', 'documents', 'downloads']

  if (!validFolders.includes(folder)) {
    throw new TypeError(`${folder} is not a valid protected folder`)
  }

  return permissions.askForFoldersAccess.call(this, folder)
}

module.exports = {
  ...permissions,
  askForFoldersAccess,
  getAuthStatus,
}
