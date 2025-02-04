// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

import { db } from "../db.js"


export const listarUsuarios = async (req, res) => {
  const consulta = "SELECT * FROM usuarios";

  try {
    const [data] = await db.query(consulta); 
    return data;
    
  } catch (err) {
    throw new Error("Erro ao buscar usuários: " + err.message);
  }
};

export const criarUsuario = async (req) => {
  const consulta = "INSERT INTO usuarios(`nome`, `email`, `idade`) VALUES(?)";

  const values = [
    req.body.email,
    req.body.nome,
    req.body.idade
  ];

    await db.query(consulta, [values]); 
};

export const atualizarUsuario = async (req) => {
  const consulta = "UPDATE usuarios SET `nome` = ?, `email` = ?, `idade` = ? WHERE `id` = ?";

  const values = [
    req.body.email,
    req.body.nome,
    req.body.idade
  ];

    await db.query(consulta, [...values, req.params.id]); 
};

export const deletarUsuario = async (req) => {
  const consulta = "DELETE FROM usuarios WHERE `id` = ?";

    await db.query(consulta, req.params.id); 
};





// export const listarUsuarios = async () => {
//      const usuarios = await prisma.usuario.findMany({ //Isso garante que o Prisma só retorne os campos especificados
//         select: {
//             id: true,
//             email: true,
//             nome: true,
//             idade: true,
//           },
//      })
//     return usuarios
// }

// export const criarUsuario = async ({ email, nome , idade}, res) => {

//     if (await prisma.usuario.findUnique({  //procura se o email ja ta cadastrado
//       where: {
//         email
//         } 
//       })) {
//       return res.status(400).json("Usuário ja existe")
//     } 

//     return await prisma.usuario.create({  //esse usuario é o nome da tabela
//       data: {
//         email,
//         nome,
//         idade,
//       },
//     });
// }

// export const atualizarUsuario = async (id, { email, nome , idade}) => {
//     return await prisma.usuario.update({  //esse usuario é o nome da tabela
//         where: {
//             id: id
//         },
//         data: {
//           email,
//           nome,
//           idade,
//         },
//       });
// }

// export const deletarUsuario = async (id) => {
//     return await prisma.usuario.delete({
//         where: {
//             id: id
//         }
//     })
// }