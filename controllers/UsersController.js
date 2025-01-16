/* eslint-disable import/no-named-as-default */
import sha1 from 'sha1'
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending')

export default class UsersController{
    static async postNew(req, res) {
        const { email, password } = req.body;

        if (!email) {
            res.status(400).json({ 'error': 'Missing email'});
            return;
        }
        if (!password) {
            res.status(400).json({ 'error': 'Missing password'});
            return;
        }

        const userExiset = await (await dbClient.collectionUser()).findOne({ email });

        if (userExiset) {
            res.status(400).json({ 'error': 'Already exist' });
            return;
        }
        const insertionInfo = await (await dbClient.usersCollection()).insertOne({ email, password: sha1(password) });
        const userId = insertionInfo.insertedId.toString();

        userQueue.add({ userId });
        res.status(201).json({ email, id: userId});
    }

    static async Meget(req, res) {
        const { user } = req;
        res.status(200).json({ email: user.email, id: user._id.toString() });
    } 
}
module.exports = UsersController;
