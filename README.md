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