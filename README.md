# ChorePlanner

 ## Introduction

Growing up with undiagnosed ADHD I often got in to trouble for forgetting to do the chores mum and dad asked me to do. They called me lazy and thougt I was inconciderate but it was never out of laziness or anything like that. I simply forgot. 

Seeing my nephews grow up now I think about how much easier my life as a kid would had been if I had a platform where my parents could assign me the chores they wanted me to do! And image being able to see what tasks they set for my sisters? It would have given everything the transperency I needed as a kid. 

All of this gave me the idea of creating a platform for families to plan their lives.
## Frontend
## User Interface
### Design Planning
My vision for this webapplication was to make it as a noticeboard that you put up notes on with the different chores that are set. The original plan was to give the users the ability to choose between different colours for their “notes” so that the noticeboard would be colour coded and it would be easy to quickly see who the chores are set for without reading the name. This is a feature I will implement in the future but it was outside of the scope for this project. I also have the plan to make the application “child friendly”. With this I mean that the parents will be able to choose an icon to describe the chore instead of writing the description so that children with limited reading skills will be able to use the app too.

![Wireframe chore](documentation/WireframeTask.PNG)
![Wireframe noticeboard](documentation/WireframeNoticeboard.PNG)
### The app on different screensizes
Since I have been using React Bootstrap 4 components like fluid Containers and Rows and Columns when creating this React App the website is fully responsive across different screen sizes and devices. 
![Landingpage on different screens](documentation/LandingPageDifferentSizes.PNG)

### Font
For this app I chose the Google Font Itim beacuse it has the playfull handwriting look I wanted for this website. 
![Font preview](documentation/FontPreview.PNG) 
### Icons 
In the navbar there are Font Awesome icons next to the name of each page to make it more interesting than just text. It also makes it easier for users with limited reading skills to understand how to navigate to the different pages.
![Icons in the navbar](documentation/IconsUnAuth.PNG)
![Icons in the navbar](documentation/IconsAuth.PNG)

### Favicon
The favicon I used for this app is created using favicon.io. I chose the “check” as a symbol because of how you check off chores when done with them.  
![Favicon](documentation/FaviconTab.PNG)

### Colour Scheme
The original colour palette was five “post-it” pastell colours but when starting to design the website I did not like the mix of all the different colours so I decided on a palette containg five shades of pink instead but I used the post-it colours on the landingpage and for the chore cards. I also created a palette with some different browns for the font.
![Post-it palette](documentation/PostItPalette.png)
![Pink palette](documentation/PinkPalette.png)
![Brown palette](documentation/BackgroundAndFontsPalette.png)

### Background
The Landing Page and the Chores noticeboard has a background that looks like an oldschool noticeboard made out of cork to match the vision I had for the webpage. 
![Cork background](src/assets/noticeboard.jpg)

## User Experience
### User Stories
After the idea for the website had sprouted in my mind I started writing the user stories. I created a custom template in github and added the issues to the project I created in my front-end repostitry. This to have a good view of what I need to do and how I am progressing in my work.  

I ended up with ten different user stories. Six must-haves, two should-haves and two could-haves. The only issues left in the "Todo" column are the two could-haves the other ones are done.
![User stories project board](documentation/UserStoriesBoard.PNG)

#### Custom Template
The custom template speeds up the process for adding a new issue to the project and helps make sure that the format is consistant.  
![Custom template](documentation/CustomTemplate.PNG)

#### Must-have
The must-haves for Chore Planner was: Authorization, Noticeboard, Chores, Profile Page, My Home Page and Navigation Bar. 

##### Authorization
![Authorization user story](documentation/UserStoryAuth.PNG)
##### Noticeboard
![Noticeboard user story](documentation/UserStoryNoticeboard.PNG)
##### Chores
![Chores user story](documentation/UserStoryChores.PNG)
##### Profile Page
![Profile Page user story](documentation/UserStoryProfilePage.PNG)
##### My Home Page
![My Home Page user story](documentation/UserStoryMyHomePage.PNG)
##### Navigation Bar
![Navigation Bar user story](documentation/UserStoryNavigationbar.PNG)

#### Should-have 
The should-haves for Chore Planner was: Landing Page and Alert Messages. 
##### Landing Page
![Landing Page user story](documentation/UserStoryLandingPage.PNG)
##### Alert Messages
![Alert Messages user story](documentation/UserStoryAlert.PNG)

#### Could-have
The two could-haves for Chore Planner was: Points and Child Friendly.
##### Points
![Points user story](documentation/UserStoryPoints.PNG)
##### Child Friendly
![Child Friendly user story](documentation/UserStoryChildFriendly.PNG)


