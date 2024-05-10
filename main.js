
function init() {
    let materialIcon = document.createElement('link');
    materialIcon.rel = 'stylesheet';
    // GOOGLE ICONS LIB
    // GO TO GOOGLE MATERIAL ICONS (https://fonts.google.com/icons)
    materialIcon.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0';
    document.head.appendChild(materialIcon);

    let font1 = document.createElement('link');
    let font2 = document.createElement('link');
    let font3 = document.createElement('link');
    font1.rel = 'preconnect';
    font2.rel = 'preconnect';
    font3.rel = 'stylesheet';
    // GOOGLE FONT LIBS
    // GO TO QUICKSAND GOOGLE FONT IF YOU DON'T TRUST (https://fonts.google.com/specimen/Quicksand)
    font1.href = 'https://fonts.googleapis.com';
    font2.href = 'https://fonts.gstatic.com';
    font3.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap';
    font2.crossOrigin = '';
    document.head.appendChild(font1);
    document.head.appendChild(font2);
    document.head.appendChild(font3);


    let mainButton = document.createElement('div');
    mainButton.id = 'ma-wov-button';
    mainButton.addEventListener('click', () => {
        if (document.getElementById('ma-wov-container')) {
            document.getElementById('ma-wov-container').remove();
        } else {
            genMainContainer(JSON.parse(localStorage.getItem('maWovCredentials')));
        }
    });
    let mainButtonSpan = document.createElement('span');
    mainButtonSpan.classList.add('material-symbols-outlined');
    mainButtonSpan.textContent = 'account_circle';
    mainButton.appendChild(mainButtonSpan);
    document.body.appendChild(mainButton)
}

function genMainContainer() {
    let container = document.createElement('div');
    container.id = 'ma-wov-container';
    document.body.appendChild(container);
    genMainContainerContent();
}

function genMainContainerContent() {
    let div = document.getElementById('ma-wov-container');
    let credentials = JSON.parse(localStorage.getItem('maWovCredentials'));
    if (credentials == undefined) {
        credentials = {};
        localStorage.setItem('maWovCredentials', JSON.stringify(credentials));
    }
    let title = document.createElement('div');
    title.textContent = 'Accounts';
    title.id = 'ma-wov-title';
    div.appendChild(title);
    for (const account in credentials) {
        let box = document.createElement('div');
        box.classList.add('ma-wov-box');
        let text = document.createElement('div');
        text.textContent = credentials[account].name;
        text.classList.add('ma-wov-text-box');
        text.addEventListener('click', async () => {
            if (credentials[account].password != '') {
                await logout();
                await login(account, credentials[account].password);
            } else {
                document.getElementById('ma-wov-container').innerHTML = '';
                await genPasswordTyping(account)
            }
        })
        let editButton = document.createElement('div');
        editButton.classList.add('ma-wov-edit');
        editButton.addEventListener('click', () => {
            document.getElementById('ma-wov-container').innerHTML = '';
            genEditContainer(account);
        });
        let editButtonSpan = document.createElement('span');
        editButtonSpan.classList.add('material-symbols-outlined');
        editButtonSpan.textContent = 'edit';
        editButtonSpan.style.fontSize = '20px';
        editButton.appendChild(editButtonSpan);
        box.appendChild(text);
        box.appendChild(editButton);
        div.appendChild(box);
    }
    let createButton = document.createElement('div');
    createButton.id = 'ma-wov-create';
    createButton.textContent = 'Add an account';
    createButton.addEventListener('click', () => {
        document.getElementById('ma-wov-container').innerHTML = '';
        genEditContainer(undefined);
    })
    div.appendChild(createButton);
}

async function genPasswordTyping(account) {
    let credentials = JSON.parse(localStorage.getItem('maWovCredentials'));
    let div = document.getElementById('ma-wov-container');
    let subtitle = document.createElement('div');
    subtitle.classList.add('ma-wov-subtitle');
    subtitle.textContent = `You didn't define a password for your profile ${credentials[account].name}. Please type it below, note that it won't be saved anywhere.`;
    let passwordInput = document.createElement('input');
    passwordInput.classList.add('ma-wov-input');
    passwordInput.placeholder = 'Password';
    passwordInput.type = 'password';
    let loginButton = document.createElement('div');
    loginButton.classList.add('ma-wov-edit-button');
    loginButton.textContent = 'Log-in';
    loginButton.addEventListener('click', async () => {
        let password = document.getElementsByClassName('ma-wov-input')[0].value;
        await logout();
        await login(account, password);
    });
    div.appendChild(subtitle);
    div.appendChild(passwordInput);
    div.appendChild(loginButton);
}

