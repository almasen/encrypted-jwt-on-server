## Encrypted JWT on server
Template implementation of Encrypted JWT authentication on a node server

## Introduction

### A (really) high level overview of using an encrypted JWT i.e. a JWE for authentication
A JWT is basically a signed JSON object, hence allowing us to send custom info in an object with a signature that verifies both the contents and the sender. You can check out an example [here](https://jwt.io/#debugger-io?token=eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaXNzIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImF1ZCI6IlhZQ2xpZW50IiwiaWF0IjoxNTE2MjM5MDIyfQ.u7uTfEPcDsTICj5C_ABMzfFCpT8OtNr1IP2NiZ4M8f0tC-a50gAku4xgGm2v-G0r2jIhwW_9W2yLH3COSpz8UA&publicKey=-----BEGIN%20PUBLIC%20KEY-----%0AMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVs%2Fo5%2BuQbTjL3chynL4wXgUg2R9%0Aq9UU8I5mEovUf86QZ7kOBIjJwqnzD1omageEHWwHdBO6B%2BdFabmdT9POxg%3D%3D%0A-----END%20PUBLIC%20KEY-----).

#### server > client

A JWE is essentially an encrypted JWT. In our case asymmetrically encrypted the following way:

1. Take the payload
    ``` json
    {
        "sub": "123",
        "aud": "someClient",
        "iss": "https://example.com",
        "iat": 1583209685,
        "exp": 1589909685
    }
    ```
    and sign it with the server's _private signing key_
2. we get our JWT: `(payload, server-sig)`
3. get **one** client's _public encryption key_ and encrypt the above JWT with it
4. we get our JWE `{(payload, server-sig) client-enc}`
5. send it to **the** client (the JWE can only be read by this one client)
6. decrypt the JWE client side with client's _private encryption key_ (on client device)
7. client has the original JWT `(payload, server-sig)`
8. client gets server's _public signing key_ and verifies the above token
9. if the signature verification (with the servers public key) passes, it means two things:
   1. the JWT must have been sent by the server
   2. the payload (the JWT) must not have been tampered with

#### client > server

Then client will send this JWT to the server in every other communication also encrypted:

1. client takes out the original JWT from it's secure storage (keychain): `(payload, server-sig)`
2. gets the servers _public encryption key_ and encrypts the above JWT with it
3. client has the following JWE `{(payload, server-sig) server-enc}`
4. sends it to the server (only server can read it since encrypted)
5. server decrypts it with it's own _private encryption key_: `(payload, server-sig)`
6. server verifies the above JWT with it's own _private signing key_
7. if this passes it means the following things:
   1. it could only have been sent by this one client as only they had access to it
   2. the token is valid so we can grant privileges to the user appropriately (the token payload will state what permissions they may have)

## Building

### Scripts

 - `npm test` to run Jest tests with live coverage
 - `npm run docs` to generate JSDoc documentation

#### Outputs

 - See `/coverage` for test coverage via Istanbul JS.
 - `/out` for the JSDocs

### Environment variables

#### Preserve sessions

To preserve sessions on reboot and import own encryption and signing keys, use the following environment configuration:

``` markdown
### Jose
PRESERVE_SESSIONS_ON_REBOOT=1
PRIVATE_KEY_PASSPHRASE=tnahpele
```

where `PRIVATE_KEY_PASSPHRASE` is the passphrase of your keys in PEM format.

Make sure to add your keys to `server/keys`

#### Refresh sessions

To refresh all sessions and use new server generated keys upon each reboot, set the following:

``` markdown
### Jose
PRESERVE_SESSIONS_ON_REBOOT=0
```