## Features

### Navigation Bar
``USER STORY: As a user I can see a navigation bar at the top of the page so that I can easily find my way to the other pages of the website. ``

At the top of the website there is a navigation bar that contains links to all the pages of the website. The content of the navigation bar differs if the user is authorized or not.  

On screens smaller than 768 px the links in the navbar are replaced with a “burger”-icon that toggles a dropdown menu containing the links.
#### Navigation Bar if user is authorized
![Navigation bar big screen](documentation/NavBarAuthBig.PNG)
![Navigation bar small screen](documentation/NavbarAuthSmall.gif)

#### Navigation Bar if user is unauthorized
![Navigation bar big screen](documentation/NavBarUnAuthBig.PNG)
![Navigation bar small screen](documentation/NavbarUnAuthSmall.gif)

When hovering over the icons in the navigation bar the opasity of the text and icon increases to indicate to the user that they can click the link. The link to the page that is active has a static increased opasity to show what page the user is currently on. 
![Navigation bar on hover and active](documentation/NavbarHoverActive.gif)


### Landing Page
``USER STORY: As a user I can see a landing page when opening the website so that I can learn more about the sites purpose and origin. ``

The Landing Page contains a welcome message that changes depending on authorization, a short text about the concept of the website and a short text about why I created the page. The page also contains a message for users who are not authorized encouriging them to sign up and a link to the sign up form.
#### Authorized
![Landing page if authorized](documentation/LandingPageAuth.PNG)
![Landing page if authorized](documentation/LandingPageAuthSmall.gif)
#### Unauthorized
![Landing page if unauthorized](documentation/LandingPageUnAuth.PNG)
![Landing page if unauthorized](documentation/LandingPageUnAuthSmall.gif)

### Noticeboard
![Noticeboard on different screens](documentation/NoticeboardDifferentscreens.PNG)
``USER STORY: As a user I can access the noticeboard so that I can see what cores that are set for me and my household members and I can follow a link to the form to add new chores.``

The Noticeboard page is a page where the user can see all the chores that are set for their household. The content of this page differs depending on role, household and the existence of chores. 

The cards with the chores on them on this page is just a preview of the chore and if the user wants to see more details they need to click the button that says “see details”. The user is then taken to the chore detail page. This button only appears if the current user is the one who created the chore or the one that the chore is assigned to.

![Chore preview with button](documentation/ChorePreviewButton.PNG)
![Chore preview without button](documentation/ChorePreviewNoButton.PNG)

If the user has the role of Parent and is a member of  a household the page looks like the images bellow. At the top there is a form containing a searchbar, a filter dropdown menu, a “order by” dropdown menu and button that only appears if the current user has the role of Parent. In the searchbar the user can search for a specific chore or chores assigned to a specific household member. The user can use the filter dropdown to filter the chores depending on their status. The button is a link to the page containing the form to create a new chore. 

![Noticeboard big screen](documentation/NoticeboardChoresBig.PNG)
![Noticeboard small screen](documentation/NoticeboardChoresSmall.gif)
![Noticeboard searchbar and dropdowns big screen](documentation/NoticeboardSearchbarBig.gif)
![Noticeboard searchbar and dropdowns small screen](documentation/NoticeboardSearchbarSmall.gif)

If the user has a household but has the role of Child the Noticeboard page will look like the image bellow. The searchbar and filter and order dropdowns are still there but not the button that takes the user to the create form for the chores. 
![Noticeboard if child](documentation/NoticeboardChild.PNG)

If the user has a household but there are no chores set for anyone in the household they will see a message that there is nothing for them to do right now. 
![Noticeboard if child](documentation/NoticeboardNoChores.PNG)

If the user does not have a household connected to their profile they will not see the form at the top containing the searchbar etc and they will be met with a message that they need to be a part of a household to be able see this page and a button containing a link that takes them to the form to edit their profile.

![Noticeboard no household](documentation/NoticeboardNoHousehold.PNG)

### Chore Create Form
``USER STORY: As a user I can add chores so that other members of the household can see them.``

When the user clicks the button that says “Add a new chore” they are taken to a form where they can create a new chore. The user needs to input a chore title, description, due date and they also need to choose who is gonna do the chore. All the fields are required to create a chore. When a chore is created the task_giver is automatically set to be the current user and the status is by default “Pending”. 

The due date field is a DatePicker from the library react-datepicker. It is checked in the API to make sure that it is not set in the past. 
 

The dropdown where the user chooses who is gonna do the chore only the names of the users with the same household name appears. 
 

When the user then clicks the button to add the chore they are redirected to the newly created chores details page. 
![Chore create form](documentation/ChoreCreate.gif)

