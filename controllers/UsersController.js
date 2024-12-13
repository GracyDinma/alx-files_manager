/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1'
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const UserQueue = new Queue('email sending')

export default class UsersController{
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ 'error': 'Missing email'})
        }
        if (!password) {
            return res.status(400).json({ 'error': 'Missing password'})
        }

        const userExiset = await (await dbClient.collectionUser()).findOne({ email });

        if (userExiset) {
            return res.status(400).json({ 'error': 'Already exist' })
        }

        //Hash passworrd
        const hashPassword =  sha1(password)
        

        //Insert the User into db
        const insertion = await (await dbClient.collectionUser()).insertOne ({ email, hashPassword });

        const userId = insertion.insertedId.toString();

        UserQueue.add({ userId });
        res.status(201).json({ email, id: userId});
    }

    static async get(req, res) {
        const { user } = req;
        res.status.json({ email: user.email, id: user._id.toString() });
    } 
}
module.exports = UsersController;
