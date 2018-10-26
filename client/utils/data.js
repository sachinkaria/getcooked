export const PROFILE_FIELDS = [
  { name: 'display name', field: 'displayName', path: '/dashboard/profile/basics', required: true },
  { name: 'tagline', field: 'tagLine', path: '/dashboard/profile/basics', required: true },
  { name: 'service type', field: 'serviceType', path: '/dashboard/profile/service-type', required: true },
  { name: 'profile photo', field: 'profilePhoto', path: '/dashboard/profile/photos', required: true },
  { name: 'photos', field: 'photos', path: '/dashboard/profile/photos' },
  // { name: 'instagram account', field: 'social', path: '/dashboard/profile/photos'  },
  { name: 'cuisines', field: 'cuisines', path: '/dashboard/profile/food-services', required: true },
  { name: 'events', field: 'events', path: '/dashboard/profile/service-type', required: true },
  { name: 'services', field: 'services', path: '/dashboard/profile/food-services', required: true },
  { name: 'description', field: 'description', path: '/dashboard/profile/basics', required: true },
  { name: 'additional services', field: 'additionalServices', path: '/dashboard/profile/service-type' },
  { name: 'food suppliers', field: 'foodSuppliers', path: '/dashboard/profile/food-services' }
];

export const TYPES = ['professional caterer', 'market stall', 'private chef', 'food truck', 'bakery', 'drinks company', 'cocktail bartender'];
export const FOOD_SERVICES = ['canapes', 'desserts', 'buffets', 'vegetarian', 'vegan', 'halal', 'kosher', 'nut free', 'gluten free', 'alcoholic drinks', 'non-alcoholic drinks'];
export const EVENTS = ['corporate events', 'weddings', 'private dinners', 'parties', 'festivals', 'cooking classes', 'workshops', 'other'];
export const CUISINES = ['open to suggestions', 'american', 'african', 'BBQ', 'british', 'chinese', 'caribbean', 'french', 'greek', 'indian', 'italian', 'japanese', 'mediterranean', 'mexican', 'middle eastern', 'south american', 'moroccan', 'spanish', 'thai', 'turkish', 'vietnamese'];
export const EVENT_TYPE = ['indoor', 'outdoor', 'private dinner', 'private lunch', 'corporate event', 'wedding', 'party', 'festival', 'BBQ', 'picnic', 'other'];
export const EVENT_SERVICES = ['on-site catering', 'mobile catering', 'private chef', 'bar service', 'drop-off'];
export const ADDITIONAL_SERVICES = ['bar service', 'waiting staff', 'tableware', 'glassware'];
export const FOOD_STYLE = ['open to suggestions', 'sit-down meal', 'canapes', 'hot buffet', 'cold buffet', 'BBQ', 'platters'];
export const STAFF = ['no staff required', 'setup staff', 'waiting staff', 'bar staff', 'clean-up staff'];
export const EQUIPMENT = ['nothing required', 'tables/chairs', 'table linens', 'tableware', 'glassware'];
export const TIMES = ['Select', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'];
export const MODAL = {
  TITLE: 'Get Quotes',
  ACTION: 'Get Quotes',
  DESCRIPTION: 'Fill in your details into the form below and our event experts at Get Cooked will pick out the perfect caterers for your event.'
};

export const BOOKING_MODAL = {
  TITLE: 'Contact Now',
  ACTION: 'Contact Now',
  DESCRIPTION: 'Please provide us with some information on your event and your contact details. Once you have submitted your request you will contacted by your caterer.'
};

export const POSTS = [
  {
    title: '5 Things to Consider When Planning Your Catering Budget',
    image: '/images/tableware.jpg',
    date: '5th August 2018',
    src: '/blog/5-things-to-consider-when-planning-your-catering-budget'
  },
  {
    title: 'How is technology helping us reduce food waste?',
    image: '/images/food-waste.jpg',
    date: '25th June 2018',
    src: '/blog/how-is-technology-helping-us-reduce-food-waste'
  },
  {
    title: 'How Blockchain Can Change the Food Supply Chain',
    image: '/images/blockchain.jpg',
    date: '11th June 2018',
    src: '/blog/how-blockchain-can-change-the-food-supply-chain'
  },
  {
    title: '7 Things to Consider When Booking a Caterer',
    image: '/images/catering-3.jpg',
    date: '4th June 2018',
    src: '/blog/7-things-to-consider-when-booking-a-caterer'
  },
  {
    title: 'What is Sustainable Catering?',
    image: '/images/carrots.jpg',
    date: '4th June 2018',
    src: '/blog/what-is-sustainable-catering'
  }
];