function genEditContainer(account) {
    let credentials = JSON.parse(localStorage.getItem('maWovCredentials'));
    let div = document.getElementById('ma-wov-container');
    let title = document.createElement('div');
    title.textContent = 'Edit';
    title.id = 'ma-wov-title';
    div.appendChild(title);
    let nameSubtitle = document.createElement('div');
    nameSubtitle.classList.add('ma-wov-subtitle');
    nameSubtitle.textContent = 'Name :';
    let mailSubtitle = document.createElement('div');
    mailSubtitle.classList.add('ma-wov-subtitle');
    mailSubtitle.textContent = 'Email :';
    let passwordSubtitle = document.createElement('div');
    passwordSubtitle.classList.add('ma-wov-subtitle');
    passwordSubtitle.textContent = 'Password :';
    let nameInput = document.createElement('input');
    nameInput.classList.add('ma-wov-input');
    nameInput.placeholder = 'Leave empty to show email';
    if (account != undefined && credentials[account].name != account) {
        nameInput.value = credentials[account].name;
    }
    let mailInput = document.createElement('input');
    mailInput.classList.add('ma-wov-input');
    mailInput.placeholder = 'Email';
    if (account != undefined) {
        mailInput.value = account;
    }
    let passwordInput = document.createElement('input');
    passwordInput.classList.add('ma-wov-input');
    passwordInput.placeholder = 'Leave empty to type it for every log-in';
    passwordInput.type = 'password';
    if (account != undefined && credentials[account].password.length > 0 && credentials[account].password != '') {
        passwordInput.value = credentials[account].password;
    }
    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('ma-wov-edit-buttons-container');
    let deleteButton = document.createElement('div');
    deleteButton.classList.add('ma-wov-edit-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        let credentials = JSON.parse(localStorage.getItem('maWovCredentials'));
        if (account != undefined) {
            delete credentials[account];
            localStorage.setItem('maWovCredentials', JSON.stringify(credentials));
        }
        document.getElementById('ma-wov-container').innerHTML = '';
        genMainContainerContent();
    })
    let saveButton = document.createElement('div');
    saveButton.classList.add('ma-wov-edit-button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        let credentials = JSON.parse(localStorage.getItem('maWovCredentials'));
        let name = document.getElementsByClassName('ma-wov-input')[0].value;
        let email = document.getElementsByClassName('ma-wov-input')[1].value;
        let password = document.getElementsByClassName('ma-wov-input')[2].value;
        if (email.length > 0) {
            if (account != email) {
                delete credentials[account];
            }
            let dic = {};
            if (password.length > 0) {
                dic.password = password;
            } else {
                dic.password = '';
            }
            if (name.length > 0) {
                dic.name = name;
            } else {
                dic.name = email;
            }
            credentials[email] = dic;
        }
        localStorage.setItem('maWovCredentials', JSON.stringify(credentials));
        document.getElementById('ma-wov-container').innerHTML = '';
        genMainContainerContent();
    })
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(saveButton);
    div.appendChild(nameSubtitle);
    div.appendChild(nameInput);
    div.appendChild(mailSubtitle);
    div.appendChild(mailInput);
    div.appendChild(passwordSubtitle);
    div.appendChild(passwordInput);
    div.appendChild(buttonContainer);
}

async function login(email, password) {
    // WOLVESVILLE PRIVATE API TO SIGN IN
    // CHECK NETWORK WITH F12 AND TRY TO SIGN IN IN GAME IF YOU DON'T TRUST
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("cf-jwt", localStorage.getItem('cloudflare-turnstile-jwt'));
    myHeaders.append("content-type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: `{\"email\":\"${email}\",\"password\":\"${password}\"}`,
        redirect: "follow"
    };

    fetch("https://auth.api-wolvesville.com/players/signInWithEmailAndPassword", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result.code == 401 || result.code == 403) {
                alert('Wolvesville Account Manager : An error occurred during the log-in. It\'s probably wrong credentials. Please, check your profile in the Account Manager and/or type your password again. You\'re logged out, the page will refresh after you clicked OK.');
            } else {
                localStorage.setItem('authtokens', JSON.stringify(result))
            }
            window.location.reload();
        })
        .catch((error) => {
            console.log(error)
        });
}

async function logout() {
    // WOLVESVILLE PRIVATE API TO LOG OUT
    // CHECK NETWORK WITH F12 AND TRY TO LOG OUT IN GAME IF YOU DON'T TRUST
    let authtokens = localStorage.getItem('authtokens');
    if (authtokens != undefined && authtokens.length > 0) {
        authtokens = JSON.parse(authtokens)['refreshToken'];
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("accept-language", "en-GB,en-US;q=0.9,en;q=0.8");
        myHeaders.append("cf-jwt", localStorage.getItem('cloudflare-turnstile-jwt'));
        myHeaders.append("content-type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: `{\"refreshToken\":\"${authtokens}\"}`,
            redirect: "follow"
        };

        fetch("https://auth.api-wolvesville.com/players/signOut", requestOptions)
            .then(() => localStorage.setItem('authtokens', ''))
            .catch((error) => console.error(error));
    }
}

window.onload = init;