### Chore Detail Page
On this page the user sees details about the chore in question. They can see the title, the description, who it was assigned to, the due date, the status and who created the chore. If the current user is the one who created the chore the button to the edit chore form appears. 

![Chore detail with button](documentation/ChoreDetailButton.PNG)
![Chore detail without button](documentation/ChoreDetailNoButton.PNG)

### Chore Edit Form
This form can only be accessed by the user who created the chore. If the user manually change the url and try to access a chore they did not create they will be redirected to the noticeboard and get a pop-up message. The form looks  almost identical to the Create Chore Form but it has the data from the chore in question in its fields and the user can change the stauts of the chore. The user can choose to either update the chore or if they want to delete it.

![Chore edit form](documentation/ChoreEdit.PNG)
![Chore edit progress](documentation/ChoreEditProgress.gif)

### My Home Page
![My home page](documentation/MyHomePage.PNG)
``USER STORY: As a user I can access a “My Home”-page so that I can see the members of my household ``

Each household page can only be accessed by the users that have that household as theirs. The page lists all the members of the specific household and there is a button that takes the user to the Household Edit Form. 

#### If the user is not a member of the household
![My home page](documentation/MyHomePageUnAuth.PNG)

### Household Create Form
The user can access this form from the Profile Edit Form. In this form the user creates a new household by writing a name and a slug. There is a description about what a slug is so that users who are not IT people understand what it is. The name and the slug is checked in the API to make sure that the name and slug are unique. The household name is required to be longer than three characters and this is also checked in the API. 

![Household create form](documentation/HouseholdCreateForm.PNG)

### Household Edit Form
This form can be accessed from both the My Home page and the Profile Edit Form. This form is identical to the Household Create Form besides the fact that the fields are preoccupied with the current household name and slug. 

If a user tries to access the edit page for a household they are not a part of they will get a pop-up that they are not allowed to do that and they are redirected to the landing page.
![Household edit form](documentation/HouseholdEditForm.PNG)

### Profile Page

The profile page contains information about the current user. The page can only be accessed if the id in the url matches the current users id. If a user tries to access another users profile by changing the url manually they will be met with a message that they can only view their own profile. 

On the page the user can see a small profile picture like the one in the navbar, their name, their household name and their role in the household. Underneeth the information there is a button that, when clicked, takes the user to the Prolife Edit Form.  
![Profile page](documentation/ProfilePageAuth.PNG)
![Profile page unauthenticated](documentation/ProfilePageUnAuth.PNG)

### Profile Edit Form
``USER STORY: As a user I can edit my profile-information so that I can personilize my experience.``

On this page the user can change their profile image, set their household and their role in the household.  
![Profile edit page](documentation/ProfileEdit.PNG)

When a user profile is created it is assigned a default profile image but on this page the user can browse their devices images to pick one for their profile image. A preview shows up once an image is chosen. The images are stored using Cloudinary. 

![Profile image change](documentation/ProfileImagePreview.gif)

There is a dropdown menu present filled with the names of the households that are already in the database so that the user can join an already existing household if they want. Beneath  this dropdown there are two buttons. One takes the user to the Household Create Form and the other one takes the user to the Household Edit Form. The second button does only show up if there is a household connected with the user profile.

![Profile edit household dropdown](documentation/ProfileEditDropdownHousehold.gif)
![Profile edit with edit button](documentation/ProfileEditWithButton.PNG)
![Profile edit without edit button](documentation/ProfileEditNoButton.PNG)

The users “role” is by default set to Parent uppon creating a profile but here the user can change it by picking the right role in the dropdown menu. 
![Profile edit role](documentation/ProfileEditDropdownRole.gif)


### Authorization
``USER STORY: As a user I can create an account so that I can access the whole website.``

Thanks to the Django REST framework authentication mechanism the user is able to create an account to access the whole website. The user use the signup form to choose a username and a password and the API creates a user profile thanks to the post_save.connect functionality in the Profile model. After creating a profile the user can log in using the signin form. 

The signup and the signin forms looks pretty much identical but the signup form has two fields where the user needs to write the password to confirm it as the fields are checked so that they are identical to eachother. Beneath the signup form there is a paragraph with a link to the signin form if the user already has an account and vice versa on the signin form.

![Sign in form](documentation/SignInForm.PNG)
![Sign up form](documentation/SignUpForm.PNG)

### Alerts and Notifications
``USER STORY: As a user I can see pop-up alerts so that I know when a change has been made successfully or not.``

#### Alert Messages
In all the forms across the website there is error handling that send alerts if something is wrong with the inputs in the forms. The alerts are the Alert component from React Bootstrap 4. There are both field error handlers and non field error handlers.
![Alert messages](documentation/AlertMessages.gif)

