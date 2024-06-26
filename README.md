# wovaccountmanager
This Chrome extension lets you switch between Wolvesville accounts quickly with a simple interface.

You can create a profile, containing a display name, an email address and a password. When your profile is saved, a button will appear for it when you open the menu and you simply click on it to connect to the account.

You don't have to enter a display name. In this case, the email will be displayed.

You do not need to store your password. In this case, you will have to enter it each time you connect.

## How does it work ?
All the information is stored in the web page's localStorage. When you create a profile, it is stored there. When you log in via the menu, the extension accesses the profile via the localStorage to retrieve at least the e-mail address and, if you have entered it, the password.

So yes, it can be a bit scary to leave information as sensitive as a password in the localStorage, but I have an answer to reassure you:

The base game itself stores the authentication tokens in the localStorage. It's with these tokens that you can literally do whatever you want, including changing the password of the account to which the token is associated.

## [EN] How to build it ?
If you're here, it's probably because you don't necessarily trust the extension, since it manages information as sensitive as passwords. I totally understand, but you should know that Google checks the code of extensions to ensure that no malicious extensions are published.

However, Google is not infallible and I understand your mistrust, which is why I've decided to publish the code freely so that you can build the extension with the source code and an explanation of the four external links it contains.

To build the extension, you first need to find the extension management menu. Generally, you click on your list of extensions and you will see "manage my extensions".

Once in the menu, activate the developer mode, which is often located in the top right-hand corner. You should see a "load unpacked" button.

Click and select the unzipped file you have downloaded from this repository (if you haven't done so, look for the green "Code" button and download it as a ZIP file. Then unzip it).

Go to the game, refresh the page and the button at the bottom left should be displayed.

## [FR] How to build it ?
Si vous êtes là, c'est sûrement que vous n'avez pas forcément confiance en l'extension puisqu'elle gère des informations aussi sensibles que des mots de passe. Je comprends totalement, mais sachez que Google vérifie le code des extensions pour s'assurer qu'aucune extension malveillante soit publiée.

Toute fois, Google n'est pas infaillible et je comprends votre méfiance, c'est pour cela que j'ai décidé de publier le code librement pour vous permettre de build l'extension avec le code source et l'explication des quatre liens externes qui y sont présents.

Pour build l'extension, vous devez d'abord trouver le menu de gestion des extensions. Généralement, vous cliquez sur votre liste d'extension et vous verrez "manage my extensions".

Une fois dans le menu, activez le mode développeur souvent placé en haut à droite. Vous devriez voir apparaitre un bouton "load unpacked".

Cliquez et séléctionnez le fichier dézipé que vous avez téléchargé depuis ce repository. (Si vous l'avez pas fait, cherchez le bouton vert "Code" et faites télécharger en ZIP. Dézippez-le ensuite.)

Allez sur le jeu, rafraichissez la page et le bouton en bas à gauche devrait être affiché.