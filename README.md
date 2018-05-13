
# Material Design Tour of Heroes

Adaptation of the popular angular demo app [Tour of Heroes](https://angular.io/tutorial) to Material Design.

See the [demo](https://gae-boilerplate-203602.appspot.com).

![Screenshot](https://raw.githubusercontent.com/Miki-AG/md-tour-of-heroes/master/static/img/screenshot2.png)

This project utilizes:
- Angular 6
- Angular Material 6
- Backend in Google App Engine using REST Endpoints (TBC)
- Firebase for authentication (TBC)
- Gulp scripts to automate deployment in GAE

## Requirements
- Google Cloud SDK 200.0.0
- Node v8.9.4
- Npm 5.6.0
- Gulp 4.0.0-alpha.3

## Development server (no GAE)

Run `ng serve` for a simple dev server.

Data will be pulled from a Json file in disk (see [Angular in-memory-web-api](https://github.com/angular/in-memory-web-api))

## Build and run GAE local

Run `ng build --prod` to rebuild the /dist directory.
Run `gulp run` to launch the app and GAE.

Data will be pulled from the GAE Datastore.

## Deploy on Google App Engine
- Build for prod
    `ng build --prod`
- Make sure you are on your Google account
    `gcloud auth list`
- Make sure gcloud points to your project
    `gcloud config set project <project-id>`
    - You can check current project with
    `gcloud config get-value project`
    - Use project ID, it must exists in your console (https://console.cloud.google.com), if it does not exists, create it beforehand.
- To deploy the app
    `gcloud app deploy`