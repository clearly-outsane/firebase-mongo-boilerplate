import * as Yup from 'yup'

const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
const SUPPORTED_AUDIO_FORMATS = ['audio/mpeg', 'audio/wav']
const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

export const validationSchemaForLogin = Yup.object({
  email: Yup.string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('')
    .min(8, 'Password must contain at least 8 characters')
    .required('Enter your password')
})

/**
 * @ignore
 * TODO - add address validation
 */
export const validationSchemaForSignUp = [
  Yup.object({
    email: Yup.string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string('Enter your password')
      .min(8, 'Password must contain at least 8 characters')
      .required('Password is required'),
    firstName: Yup.string('Enter your First Name').required(
      'This field is required'
    ),
    lastName: Yup.string('Enter your Last Name').required(
      'This field is required'
    )
  }),
  Yup.object({
    phoneNumber: Yup.string('Enter your Phone Number')
      .required('This field is required')
      .matches(phoneRegExp, 'Phone number is not valid'),
    address: Yup.string('Enter your address').required(
      'This field is required'
    ),
    state: Yup.string('Enter your state').required('This field is required'),
    country: Yup.string('Enter yourcountry').required('This field is required'),
    zipCode: Yup.string('Enter your Zip Code')
      // .test("Zip code test", "Invalid zip code", (value) => isValidZip(value))
      .required('This field is required')
  })
]

export const oneLastStepSchema = Yup.object({
  firstName: Yup.string('Enter your First Name').required(
    'This field is required'
  ),
  lastName: Yup.string('Enter your Last Name').required(
    'This field is required'
  ),
  phoneNumber: Yup.string('Enter your Phone Number')
    .required('This field is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  address: Yup.string('Enter your address').required('This field is required'),
  state: Yup.string('Enter your state').required('This field is required'),
  country: Yup.string('Enter yourcountry').required('This field is required'),
  zipCode: Yup.string('Enter your Zip Code')
    // .test("Zip code test", "Invalid zip code", (value) => isValidZip(value))
    .required('This field is required')
})

export const addSongSchema = Yup.object({
  singleTitle: Yup.string().required('This field is required'),
  explicit: Yup.string().required('This field is required'),
  artists: Yup.array().test(
    'Test empty',
    'This field is required',
    (value) => typeof value[0] !== 'undefined'
  ),
  language: Yup.string().required('This field is required'),
  primaryGenre: Yup.string().required('This field is required'),
  releaseDateAndTime: Yup.date().required('This field is required'),

  worldwide: Yup.string().required('This field is required'),
  previousRelease: Yup.string().required('This field is required'),
  labelName: Yup.string().required('This field is required'),

  recordingLocation: Yup.string().required('This field is required'),
  file: Yup.mixed()
    .required('This field is required')
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !!value && SUPPORTED_AUDIO_FORMATS.includes(value.type)
    )
    .nullable(),
  img: Yup.mixed()
    .required('This field is required')
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !!value && SUPPORTED_IMAGE_FORMATS.includes(value.type)
    )
    .nullable(),
  musicVideoUrl: Yup.string().matches(
    /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Invalid URL'
  )
})

export const addAlbumSchema = Yup.object({
  albumTitle: Yup.string().required('This field is required'),
  explicit: Yup.string().required('This field is required'),
  artists: Yup.array().test(
    'Test empty',
    'Cannot be empty',
    (value) => typeof value[0] !== 'undefined'
  ),
  // singles: Yup.array().test(
  //   "Test empty",
  //   "This field is required",
  //   (value) => typeof value[0] !== "undefined"
  // ),
  language: Yup.string().required('This field is required'),
  primaryGenre: Yup.string().required('This field is required'),
  releaseDate: Yup.date().required('This field is required'),

  worldwide: Yup.string().required('This field is required'),
  previousRelease: Yup.string().required('This field is required'),
  labelName: Yup.string().required('This field is required'),

  recordingLocation: Yup.string().required('This field is required'),

  img: Yup.mixed()
    .required('This field is required')
    .test(
      'fileType',
      'Unsupported file format',
      (value) => !!value && SUPPORTED_IMAGE_FORMATS.includes(value.type)
    )
    .nullable()
})

export const loginValues = { email: '', password: '' }

export const signUpValues = {
  firstName: '',
  lastName: '',
  password: '',
  showPassword: false,
  businessName: '',
  email: '',
  address: '',
  state: '',
  country: '',
  zipCode: '',
  phoneNumber: ''
}

export const oneLastStep = {
  firstName: '',
  lastName: '',
  businessName: '',
  address: '',
  state: '',
  country: '',
  zipCode: '',
  phoneNumber: ''
}

var newDate = new Date()

export const addSong = {
  singleTitle: '',
  explicit: false,
  artists: [''],
  language: '',
  primaryGenre: '',
  secondaryGenre: '',
  releaseDateAndTime: null,
  worldwide: false,
  previousRelease: false,
  labelName: '',
  upcCode: '',
  isrcCode: '',
  recordingLocation: '',
  file: null,
  img: null,
  musicVideoUrl: ''
}

export const addAlbum = {
  albumTitle: '',
  explicit: false,
  artists: [''],
  language: '',
  primaryGenre: '',
  secondaryGenre: '',
  releaseDate: null,
  worldwide: false,
  previousRelease: false,
  labelName: '',
  upcCode: '',

  recordingLocation: '',
  img: null,
  singles: ['']
}
