// /* eslint-disable import/no-named-as-default */
// import sha1 from 'sha1'
// import Queue from 'bull/lib/queue';
// import dbClient from '../utils/db';

// const UserQueue = new Queue('email sending')

// export default class UsersController{
//     static async postNew(req, res) {
//         const { email, password } = req.body;

//         if (!email) {
//             return res.status(400).json({ 'error': 'Missing email'})
//         }
//         if (!password) {
//             return res.status(400).json({ 'error': 'Missing password'})
//         }

//         const userExiset = await (await dbClient.collectionUser()).findOne({ email });

//         if (userExiset) {
//             return res.status(400).json({ 'error': 'Already exist' })
//         }

//         //Hash passworrd
//         const hashPassword =  sha1(password)
        

//         //Insert the User into db
//         const insertion = await (await dbClient.collectionUser()).insertOne ({ email, hashPassword });

//         const userId = insertion.insertedId.toString();

//         UserQueue.add({ userId });
//         res.status(201).json({ email, id: userId});
//     }

//     static async get(req, res) {
//         const { user } = req;
//         res.status.json({ email: user.email, id: user._id.toString() });
//     } 
// }
// module.exports = UsersController;

/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    const user = await (await dbClient.usersCollection()).findOne({ email });

    if (user) {
      res.status(400).json({ error: 'Already exist' });
      return;
    }
    const insertionInfo = await (await dbClient.usersCollection())
      .insertOne({ email, password: sha1(password) });
    const userId = insertionInfo.insertedId.toString();

    userQueue.add({ userId });
    res.status(201).json({ email, id: userId });
  }

  static async getMe(req, res) {
    const { user } = req;

    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}
module.exports = UsersController;
