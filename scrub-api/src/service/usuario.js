import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const listarUsuarios = async () => {
     const usuarios = await prisma.usuario.findMany({ //Isso garante que o Prisma só retorne os campos especificados
        select: {
            id: true,
            email: true,
            nome: true,
            idade: true,
          },
     })
    return usuarios
}

export const criarUsuario = async ({ email, nome , idade}, res) => {

    if (await prisma.usuario.findUnique({  //procura se o email ja ta cadastrado
      where: {
        email
        } 
      })) {
      return res.status(400).json("Usuário ja existe")
    } 

    return await prisma.usuario.create({  //esse usuario é o nome da tabela
      data: {
        email,
        nome,
        idade,
      },
    });
}

export const atualizarUsuario = async (id, { email, nome , idade}) => {
    return await prisma.usuario.update({  //esse usuario é o nome da tabela
        where: {
            id: id
        },
        data: {
          email,
          nome,
          idade,
        },
      });
}

export const deletarUsuario = async (id) => {
    return await prisma.usuario.delete({
        where: {
            id: id
        }
    })
}