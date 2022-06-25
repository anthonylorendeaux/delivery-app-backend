import { IUser } from "../types/User";
import { PrismaClient } from "@prisma/client";
 
const prisma = new PrismaClient();

export async function createUser(input: IUser) {
    try {
        const {name, email, profilePicture, phone, password, surname, isSuspended, categoryId} = input;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                profilePicture,
                phone,
                password,
                surname,
                isSuspended,
                categoryId,
            }
        })
        return user;
    } catch(e) {
        throw e;
    }
}

export async function findUser(input: IUser['id']) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(input),
            },
            include: {
                Category: true,
            }
        })
        return user;
    } catch(e) {
        throw e;
    }
}

export async function findUserByEmail(input: IUser['email']) {
    try {
        const user = await prisma.user.findUnique({
            where: {
              email: input,
            },
          })
        return user;
    } catch(e) {
        throw e;
    }
}

export async function findAllUsers() {
    try {
        const users = await prisma.user.findMany({});
        return users;
    } catch(e) {
        throw e;
    }
}

export async function updateUser(id: IUser['id'], input: IUser) {
    try {
        const {name, email, profilePicture, phone, password, surname, isSuspended, createdAt, updatedAt, categoryId, location} = input;

        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                email,
                profilePicture,
                phone,
                password,
                surname,
                isSuspended,
                categoryId,
                location: {
                    create: {  
                        address: location[0].address,
                        primary: location[0].primary
                    },
                }
            },
            include: {
                location: true
            }
        })
        return user;
    } catch(e) {
        throw e;
    }
}

export async function deleteAddress(address: string, userId: string) {
    try {
        const location = await prisma.location.deleteMany({
            where: {
                address: address,
                userId: Number(userId),
            }
        })
        return location;
    } catch(e) {
        throw e;
    }
}

export async function deleteUser(id: IUser['id']) {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(id),
            },
            data: {
                isDeleted: true,
            },
            include: {
                location: true
            }
        })
        return user;
    } catch(e) {
        throw e;
    }
}

export async function createSession(id: IUser['id'], token: string) {
    try {
        const session = await prisma.session.create({
            data: {
                userId: Number(id),
            }
        })
        return session;
    } catch(e) {
        throw e;
    }
}

export async function updateSession(id: IUser['id']) {
    try {
        const currentSession = await findSession(id);
        if(!currentSession) {
            return null;
        } 
        const session = await prisma.session.update({
            where: {
                id: currentSession.id,
            },
            data: {
                isAuth: false
            }
        })
        return session;
    } catch(err) {
            throw err;
    }
}

export async function findSession(id: IUser['id']) {
    try {
        const session = await prisma.session.findFirst({
            where: {
                userId: id,
                isAuth: true
            },
            include: {
                User: true
            }
        })
        return session;
    } catch(err) {
            throw err;
    }
}