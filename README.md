# ChorePlanner

 ## Introduction

Growing up with undiagnosed ADHD I often got in to trouble for forgetting to do the chores mum and dad asked me to do. They called me lazy and thougt I was inconciderate but it was never out of laziness or anything like that. I simply forgot. 

Seeing my nephews grow up now I think about how much easier my life as a kid would had been if I had a platform where my parents could assign me the chores they wanted me to do! And image being able to see what tasks they set for my sisters? It would have given everything the transperency I needed as a kid. 

All of this gave me the idea of creating a platform for families to plan their lives.

## Frontend

### User Interface
#### Design Planning
My vision for this webapplication was to make it as a noticeboard that you put up notes on with the different chores that are set. The original plan was to give the users the ability to choose between different colours for their “notes” so that the noticeboard would be colour coded and it would be easy to quickly see who the chores are set for without reading the name. This is a feature I will implement in the future but it was outside of the scope for this project. I also have the plan to make the application “child friendly”. With this I mean that the parents will be able to choose an icon to describe the chore instead of writing the description so that children with limited reading skills will be able to use the app too.

![Wireframe chore](documentation/WireframeTask.PNG)
![Wireframe noticeboard](documentation/WireframeNoticeboard.PNG)



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