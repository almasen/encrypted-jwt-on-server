## Encrypted JWT on server
Template implementation of Encrypted JWT authentication on a node server

## Building

### Scripts

 - `npm test` to run test with live coverage
 - `npm run docs` to create JSDoc files

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
