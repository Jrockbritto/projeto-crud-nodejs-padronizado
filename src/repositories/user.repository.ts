import DatabaseError from '../database/models/errors/database.error.model';
import User from '../database/models/user.model';
import db_User from '../database/models/db_user.model';

const bcrypt = require('bcrypt');

class UserRepository {

    async findAllUsers(): Promise<User[]> {
        const users = db_User.findAll({
            attributes: ['id', 'username', 'email']
        });
        return users || [];
    }

    async findById(uuid: string): Promise<User> {
        try {
            const user = await db_User.findOne({
                where: { id: uuid }
            });
            return user || null;
        } catch (err: any) {
            console.error(err);
            throw new DatabaseError('Erro na consulta por UUID', err);
        }

    }

    async create(user: User): Promise<string> {
        try {
            const newuser = await db_User.create({
                username: user.username,
                password: user.password,
                email: user.email,
                admin: user.admin,
            });

            return newuser;
        } catch (err) {
            throw new DatabaseError("Erro ao criar usuário", err)
        }
    }

    async update(user: User): Promise<void> {
        await db_User.update({
            username: user.username,
            password: user.password,
            email: user.email,
            admin: user.admin,
        }, {
            where: {
                id: user.uuid,
            },
            individualHooks: true,
        });
    }
    //Removes user correponding to the provided UUID
    async remove(uuid: string): Promise<void> {
        await db_User.destroy({
            where: {
                id: uuid
            }
        });
    }
    //Verifies if both the username and password are correct
    async validate(username: string, password: string): Promise<User | null> {
        try {

            const result = await db_User.findOne({
                where: { username: username }
            });

            if (!result) {
                return null;
            }

            const user_pass = result.dataValues.password;

            const valid = bcrypt.compareSync(password, user_pass);

            const user = {
                uuid: result.dataValues.id,
                username: result.dataValues.username,
                password: result.dataValues.password,
                email: result.dataValues.email,
                admin: result.dataValues.admin
            }

            return !valid ? null : user;
        } catch (err) {
            throw new DatabaseError('Erro na consulta por username e password', err);
        }
    };


}

export default new UserRepository();