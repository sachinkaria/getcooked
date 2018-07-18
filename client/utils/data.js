export const PROFILE_FIELDS = [
  { name: 'display name', field: 'displayName', path: '/dashboard/profile/basics', required: true },
  { name: 'tagline', field: 'tagLine', path: '/dashboard/profile/basics', required: true },
  { name: 'service type', field: 'serviceType', path: '/dashboard/profile/service-type', required: true },
  { name: 'profile photo', field: 'profilePhoto', path: '/dashboard/profile/photos', required: true },
  { name: 'cover photo', field: 'coverPhoto', path: '/dashboard/profile/photos', required: true },
  { name: 'photos', field: 'photos', path: '/dashboard/profile/photos' },
  { name: 'cuisines', field: 'cuisines', path: '/dashboard/profile/food-services', required: true },
  { name: 'events', field: 'events', path: '/dashboard/profile/service-type', required: true },
  { name: 'services', field: 'services', path: '/dashboard/profile/food-services', required: true },
  { name: 'description', field: 'description', path: '/dashboard/profile/basics', required: true },
  { name: 'additional services', field: 'additionalServices', path: '/dashboard/profile/service-type' },
  { name: 'payment details', field: 'stripe', path: '/dashboard/account/subscription' }
];

export const TYPES = ['professional caterer', 'market stall', 'private chef', 'food truck', 'bakery', 'drinks company', 'cocktail bartender'];
export const FOOD_SERVICES = ['canapes', 'desserts', 'buffets', 'vegetarian', 'vegan', 'halal', 'kosher', 'nut free', 'gluten free', 'alcoholic drinks', 'non-alcoholic drinks'];
export const EVENTS = ['corporate events', 'weddings', 'private dinners', 'parties', 'festivals', 'other'];
export const CUISINES = ['american', 'african', 'BBQ', 'chinese', 'caribbean', 'french', 'greek', 'indian', 'italian', 'japanese', 'mediterranean', 'mexican', 'middle eastern', 'south american', 'moroccan', 'spanish', 'thai', 'turkish', 'vietnamese', 'open to suggestions'];
export const EVENT_TYPE = ['indoor', 'outdoor', 'private dinner', 'private lunch', 'corporate event', 'wedding', 'party', 'festival', 'BBQ', 'picnic', 'other'];
export const EVENT_SERVICES = ['on-site catering', 'mobile catering', 'private chef', 'bar service', 'drop-off'];
export const ADDITIONAL_SERVICES = ['bar service', 'waiting staff', 'tableware', 'glassware'];
export const FOOD_STYLE = ['sit-down meal', 'canapes', 'hot buffet', 'cold buffet', 'bbq', 'platters', 'open to suggestions'];
export const STAFF = ['setup staff', 'waiting staff', 'bar staff', 'clean-up staff', 'no staff required'];
export const EQUIPMENT = ['tables and chairs', 'table linens', 'tableware', 'glassware', 'nothing required'];
export const MODAL = {
  TITLE: 'Get Quotes',
  ACTION: 'Get Quotes',
  DESCRIPTION: 'Please provide us with some information on your event and your contact details.'
};

export const BOOKING_MODAL = {
  TITLE: 'Contact Now',
  ACTION: 'Contact Now',
  DESCRIPTION: 'Please provide us with some information on your event and your contact details. Once you have submitted your request you will contacted by your caterer.'
};

export const POSTS = [
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