#### Toastify Pop-ups
For the toast messages on this website I have used the React Toastify library. When the user successfully make changes across the website they see a pop-up message in the top right corner of the page. If the user tries to access a page they are not authorized for they will be redirected and get an error pop-up message.  

The pop-up closes automaticly after five seconds but the user can click the x to close it manually if they want to. The pop-up has a progress bar where the user can see how long before the pop-up closes. When hovering over the pop-up the countdown stops and you can see how the progress bar stays in place. The same thing happends if the user switch tabs. This is to make sure that the user does not miss a pop-up message. 
![Toastify messages](documentation/ToastifyMessages.gif)

## Backend
### Custom API
The API is created using the Django REST Framework. There are three different apps with their own seperate models, serializers and views.
#### The Different Apps
- The Profile app handles the creation of a new user profile, the editing of the profile and it is connected to the Household app through the ForeignKey field. 
- The Household app is used for the creation of new households and editing of already exsisting ones.
- The Task app is used when creating, viewing and editing chores. The app is named Task but it is connected with the Chores. The app was named before I changed the projects name to Chore Planner that is why it is not consitent.

#### Custom Permissions
I have created custom persmissions handling to make certain content only available to authorized users. For example the IsHouseholdMemberOrReadOnly that only allows users that are a member of the current household to make changes to it.

## Testing
### Testing During Developing
During the whole development process I have been testing constantly. After each addition or change to the code I have tested. This is to always make sure that the site works as intended.

### Manual Testing
- I have checked to see that the website works on the browsers: Chrome, Microsoft Edge and Safari. 

- With the use of devtools I have confirmed that the pages of the website are responsive and look good on different screen sizes. 

- I have confirmed the functionality of the forms by adding faulty values and after putting in valid values I checked the API to make sure it changed as expected. 

- When testing the forms I also made sure that the alerts and pop-ups appear as expected. 

- I have tested all the links across the page and all the redirection that occurs. 

- I have manually changed the url to make sure that the user can not access pages they are not authorized to access.

### Lighthouse Testing
I have tested all the pages using the DevTools Lighthouse tool.
#### Landing Page Results
##### Authenticated Mobile
![Landing page authenticated mobile](documentation/testresults/TestLandingPageAuthMobile.PNG)
##### Authenticated Desktop
![Landing page authenticated desktop](documentation/testresults/TestLandingPageAuthDesktop.PNG)
##### Unauthenticated Mobile
![Landing page unauthenticated mobile](documentation/testresults/TestLandingPageUnAuthMobile.PNG)
##### Unauthenticated Desktop
![Landing page unauthenticated desktop](documentation/testresults/TestLandingPageUnAuthDesktop.PNG)

#### Noticeboard Results
##### Chores to do Mobile
![Noticeboard chores to do mobile](documentation/testresults/TestNoticeboardChoresMobile.PNG)
##### Chores to do Desktop
![Noticeboard chores to do desktop](documentation/testresults/TestNoticeboardChoresDesktop.PNG)
##### No Chores to do Mobile
![Noticeboard No Chores to do mobile](documentation/testresults/TestNoticeboardNoChoresMobile.PNG)
##### No Chores to do Desktop
![Noticeboard No Chores to do desktop](documentation/testresults/TestNoticeboardNoChoresDesktop.PNG)
##### No household Mobile
![Noticeboard No household mobile](documentation/testresults/TestNoticeboardNoHouseholdMobile.PNG)
##### No household Desktop
![Noticeboard No household desktop](documentation/testresults/TestNoticeboardNoHouseholdDesktop.PNG)

#### Chore Detail Results
##### Mobile
![Chore detail mobile](documentation/testresults/TestChoreDetailMobile.PNG)
##### Desktop
![Chore detail desktop](documentation/testresults/TestChoreDetailDesktop.PNG)




## Deployment

### Deploying the API

#### Preperations
- Connected the project to the PostgreSQL and added the config var for the database to Heroku 
- Installed corsheaders and gunicorn
- Ran ``` pip freeze --local > requirements.txt ``` in the teminal to update the dependencies
- I added the Procfile
- Updated the ALLOWED_HOSTS to contain '.herokuapp.com'
- Added the corsheaders middleware to MIDDLEWARE in settings.py
- Set the ALLOWED_ORIGINS
- Set my SECRET_KEY in the env.py 
#### Deploying to Heroku
- Added the config vars for the secret key and cloudinary
- Connect the Herokuapp to the correct github repository
- Deployed main branch 
- Made sure the app works as intended