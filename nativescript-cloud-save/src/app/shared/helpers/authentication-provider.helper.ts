import {
    configureTnsOAuth
} from "nativescript-oauth2";
import {
    TnsOaProvider,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderGoogle,
    TnsOaProviderOptionsIdentityServer,
    TnsOaProviderIdentityServer
} from "nativescript-oauth2/providers";

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();
    // For future reference : https://www.youtube.com/watch?v=Ix0bXZeyhK0&list=WL&index=5&t=110s
    const identityServer = configureOAuthProviderIdentityServer();

    configureTnsOAuth([googleProvider]);
}

export function configureOAuthProviderGoogle(): TnsOaProvider {
    // urlScheme -> google does not support web-view support ,so we need to use system browser.
    const googleProviderOptions: TnsOaProviderOptionsGoogle = {
        openIdSupport: "oid-full",
        clientId:
            "1055966310361-l7oec360dj2dt2glb6j70vtomg0cn247.apps.googleusercontent.com",
        redirectUri:
            "com.googleusercontent.apps.1055966310361-l7oec360dj2dt2glb6j70vtomg0cn247:/auth",
        urlScheme:
            "com.googleusercontent.apps.1055966310361-l7oec360dj2dt2glb6j70vtomg0cn247",
        scopes: ["email"]
    };
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);

    return googleProvider;
}

export function configureOAuthProviderIdentityServer(): TnsOaProvider {
    const identityServerProviderOptions: TnsOaProviderOptionsIdentityServer = {
      openIdSupport: "oid-full",
      issuerUrl: "https://demo.identityserver.io",
      clientId: "native.code",
      urlScheme: "org.nativescript.demoangular",
      redirectUri: "org.nativescript.demoangular://auth",
      scopes: ["openid", "profile", "email", "offline_access"]
    };
    const identityServerProvider = new TnsOaProviderIdentityServer(
      identityServerProviderOptions
    );

    return identityServerProvider;
  }
