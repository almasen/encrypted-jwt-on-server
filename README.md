# encrypted-jwt-on-server
Template implementation of Encrypted JWT authentication on a node server



### Environment variables

#### Preserve sessions

To preserve sessions on reboot and import own encryption and signing keys, use the following environment configuration:

``` markdown
### Jose
PRESERVE_SESSIONS_ON_REBOOT=1
PRIVATE_KEY_PASSPHRASE=tnahpele
```

where PRIVATE_KEY_PASSPHRASE is the passphrase of your keys in PEM format.

#### Refresh sessions

To refresh all sessions and use new server generated keys upon each reboot, set the following:

``` markdown
### Jose
PRESERVE_SESSIONS_ON_REBOOT=0
```
