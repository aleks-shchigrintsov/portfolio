import routes from 'routes';

const initialState = {
  links: [
    {url: routes.aboutMe, text: 'About me'},
    {url: routes.skills, text: 'Skills'},
    {url: routes.portfolio, text: 'Portfolio'},
    {url: routes.interests, text: 'Interests'},
    {url: routes.contacts, text: 'Contacts'},
  ]
};

export default function navBar(state = initialState, action = {}) {
  switch (action.type) {

    default:
      return state;
  }
}
