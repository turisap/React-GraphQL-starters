// This is client side config only - don't put anything in here that shouldn't be public!
const CONFIG = {
    DEVELOPMENT_MODE : true,

    APP_NAME : 'BOILERPLATE',

    /**
     * Value for pagination
   */
    ITEMS_PER_PAGE : 4,

    /**
    * End point for GraphQl server for development (look at backend/.env
    */
    END_POINT_DEV : 'http://localhost:4444',

    /**
     * End point for GraphQl server for production
    */
    END_POINT_PROD : 'PRODUCTION ENDPOINT',

    /**
     * Preset at cloudinary project (pictures uploading)
   */
    CLOUDINARY_PRESET : 'YOUR CLOUDINARY PRESET',

   /**
    * End point for cloudinary application
   */
    CLOUDINARY_ENDPOINT : 'YOUR CLOUDINARY PRESET',

    /**
     * Stripe key for charging credit cards
   */
    STRIPE_PUBLISHABLE_KEY : 'YOUR KEY',

    CURRENCY : 'NZD',

};

export { CONFIG };

