import UserController from '../controllers/userController.js'

export default class UserView {
    constructor() {
        this.userController = new UserController();

        // Gestão do form de login
        this.frmLogin = document.querySelector('#frmLogin');
        this.loginUsername = document.querySelector('#txt_username_login');
        this.loginPassword = document.querySelector('#txt_password_login');
        this.loginMessage = document.querySelector('#loginMessage')
        this.bindLoginForm()


        // Gestão do form de registo
        this.frmRegister = document.querySelector('#frmRegister');
        this.registerUsername = document.querySelector('#txt_username_register');
        this.registerFullname = document.querySelector('#txt_fullname_register');
        this.registerEmail = document.querySelector('#txt_email_register');
        this.registerAddress = document.querySelector('#txt_address_register');
        this.registerPhone = document.querySelector('#txt_phone_register');
        this.registerGender = document.querySelector('#txt_gender_register');
        this.registerBirthday = document.querySelector('#date_birthday_register');
        this.registerPassword = document.querySelector('#txt_password_register');
        this.registerPassword2 = document.querySelector('#txt_confirmPassword_register');
        this.registerMessage = document.querySelector('#registerMessage')
        this.bindRegisterForm();

        // Gestão dos botões da navbar
        this.loginButton = document.querySelector('#btnLogin');
        this.registerButton = document.querySelector('#btnRegister');
        this.logoutButton = document.querySelector('#btnLogout');
        if (this.logoutButton) {
            this.bindLogout();
        }


        // Atualiza botões tendo em conta se o user está autenticado ou não
        this.updateStatusUI();
    }

    /**
     * Função que define um listener para o botão de registo
     */
    bindRegisterForm() {
        this.frmRegister.addEventListener('submit', event => {
            event.preventDefault();
            try {
                if (this.registerPassword.value !== this.registerPassword2.value) {
                    throw Error('As duas passwords não são iguais');
                }
                this.userController.register(this.registerUsername.value, this.registerPassword.value, this.registerPassword2.value, this.registerEmail.value, this.registerPhone.value, this.registerBirthday.value, this.registerAddress.value, this.registerGender.value, this.registerFullname.value);
                this.displayMessage('register', 'Utilizador registado com sucesso!', 'success');
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('register', err, 'danger');
            }
        })
    }

    /**
     * Função que define um listener para o botão de login
     */
    bindLoginForm() {
        this.frmLogin.addEventListener('submit', event => {
            event.preventDefault();
            try {
                this.userController.login(this.loginUsername.value, this.loginPassword.value);
                this.displayMessage('login', 'Utilizador realizado com sucesso!', 'success');
                if(this.userController.getAccountRole(this.loginUsername.value)=="admin")
                {
                    window.location.href = "../html/adminUser.html";
                }
                // Espera 1 seg. antes de fazer refresh à pagina
                // Assim o utilizador pode ver a mensagem na modal antes de a mesma se fechar
                setTimeout(() => { location.reload() }, 1000);
            } catch (err) {
                this.displayMessage('login', err, 'danger');
            }
        });

    }

    /**
     * Função que define um listener para o botão de logout
     */
    bindLogout() {
        this.logoutButton.addEventListener('click', () => {
            this.userController.logout();
            location.reload()
        })
    }

    /**
     * Função que atualiza a visibilidade dos botões de acordo com a autenticação
     */
    updateStatusUI() {
        if (this.userController.isLogged()) {
            this.loginButton.style.visibility = 'hidden'
            this.registerButton.style.visibility = 'hidden'
            this.logoutButton.style.visibility = 'visible'
            let loggedUser=localStorage.getItem('loggedUser')
            document.querySelector('.container1').innerHTML += `<div class="welcomeuser"><p><a href="../html/profile.html"><img  src="https://via.placeholder.com/50"/></a>Bem-vindo ${loggedUser}</p></div>`;
        } else {
            this.loginButton.style.visibility = 'visible'
            this.registerButton.style.visibility = 'visible'
            this.logoutButton.style.visibility = 'hidden'
        }
    }

    /**
     * Função que define e exibe uma mensagem de sucesso ou de erro
     * @param {string} event tipo de evento (login ou register)
     * @param {string} text mensagem a ser exibida 
     * @param {string} type danger - caso seja uma mensagem de erro; success - caso seja uma mensagem de sucesso
     */
    displayMessage(event, text, type) {
        const message = `<div class="alert alert-${type}" role="alert">${text}</div>`;
        event == 'login' ? this.loginMessage.innerHTML = message : this.registerMessage.innerHTML = message
    }
}