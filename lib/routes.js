export const routes = {
  '/': {
    background: true,
    height: '70%',
    public: true,
    landing: true,
  },
  '/privacy': {
    background: true,
    height: '100%',
    public: true,
    landing: true
  },
  '/receipts/[id]': {
    background: false,
    height: '100%',
    public: true
  },
  '/dashboard': {
    navigation: true,
    background: true,
    height: '90%'
  },
  '/pools': {
    navigation: true,
    height: '90%',
    background: true
  },
  '/pools/create': {
    navigation: false,
    height: '100%',
    background: true,
  },
  '/pools/[id]': {
    background: true,
    navigation: false,
    height: '100%',
  },
  '/expenses/[id]': {
    background: true,
    navigation: false,
    height: '100%',
  },
  '/profile': {
    navigation: true,
    height: '70%',
    background: true
  },
  '/choose-a-toy': {
    background: true,
    navigation: true,
    height: '70%',
  },
};
