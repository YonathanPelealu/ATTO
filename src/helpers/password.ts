const bcrypt = require('bcrypt');
const saltRound = Number(process.env.SALT_ROUND);

export const encryptPwd = (password:String) => bcrypt.hashSync(password,saltRound)
export const decryptPwd = (password:String,dbPassword:String) => bcrypt.compareSync(password,dbPassword);
