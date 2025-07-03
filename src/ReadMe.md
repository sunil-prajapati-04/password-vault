model --> User Model
1. username
2. email
3. master password
4. otp

model --> Password Vault Model
1. userId
2. Password title
3. Your Password (array)

routes --> Auth Routes
1. signup (post)
2. requestOtp (post) {ismain email ke help se otp send hoga uss email id pe} (we will use NodeMailer for sending otp to there email)
3. verify Otp (post) {email,otp} aur isse email se apan token generate hoga aur res.cookie main set hoga  
3. logout (post)
4. profile (get)
5. updateProfile (put) {email,maste Password}

routes ---> Password Routes
1. getPassword (get) {with the help og userId can get passwords}
2. addPassword  (post)
3. updateVaultPassword (put) {update through id}
4. deletePassword  (delete) {through id}

