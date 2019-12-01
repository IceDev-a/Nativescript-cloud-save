import { Injectable } from "@angular/core";
import { ITnsOAuthTokenResult, TnsOAuthClient } from "nativescript-oauth2";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
    private client: TnsOAuthClient = null;
    constructor() { }

    tnsOAuthLogin(providerType): Promise<ITnsOAuthTokenResult> {
        this.client = new TnsOAuthClient(providerType);

        return new Promise<ITnsOAuthTokenResult>((resolve, reject) => {
            this.client.loginWithCompletion(
                (tokenResult: ITnsOAuthTokenResult, error) => {
                    if (error) {
                        console.error("back to main page with error: ");
                        console.error(error);
                        reject(error);
                    } else {
                        console.log("back to main page with access token: ");
                        console.log(tokenResult);
                        resolve(tokenResult);
                    }
                }
            );
        });
    }

    tnsOAuthLogout(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (this.client) {
                this.client.logoutWithCompletion(
                    (error) => {
                        if (error) {
                            console.error("back to main page with error: ");
                            console.error(error);
                            reject(error);
                        } else {
                            console.log("back to main page with success");
                            resolve();
                        }
                    }
                );
            } else {
                console.log("back to main page with success");
                resolve();
            }
        });
    }

}
