#Sign Up
### Success
1. ✅ Request on POST on /auth
2. ✅ Validate if request body contains all required fields (email, password, name...)
3. ✅ Return Created if success
### Exceptions
1. ✅ Returns 500 if server throws an error
2. ✅ Returns 400 and MissingParamError if are missing params