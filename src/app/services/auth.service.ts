import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

    private currentUser: firebase.User = null;
    public tokenId: string;

    constructor(
        public afAuth: AngularFireAuth,
        public snackBar: MatSnackBar
    ) {
        // Called when app loads
        // Retrieves the user
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.storeTokenId();
            } else {
                this.currentUser = null;
            }
        });
    }
    getCurrentUser() {
        return this.afAuth.authState;
    }
    storeTokenId() {
        firebase.auth().currentUser.getIdToken().then(token => {
            this.tokenId = token;
        });
    }
    passwordReset(email: string): Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email)
            .then(() => console.log('sent Password Reset Email!'))
            .catch(error => {
                this.snackBar.open(error, 'OK', {
                    duration: 2000,
                });
            })
    }
    loginWithEmail(email: string, pssw: string): Promise<any> {
        let promise = this.afAuth.auth.signInWithEmailAndPassword(email, pssw);
        promise
            .then((response) => {
                this.storeTokenId();
            })
            .catch(error => {
                this.snackBar.open(error, 'OK', {
                    duration: 2000,
                });
            })
        return promise;
    }
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        let promise = this.afAuth.auth.signInWithPopup(provider);
        promise
            .then((credential) => {
                this.storeTokenId();
            })
            .catch(error => {
                this.snackBar.open(error, 'OK', {
                    duration: 2000,
                });
            });
        return promise;
    }
    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider()
        let promise = this.afAuth.auth.signInWithPopup(provider);
        promise
            .then((credential) => {
                this.storeTokenId();
            })
            .catch(error => {
                this.snackBar.open(error, 'OK', {
                    duration: 2000,
                });
            });
        return promise;
    }
    registerWithEmail(email: string, username: string, pssw: string): Promise<any> {
        let promise = this.afAuth.auth.createUserWithEmailAndPassword(email, pssw)
            .then((response) => {
                this.currentUser = response.user;
                if (username) {
                    this.currentUser.updateProfile({ displayName: username, photoURL: '' })
                        .then(() => {
                        }, (error) => {
                            this.snackBar.open(error, 'OK', {
                                duration: 2000,
                            });
                        });
                }
            })
            .catch((reason: any) => {
            })
        return promise;
    }
    logoff(): Promise<any> {
        let promise = this.afAuth.auth.signOut()
            .then((response) => {
                this.tokenId = null;
            })
            .catch((reason) => {
                this.tokenId = null;
            })
        return promise;
    }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        public authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Add firebase auth token to all request headers
        // so authentication can be performed on the server side
        // (i.e. when calling the Endpoints API)
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.tokenId}`
            }
        });
        return next.handle(request);
    }
}