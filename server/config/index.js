const config = {};

config.jose = {
    kty: "EC",
    crvOrSize: "P-256",
    alg: "ECDH-ES+A128KW",
    enc: "A128GCM",
    sigAlg: "ES256",
    iss: "https://example.com",
    exp: "15 m",
    aud: "XYClient",
};

module.exports = config;
