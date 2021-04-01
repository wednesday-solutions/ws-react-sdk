import { mockCognito } from './__mocks__/services/cognito';
mockCognito({ isSuccess: true });

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa'
  }),
  useHistory: jest.fn().mockReturnValue({
    length: 2,
    action: 'POP',
    location: {
      pathname: '/',
      search: '',
      hash: ''
    }
  })
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn(() => {
    return {
      matches: false,
      media: '',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn()
    };
  })
});

window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn()
  };
});
