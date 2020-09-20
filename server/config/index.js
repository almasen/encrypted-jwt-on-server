const config = {};

config.jose = {
    // key type
    kty: "EC",
    // curve
    crvOrSize: "P-256",
    // key derivation algorithm
    alg: "ECDH-ES+A128KW",
    // symmetric encryption algorithm
    enc: "A128GCM",
    // signing algorithm
    sigAlg: "ES256",
    // issuer
    iss: "https://example.com",
    // token expiry
    exp: "15 m",
    // audience
    aud: "XYClient",
};

module.exports = config;
