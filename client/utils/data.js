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
  { name: 'additional services', field: 'additionalServices', path: '/dashboard/profile/service-type' }
];

export const TYPES = ['professional caterer', 'market stall', 'private chef', 'food truck', 'bakery', 'drinks company', 'cocktail bartender'];
export const FOOD_SERVICES = ['canapes', 'desserts', 'buffets', 'vegetarian', 'vegan', 'halal', 'kosher', 'nut free', 'gluten free', 'alcoholic drinks', 'non-alcoholic drinks'];
export const EVENTS = ['corporate events', 'weddings', 'private dinners', 'parties', 'festivals', 'other'];
export const CUISINES = ['american', 'african', 'BBQ', 'chinese', 'caribbean', 'french', 'greek', 'indian', 'italian', 'japanese', 'mediterranean', 'mexican', 'middle eastern', 'south american', 'moroccan', 'spanish', 'thai', 'turkish', 'vietnamese', 'other'];
export const EVENT_TYPE = ['select', 'private dinner', 'corporate event', 'wedding', 'party', 'festival', 'other'];
export const ADDITIONAL_SERVICES = ['bar service', 'waiting staff', 'tableware', 'glassware'];
export const EVENT_SERVICES = ['on-site catering', 'mobile catering', 'private chef', 'bar service', 'waiting staff', 'tableware', 'glassware'];
