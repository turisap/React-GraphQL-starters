// This is client side config only - don't put anything in here that shouldn't be public!
const CONFIG = {
  DEVELOPMENT_MODE: true,

  APP_NAME: "Dashboard",

  /**
   * Value for pagination
   */
  ITEMS_PER_PAGE: 4,

  /**
   * End point for GraphQl server for development (look at backend/.env
   */
  END_POINT_DEV: "http://localhost:4444",

  /**
   * End point for GraphQl server for production
   */
  END_POINT_PROD: "https://site-app-prod.herokuapp.com/",

  /**
   * Preset at cloudinary project (pictures uploading)
   */
  CLOUDINARY_PRESET: "toolbox",

  /**
   * End point for cloudinary application
   */
  CLOUDINARY_ENDPOINT: "https://api.cloudinary.com/v1_1/dyqwnbgpw/image/upload",

  /**
   * Stripe key for charging credit cards
   */
  STRIPE_PUBLISHABLE_KEY: "YOUR KEY",

  CURRENCY: "NZD",

  JOB_GROUPS: [
    "SURVEY",
    "FOUNDATION",
    "STRUCTURAL_STEEL",
    "FITIN",
    "PLUMBING",
    "ELECTRICAL",
    "HANDOVER"
  ]
};

export { CONFIG };
