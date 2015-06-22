def mobilehash(plaintext):
    import hashlib, base64

    hashed = hashlib.sha256(plaintext).digest()
    return base64.b64encode(hashed)