# Register-Login-Starter-Code
Node.js + Express.js + Passport.js + JWT + React.js Authentication



Notes:
A JWT is just a jumbled string that when decoded contains some piece of identifying data. So, you could store an entire user object, or just the ID. When you create the token, you're also adding a "secret key" to the mix that is used in the formula to jumble the string. Without that "secret key" you won't be able to decode the string.

This is useful for security, and it also makes it easier to share the JWT across multiple domains and applications. All you need to do is use the same secret key across apps that you want to share login for. If the secret key changes at all, then all the tokens using it will break.

Once the server has created the token, we give that token to the client, and they store it somewhere "safe" (Like LocalStorage?). On every request, or every request where they're trying to access "secure" routes, the token is passed along with the request to the server in the HEADERS. The server will see the token and try to decode it. If the server is able to decode the data properly, it will use the decoded data to handle the rest of the request. For example, getting a list of the user's recipes from the database based on the ID of the user in the decoded JWT.

When you throw Passport.js into the equation, it's not much harder to understand. Passport.js provides a "Local Strategy" for users to enter their signup/login information. Passport provides you a function to allow you to determine if the users entered info meets your criteria and matches any records in the database. If the user is signing up, you create a function to make sure the password meets the criteria, there's no existing user with that email, etc. If all is good you pass to Passport's callback function.

From the callback function you take the error, user object, and optional message object and process that how you like. If all is good you log them in by creating a JWT. Otherwise you throw an error and redirect.

Once you give the JWT to the "client", the next step is to "lock down" any routes that require authorization / authentication. This is where Passport's JWT strategy comes into the picture.
The Passport JWT acts as a "lock" to all the routes requiring a user to be logged in. So any time a user wants to visit a secured area of the site, they have to pull out their JWT, and give it to the JWT strategy, which decodes the JWT and allows them in or rejects them.