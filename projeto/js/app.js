import UserView from './views/userView.js'

class App {
    constructor() {
        this.routes = {
            '': [UserView],
            'index': [UserView]
        };

        // import dummy data for testing purposes
        this.#importDataFixtures();

        // instantiate the views mapped in the routes object
        this.#instantiateViews();
    }

    #importDataFixtures() {
        const users = [
            {
                id: 1,
                username: 'admin',
                password: 'admin'
            }
        ];

        // Load the fixtures in case there is no data in the local storage 
        if (!localStorage.users) {
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    #instantiateViews() {
        const path = window.location.pathname
        const file = path.substr(path.lastIndexOf('/') + 1);
        const route = file.split('.')[0];
        const views = this.#getViews(route);
        for (const view of views) {
            new view();
        }
    }

    #getViews(route) {
        return typeof this.routes[route] === 'undefined' ? [] : this.routes[route];
    }

}

new App();