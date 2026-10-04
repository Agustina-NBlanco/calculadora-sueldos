import { AppDataSource } from "../config/data-source";
import { ENV } from "../config/env";
import { User } from "../entities/User";
import { LoginDto, RegisterDto } from "./auth.dto";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

const userRepository = AppDataSource.getRepository(User)

export const register = async (data: RegisterDto) => {
    const { name, email, password, confirmPassword } = data

    if (password !== confirmPassword) throw new AppError('Las contrasenas no coinciden', 400)

    const existingUser = await userRepository.findOneBy({ email })

    if (existingUser) throw new AppError('El usuario ya existe', 400)

    const hashedPassword = await bcrypt.hash(password, 10)


    const user = userRepository.create({
        name,
        email,
        password: hashedPassword
    })

    await userRepository.save(user)

    return { message: 'Usuario registrado correctamente' }
}

export const login = async (data: LoginDto) => {
    const { email, password } = data

    const user = await userRepository.findOneBy({ email })

    if (!user) {
        throw new AppError('Credenciales inválidas', 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new AppError('Credenciales inválidas', 401)
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        ENV.JWT_SECRET,
        { expiresIn: '1h' }
    )

    return { token }
}
