import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreatedTodoDto, UpdatedTodoDto } from "../../domain/dtos";


// const todos = [
//     { id: 1, text: 'Buy milk', completedAt: new Date() },
//     { id: 2, text: 'Buy milk', completedAt: null },
//     { id: 3, text: 'Buy milk', completedAt: new Date() },
// ]


export class TodosController {

    constructor(){}

    public getTodos = async (req: Request, res: Response) => {

        // res.json( todos )
        const todos = await prisma.todo.findMany();
        res.json(todos);
        return;
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        // const todo = todos.find( todo => todo.id === id );
        // res.json({ todo })

        const todo = await prisma.todo.findFirst({ where: { id } });

        if( isNaN(id) ) {
            res.status(400).json({ error: `${id} is not a number` })
            return;
        }

        ( todo )
            ? res.json( todo )
            : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = async (req: Request, res: Response) => {
        // const { text } = req.body;
        const [ error, createTodoDto ] = CreatedTodoDto.create( req.body );
        if( error ) {
            res.status(400).json({ error })
            return;
        }
        // if( !text ) {
        //     res.status(400).json({ error: `Text property is required` })
        //     return;
        // }

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json( todo )

        // const newTodo = {
        //     id: todos.length + 1,
        //     text: text,
        //     completedAt: null
        // }

        // todos.push( newTodo );

        // res.json( newTodo );
    }


    public updateTodo = async ( req: Request, res: Response ) => {
        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdatedTodoDto.create({...req.body, id});
        if( error ) {
            res.status(400).json({ error });
            return
        }

        // if( isNaN(id) ) {
        //     res.status(400).json({ error: `${id} is not a number` })
        //     return;
        // }

        const todo = await prisma.todo.findFirst({ where: { id } });
        
        if( !todo ) {
            res.status(404).json({ error: `TODO with id ${id} not found` })
            return;
        }

        // const { text, completedAt } = req.body;

        // const todo = todos.find( todo => todo.id === id );
        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDto!.values
        })

        // if( !text ) {
        //     res.status(400).json({ error: `Text property is required` })
        //     return;
        // }

        // todo.text = text || todo.text;

        // ( completedAt === 'null' ) 
        //     ? todo.completedAt = null
        //     : todo.completedAt = new Date( completedAt || todo.completedAt );

        // por referencia
        // todos.forEach( ( todo, index ) => {
        //     if ( todo.id === id ) {
        //         todos[index] = todo;
        //     }
        // })



        res.json( updatedTodo );


    }


    public deleteTodo = async( req: Request, res: Response ) => {
        const id = +req.params.id;

        // const todo = todos.find( todo => todo.id === id );
        const todo = await prisma.todo.findFirst({ where: { id } });

        if( !todo ) {
            res.status(404).json({ error: `Todo with id ${id} not found` })
            return;
        }

        // todos.splice( todos.indexOf( todo ), 1 );

        const deleted = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        
        ( deleted )
            ? res.json( deleted )
            : res.status(400).json({ error: `Todo with id ${id} not found` })


        // res.json({ todo, deleted });


    }


}