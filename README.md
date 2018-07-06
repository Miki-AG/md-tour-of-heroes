
# Angular Material Tour of Heroes   [Demo](https://gae-boilerplate-203602.appspot.com) | [Feedback](https://docs.google.com/forms/d/e/1FAIpQLSfTMycGQFr6HJWNiGQRU3d9vLyEt2OX8n_gdo_kvYr7IEqZnQ/viewform)
Adaptation of the popular angular demo app [Tour of Heroes](https://angular.io/tutorial) to [Angular Material](https://material.angular.io/) and [Google Cloud Endpoints](https://cloud.google.com/endpoints/).

I love Google technologies and tech stack. Google docs and tutorials are great, specially the archi-popular Angular tutorial which includes the demo app [Tour of Heroes](https://angular.io/tutorial). However, I find myself spending hours to no end creating new projects from the scratch, as I have to put together multiple modules and libraries that are frequenlty updated/changed/decommisioned by Google, and that not always play nicely together. Those pieces usually are:
- Front End framework of choice (Angular + Angular Material)
- Backend storage (Google App Engine + Endpoints)
- Authentication (Firebase, which supports social login and email workflows for email verification and password recovery)

![Screenshot](https://raw.githubusercontent.com/Miki-AG/md-tour-of-heroes/master/static/img/screenshot2.png)

This project utilizes:
- Angular 6
- Angular Material 6
- Backend in Google App Engine using REST Endpoints
- Firebase for authentication
- Gulp scripts to automate deployment in GAE

## Requirements
- Google Cloud SDK 200.0.0
- Node v8.9.4
- Npm 5.6.0
- Gulp 4.0.0-alpha.3

## Environments
1. Make sure to rename all files under src/environments (i.e. sample.environment.ts -> environment.ts). The reason for this is that .gitignore will exclude those files in order to avoid exposing sensitive attributes within your project repo.
2. Provide environment properties by environment file. Currently Google Analytics and Firebase are supported.

## Development server (no GAE)

- Run `ng serve` for a simple dev server. (it will use `ng build --configuration devmem`)
- API data calls will be intercepted and data will be served from a mock backend (app/services/hero-dev-backend.ts)

## Build and run GAE local

- Run `ng build --configuration devgae` to rebuild the /dist directory.
- Run `gulp run` to launch the app and GAE.
- Data will be pulled from the local GAE Datastore.

## Deploy on Google App Engine
1. Create a project in [Google Cloud](https://console.cloud.google.com). You will need the project ID.
    * Make sure your Google account is setup locally `gcloud auth list`
    * Use gcloud to point to the newly created project. Set current project `gcloud config set project <project-id>`
    * Make sure gcloud points to your project
        * List all projects in your account `gcloud projects list`
        * You can check current project with `gcloud config get-value project`

2. Then deploy the service configuration file (Open API):
    * `gcloud endpoints services deploy api-def.yaml`

3. Build the Angular app for prod
    * `ng build --configuration production` ([aot](https://angular.io/guide/aot-compiler) compilation + browser cache busting, etc...)

4. Deploy the app to Google Cloud
    * `gcloud app deploy`

NOTE: Once deployed for the first time, only steps 3 and 4 are required.




## Google Analytics
Google Analytics works out of the box. Just simply add your GA Tracking ID to your production environment file.

Please help me improve AMToH by answering a few questions in this [survey](https://docs.google.com/forms/d/e/1FAIpQLSfTMycGQFr6HJWNiGQRU3d9vLyEt2OX8n_gdo_kvYr7IEqZnQ/viewform). See the [demo](https://gae-boilerplate-203602.appspot.com).


