# ChorePlanner

When I was a kid living at home with my parents I often got into trouble for not doing the chores I was asked to do. I simply forgot to do them due to my ADHD. But whenever my parents left me a note with what they needed me to do I did it without any problems. Me knowing how hard it is to remember things and how hard it is on parents to constantly nag their kids about simple chores I got the inspiration for the ChorePlanner. On my website the parents can give their kids chores and the kids can see them and when they need to be done and everything. 



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