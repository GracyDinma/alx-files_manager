/* eslint-disable import/no-named-as-default */
import redisClient from "../utils/redis";
import { v4 as uuidv4 } from "uuid";

export default class AuthController {
    static async getConnect(req, res) {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(400).json({ error: 'User data is missing or invalid' });
        }
    
        const token = uuidv4();
        const time = 24 * 60 * 60;
        const key = `auth_${token}`;
        await redisClient.set(key, user._id.toString(), time);
        res.status(200).json({ token });
    }

    static async getDisconnect(req, res) {
        const token = req.headers['x-token'];
        const key = `auth_${token}`;

        await redisClient.del(key);
        res.status(204).send()
    }
}
module.exports = AuthController;